export default function capsLockHandler(target, letterCase, language) {
  const activeLanguage = document.querySelectorAll(`.${language}.active`);

  if ((letterCase !== 'capsShift') && (target.classList.contains('CapsLock'))) {
    target.classList.toggle('active');

    if (target.classList.contains('active')) {
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
    } else if (!target.classList.contains('active')) {
      letterCase = 'caseDown';
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
}