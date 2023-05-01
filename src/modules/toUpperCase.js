import addActiveClass from './addActiveClass.js';
import removeActiveClass from './removeActiveClass.js'

export default function toUpperCase(target, letterCase, language) {

  // if ((target.classList.contains('ShiftLeft') || target.classList.contains('ShiftRight'))) {
    target.classList.add('active');
    // letterCase = 'caseUp';

    const activeLanguage = document.querySelectorAll(`.${language}.active`)

    activeLanguage.forEach(el => {
      addActiveClass(el, 'caseUp');
      removeActiveClass(el, 'caseDown', 'capsShift', 'caps');

    })
  // }
}