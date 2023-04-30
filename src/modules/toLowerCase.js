export default function toLowerCase(target, letterCase, language) {
  if ((letterCase !== ('caps' || 'capsShift')) && (target.classList.contains('ShiftLeft') || target.classList.contains('ShiftRight'))) {
    target.classList.remove('active');
    letterCase = 'caseDown';

    const activeLanguage = document.querySelectorAll(`.${language}.active`)

    activeLanguage.forEach(el => {
      el.querySelector('.caseDown').classList.add('active');
      el.querySelector('.caseDown').classList.remove('hidden');
      el.querySelector('.caseUp').classList.remove('active');
      el.querySelector('.caseUp').classList.add('hidden');
    })
  }
}