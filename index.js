import { generateLayout } from './src/modules/generateLayout.js';
import { setLanguage } from './src/modules/setLanguage.js';

let language = 'en';
let letterCase = 'caseDown';
const serviceKeysCodes = ['Backspace', 'Tab', 'CapsLock', 'Enter', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'AltLeft', 'LeftCmd', 'RightCmd', 'AltRight', 'Fn'];

generateLayout();

window.onload = (event) => {
// console.log("getModifierState('CapsLock')", event.getModifierState('CapsLock'));
// console.log("getModifierState('Shift')", event.getModifierState('Shift'));
}

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
  let pressed = new Set();

  document.addEventListener('keydown', function(event) {
    console.log(event.code, language);
    pressed.add(event.code);

    for (let code of codes) {
      if (!pressed.has(code)) {
        return;
      }
    }

    pressed.clear();

    func();
  });

  document.addEventListener('keyup', function(event) {
    pressed.delete(event.code);
  });
}

runOnKeys(changeLanguage, 'AltLeft', 'ControlLeft');

function changeLanguage() {
  language === 'en' ? language = 'ru' : language = 'en';
  setLanguage(language);
}

setLanguage(language);

window.addEventListener('keydown', function(event) {
  console.log(event.code, event);
  let target = document.querySelector(`.${event.code}`);
  target.classList.add('active');
  textType(target, event.code);
  console.log(letterCase);
  // capsLockHandler(target);
  capsLockOnOff(event, target);
  toUpperCase(target);
  shiftCapsMouseDown(target);
  console.log("getModifierState('CapsLock')", event.getModifierState('CapsLock'))
  console.log("getModifierState('Shift')", event.getModifierState('Shift'))
})

window.addEventListener('keyup', function(event) {
  console.log(event.code);
  let target = document.querySelector(`.${event.code}`);
  target.classList.remove('active');
  // capsLockHandler(target);
  capsLockOnOff(event, target);
  shiftCapsMouseUp(target);
  toLowerCase(target);
  console.log("getModifierState('CapsLock')", event.getModifierState('CapsLock'));
  console.log("getModifierState('Shift')", event.getModifierState('Shift'));
})


function capsLockOnOff(event, target) {
  // let target = document.querySelector(`.${event.code}`);

  if (event.getModifierState('CapsLock')) {
    target.classList.add('active');
    caseDown.forEach(el => {
      el.classList.remove('active');
      el.classList.add('hidden');
    });

    caps.forEach(el => {
      el.classList.add('active');
      el.classList.remove('hidden');
    })
  } else {
    target.classList.remove('active');
    caseDown.forEach(el => {
      el.classList.add('active');
      el.classList.remove('hidden');
    });

    caps.forEach(el => {
      el.classList.remove('active')
      el.classList.add('hidden');
    });
  }
}

function capsLockHandler(target) {
  if ((letterCase !== 'capsShift') && (target.classList.contains('CapsLock'))) {
    target.classList.toggle('active');

    // event.getModifierState('CapsLock') = true;

    if (target.classList.contains('active')) {
      letterCase = 'caps';
      caseDown.forEach(el => {
        el.classList.remove('active');
        el.classList.add('hidden');
      });

      caps.forEach(el => {
        el.classList.add('active');
        el.classList.remove('hidden');
      })
    } else if (!target.classList.contains('active')) {
        letterCase = 'caseDown';
        // event.getModifierState('CapsLock') = false;

        caseDown.forEach(el => {
        el.classList.add('active');
        el.classList.remove('hidden');
      });

      caps.forEach(el => {
        el.classList.remove('active')
        el.classList.add('hidden');
      });
    }
  }
}

keyboard.addEventListener('mousedown', function(event) {
  const target = event.target.closest('div.key');
  console.log(target, letterCase);

  if (!target) return;
  if (!keyboard.contains(target)) return;

  capsLockHandler(target);
  toUpperCase(target);
  shiftCapsMouseDown(target);
})

keyboard.addEventListener('mouseup', function (event) {
  const target = event.target.closest('div.key');
  console.log(target, letterCase);

  if (!target) return;
  if (!keyboard.contains(target)) return;

  shiftCapsMouseUp(target);
  toLowerCase(target);
})

keyboard.addEventListener('click', function(event){
  const target = event.target.closest('div.key');

  if (!target) return;
  if (!keyboard.contains(target)) return;

  const letterCode = target.className.split(' ')[1];

  textType(target, letterCode);
});

function toUpperCase(target) {
  if ((letterCase !== ('caps' || 'capsShift')) && (target.classList.contains('ShiftLeft') || target.classList.contains('ShiftRight'))) {
    target.classList.add('active');
    letterCase = 'caseUp';

      caseDown.forEach(el => {
          el.classList.remove('active');
          el.classList.add('hidden');
      });

      caseUp.forEach(el => {
        el.classList.add('active');
        el.classList.remove('hidden');
      });
  }
}

function toLowerCase(target) {
  if ((letterCase !== ('caps' || 'capsShift')) && (target.classList.contains('ShiftLeft') || target.classList.contains('ShiftRight'))) {
    target.classList.remove('active');
    letterCase = 'caseDown';

      caseDown.forEach(el => {
        el.classList.add('active');
        el.classList.remove('hidden');
      });

      caseUp.forEach(el => {
        el.classList.remove('active');
        el.classList.add('hidden');
      });
    }
}

function shiftCapsMouseDown(target) {
  if ((letterCase == 'caps') && (target.classList.contains('ShiftLeft') || target.classList.contains('ShiftRight'))) {
    target.classList.add('active');

    capsShift.forEach(el => {
      el.classList.add('active');
      el.classList.remove('hidden');
    });
    caps.forEach(el => {
      el.classList.remove('active');
      el.classList.add('hidden');
    });
    caseUp.forEach(el => {
      el.classList.remove('active');
      el.classList.add('hidden');
    });
    letterCase = 'capsShift';
  }
}

function shiftCapsMouseUp(target) {
  if ((letterCase == 'capsShift') && (target.classList.contains('ShiftLeft') || target.classList.contains('ShiftRight'))) {
    target.classList.remove('active');

    caps.forEach(el => {
      el.classList.add('active');
      el.classList.remove('hidden');
    });

    capsShift.forEach(el => {
      el.classList.remove('active');
      el.classList.add('hidden');
    });

    caseDown.forEach(el => {
      el.classList.remove('active');
      el.classList.add('hidden');
    });
    letterCase = 'caps';
  };
}

function textType(target, code) {
  if (!serviceKeysCodes.includes(code)) {
    const letter = target.querySelector(`.${language} .active`);
    // console.log(code, target)
    textAreaText += letter.innerHTML;
    textarea.innerHTML = textAreaText;
  }
}



export { language, letterCase, enLanguage, ruLanguage }