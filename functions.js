import { inputWebsite, outputWebsites } from "./constants.js";

let myWebsites = [];
let myWebsitesStorage = JSON.parse(localStorage.getItem("websites"));
let validInput = false;

export const save = () => {
  if (myWebsitesStorage) {
    myWebsites = myWebsitesStorage;
  }
  myWebsites.push(inputWebsite.value);
  output(false);
  if (validInput) {
    inputWebsite.value = "";
  }
  localStorage.setItem("websites", JSON.stringify(myWebsites));
};

export const output = (isClear) => {
  let htmlData = "";
  if (myWebsitesStorage) {
    myWebsites = myWebsitesStorage;
  }
  if (isClear) {
    outputWebsites.innerHTML = "";
    return;
  }
  for (let i = 0; i < myWebsites.length; ++i) {
    if (
      myWebsites[i] !== "" &&
      myWebsites[i] !== "Enter URL that you want to save"
    ) {
      htmlData += `
            <li> 
                <a href='${myWebsites[i]}' target ='_blank'>
                    ${myWebsites[i]} 
                </a>
            </li>
            `;
      validInput = true;
    }
  }
  outputWebsites.innerHTML = htmlData;
};

export const clear = () => {
  localStorage.clear();
  myWebsites = [];
  output(true);
};

export const tab = () => {
  if (myWebsitesStorage) {
    myWebsites = myWebsitesStorage;
  }
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myWebsites.push(tabs[0].url);
    output();
    localStorage.setItem("websites", JSON.stringify(myWebsites));
  });
};

output();
