let currentSlide = 0;
const slides = document.querySelectorAll(".uv-slide");
const totalSlides = slides.length;
const leftBtn = document.querySelector(".uv-nav-btn.uv-left");
const rightBtn = document.querySelector(".uv-nav-btn.uv-right");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) {
      slide.classList.add("active");
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide);
}

// Auto Slide
let slideInterval = setInterval(nextSlide, 3000);

// Manual Controls
leftBtn.addEventListener("click", () => {
  prevSlide();
  resetInterval();
});

rightBtn.addEventListener("click", () => {
  nextSlide();
  resetInterval();
});

function resetInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 3000);
}

// Initialize
showSlide(currentSlide);




function scrollSlider(button, direction) {
  const container = button.closest('.slider-container');
  const slider = container.querySelector('.slider');

  // Scroll
  slider.scrollLeft += direction * 350;

  // Delay check until scroll finishes
  setTimeout(() => updateButtonsVisibility(container), 100);
}


function updateButtonsVisibility(container) {
  const slider = container.querySelector('.slider');
  const leftBtn = container.querySelector('.left-btn');
  const rightBtn = container.querySelector('.right-btn');

  const scrollLeft = slider.scrollLeft;
  const scrollWidth = slider.scrollWidth;
  const clientWidth = slider.clientWidth;

  // Show/hide left button
  if (scrollLeft <= 0) {
    leftBtn.style.display = 'none';
  } else {
    leftBtn.style.display = 'block';
  }

  // Show/hide right button
  if (scrollLeft + clientWidth >= scrollWidth - 1) {
    rightBtn.style.display = 'none';
  } else {
    rightBtn.style.display = 'block';
  }
}
window.addEventListener('load', () => {
  document.querySelectorAll('.slider-container').forEach(container => {
    updateButtonsVisibility(container);
  });
});

window.addEventListener('resize', () => {
  document.querySelectorAll('.slider-container').forEach(container => {
    updateButtonsVisibility(container);
  });
});




// Create one recent card template (reuse this to add 6 times)

const cardTemplate = `
    <div class="recent-card">
      <div class="flex gap10 recent-card-head">
        <div class="recent-card-head-ctn">
          <div class="recent-card-head-heading">Lorem ipsum dolor sit amet.</div>
          <div class="recent-card-head-detail">Lorem ipsum dolor sit amet.</div>
        </div>
        <div class="whatsapp-btn flex gap5">
          <div class="whatsapp-logo">
            <img src="https://akam.cdn.jdmagicbox.com/images/icontent/jdmart/squarewhatsapp_icon.svg" alt="whatsapp-logo">
          </div>
          <div class="whatsapp-txt">WhatsApp</div>
        </div>
      </div>
      <div class="recent-img-ctn">
        <img src="https://images.jdmagicbox.com/comp/jhansi/e9/9999px510.x510.230112013855.j3e9/catalogue/johnson-hair-gallery-jhansi-hair-stylists-etdxeqy2et.jpg" alt="recent-img-ctn">
      </div>
      <div class="recent-below">
        <div class="recent-activity-reviewer">
          <img src="https://content1.jdmagicbox.com/lme/1x2wg1kjl325r/goog-l.jpg?v=1" alt="Rajan Singh" class="recent-activity-user-img">
          <div>
            <div class="recent-activity-username">Rajan Singh</div>
            <div class="recent-activity-useraction">Wrote a review</div>
          </div>
        </div>
        <div class="recent-activity-stars">★★★★☆</div>
        <p class="recent-activity-review">Self made by owner. Taste was outstanding 👌</p>
      </div>
    </div>
  `;

const container = document.querySelector(".recent-ctn");
const loadMoreBtn = document.getElementById("loadMoreBtn");

let cardBatchCount = 0;
const cardsPerBatch = 6;

// Function to load a batch of cards
function loadCards(batchSize) {
  for (let i = 0; i < batchSize; i++) {
    container.insertAdjacentHTML("beforeend", cardTemplate);
  }
  cardBatchCount++;

  // After 2 batches (12 cards), remove the button
  if (cardBatchCount >= 2 && loadMoreBtn) {
    loadMoreBtn.parentElement.remove();
  }
}

// Load first 6 cards on page load
window.addEventListener("DOMContentLoaded", () => {
  loadCards(cardsPerBatch);
});

// Load more cards on button click
if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", () => {
    loadCards(cardsPerBatch);
  });
}
const counters = document.querySelectorAll(".counter");

const animateCounter = (counter) => {
  counter.innerText = "0";
  const updateCounter = () => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;
    const increment = target / 200;
    if (count < target) {
      counter.innerText = `${Math.ceil(count + increment)}+`;
      setTimeout(updateCounter, 1);
    } else {
      counter.innerText = target;
    }
    counter.innerText += '+'
  };
  updateCounter();
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      observer.unobserve(entry.target); // Stop observing once animated
    }
  });
}, {
  threshold: 0.5 // Trigger when 50% of the element is visible
});

// Start observing each counter
counters.forEach((counter) => {
  observer.observe(counter);
});


