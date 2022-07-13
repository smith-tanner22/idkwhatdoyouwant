import { loadHeaderFooter } from "./utils";

function convertToJson(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error('No alerts');
    }
  }
  
  export default class InnerText {
    constructor() {
      this.outputElement = document.getElementById('home_main_body');
      this.path = '../json/text.json';
      this.init();
    }
    getText() {
      return fetch(this.path)
        .then(convertToJson)
        .then((data) => data);
    }
  
    async init() {
      const text = await this.getText();
      console.log(text);
      this.outputElement.innerHTML = this.textTemplate();
      // this.outputElement.querySelector(".divider") = alerts;
      this.renderAlert(text, this.textTemplate, '.innerText');
    }
  
    textTemplate(text) {
      return `<h1 class="innerText">${text}</h1>`;
    }
  
    renderAlert(text, template, outputClassName) {
      const element = document.querySelector('#home_main_body');
      console.log(text[0].message);
      element.innerHTML = ' ';
      const htmlString = text.map((item) => template(item.message));
      element.innerHTML = text[0].join('');
    }
  
  }

  loadHeaderFooter();
  