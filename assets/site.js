(function(){
  var h=document.querySelector('.site-header');
  var onScroll=function(){if(h)h.classList.toggle('scrolled',window.scrollY>8)};
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  var t=document.querySelector('.menu-toggle');
  if(t){t.addEventListener('click',function(){
    var open=document.body.classList.toggle('menu-open');
    t.setAttribute('aria-expanded',open?'true':'false');
  });
  document.querySelectorAll('.nav a').forEach(function(a){a.addEventListener('click',function(){document.body.classList.remove('menu-open');t.setAttribute('aria-expanded','false')})});}
  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.1});
    els.forEach(function(el){io.observe(el)});
  }else{els.forEach(function(el){el.classList.add('in')})}
  document.querySelectorAll('.portrait img[data-photo]').forEach(function(img){
    var p=img.closest('.portrait');
    var fail=function(){p.classList.add('no-photo')};
    if(img.complete&&img.naturalWidth===0)fail();
    img.addEventListener('error',fail);
  });
})();
