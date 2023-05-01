export default function addActiveClass(element, className) {
  element.querySelector(`.${className}`).classList.add('active');
  element.querySelector(`.${className}`).classList.remove('hidden');
}