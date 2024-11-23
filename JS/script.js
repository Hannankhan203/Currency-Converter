// Calling HTML Elements for Mode change

const body = document.querySelector("body");
const container = document.querySelector(".container");
const inputAmount = document.querySelector(".input-amount");
const selectContainer = document.querySelector(".select-container");
const selects = document.querySelectorAll(".dropdown select");
const exchangeBtn = document.querySelector(".exchange-btn");
const themeCheckbox = document.querySelector("#theme-checkbox");
const check = document.querySelector(".check");
const botn = document.querySelector(".botn");
const msg = document.querySelector(".msg");

// Default Mode

body.classList.add("light-mode");
container.classList.add("light-mode");
inputAmount.classList.add("light-mode");
selectContainer.classList.add("light-mode");
selects.forEach((select) => {
  select.classList.add("light-mode");
});
exchangeBtn.classList.add("light-mode");
check.classList.add("light-mode");
botn.classList.add("light-mode");

// Mode Toggle

function toggle() {
  body.classList.toggle("dark-mode");
  container.classList.toggle("dark-mode");
  inputAmount.classList.toggle("dark-mode");
  selectContainer.classList.toggle("dark-mode");
  selects.forEach((select) => {
    select.classList.toggle("dark-mode");
  });
  exchangeBtn.classList.toggle("dark-mode");
  themeCheckbox.classList.add("dark-mode");
  check.classList.toggle("dark-mode");
  botn.classList.toggle("dark-mode");
}

themeCheckbox.addEventListener("click", toggle);

// Base URL for API

const API_KEY = "2e9d21424d9144859a39647f23bc89ab";
const BASE_URL = `https://openexchangerates.org/api/latest.json?app_id=${API_KEY}`;
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

for (let select of selects) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "PKR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    flagUpdate(evt.target);
  });
}

const updateExchangeRate = async () => {
  let amtVal = inputAmount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    inputAmount.value = "1";
  }
  const URL = `${BASE_URL}&base=${fromCurr.value}&symbols=${toCurr.value}`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data.rates[toCurr.value];
  console.log(rate);
  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal}${fromCurr.value} = ${finalAmount}${toCurr.value}`;
};

const flagUpdate = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

exchangeBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
