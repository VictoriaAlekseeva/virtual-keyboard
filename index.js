import keyboardEnCapsKeys from './src/en/keyboardEnCapsKeys.js';
import keyboardEnCapsShiftKeys from './src/en/keyboardEnCapsShiftKeys.js';
import keyboardEnKeys from './src/en/keyboardEnKeys.js';
import keyboardEnUpperCaseKeys from './src/en/keyboardEnUpperCaseKeys.js';
import keyboardRuCapsKeys from './src/ru/keyboardRuCapsKeys.js';
import keyboardRuCapsShiftKeys from './src/ru/keyboardRuCapsShiftKeys.js';
import keyboardRuKeys from './src/ru/keyboardRuKeys.js';
import keyboardRuUpperCaseKeys from './src/ru/keyboardRuUpperCaseKeys.js';


const keyboardEnKeysArray = Object.keys(keyboardEnKeys);
const keyboardEnUpperCaseKeysArray = Object.keys(keyboardEnUpperCaseKeys);
const keyboardEnCapsKeysArray = Object.keys(keyboardEnCapsKeys);
const keyboardEnCapsShiftKeysArray = Object.keys(keyboardEnCapsShiftKeys);

// HTML markup generation

// function createBlock(tag, clName) {
//   this.tag = tag;
//   this.clName = clName;

//   this.createBlock = document.createElement(tag);
//   this.createBlock.className = clName;

//   return this.createBlock;
// }

// function createElem (tag, clName, content) {
//   this.tag = tag;
//   this.clName = clName;
//   this.content = content;

//   this.createElem = document.createElement(tag);
//   this.createElem.className = clName;
//   this.createElem.innerHTML = content;

//   return this.createElem;
// }



// class NewElem {
//   constructor (element, className) {
//     this.element = element;
//     this.className = className;
//   }

//   createElement() {
//     const el = document.createElement(this.element);
//     el.className = this.className;
//         return el;
//   }
// }

function CreateElem(tag, clName) {
  this.tag = tag;
  this.clName = clName;

  this.createBlock = document.createElement(tag);
  this.createBlock.className = clName;

  return this.createBlock;
}

const keyboard = new CreateElem('div', 'keyboard');
const textarea = new CreateElem('textarea', 'textarea');
textarea.id = 'textarea';
textarea.rows = 5;
textarea.cols = 50;

function generateLayout() {
  const headertext = 'RSS Виртуальная клавиатура';
  const keyboarsRowsLength = [14, 14, 13, 14, 10]; // количество кнопок в каждом ряду

  const wrapper = new CreateElem('div', 'wrapper');
  document.body.prepend(wrapper);

  const header = new CreateElem('h1', 'h1');
  header.innerHTML = headertext;
  wrapper.append(header);

  wrapper.append(textarea);
  wrapper.append(keyboard);

  let shift = 0;

  for (let i = 0; i < keyboarsRowsLength.length; i++) {
    let row = new CreateElem('div', `row row${i+1}`);
    keyboard.append(row);

    for (let j = 0; j < keyboarsRowsLength[i]; j++) {
      let keyboardButton = new CreateElem('div', `key ${keyboardEnKeysArray[shift+j]}`);
      row.append(keyboardButton);

      let caseDown = new CreateElem('span', 'caseDown');
      caseDown.innerHTML = keyboardEnKeys[keyboardEnKeysArray[shift+j]];
      keyboardButton.append(caseDown);

      let caseUp = new CreateElem('span', 'caseUp hidden');
      caseUp.innerHTML = keyboardEnUpperCaseKeys[keyboardEnUpperCaseKeysArray[shift+j]];
      keyboardButton.append(caseUp);

      let caps = new CreateElem('span', 'caseUp caps hidden');
      caps.innerHTML = keyboardEnCapsKeys[keyboardEnCapsKeysArray[shift+j]];
      keyboardButton.append(caps);

      let capsShift = new CreateElem('span', 'capsShift hidden');
      capsShift.innerHTML = keyboardEnCapsShiftKeys[keyboardEnCapsShiftKeysArray[shift+j]];
      keyboardButton.append(capsShift);
    }
    shift += keyboarsRowsLength[i];
  }
}

generateLayout();

let textAreaText = '';

keyboard.onclick = function mouseDownHandler(event) {
  const target = event.target.closest('div.key');
  console.log(target)

  if (!target) return;
  if (!keyboard.contains(target)) return;

  // регистр с капсом
  if (target.classList.contains('CapsLock')) {
    target.classList.toggle('active');
    const keys = document.querySelectorAll('.key > *');

    if (target.classList.contains('active')) {
      for (let key of keys) {
        console.log(key.classList.contains('hidden'));
        if (!key.classList.contains('hidden')) {
          key.classList.add('hidden')
        }
        if (key.classList.contains('caps')) {
          key.classList.remove('hidden');
        }
      }
    } else {
      for (let key of keys) {
        console.log(key.classList.contains('caps'));
        if (!key.classList.contains('hidden')) {
          key.classList.add('hidden')
        }
        if (key.classList.contains('caseDown')) {
          key.classList.remove('hidden');
        }
      }
    }
  }

  // chooseButton(target);

  console.log(target.className);

  const letterCode = target.className.split(' ')[1];
  textAreaText += keyboardEnKeys[letterCode];
  textarea.innerHTML = textAreaText;
}

// let selectedTD;
// function chooseButton(td) {
//   if (selectedTD) {
//     selectedTD.classList.remove('active');
//   }

//   selectedTD = td;
//   selectedTD.classList.add('active');
// }