// Get the button
// let mybutton = document.getElementById("myBtn");

// // When the user scrolls down 20px from the top of the document, show the button
// window.onscroll = function () {
//   scrollFunction();
// };

// function scrollFunction() {
//   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//     mybutton.style.display = "block";
//   } else {
//     mybutton.style.display = "none";
//   }
// }

// When the user clicks on the button, scroll to the top of the document
// function topFunction() {
//   document.body.scrollTop = 0;
//   document.documentElement.scrollTop = 0;
// }

//modal
const galleryImages = document.querySelectorAll(".gallery-img");
const modalImage = document.getElementById("modalImage");
const imageModal = new bootstrap.Modal(document.getElementById("imageModal"));

let currentIndex = 0;

// Show modal with selected image
function showImage(index) {
  const img = galleryImages[index];
  modalImage.src = img.dataset.full || img.src;
  imageModal.show();
  currentIndex = index;
}

// Click handler for thumbnails
galleryImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    showImage(index);
  });
});

// Buttons
document.getElementById("nextBtn").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  showImage(currentIndex);
});
document.getElementById("prevBtn").addEventListener("click", () => {
  currentIndex =
    (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  showImage(currentIndex);
});
// Swipe gestures
let startx = 0;
modalImage.addEventListener("touchstart", (e) => {
  startx = e.touches[0].clientX;
});
modalImage.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  if (startx - endX > 50) {
    // swipe left → next
    currentIndex = (currentIndex + 1) % galleryImages.length;
    showImage(currentIndex);
  } else if (endX - startx > 50) {
    // swipe right → previous
    currentIndex =
      (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    showImage(currentIndex);
  }
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (!document.getElementById("imageModal").classList.contains("show")) return;
  if (e.key === "ArrowRight") {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    showImage(currentIndex);
  } else if (e.key === "ArrowLeft") {
    currentIndex =
      (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    showImage(currentIndex);
  }
});
