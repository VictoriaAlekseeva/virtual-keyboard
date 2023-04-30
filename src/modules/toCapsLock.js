export default function capsLockOnOff(event, target, letterCase, language) {
  const activeLanguage = document.querySelectorAll(`.${language}.active`)

    if (event.getModifierState('CapsLock') && !event.getModifierState('Shift')) {
      target.classList.add('active');
      letterCase = 'caps';
      activeLanguage.forEach(el => {
        el.querySelector('.caseDown').classList.remove('active');
        el.querySelector('.caseDown').classList.add('hidden');
        el.querySelector('.caseUp').classList.remove('active');
        el.querySelector('.caseUp').classList.add('hidden');
        el.querySelector('.capsShift').classList.remove('active');
        el.querySelector('.capsShift').classList.add('hidden');
        el.querySelector('.caps').classList.add('active');
        el.querySelector('.caps').classList.remove('hidden');
      })
    } else {
      target.classList.remove('active');
      activeLanguage.forEach(el => {
        el.querySelector('.caseDown').classList.add('active');
        el.querySelector('.caseDown').classList.remove('hidden');
        el.querySelector('.caseUp').classList.remove('active');
        el.querySelector('.caseUp').classList.add('hidden');
        el.querySelector('.caps').classList.remove('active');
        el.querySelector('.caps').classList.add('hidden');
        el.querySelector('.capsShift').classList.remove('active');
        el.querySelector('.capsShift').classList.add('hidden');
      })
    }
}