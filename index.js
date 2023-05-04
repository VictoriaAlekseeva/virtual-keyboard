import generateLayout from './src/modules/generateLayout.js';
import toUpperCase from './src/modules/toUpperCase.js';
import toLowerCase from './src/modules/toLowerCase.js';
import capsLockOnOff from './src/modules/capsLockOnOff.js';
import capsLockHandler from './src/modules/capsLockHandler.js';
import toShiftCaps from './src/modules/toShiftCaps.js';

generateLayout();

let language = localStorage.getItem('language');
language = language == null ? 'en' : language;

const serviceKeysCodes = ['CapsLock', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'AltLeft', 'MetaLeft', 'MetaRight', 'AltRight', 'Fn'];

const keyboard = document.querySelector('.keyboard');
const textarea = document.querySelector('.textarea');
const enLanguage = document.querySelectorAll('.en');
const ruLanguage = document.querySelectorAll('.ru');

function setLanguage() {
  let letterCase = 'caseDown';
  if ((document.querySelector('.caseUp.active'))) {
    letterCase = 'caseUp';
  } else if ((document.querySelector('.caps.active'))) {
    letterCase = 'caps';
  } else if ((document.querySelector('.capsShift.active'))) {
    letterCase = 'capsShift';
  }

  if (language === 'en') {
    enLanguage.forEach((el) => {
      el.classList.remove('hidden');
      el.classList.add('active');
      el.querySelector(`.${letterCase}`).classList.add('active');
      el.querySelector(`.${letterCase}`).classList.remove('hidden');
    });
    ruLanguage.forEach((el) => {
      el.classList.add('hidden');
      el.classList.remove('active');
      el.querySelector(`.${letterCase}`).classList.add('hidden');
      el.querySelector(`.${letterCase}`).classList.remove('active');
    });
  } else if (language === 'ru') {
    ruLanguage.forEach((el) => {
      el.classList.remove('hidden');
      el.classList.add('active');
      el.querySelector(`.${letterCase}`).classList.add('active');
      el.querySelector(`.${letterCase}`).classList.remove('hidden');
    });
    enLanguage.forEach((el) => {
      el.classList.add('hidden');
      el.classList.remove('active');
      el.querySelector(`.${letterCase}`).classList.add('hidden');
      el.querySelector(`.${letterCase}`).classList.remove('active');
    });
  }
}

function runOnKeys(func, ...codes) {
  const pressed = new Set();

  document.addEventListener('keydown', (event) => {
    pressed.add(event.code);

    for (let i = 0; i < codes.length; i += 1) {
      if (!pressed.has(codes[i])) {
        return;
      }
    }

    pressed.clear();

    func();
  });

  document.addEventListener('keyup', (event) => {
    pressed.delete(event.code);
  });
}

setLanguage();

function changeLanguage() {
  language = language === 'ru' ? 'en' : 'ru';
  localStorage.setItem('language', language);
  setLanguage();
}

runOnKeys(changeLanguage, 'AltLeft', 'ControlLeft');

function textType(target, event) {
  if (serviceKeysCodes.includes(target.classList[1])) return;
  if (((event.type === 'keydown') || (event.type === 'mousedown'))) {
    const letter = target.querySelector(`.${language}.active .active`);
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const { value } = textarea;

    switch (event.key) {
      case '>':
        textarea.value = `${value.slice(0, start)}>${value.slice(end, value.length)}`;
        textarea.selectionStart = start + 1;
        textarea.selectionEnd = end + 1;
        break;
      case '<':
        textarea.value = `${value.slice(0, start)}<${value.slice(end, value.length)}`;
        textarea.selectionStart = start + 1;
        textarea.selectionEnd = end + 1;
        break;
      case '&':
        textarea.value = `${value.slice(0, start)}&${value.slice(end, value.length)}`;
        textarea.selectionStart = start + 1;
        textarea.selectionEnd = end + 1;
        break;
      case 'Tab':
        textarea.value = `${value.slice(0, start)}\t${value.slice(end, value.length)}`;
        textarea.selectionStart = start + 1;
        textarea.selectionEnd = end + 1;
        break;
      case 'Enter':
        textarea.value = `${value.slice(0, start)}\n${value.slice(end, value.length)}`;
        textarea.selectionStart = start + 1;
        textarea.selectionEnd = end + 1;
        break;
      case 'Backspace':
        if (start === 0) break;
        textarea.value = `${value.slice(0, start - 1)}${value.slice(end, value.length)}`;
        textarea.selectionStart = start;
        textarea.selectionEnd = end - 1;
        break;
      default:
        textarea.value = `${value.slice(0, start)}${letter.innerHTML}${value.slice(end, value.length)}`;
        textarea.selectionStart = start + 1;
        textarea.selectionEnd = end + 1;
    }

    if (!event.key) {
      switch (letter.textContent) {
        case '>':
        textarea.value = `${value.slice(0, start)}>${value.slice(end, value.length)}`;
        textarea.selectionStart = start + 1;
        textarea.selectionEnd = end + 1;
        break;
      case '<':
        textarea.value = `${value.slice(0, start)}<${value.slice(end, value.length)}`;
        textarea.selectionStart = start + 1;
        textarea.selectionEnd = end + 1;
        break;
      case '&':
        textarea.value = `${value.slice(0, start)}&${value.slice(end, value.length)}`.replace(/&amp;/g, '&');
        textarea.selectionStart = start + 1;
        textarea.selectionEnd = end + 1;
        console.log('!!!')
        break;
      default:
        textarea.value = `${value.slice(0, start)}${letter.innerHTML}${value.slice(end, value.length)}`;
        textarea.selectionStart = start + 1;
        textarea.selectionEnd = end + 1;
      }
    }
  }
}

window.addEventListener('keydown', (event) => {
  event.preventDefault();
  const target = document.querySelector(`.${event.code}`);

  target.classList.add('active');

  capsLockOnOff(event, target, language);

  if ((!document.querySelector('.key.CapsLock.active')) && (event.getModifierState('Shift') && (!document.querySelector('.key.CapsLock.active')))) {
    toUpperCase(target, language);
  }

  if (document.querySelector('.key.CapsLock.active') && (target.classList.contains('ShiftLeft') || target.classList.contains('ShiftRight'))) {
    toShiftCaps(target, event, language);
  }
  if (document.querySelector('.key.caseUp.active') && (target.classList.contains('CapsLock'))) {
    toShiftCaps(target, event, language);
  }

  textType(target, event);
});

window.addEventListener('keyup', (event) => {
  const target = document.querySelector(`.${event.code}`);

  target.classList.remove('active');

  capsLockOnOff(event, target, language);

  if ((!document.querySelector('.key.CapsLock.active')) && (target.classList.contains('ShiftLeft') || target.classList.contains('ShiftRight'))) {
    toLowerCase(target, language);
  }

  if (document.querySelector('.key.CapsLock.active') && (target.classList.contains('ShiftLeft') || target.classList.contains('ShiftRight'))) {
    toShiftCaps(target, event, language);
  }

  if (document.querySelector('.key.caseUp.active') && (target.classList.contains('CapsLock'))) {
    toShiftCaps(target, event, language);
  }
  textType(target, event);
});

keyboard.addEventListener('mousedown', (event) => {
  const target = event.target.closest('div.key');

  if (!target) return;
  if (!keyboard.contains(target)) return;
  if (target.classList.contains('CapsLock')) return;

  target.classList.add('active');

  if ((!document.querySelector('.key.CapsLock.active')) && (target.classList.contains('ShiftLeft') || target.classList.contains('ShiftRight'))) {
    toUpperCase(target, language);
  }

  if (document.querySelector('.key.CapsLock.active') && (target.classList.contains('ShiftLeft') || target.classList.contains('ShiftRight'))) {
    toShiftCaps(target, event, language);
  }
  if (document.querySelector('.key.caseUp.active') && (target.classList.contains('CapsLock'))) {
    toShiftCaps(target, event, language);
  }

  textType(target, event);
});

keyboard.addEventListener('mouseup', (event) => {
  const target = event.target.closest('div.key');

  if (!target) return;
  if (!keyboard.contains(target)) return;
  if (target.classList.contains('CapsLock')) return;

  target.classList.remove('active');

  if ((!document.querySelector('.key.CapsLock.active')) && (target.classList.contains('ShiftLeft') || target.classList.contains('ShiftRight'))) {
    toLowerCase(target, language);
  }

  if (document.querySelector('.key.CapsLock.active') && (target.classList.contains('ShiftLeft') || target.classList.contains('ShiftRight'))) {
    toShiftCaps(target, event, language);
  }
  if (document.querySelector('.key.caseUp.active') && (target.classList.contains('CapsLock'))) {
    toShiftCaps(target, event, language);
  }

  textType(target, event);
});

keyboard.addEventListener('click', (event) => {
  const target = event.target.closest('div.key');

  if (!target) return;
  if (!keyboard.contains(target)) return;

  if (target.classList.contains('CapsLock')) {
    capsLockHandler(target, language);
  }
});

export {
  enLanguage, ruLanguage,
};
