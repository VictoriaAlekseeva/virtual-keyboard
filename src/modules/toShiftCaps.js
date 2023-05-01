export default function toShiftCaps(target, letterCase, language) {
  const activeLanguage = document.querySelectorAll(`.${language}.active`);

  if (letterCase === 'caps') {
    target.classList.add('active');

    activeLanguage.forEach((el) => {
      el.querySelector('.caps').classList.remove('active');
      el.querySelector('.caps').classList.add('hidden');
      el.querySelector('.caseUp').classList.remove('active');
      el.querySelector('.caseUp').classList.add('hidden');
      el.querySelector('.caseDown').classList.remove('active');
      el.querySelector('.caseDown').classList.add('hidden');
      el.querySelector('.capsShift').classList.add('active');
      el.querySelector('.capsShift').classList.remove('hidden');
    });
  }

  if (letterCase === 'capsShift') {
    // отпустили шифт
    target.classList.remove('active');

    activeLanguage.forEach((el) => {
      el.querySelector('.capsShift').classList.remove('active');
      el.querySelector('.capsShift').classList.add('hidden');
      el.querySelector('.caseUp').classList.remove('active');
      el.querySelector('.caseUp').classList.add('hidden');
      el.querySelector('.caseDown').classList.remove('active');
      el.querySelector('.caseDown').classList.add('hidden');
      el.querySelector('.caps').classList.add('active');
      el.querySelector('.caps').classList.remove('hidden');
    });
  }
}
