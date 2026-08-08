let map = new maplibregl.Map({
  container: 'map',
  style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json', // stylesheet location
  center: [-74.0060, 40.730610], // starting position [lng, lat]
  zoom: 7 // starting zoom
});

let activeStep;
let responseEl = document.getElementById('demo-scrolly-response');
let responseContainerEl = responseEl ? responseEl.closest('.sphinxsidebarwrapper') : null;
let backgroundEl = document.getElementById('scrolly-background');
let isBackgroundFullyVisible = false;


// initialize the scrollama
let scroller = scrollama();

function renderResponse(data) {
    if (!responseEl || !isBackgroundFullyVisible) {
        return;
    }

    responseEl.textContent = JSON.stringify(data, null, 2);
}

function initBackgroundVisibilityObserver() {
    if (!backgroundEl || !responseContainerEl || !responseEl) {
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            const entry = entries[0];
            isBackgroundFullyVisible = entry.isIntersecting && entry.intersectionRatio >= 0.999;
            responseContainerEl.classList.toggle('is-hidden', !isBackgroundFullyVisible);

            if (!isBackgroundFullyVisible) {
                responseEl.textContent = 'Waiting for events...';
            }
        },
        {
            threshold: [0, 1],
        }
    );

    observer.observe(backgroundEl);
}


// scrollama event handlers
function handleStepEnter(response) {
    console.log(response);
    activeStep = response.index;
    // update graphic
    update();

    renderResponse({
        event: 'stepEnter',
        index: response.index,
        direction: response.direction,
        stepClass: response.element.className,
    });
}


function init() {
    initBackgroundVisibilityObserver();

    // 2. setup the scroller passing options
    // 		this will also initialize trigger observations
    // 3. bind scrollama event handlers (this can be chained like below)
    scroller
        .setup({
            step: "#scrolly-demo .step",
            offset: 0.5,
            debug: false,

        })
        .onStepEnter(handleStepEnter)
}

// kick things off
init();


function update() {
    // add color to current step only
    if (activeStep === 0) {
        // fly to New York
        map.flyTo({
            center: [-74.0060, 40.730610],
            zoom: 7
        });
   }
   else if (activeStep === 1) {
        // fly to Chicago
        map.flyTo({
            center: [-87.6298, 41.8781],
        });
   } else if (activeStep === 2) {
        // fly to Denver
        map.flyTo({
            center: [-104.9903, 39.7392],
        });
   } else if (activeStep === 3) {
        // fly to San Francisco
        map.flyTo({
            center: [-122.4194, 37.7749],
        });
   }
    
}