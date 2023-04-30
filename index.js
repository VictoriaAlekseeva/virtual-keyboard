import generateLayout from './src/modules/generateLayout.js';
import setLanguage from './src/modules/setLanguage.js';

let language = 'en';
let letterCase = 'caseDown';
const serviceKeysCodes = ['Backspace', 'Tab', 'CapsLock', 'Enter', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'AltLeft', 'LeftCmd', 'RightCmd', 'AltRight', 'Fn'];

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
  if (language === 'en') {
    language = 'ru';
  } else language = 'en';
  setLanguage(language, letterCase);
}

function toUpperCase(target) {
  if ((letterCase !== ('caps' || 'capsShift')) && (target.classList.contains('ShiftLeft') || target.classList.contains('ShiftRight'))) {
    target.classList.add('active');
    letterCase = 'caseUp';

    caseDown.forEach((el) => {
      el.classList.remove('active');
      el.classList.add('hidden');
    });

    caseUp.forEach((el) => {
      el.classList.add('active');
      el.classList.remove('hidden');
    });
  }
}

function toLowerCase(target) {
  if ((letterCase !== ('caps' || 'capsShift')) && (target.classList.contains('ShiftLeft') || target.classList.contains('ShiftRight'))) {
    target.classList.remove('active');
    letterCase = 'caseDown';

    caseDown.forEach((el) => {
      el.classList.add('active');
      el.classList.remove('hidden');
    });

    caseUp.forEach((el) => {
      el.classList.remove('active');
      el.classList.add('hidden');
    });
  }
}

runOnKeys(changeLanguage, 'AltLeft', 'ControlLeft');

function shiftCapsMouseDown(target) {
  if ((letterCase === 'caps') && (target.classList.contains('ShiftLeft') || target.classList.contains('ShiftRight'))) {
    target.classList.add('active');

    capsShift.forEach((el) => {
      el.classList.add('active');
      el.classList.remove('hidden');
    });
    caps.forEach((el) => {
      el.classList.remove('active');
      el.classList.add('hidden');
    });
    caseUp.forEach((el) => {
      el.classList.remove('active');
      el.classList.add('hidden');
    });
    letterCase = 'capsShift';
  }
}

function shiftCapsMouseUp(target) {
  if ((letterCase === 'capsShift') && (target.classList.contains('ShiftLeft') || target.classList.contains('ShiftRight'))) {
    target.classList.remove('active');

    caps.forEach((el) => {
      el.classList.add('active');
      el.classList.remove('hidden');
    });

    capsShift.forEach((el) => {
      el.classList.remove('active');
      el.classList.add('hidden');
    });

    caseDown.forEach((el) => {
      el.classList.remove('active');
      el.classList.add('hidden');
    });
    letterCase = 'caps';
  }
}

function textType(target, code) {
  if (!serviceKeysCodes.includes(code)) {
    const letter = target.querySelector(`.${language} .active`);
    textAreaText += letter.innerHTML;
    textarea.innerHTML = textAreaText;
  }
}

function capsLockOnOff(event, target) {
  if (event.getModifierState('CapsLock')) {
    target.classList.add('active');
    caseDown.forEach((el) => {
      el.classList.remove('active');
      el.classList.add('hidden');
    });

    caps.forEach((el) => {
      el.classList.add('active');
      el.classList.remove('hidden');
    });
  } else {
    target.classList.remove('active');
    caseDown.forEach((el) => {
      el.classList.add('active');
      el.classList.remove('hidden');
    });

    caps.forEach((el) => {
      el.classList.remove('active');
      el.classList.add('hidden');
    });
  }
}

function capsLockHandler(target) {
  if ((letterCase !== 'capsShift') && (target.classList.contains('CapsLock'))) {
    target.classList.toggle('active');

    letterCase = 'caps';

    if (target.classList.contains('active')) {
      letterCase = 'caps';
      caseDown.forEach((el) => {
        el.classList.remove('active');
        el.classList.add('hidden');
      });

      caps.forEach((el) => {
        el.classList.add('active');
        el.classList.remove('hidden');
      });
    } else if (!target.classList.contains('active')) {
      letterCase = 'caseDown';
      caseDown.forEach((el) => {
        el.classList.add('active');
        el.classList.remove('hidden');
      });

      caps.forEach((el) => {
        el.classList.remove('active');
        el.classList.add('hidden');
      });
    }
  }
}

setLanguage(language, letterCase);

window.addEventListener('keydown', (event) => {
  const target = document.querySelector(`.${event.code}`);
  target.classList.add('active');
  textType(target, event.code);
  capsLockOnOff(event, target);
  toUpperCase(target);
  shiftCapsMouseDown(target);
});

window.addEventListener('keyup', (event) => {
  const target = document.querySelector(`.${event.code}`);
  target.classList.remove('active');
  capsLockOnOff(event, target);
  shiftCapsMouseUp(target);
  toLowerCase(target);
});

keyboard.addEventListener('mousedown', (event) => {
  const target = event.target.closest('div.key');

  if (!target) return;
  if (!keyboard.contains(target)) return;

  capsLockHandler(target);
  toUpperCase(target);
  shiftCapsMouseDown(target);
});

keyboard.addEventListener('mouseup', (event) => {
  const target = event.target.closest('div.key');

  if (!target) return;
  if (!keyboard.contains(target)) return;

  shiftCapsMouseUp(target);
  toLowerCase(target);
});

keyboard.addEventListener('click', (event) => {
  const target = event.target.closest('div.key');

  if (!target) return;
  if (!keyboard.contains(target)) return;

  const letterCode = target.className.split(' ')[1];

  textType(target, letterCode);
});

export {
  enLanguage, ruLanguage,
};
