import addActiveClass from './addActiveClass.js';
import removeActiveClass from './removeActiveClass.js';

export default function toLowerCase(target, letterCase, language) {
  if ((target.classList.contains('ShiftLeft') || target.classList.contains('ShiftRight'))) {
    target.classList.remove('active');

    const activeLanguage = document.querySelectorAll(`.${language}.active`);

    activeLanguage.forEach((el) => {
      removeActiveClass(el, 'caseUp', 'capsShift', 'caps');
      addActiveClass(el, 'caseDown');
    });
  }
}
