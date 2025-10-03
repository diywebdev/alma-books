// HEADER & SCROLL

let prevScrollpos = window.scrollY;
let $header = document.querySelector('header');
let hideHeaderPos = $header.offsetHeight;
let ww = window.innerWidth;

window.addEventListener('resize', () => {
  hideHeaderPos = $header.clientHeight;
  ww = window.innerWidth;
});

document.querySelectorAll('a[href^="#"]:not(.popup-link)').forEach((link) => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    let href = this.getAttribute('href').substring(1);

    const scrollTarget = document.getElementById(href);

    if (scrollTarget) {
      const topOffset = 0;
      const elementPosition = scrollTarget.getBoundingClientRect().top;
      const offsetPosition = elementPosition - topOffset;

      window.scrollBy({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  });
});

window.addEventListener('scroll', () => {
  var currentScrollPos = window.scrollY;
  if (currentScrollPos > hideHeaderPos) {
    if (prevScrollpos > currentScrollPos) {
      $header.style.top = 0;
    } else {
      $header.style.top = -hideHeaderPos + 'px';
    }
    prevScrollpos = currentScrollPos;
  } else {
    $header.style.top = 0;
  }
  menuBtn.classList.remove('active');
  mobileMenu.classList.remove('active');
});

window.addEventListener('scroll', () => {
  let scrollDistance = window.scrollY;
  document.querySelectorAll('.target-section').forEach((el, i) => {
    if (el.offsetTop <= scrollDistance) {
      document.querySelectorAll('.header__menu--link').forEach((elem) => {
        if (elem.classList.contains('active')) {
          elem.classList.remove('active');
        }
      });

      document
        .querySelectorAll('.header__menu--link')
        [i].classList.add('active');
    }
    if (scrollDistance < 700) {
      document.querySelectorAll('.header__menu--link').forEach((elem) => {
        elem.classList.remove('active');
      });
    }
  });
});
