import CreateElem from './createElement.js';

import keyboardEnCapsKeys from '../languages/en/keyboardEnCapsKeys.js';
import keyboardEnCapsShiftKeys from '../languages/en/keyboardEnCapsShiftKeys.js';
import keyboardEnKeys from '../languages/en/keyboardEnKeys.js';
import keyboardEnUpperCaseKeys from '../languages/en/keyboardEnUpperCaseKeys.js';
import keyboardRuCapsKeys from '../languages/ru/keyboardRuCapsKeys.js';
import keyboardRuCapsShiftKeys from '../languages/ru/keyboardRuCapsShiftKeys.js';
import keyboardRuKeys from '../languages/ru/keyboardRuKeys.js';
import keyboardRuUpperCaseKeys from '../languages/ru/keyboardRuUpperCaseKeys.js';

const keyboardEnKeysArray = Object.keys(keyboardEnKeys);
const keyboardEnUpperCaseKeysArray = Object.keys(keyboardEnUpperCaseKeys);
const keyboardEnCapsKeysArray = Object.keys(keyboardEnCapsKeys);
const keyboardEnCapsShiftKeysArray = Object.keys(keyboardEnCapsShiftKeys);
const keyboardRuKeysArray = Object.keys(keyboardRuKeys);
const keyboardRuUpperCaseKeysArray = Object.keys(keyboardRuUpperCaseKeys);
const keyboardRuCapsKeysArray = Object.keys(keyboardRuCapsKeys);
const keyboardRuCapsShiftKeysArray = Object.keys(keyboardRuCapsShiftKeys);

export default function generateLayout() {
  const headertext = 'RSS Виртуальная клавиатура';
  const keyboarsRowsLength = [14, 14, 13, 14, 10]; // количество кнопок в каждом ряду
  const explainTextContent = 'Клавиатура создана на MacOS </br> Для переключения языка используются leftCtrl + leftOpt(leftAlt) </br> на macOS при одновременном нажатии CapsLock и Shift буквы остаются в верхнем регистре, меняются только небуквенные значения';

  const wrapper = new CreateElem('div', 'wrapper');
  document.body.prepend(wrapper);

  const header = new CreateElem('h1', 'h1');
  header.innerHTML = headertext;
  wrapper.append(header);

  const keyboard = new CreateElem('div', 'keyboard');
  const textarea = new CreateElem('textarea', 'textarea');
  textarea.id = 'textarea';
  textarea.rows = 5;
  textarea.cols = 50;
  wrapper.append(textarea);
  wrapper.append(keyboard);

  let shift = 0;

  for (let i = 0; i < keyboarsRowsLength.length; i += 1) {
    const row = new CreateElem('div', `row row${i + 1}`);
    keyboard.append(row);

    for (let j = 0; j < keyboarsRowsLength[i]; j += 1) {
      const keyboardButton = new CreateElem('div', `key ${keyboardEnKeysArray[shift + j]}`);
      row.append(keyboardButton);

      const ruButton = new CreateElem('span', 'ru hidden');
      keyboardButton.append(ruButton);

      const ruCaseDown = new CreateElem('span', 'caseDown active');
      ruCaseDown.innerHTML = keyboardRuKeys[keyboardRuKeysArray[shift + j]];
      ruButton.append(ruCaseDown);

      const ruCaseUp = new CreateElem('span', 'caseUp hidden');
      ruCaseUp.innerHTML = keyboardRuUpperCaseKeys[keyboardRuUpperCaseKeysArray[shift + j]];
      ruButton.append(ruCaseUp);

      const ruCaps = new CreateElem('span', 'caps hidden');
      ruCaps.innerHTML = keyboardRuCapsKeys[keyboardRuCapsKeysArray[shift + j]];
      ruButton.append(ruCaps);

      const ruCapsShift = new CreateElem('span', 'capsShift hidden');
      ruCapsShift.innerHTML = keyboardRuCapsShiftKeys[keyboardRuCapsShiftKeysArray[shift + j]];
      ruButton.append(ruCapsShift);

      const enButton = new CreateElem('span', 'en hidden');
      keyboardButton.append(enButton);

      const enCaseDown = new CreateElem('span', 'caseDown hidden');
      enCaseDown.innerHTML = keyboardEnKeys[keyboardEnKeysArray[shift + j]];
      enButton.append(enCaseDown);

      const enCaseUp = new CreateElem('span', 'caseUp hidden');
      enCaseUp.innerHTML = keyboardEnUpperCaseKeys[keyboardEnUpperCaseKeysArray[shift + j]];
      enButton.append(enCaseUp);

      const enCaps = new CreateElem('span', 'caps hidden');
      enCaps.innerHTML = keyboardEnCapsKeys[keyboardEnCapsKeysArray[shift + j]];
      enButton.append(enCaps);

      const enCapsShift = new CreateElem('span', 'capsShift hidden');
      enCapsShift.innerHTML = keyboardEnCapsShiftKeys[keyboardEnCapsShiftKeysArray[shift + j]];
      enButton.append(enCapsShift);
    }
    shift += keyboarsRowsLength[i];
  }

  const explainText = new CreateElem('p', 'explain');
  wrapper.append(explainText);
  explainText.innerHTML = explainTextContent;
}
