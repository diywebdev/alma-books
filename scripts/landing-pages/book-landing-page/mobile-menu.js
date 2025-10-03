// Mobile Menu
const menuBtn = document.querySelector('.menu__btn');
const mobileMenu = document.querySelector('.header__menu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', function (e) {
    e.preventDefault();
    this.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });
}
