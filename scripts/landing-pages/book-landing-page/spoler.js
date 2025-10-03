// SPOLER

const spolerItems = this.document.querySelectorAll('.content-item');
if (spolerItems.length) {
  spolerItems.forEach((item) => {
    const list = item.querySelector('.content-item__list');
    item
      .querySelector('.content-item__title')
      .addEventListener('click', (e) => {
        window.getComputedStyle(list).display == 'none'
          ? (list.style.display = 'block')
          : (list.style.display = 'none');
      });
    item.querySelector('.close-content-list').addEventListener('click', (e) => {
      list.style.display = 'none';
    });
  });
}
