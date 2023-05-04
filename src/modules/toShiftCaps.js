export default function toShiftCaps(target, event, language) {
  const activeLanguage = document.querySelectorAll(`.${language}.active`);

  if (document.querySelector('.key.CapsLock.active') && ((event.type === 'mousedown') || (event.type === 'keydown'))) {
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

  if (document.querySelector('.key.CapsLock.active') && document.querySelector('.capsShift.active') && ((event.type === 'mouseup') || (event.type === 'keyup'))) {
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
