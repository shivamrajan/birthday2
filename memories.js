document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".memory-card");
  const modal = document.getElementById("slideshowModal");
  const closeModal = document.getElementById("closeModal");
  const slideshowContent = document.getElementById("slideshowContent");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  let slides = [];
  let autoPlayInterval;
  const scrollStep = 300; // px per autoplay scroll

  const memoryData = {
    slideshow1: [
      { img: "memory1.jpg" }, { img: "memory2.jpg" },
      { img: "memory3.jpg" }, { img: "memory4.jpg" }
    ],
    slideshow2: [
      { img: "memory5.jpg" }, { img: "memory6.jpg" },
      { img: "memory7.jpg" }, { img: "memory8.jpg" }
    ],
    slideshow3: [
      { img: "memory9.jpg" }, { img: "memory10.jpg" },
      { img: "memory11.jpg" }, { img: "memory12.jpg" }
    ]
  };

  // Open slideshow on card click
  cards.forEach(card => {
    card.addEventListener("click", () => {
      const slideshowId = card.getAttribute("data-slideshow");
      openSlideshow(slideshowId);
    });
  });

  function openSlideshow(slideshowId) {
    slideshowContent.innerHTML = "";
    slides = memoryData[slideshowId];

    slides.forEach(s => {
      const slideDiv = document.createElement("div");
      slideDiv.classList.add("slides");
      slideDiv.innerHTML = `<img src="${s.img}" alt="">`;
      slideshowContent.appendChild(slideDiv);
    });

    modal.style.display = "block";

    // autoplay scroll
    autoPlayInterval = setInterval(() => {
      slideshowContent.scrollBy({ left: scrollStep, behavior: "smooth" });

      // loop back to start
      if (slideshowContent.scrollLeft + slideshowContent.clientWidth >= slideshowContent.scrollWidth) {
        slideshowContent.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 3000);
  }

  prevBtn.addEventListener("click", () => {
    slideshowContent.scrollBy({ left: -scrollStep, behavior: "smooth" });
  });

  nextBtn.addEventListener("click", () => {
    slideshowContent.scrollBy({ left: scrollStep, behavior: "smooth" });
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    clearInterval(autoPlayInterval);
  });
});
