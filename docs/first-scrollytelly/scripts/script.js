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
  var responseContainerEl = responseEl
    ? responseEl.closest(".sphinxsidebarwrapper")
    : null;
  var isBackgroundFullyVisible = false;

  if (!demo || !background) {
    return;
  }

  var steps = demo.querySelectorAll(".example-step");
  var colors = ["#b45c46", "#5f9ea0", "#7fa67a", "#b47846"];

  function initBackgroundVisibilityObserver() {
    if (!responseContainerEl || !responseEl) {
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        var entry = entries[0];
        isBackgroundFullyVisible =
          entry.isIntersecting && entry.intersectionRatio >= 0.999;

        responseContainerEl.classList.toggle(
          "is-hidden",
          !isBackgroundFullyVisible
        );

        if (!isBackgroundFullyVisible) {
          responseEl.textContent = "Waiting for step enter...";
        }
      },
      {
        threshold: [0, 1],
      }
    );

    observer.observe(background);
  }

  function renderResponse(data) {
    if (!responseEl || !isBackgroundFullyVisible) {
      return;
    }

    responseEl.textContent = JSON.stringify(data, null, 2);
  }

  initBackgroundVisibilityObserver();

  if (window.scrollama) {
    var miniScroller = scrollama();

    var latestDirection = "down";

    miniScroller
      .setup({
        step: "#mini-scrolly-demo .example-step",
        offset: 0.5,
        progress: true,
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

  steps.forEach(function (step) {
    observer.observe(step);
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
