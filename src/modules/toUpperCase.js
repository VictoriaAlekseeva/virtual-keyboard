import addActiveClass from './addActiveClass.js';
import removeActiveClass from './removeActiveClass.js';

export default function toUpperCase(target, letterCase, language) {
  target.classList.add('active');

  const activeLanguage = document.querySelectorAll(`.${language}.active`);

  activeLanguage.forEach((el) => {
    addActiveClass(el, 'caseUp');
    removeActiveClass(el, 'caseDown', 'capsShift', 'caps');
  });
}
