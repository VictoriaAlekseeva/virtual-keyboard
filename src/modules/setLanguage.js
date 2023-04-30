import {language, letterCase, enLanguage, ruLanguage} from '../../index.js'

export function setLanguage(language) {
  if (language === 'en') {
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
    })} else if (language === 'ru') {
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
