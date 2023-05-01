export default function removeActiveClass(element, ...classNames) {
  for (let className of classNames) {
    element.querySelector(`.${className}`).classList.remove('active');
    element.querySelector(`.${className}`).classList.add('hidden');
  }
}