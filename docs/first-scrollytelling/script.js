var figureToggles = document.querySelectorAll("[data-figure-toggle]");

figureToggles.forEach(function (button) {
  button.addEventListener("click", function () {
    var targetId = button.getAttribute("data-figure-toggle");
    var target = document.getElementById(targetId);

    if (!target) {
      return;
    }

    var isOverflow = target.classList.contains("mode-overflow");
    target.classList.toggle("mode-overflow", !isOverflow);
    target.classList.toggle("mode-full", isOverflow);

    button.textContent = isOverflow
      ? "Full page visible"
      : "Only viewport visible";
  });
});

function initMiniScrollyDemo() {
  var demo = document.getElementById("mini-scrolly-demo");
  var background = document.getElementById("mini-scrolly-background");
  var responseEl = document.getElementById("mini-scrolly-response");

  if (!demo || !background) {
    return;
  }

  var cards = demo.querySelectorAll(".example-card");
  var colors = ["#4682B4", "#5f9ea0", "#7fa67a", "#b47846"];

  function renderResponse(data) {
    if (!responseEl) {
      return;
    }

    responseEl.textContent = JSON.stringify(data, null, 2);
  }

  if (window.scrollama) {
    var miniScroller = scrollama();

    var latestDirection = "down";

    miniScroller
      .setup({
        step: "#mini-scrolly-demo .example-card",
        offset: 0.6,
        debug: false,
      })
      .onStepEnter(function (response) {
        var idx = Number(response.element.getAttribute("data-step-index"));
        background.style.backgroundColor = colors[idx] || colors[0];
        latestDirection = response.direction;

        renderResponse({
          event: "onStepEnter",
          index: response.index,
          direction: response.direction,
          elementClass: response.element.className,
          stepIndex: idx,
        });
      })
      .onStepProgress(function (response) {
        var idx = Number(response.element.getAttribute("data-step-index"));

        renderResponse({
          event: "onStepProgress",
          index: response.index,
          direction: latestDirection,
          elementClass: response.element.className,
          stepIndex: idx,
          progress: Number(response.progress.toFixed(3)),
        });
      });

    return;
  }

  renderResponse({
    event: "Scrollama unavailable",
    message: "Load scrollama to see real callback response values.",
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }

        var idx = Number(entry.target.getAttribute("data-step-index"));
        background.style.backgroundColor = colors[idx] || colors[0];
      });
    },
    {
      root: demo,
      threshold: 0.6,
    }
  );

  cards.forEach(function (card) {
    observer.observe(card);
  });
}

initMiniScrollyDemo();

if (window.d3 && window.scrollama && document.querySelector("#scrolly")) {
  var main = d3.select("main");
  var scrolly = main.select("#scrolly");
  var figure = scrolly.select("figure");
  var article = scrolly.select("article");
  var step = article.selectAll(".step");
  var scroller = scrollama();

  function handleResize() {
    var stepH = Math.floor(window.innerHeight * 0.75);
    step.style("height", stepH + "px");

    var figureHeight = window.innerHeight / 2;
    var figureMarginTop = (window.innerHeight - figureHeight) / 2;

    figure
      .style("height", figureHeight + "px")
      .style("top", figureMarginTop + "px");

    scroller.resize();
  }

  function handleStepEnter(response) {
    step.classed("is-active", function (d, i) {
      return i === response.index;
    });

    figure.select("p").text(response.index + 1);
  }

  function init() {
    handleResize();

    scroller
      .setup({
        step: "#scrolly article .step",
        offset: 0.33,
        debug: false,
      })
      .onStepEnter(handleStepEnter);
  }

  init();
}
