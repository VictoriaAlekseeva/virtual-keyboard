import addActiveClass from './addActiveClass.js';
import removeActiveClass from './removeActiveClass.js'


export default function toUpperCase(target, letterCase, language) {

  if ((letterCase !== 'caps') || (letterCase !=='capsShift')) {
    target.classList.add('active');
    letterCase = 'caseUp';

    const activeLanguage = document.querySelectorAll(`.${language}.active`)

    activeLanguage.forEach(el => {
      removeActiveClass(el, 'caseDown', 'capsShift', 'caps');
      addActiveClass(el, 'caseUp');
    })
  }
}