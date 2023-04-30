export default function toUpperCase(target, letterCase, language) {
  if ((letterCase !== ('caps' || 'capsShift')) && (target.classList.contains('ShiftLeft') || target.classList.contains('ShiftRight'))) {
    target.classList.add('active');
    letterCase = 'caseUp';

    const activeLanguage = document.querySelectorAll(`.${language}.active`)

    activeLanguage.forEach(el => {
      el.querySelector('.caseDown').classList.remove('active');
      el.querySelector('.caseDown').classList.add('hidden');
      el.querySelector('.caseUp').classList.add('active');
      el.querySelector('.caseUp').classList.remove('hidden');
    })
  }
}