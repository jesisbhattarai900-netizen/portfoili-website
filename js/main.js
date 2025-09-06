document.getElementById("year").textContent = new Date().getFullYear();
// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const caption = document.getElementById('lightboxCaption');
const close = document.querySelector('.lightbox .close');
document.querySelectorAll('.grid-gallery img').forEach(img => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
    caption.textContent = img.alt;
  });
});
close.addEventListener('click', () => { lightbox.style.display = 'none'; });
