import { generateLayout } from './src/modules/generateLayout.js';

window.onload = function() {
  generateLayout();
}

const keyboard = document.querySelector('.keyboard');
const textarea = document.querySelector('.textarea');

let textAreaText = '';

const caseDown = document.querySelectorAll('.caseDown');
const caseUp = document.querySelectorAll('.caseUp');
const caps = document.querySelectorAll('.caps');
const capsShift = document.querySelectorAll('.capsShift');

keyboard.addEventListener('click', function(event){
  const target = event.target.closest('div.key');
  console.log(target);

  if (!target) return;
  if (!keyboard.contains(target)) return;

  // регистр с капсом
  capsLockHandler(target);

  const letterCode = target.className.split(' ')[1];
  textAreaText += keyboardEnKeys[letterCode];
  textarea.innerHTML = textAreaText;
})

function capsLockHandler(target)   {
  if (target.classList.contains('CapsLock')) {
    target.classList.toggle('active');

    if (target.classList.contains('active')) {
      caseDown.forEach(el => {
        el.classList.remove('active');
        el.classList.add('hidden');
      });

      caseUp.forEach(el => {
        el.classList.remove('active');
        el.classList.add('hidden');
      });

      capsShift.forEach(el => {
        el.classList.remove('active');
        el.classList.add('hidden');
      });

      caps.forEach(el => {
        el.classList.remove('hidden');
        el.classList.add('active');
      });} else {
      caseDown.forEach(el => {
        el.classList.add('active');
        el.classList.remove('hidden');
      });

      caseUp.forEach(el => {
        el.classList.add('hidden');
      });

      capsShift.forEach(el => {
        el.classList.add('hidden');
      });

      caps.forEach(el => {
        el.classList.add('hidden');
      });
    }
  }
}

keyboard.addEventListener('mousedown', function (event) {
  const target = event.target.closest('div.key');
  toUpperCase(target)
})

keyboard.addEventListener('mouseup', function (event) {
  const target = event.target.closest('div.key');
  toLowerCase(target)
})

// keyboard.addEventListener('mouseup', function(event){

// });

document.addEventListener('keydown', function(event){
  console.log(event)
});

// document.addEventListener('keyup', function(event){

// });

function toUpperCase(target) {
  if (target.classList.contains('ShiftLeft') || target.classList.contains('ShiftRight')) {
    target.classList.add('active');

    if (target.classList.contains('active')) {
      caseDown.forEach(el => {
          el.classList.remove('active');
          el.classList.add('hidden');
      });

      caseUp.forEach(el => {
        el.classList.remove('active');
        el.classList.add('hidden');
      });

      capsShift.forEach(el => {
        el.classList.remove('active');
        el.classList.add('hidden');
    });

      caseUp.forEach(el => {
        el.classList.remove('hidden');
        el.classList.add('active');
    });
    } else {
      caseUp.forEach(el => {
        el.classList.add('active');
        el.classList.remove('hidden');
    });

    caseUp.forEach(el => {
      el.classList.add('hidden');
    });

    capsShift.forEach(el => {
      el.classList.add('hidden');
    });

    caps.forEach(el => {
      el.classList.add('hidden');
    });
    }
  }
}

function toLowerCase(target) {
  if (target.classList.contains('ShiftLeft') || target.classList.contains('ShiftRight')) {
    target.classList.remove('active');

    if (!target.classList.contains('active')) {
      caseDown.forEach(el => {
        el.classList.add('active');
        el.classList.remove('hidden');
      });

      caseUp.forEach(el => {
        el.classList.remove('active');
        el.classList.add('hidden');
      });

      capsShift.forEach(el => {
        el.classList.remove('active');
        el.classList.add('hidden');
    });

      caseUp.forEach(el => {
        el.classList.add('hidden');
        el.classList.remove('active');
    });
    }
  }
}

function changeLanguage() {

}