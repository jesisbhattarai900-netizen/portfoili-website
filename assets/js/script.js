function navigate(hash){location.hash = hash}
function route(){const hash=location.hash||'#home';document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));const target=document.querySelector(hash);if(target)target.classList.add('active');}
window.addEventListener('hashchange',route)
window.addEventListener('load',()=>{route();document.getElementById('year').innerText=new Date().getFullYear();})