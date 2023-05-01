import addActiveClass from './addActiveClass.js';
import removeActiveClass from './removeActiveClass.js'

export default function capsLockHandler(target, letterCase, language) {
  const activeLanguage = document.querySelectorAll(`.${language}.active`);

    if (!target.classList.contains('active')) {
      target.classList.add('active');
      activeLanguage.forEach(el => {
        addActiveClass(el, 'caps');
        removeActiveClass(el,'caseUp', 'capsShift', 'caseDown')
      })
    } else if (target.classList.contains('active')) {
      target.classList.remove('active');
      activeLanguage.forEach(el => {
      addActiveClass(el, 'caseDown');
      removeActiveClass(el,'caseUp', 'capsShift', 'caps')
      })
    }
}