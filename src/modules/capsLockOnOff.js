export default function capsLockOnOff(event, target, letterCase, language) {
  const activeLanguage = document.querySelectorAll(`.${language}.active`)

    if (event.getModifierState('CapsLock') && !event.getModifierState('Shift')) {
      target.classList.add('active');
      letterCase = 'caps';
      activeLanguage.forEach(el => {
        removeActiveClass(el, 'caseDown', 'capsShift', 'caseUp');
        addActiveClass(el, 'caps');
      })
    } else {
      target.classList.remove('active');
      activeLanguage.forEach(el => {
        addActiveClass(el, 'caseDown');
        removeActiveClass(el, 'caps', 'capsShift', 'caseUp');
      })
      letterCase = 'caseDown';
    }
}