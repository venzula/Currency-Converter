const currency1 = document.querySelector(".cur-1");
const currency2 = document.querySelector(".cur-2");
const currency1input = document.querySelector(".cur-1-input");
const currency2input = document.querySelector(".cur-2-input");
const baseRate = document.querySelector(".base");
const switchCurrency = document.querySelector(".switch-currency");

const countries = [
  {
    name: "AED",
    flagURL: "https://www.worldometers.info/img/flags/ae-flag.gif",
  },
  {
    name: "EUR",
    flagURL: "https://www.worldometers.info/img/flags/au-flag.gif",
  },
  {
    name: "GBP",
    flagURL: "https://www.worldometers.info/img/flags/uk-flag.gif",
  },
  {
    name: "USD",
    flagURL: "https://www.worldometers.info/img/flags/us-flag.gif",
  },
  {
    name: "AFN",
    flagURL: "https://www.worldometers.info/img/flags/af-flag.gif",
  },
  {
    name: "CAD",
    flagURL: "https://www.worldometers.info/img/flags/ca-flag.gif",
  },
  {
    name: "JPY",
    flagURL: "https://www.worldometers.info/img/flags/ja-flag.gif",
  },
  {
    name: "USD",
    flagURL: "https://www.worldometers.info/img/flags/us-flag.gif",
  },
  {
    name: "PKR",
    flagURL: "https://www.worldometers.info/img/flags/pk-flag.gif",
  },
];

const apiURL = "https://v6.exchangerate-api.com/v6/";
const key = "093352694b431c8342cff984";

async function getExchangeRate() {
  const currency1Value = currency1.value;
  const currency2Value = currency2.value;
  const response = await fetch(`${apiURL}${key}/latest/${currency1Value}`);
  const data = await response.json();
  console.log(data);
  const rate = data.conversion_rates[currency2Value];
  console.log(rate);
  baseRate.textContent = ` ${currency1Value} = ${rate} ${currency2Value}`;
  console.log(baseRate);
  currency2input.value = currency1input.value * rate;
  console.log(currency2input);
}
currency1.addEventListener("change", () => {
  getExchangeRate();
  getFlag()
});

currency2.addEventListener("change", () => {
  getExchangeRate();
  getFlag()
});

currency1input.addEventListener("input", getExchangeRate);

currency2input.addEventListener("input", getExchangeRate);

function getFlag() {
  countries.forEach((country) => {
    //   console.log(country.flagURL);
    if (currency1.value == country.name) {
      const imgsrc = document.querySelector(".from img");
      imgsrc.setAttribute("src", country.flagURL);
    }
    if (currency2.value == country.name) {
      const imgsrc = document.querySelector(".to img");
      imgsrc.setAttribute("src", country.flagURL);
    }
  });
}

switchCurrency.addEventListener("click", () => {
  const currency1Value = currency1.value;
  currency1.value = currency2.value;
  currency2.value = currency1Value;
  switchCurrency.classList.toggle("rotate");
  getExchangeRate();
  getFlag();
});
