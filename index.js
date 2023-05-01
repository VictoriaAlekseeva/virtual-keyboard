import generateLayout from './src/modules/generateLayout.js';

import toUpperCase from './src/modules/toUpperCase.js';
import toLowerCase from './src/modules/toLowerCase.js';
import capsLockOnOff from './src/modules/capsLockOnOff.js';
import capsLockHandler from './src/modules/capsLockHandler.js';
import toShiftCaps from './src/modules/toShiftCaps.js';

let language = localStorage.getItem('language');
language = language == null ? 'en' : language;

let letterCase = 'caseDown';

const serviceKeysCodes = ['Backspace', 'CapsLock', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'AltLeft', 'MetaLeft', 'MetaRight', 'AltRight', 'Fn'];

generateLayout();

const keyboard = document.querySelector('.keyboard');
const textarea = document.querySelector('.textarea');
const enLanguage = document.querySelectorAll('.en');
const ruLanguage = document.querySelectorAll('.ru');

let textAreaText = '';

function setLanguage() {
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

function changeLanguage() {
  language = language === 'ru' ? 'en' : 'ru';
  localStorage.setItem('language', language);
  setLanguage();
}

runOnKeys(changeLanguage, 'AltLeft', 'ControlLeft');

function textType(target, event) {
  if (serviceKeysCodes.includes(target.classList[1])) return;
  if (((event.type === 'keydown') || (event.type === 'mousedown'))) {
    let letter = target.querySelector(`.${language}.active .active`);

    switch (target.classList[1]) {
      case 'Tab':
        letter = '';
        textAreaText += '\t';
        break;
      case 'Enter':
        letter = '';
        textAreaText += '\n';
        break;
      default:
        textAreaText += letter.innerHTML;
        textarea.value = textAreaText;
    }
  }
}

setLanguage();

window.addEventListener('keydown', (event) => {
  event.preventDefault();
  const target = document.querySelector(`.${event.code}`);

  target.classList.add('active');

  capsLockOnOff(event, target, letterCase, language);

  toShiftCaps(target, letterCase, language, event);

  if (event.getModifierState('Shift') && (!document.querySelector('.key.CapsLock.active'))) {
    toUpperCase(target, letterCase, language);
    letterCase = 'caseUp';
  }

  textType(target, event);
});

window.addEventListener('keyup', (event) => {
  const target = document.querySelector(`.${event.code}`);

  target.classList.remove('active');

  capsLockOnOff(event, target, letterCase, language);

  if (target.classList.contains('ShiftLeft') || target.classList.contains('ShiftRight')) {
    toLowerCase(target, letterCase, language);
  }
  textType(target, event);
});

keyboard.addEventListener('mousedown', (event) => {
  const target = event.target.closest('div.key');

  if (!target) return;
  if (!keyboard.contains(target)) return;
  if (target.classList.contains('CapsLock')) return;

  target.classList.add('active');

  if (target.classList.contains('ShiftLeft') || target.classList.contains('ShiftRight')) {
    toUpperCase(target, letterCase, language);
    letterCase = 'caseUp';
  }

  textType(target, event);
});

keyboard.addEventListener('mouseup', (event) => {
  const target = event.target.closest('div.key');

  if (!target) return;
  if (!keyboard.contains(target)) return;
  if (target.classList.contains('CapsLock')) return;

  target.classList.remove('active');

  if (target.classList.contains('ShiftLeft') || target.classList.contains('ShiftRight')) {
    toLowerCase(target, letterCase, language);
    letterCase = 'caseDown';
  }
  textType(target, event);
});

keyboard.addEventListener('click', (event) => {
  const target = event.target.closest('div.key');

  if (!target) return;
  if (!keyboard.contains(target)) return;

  if (target.classList.contains('CapsLock')) {
    capsLockHandler(target, letterCase, language);
    letterCase = 'caps';
  }
});

export {
  enLanguage, ruLanguage,
};
