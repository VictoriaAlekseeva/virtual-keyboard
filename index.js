import { generateLayout } from './src/modules/generateLayout.js';

// window.onload = function() {
//   generateLayout();
// }

let language = 'EN';

let letterCase = 'caseDown';

generateLayout();

const keyboard = document.querySelector('.keyboard');
const textarea = document.querySelector('.textarea');
const enLanguage = document.querySelectorAll('.en');
const ruLanguage = document.querySelectorAll('.ru');

function setLanguage(language) {
  if (language === 'EN') {
    enLanguage.forEach(el => {
      el.classList.remove('hidden');
      el.classList.add('active');
      el.querySelector(`.${letterCase}`).classList.add('active');
      el.querySelector(`.${letterCase}`).classList.remove('hidden');
    })
    ruLanguage.forEach(el => {
      el.classList.add('hidden');
      el.classList.remove('active');
      el.querySelector(`.${letterCase}`).classList.add('hidden');
      el.querySelector(`.${letterCase}`).classList.remove('active');
    })} else if (language === 'RU') {
    ruLanguage.forEach(el => {
      el.classList.remove('hidden');
      el.classList.add('active');
      el.querySelector(`.${letterCase}`).classList.add('active');
      el.querySelector(`.${letterCase}`).classList.remove('hidden');
    })
    enLanguage.forEach(el => {
      el.classList.add('hidden');
      el.classList.remove('active');
      el.querySelector(`.${letterCase}`).classList.add('hidden');
      el.querySelector(`.${letterCase}`).classList.remove('active');
    })
  }
}

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
  language === 'EN' ? language = 'RU' : language = 'EN';
  setLanguage(language);
}

setLanguage(language);

window.addEventListener('keydown', function(event) {
  console.log(event.code);
  document.querySelector(`.${event.code}`).classList.add('active');
})

window.addEventListener('keyup', function(event) {
  console.log(event.code);
  document.querySelector(`.${event.code}`).classList.remove('active');
})

let textAreaText = '';

const caseDown = document.querySelectorAll('.caseDown');
const caseUp = document.querySelectorAll('.caseUp');
const caps = document.querySelectorAll('.caps');
const capsShift = document.querySelectorAll('.capsShift');

function capsLockHandler(target) {
  if ((letterCase !== 'capsShift') && (target.classList.contains('CapsLock'))) {
    target.classList.toggle('active');

    if (target.classList.contains('active')) {
      letterCase = 'caps';
      caseDown.forEach(el => {
        el.classList.remove('active');
        el.classList.add('hidden');
      });

      // caseUp.forEach(el => {
      //   el.classList.remove('active');
      //   el.classList.add('hidden');
      // });

      // capsShift.forEach(el => {
      //   el.classList.remove('active');
      //   el.classList.add('hidden');
      // });

      caps.forEach(el => {
        el.classList.add('active');
        el.classList.remove('hidden');
      })
    } else if (!target.classList.contains('active')) {
        letterCase = 'caseDown';

        caseDown.forEach(el => {
        el.classList.add('active');
        el.classList.remove('hidden');
      });

      // caseUp.forEach(el => {
      //   el.classList.add('hidden');
      // });

      // capsShift.forEach(el => {
      //   el.classList.add('hidden');
      // });

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
  textAreaText += keyboardEnKeys[letterCode];
  textarea.innerHTML = textAreaText;
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