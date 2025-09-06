
/* Global interactions for the site */
(function(){
  // set year
  var y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();

  // Reveal animations (simple)
  var reveals = document.querySelectorAll('.section, .glass, .album-card, .gallery-item');
  function reveal(){
    for(var i=0;i<reveals.length;i++){
      var r = reveals[i];
      var rect = r.getBoundingClientRect();
      if(rect.top < (window.innerHeight - 60)) r.classList.add('visible');
    }
  }
  window.addEventListener('scroll', reveal);
  window.addEventListener('load', reveal);
  reveal();

  // Gallery Lightbox slider
  var lightbox = document.getElementById('galleryLightbox');
  var lbImg = document.getElementById('lbImage');
  var lbCaption = document.getElementById('lbCaption');
  var closeBtn = document.querySelector('.lb-close');
  var prevBtn = document.querySelector('.lb-prev');
  var nextBtn = document.querySelector('.lb-next');
  var galleryNodes = [];
  var currentIndex = 0;

  function collectGallery(){
    var gallery = document.getElementById('gallery');
    if(!gallery) return;
    var items = gallery.querySelectorAll('.gallery-item');
    galleryNodes = Array.prototype.slice.call(items);
    galleryNodes.forEach(function(btn, idx){
      btn.addEventListener('click', function(){
        openLightbox(idx);
      });
    });
  }

  function openLightbox(idx){
    if(!galleryNodes.length) return;
    currentIndex = idx;
    var node = galleryNodes[currentIndex];
    var src = node.getAttribute('data-src');
    var caption = node.getAttribute('data-caption') || '';
    lbImg.src = src;
    lbImg.alt = caption;
    lbCaption.textContent = caption;
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden','false');
  }

  function closeLightbox(){
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden','true');
    lbImg.src = '';
  }

  function showNext(n){
    if(!galleryNodes.length) return;
    currentIndex = (currentIndex + 1 + n) % galleryNodes.length;
    var node = galleryNodes[currentIndex];
    lbImg.src = node.getAttribute('data-src');
    lbCaption.textContent = node.getAttribute('data-caption') || '';
  }

  if(closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if(prevBtn) prevBtn.addEventListener('click', function(){ showNext(-1); });
  if(nextBtn) nextBtn.addEventListener('click', function(){ showNext(1); });
  // keyboard
  document.addEventListener('keydown', function(e){
    if(!lightbox || !lightbox.classList.contains('active')) return;
    if(e.key === 'Escape') closeLightbox();
    if(e.key === 'ArrowRight') showNext(1);
    if(e.key === 'ArrowLeft') showNext(-1);
  });

  // click outside to close
  if(lightbox){
    lightbox.addEventListener('click', function(e){
      if(e.target === lightbox) closeLightbox();
    });
  }

  // init per page
  collectGallery();
})();
