import { COUNTRY_NAMES } from "./data.js";

let inp = document.querySelector("input");
let currencyFrom = document.querySelector(".currencyFrom");
let currencyTo = document.querySelector(".currencyTo");
let countryFlag = document.querySelectorAll(".flag");
let convertBtn = document.querySelector(".con");
let switchLogo = document.querySelector(".arr");
let output = document.querySelector(".amount");

let countries = Object.keys(COUNTRY_NAMES);

countries.map((country) => {
  currencyFrom.innerHTML += `<Option class ="text-dark">${country} || ${COUNTRY_NAMES[country]} </Option>`;
  currencyTo.innerHTML += `<Option class ="text-dark">${country} || ${COUNTRY_NAMES[country]} </Option>`;
});

[currencyFrom, currencyTo].forEach((select, index) => {
  select.addEventListener("change", () => {
    countryFlag[index].src = `https://flagsapi.com/${select.value.slice(
      0,
      2
    )}/shiny/32.png`;
  });
});

switchLogo.addEventListener("click", () => {
  let tempValue = currencyFrom.value;
  currencyFrom.value = currencyTo.value;
  currencyTo.value = tempValue;

  countryFlag[0].src = `https://flagsapi.com/${currencyFrom.value.slice(
    0,
    2
  )}/shiny/32.png`;
  countryFlag[1].src = `https://flagsapi.com/${currencyTo.value.slice(
    0,
    2
  )}/shiny/32.png`;
});

convertBtn.addEventListener("click", () => {
  if (isNaN(inp.value) || inp.value <= 0) {
    inp.value = "";
    inp.placeholder = "Enter a numeric value!!";
    inp.style.borderBottomColor = "red";
  } else {
    fetch(
      "https://v6.exchangerate-api.com/v6/3c5ab056d16d644734ff872a/latest/USD"
    )
      .then((data) => data.json())
      .then((responce) => {
        let rates = responce.conversion_rates;
        let fromCur = currencyFrom.value.slice(0, 3);
        let toCur = currencyTo.value.slice(0, 3);
        let amountValue = parseFloat(inp.value);
        let convertedAmount = (amountValue / rates[fromCur]) * rates[toCur];
        output.innerHTML = `<span class ="text-dark fw-bold px-3 fs-4 ">${amountValue} ${fromCur} = ${convertedAmount.toFixed(
          2
        )} ${toCur}</span>`;
      })
      .catch();
  }
});
