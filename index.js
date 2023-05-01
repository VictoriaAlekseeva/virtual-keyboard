import generateLayout from './src/modules/generateLayout.js';
import setLanguage from './src/modules/setLanguage.js';

import toUpperCase from './src/modules/toUpperCase.js';
import toLowerCase from './src/modules/toLowerCase.js';
import capsLockOnOff from './src/modules/capsLockOnOff.js';
import capsLockHandler from './src/modules/capsLockHandler.js';
import toShiftCaps from './src/modules/toShiftCaps.js';

let language = localStorage.getItem('language');
language = language == null ? 'en' : language;
console.log(language);

let letterCase = 'caseDown';

// const serviceKeysCodes = ['Backspace', 'Tab', 'CapsLock', 'Enter', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'AltLeft', 'MetaLeft', 'MetaRight', 'AltRight', 'Fn'];
const serviceKeysCodes = ['Backspace', 'CapsLock', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'AltLeft', 'MetaLeft', 'MetaRight', 'AltRight', 'Fn'];

generateLayout();

const keyboard = document.querySelector('.keyboard');
const textarea = document.querySelector('.textarea');
const enLanguage = document.querySelectorAll('.en');
const ruLanguage = document.querySelectorAll('.ru');
const caseDown = document.querySelectorAll('.caseDown');
const caseUp = document.querySelectorAll('.caseUp');
const caps = document.querySelectorAll('.caps');
const capsShift = document.querySelectorAll('.capsShift');

let textAreaText = '';

function runOnKeys(func, ...codes) {
  const pressed = new Set();

  document.addEventListener('keydown', (event) => {
    pressed.add(event.code);

    for (const code of codes) {
      if (!pressed.has(code)) {
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
  language = language === 'ru' ? 'en' : 'ru'
  localStorage.setItem('language', language);
  setLanguage(language, letterCase);
}

runOnKeys(changeLanguage, 'AltLeft', 'ControlLeft');

function textType(target, event) {
  if (serviceKeysCodes.includes(target.classList[1])) return;
  if (((event.type === 'keydown') || (event.type === 'mousedown'))) {
    target.classList.add('active');
    let letter = target.querySelector(`.${language}.active .active`);

    console.log(target.classList[1])
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
        textarea.innerHTML = textAreaText;
    }

    console.log(letter, event)

  } else if ((event.type === 'keyup') || (event.type === 'mouseup')) {
    target.classList.remove('active')
  }

}

setLanguage(language, letterCase);

window.addEventListener('keydown', (event) => {
  event.preventDefault();
  const target = document.querySelector(`.${event.code}`);
  target.classList.add('active');
  // console.log(target);
  console.log(event)
  capsLockOnOff(event, target, letterCase, language);

  if (event.getModifierState('Shift')) {
    toUpperCase(target, letterCase, language);
  }
  textType(target, event)
  console.log(letterCase);
});

window.addEventListener('keyup', (event) => {
  const target = document.querySelector(`.${event.code}`);
  target.classList.remove('active');
  console.log(letterCase)
  console.log(target)
  capsLockOnOff(event, target, letterCase, language);
  // capsLockOnOff(event, target, letterCase, language);

  if (target.classList.contains('ShiftLeft') || target.classList.contains('ShiftRight')) {
    toLowerCase(target, letterCase, language);
  }
  textType(target, event)
});

keyboard.addEventListener('mousedown', (event) => {
  const target = event.target.closest('div.key');
  if (target.classList.contains('CapsLock')) return
  target.classList.add('active');

  if (!target) return;
  if (!keyboard.contains(target)) return;

  if (target.classList.contains('ShiftLeft') || target.classList.contains('ShiftRight')) {
    toUpperCase(target, letterCase, language);
  }
  textType(target, event)

});

keyboard.addEventListener('mouseup', (event) => {
  const target = event.target.closest('div.key');
  target.classList.remove('active');
  
  if (target.classList.contains('CapsLock')) return

  if (!target) return;
  if (!keyboard.contains(target)) return;
  if (target.classList.contains('ShiftLeft') || target.classList.contains('ShiftRight')) {
    toLowerCase(target, letterCase, language);
  }
  textType(target, event)
});

keyboard.addEventListener('click', (event) => {
  const target = event.target.closest('div.key');

  if (!target) return;
  if (!keyboard.contains(target)) return;

  if (target.classList.contains('CapsLock')) {
    capsLockHandler(target, letterCase, language);
  }
});

export {
  enLanguage, ruLanguage,
};
