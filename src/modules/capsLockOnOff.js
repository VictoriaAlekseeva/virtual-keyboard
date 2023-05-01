import addActiveClass from './addActiveClass.js';
import removeActiveClass from './removeActiveClass.js'

export default function capsLockOnOff(event, target, letterCase, language) {
  const activeLanguage = document.querySelectorAll(`.${language}.active`)

    if (event.getModifierState('CapsLock') && !event.getModifierState('Shift')) {
      document.querySelector('.CapsLock').classList.add('active');
      // letterCase = 'caps';
      activeLanguage.forEach(el => {
        removeActiveClass(el, 'caseDown', 'capsShift', 'caseUp');
        addActiveClass(el, 'caps');
      })
    } else if (!event.getModifierState('CapsLock')){
      document.querySelector('.CapsLock').classList.remove('active');
      activeLanguage.forEach(el => {
        addActiveClass(el, 'caseDown');
        removeActiveClass(el, 'caps', 'capsShift', 'caseUp');
      })
      // letterCase = 'caseDown';
    }
}