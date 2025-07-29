// Function to create media element (image or video)
function createMediaElement(imageSrc, title) {
  if (imageSrc.endsWith(".webm")) {
    return `<video autoplay loop muted><source src="${imageSrc}" type="video/webm"></video>`;
  } else {
    return `<img src="${imageSrc}" alt="${title}">`;
  }
}

// Function to create colored tags
function createColoredTags(tags) {
  const tagColors = {
    Writing: "tag-writing",
    Interactive: "tag-interactive",
    Mapping: "tag-mapping",
    "Data Analysis": "tag-data-analysis",
    Graphics: "tag-graphics",
    "Web Development": "tag-web-development",
    D3: "tag-d3",
    "Data Engineering": "tag-data-engineering",
    Python: "tag-python",
    Backend: "tag-backend",
    Frontend: "tag-frontend",
    R: "tag-r",
    Svelte: "tag-svelte",
  };

  return tags
    .map((tag) => {
      const colorClass = tagColors[tag] || "tag-writing"; // default color
      return `<span class="tag ${colorClass}">${tag}</span>`;
    })
    .join(" ");
}

// Function to populate a story card from template
function createStoryCard(story) {
  const template = document.getElementById("story-card-template");
  const clone = template.content.cloneNode(true);

  // Set the tags at the top
  clone.querySelector(".story-tags").innerHTML = createColoredTags(story.tags);

  // Set the title
  clone.querySelector(".story-title").textContent = story.title;

  // Set the description
  clone.querySelector(".story-description").textContent = story.description;

  // Set the media (image or video)
  const mediaContainer = clone.querySelector(".card-image figure");
  mediaContainer.innerHTML = createMediaElement(story.image, story.title);

  // Set the link for the entire card
  clone.querySelector(".story-link").href = story.link;

  // Add data attributes for filtering
  const cardContainer = clone.querySelector(".story-card-container");
  cardContainer.setAttribute("data-tags", JSON.stringify(story.tags));

  return clone;
}

// Function to filter stories
function filterStories() {
  const storyCards = document.querySelectorAll(".story-card-container");
  const activeFilters = Array.from(
    document.querySelectorAll(".filter-btn.active")
  )
    .map((btn) => btn.getAttribute("data-filter"))
    .filter((filter) => filter !== "all");

  let visibleCount = 0;

  storyCards.forEach((card) => {
    const cardTags = JSON.parse(card.getAttribute("data-tags"));

    // If "All" is selected or no filters are active, show all cards
    if (
      activeFilters.length === 0 ||
      document
        .querySelector('.filter-btn[data-filter="all"]')
        .classList.contains("active")
    ) {
      card.classList.remove("hidden");
      visibleCount++;
    } else {
      // Show card if it has ALL of the selected tags (AND logic)
      const hasAllTags = activeFilters.every((filter) =>
        cardTags.includes(filter)
      );
      if (hasAllTags) {
        card.classList.remove("hidden");
        visibleCount++;
      } else {
        card.classList.add("hidden");
      }
    }
  });

  // Show/hide no results message
  showNoResultsMessage(visibleCount === 0);
}

// Function to show/hide no results message
function showNoResultsMessage(show) {
  let noResultsCard = document.getElementById("no-results-card");

  if (show) {
    if (!noResultsCard) {
      // Create the no results card
      const container = document.getElementById("stories-container");
      noResultsCard = document.createElement("div");
      noResultsCard.id = "no-results-card";
      noResultsCard.className = "column is-12";
      noResultsCard.innerHTML = `
        <div class="card has-text-centered" style="padding: 3rem; width: 50%; margin: auto;">
          <div class="card-content">
            <div class="content" >
              <h3 class="title is-4" style="color: #666;">No stories match your filters</h3>
              <p class="subtitle is-6 mt-3" style="color: #888;">Try selecting different filters</p>
            </div>
          </div>
        </div>
      `;
      container.appendChild(noResultsCard);
    }
    noResultsCard.style.display = "block";
  } else {
    if (noResultsCard) {
      noResultsCard.style.display = "none";
    }
  }
}

// Function to handle filter button clicks
function setupFilterButtons() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const allButton = document.querySelector('.filter-btn[data-filter="all"]');

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filterTag = button.getAttribute("data-filter");

      if (filterTag === "all") {
        // If "All" is clicked, deselect everything else and select "All"
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
      } else {
        // If a specific filter is clicked
        if (button.classList.contains("active")) {
          // If already active, deselect it
          button.classList.remove("active");

          // If no other filters are active, activate "All"
          const hasActiveFilters = Array.from(filterButtons).some(
            (btn) =>
              btn.classList.contains("active") &&
              btn.getAttribute("data-filter") !== "all"
          );
          if (!hasActiveFilters) {
            allButton.classList.add("active");
          }
        } else {
          // If not active, select it and deselect "All"
          button.classList.add("active");
          allButton.classList.remove("active");
        }
      }

      // Apply the filter
      filterStories();
    });
  });
}

// Load and display stories from JSON
fetch("stories.json")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("stories-container");

    // Since your JSON structure is just an array, not nested objects
    const stories = Array.isArray(data) ? data : data.stories || [];

    stories.forEach((story) => {
      const storyCard = createStoryCard(story);
      container.appendChild(storyCard);
    });

    // Setup filter buttons after stories are loaded
    setupFilterButtons();
  })
  .catch((error) => {
    console.error("Error loading stories:", error);
  });
