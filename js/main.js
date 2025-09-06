document.addEventListener('DOMContentLoaded', () => {
  // Footer year update
  ['year','year2','year3','year4','year5'].forEach(id => {
    const el = document.getElementById(id);
    if(el) el.textContent = new Date().getFullYear();
  });

  // Albums definition (album folder => display name)
  const albums = {
    wedding: "Wedding",
    prewedding: "Pre-wedding",
    birthday: "Birthday",
    corporate: "Corporate"
  };

  // Each album has images named cover.jpg and img1.jpg ... img10.jpg
  const albumGrid = document.getElementById('albumGrid');
  const lightbox = document.getElementById('lightbox');
  const track = document.getElementById('track');
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  const lbClose = document.getElementById('lbClose');

  let currentAlbum = null;
  let currentIndex = 0;
  let albumImages = [];

  if(albumGrid){
    Object.entries(albums).forEach(([folder, title]) => {
      const card = document.createElement('div');
      card.className = 'album-card';
      card.innerHTML = `
        <div class="album-cover">
          <img src="assets/gallery/${folder}/cover.jpg" alt="${title} cover">
          <div class="album-title">${title}</div>
        </div>
      `;
      card.addEventListener('click', () => openAlbum(folder, title));
      albumGrid.appendChild(card);
    });
  }

  function openAlbum(folder, title){
    currentAlbum = folder;
    albumImages = [];
    for(let i=1; i<=10; i++){
      albumImages.push(`assets/gallery/${folder}/img${i}.jpg`);
    }
    openLightbox(0);
  }

  function openLightbox(startIndex){
    lightbox.setAttribute('aria-hidden','false');
    renderSlides(startIndex);
    track.focus();
  }

  function renderSlides(startIndex){
    track.innerHTML = '';
    albumImages.forEach((src,i) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = "Photo " + (i+1);
      img.style.display = i===startIndex ? 'block':'none';
      track.appendChild(img);
    });
    currentIndex = startIndex;
  }

  function closeLightbox(){
    lightbox.setAttribute('aria-hidden','true');
    track.innerHTML = '';
  }

  function show(i){
    if(i < 0) i = albumImages.length-1;
    if(i >= albumImages.length) i = 0;
    const imgs = track.querySelectorAll('img');
    imgs.forEach((img,idx)=>{
      img.style.display = idx===i ? 'block':'none';
    });
    currentIndex = i;
  }

  if(prev) prev.addEventListener('click', () => show(currentIndex-1));
  if(next) next.addEventListener('click', () => show(currentIndex+1));
  if(lbClose) lbClose.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if(lightbox.getAttribute('aria-hidden') === 'false'){
      if(e.key==='ArrowLeft') show(currentIndex-1);
      if(e.key==='ArrowRight') show(currentIndex+1);
      if(e.key==='Escape') closeLightbox();
    }
  });
});
