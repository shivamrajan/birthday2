document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".memory-card");
  const modal = document.getElementById("slideshowModal");
  const closeModal = document.getElementById("closeModal");
  const slideshowContent = document.getElementById("slideshowContent");
  let slideIndex = 0;
  let slides = [];
  let autoPlayInterval;

  // Memory data (replace with your real images)
  const memoryData = {
    slideshow1: [
      { img: "memory1.jpg" },
      { img: "memory2.jpg" }
      { img: "memory3.jpg" },
      { img: "memory4.jpg" }
    ],
    slideshow2: [
    { img: "memory5.jpg" },
      { img: "memory6.jpg" }
      { img: "memory7.jpg" },
      { img: "memory8.jpg" }
    ],
    slideshow3: [
      { img: "memory9.jpg" },
      { img: "memory10.jpg" }
      { img: "memory11.jpg" },
      { img: "memory12.jpg" }
    ]
  };

  // Open slideshow when clicking card
  cards.forEach(card => {
    card.addEventListener("click", () => {
      const slideshowId = card.getAttribute("data-slideshow");
      openSlideshow(slideshowId);
    });
  });

  function openSlideshow(slideshowId) {
    slideshowContent.innerHTML = "";
    slides = memoryData[slideshowId];

    slides.forEach((s) => {
      const slideDiv = document.createElement("div");
      slideDiv.classList.add("slides");
      slideDiv.innerHTML = `<img src="${s.img}" alt="">`;
      slideshowContent.appendChild(slideDiv);
    });

    modal.style.display = "block";
    slideIndex = 0;
    showSlide(slideIndex);

    // Start autoplay
    autoPlayInterval = setInterval(() => {
      slideIndex++;
      showSlide(slideIndex);
    }, 3000); // change every 3s
  }

  function showSlide(n) {
    const slideElements = document.querySelectorAll(".slides");
    if (n >= slideElements.length) slideIndex = 0;
    if (n < 0) slideIndex = slideElements.length - 1;

    slideElements.forEach(slide => (slide.style.display = "none"));
    slideElements[slideIndex].style.display = "block";
  }

  document.querySelector(".prev").addEventListener("click", () => {
    slideIndex--;
    showSlide(slideIndex);
  });

  document.querySelector(".next").addEventListener("click", () => {
    slideIndex++;
    showSlide(slideIndex);
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    clearInterval(autoPlayInterval); // stop autoplay when closing
  });
});
