export default function removeActiveClass(element, ...classNames) {
  classNames.forEach((className) => {
    element.querySelector(`.${className}`).classList.remove('active');
    element.querySelector(`.${className}`).classList.add('hidden');
  });
}
