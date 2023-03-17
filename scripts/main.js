let activeLang = "Int";
let intResult;
let romResult;

// Roman to Integer
const romanToInt = function (s) {
  const values = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let str = s.split(" ").join("").toUpperCase();
  if (/[^IVXLCDM]/gi.test(str))
    return "Некорректное значение! Допустимые значения: I, V, X, L, C, D, M";
  let result = 0;
  for (let i = 0; i < str.length; i++) {
    if (values[str[i]] < values[str[i + 1]]) {
      result -= values[str[i]];
    } else {
      result += values[str[i]];
    }
  }
  return result;
};

// Integer to Roman
const intToRoman = function (n) {
  if (isNaN(n) || n >= 4000 || n < 0)
    return "Некорректное значение! Допустимый диапазон [1 - 3999]";
  let result = "";
  const digits = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };
  for (const key in digits) {
    while (digits[key] <= n) {
      result += key;
      n -= digits[key];
    }
  }
  return result;
};

document.querySelector(".swap-button").addEventListener("click", function () {
  if (activeLang == "Int") {
    activeLang = "Roman";
    document.getElementById("one-digits").textContent = "Римские";
    document.getElementById("two-digits").textContent = "Арабские";
    romResult = document.querySelector("textarea").value;
    intResult = document.querySelector("output").textContent;
    document.querySelector("textarea").value = intResult;
    document.querySelector("output").textContent = romResult;
  } else if (activeLang == "Roman") {
    activeLang = "Int";
    document.getElementById("one-digits").textContent = "Арабские";
    document.getElementById("two-digits").textContent = "Римские";
    intResult = document.querySelector("output").textContent;
    romResult = intToRoman(intResult);
    document.querySelector("textarea").value = intResult;
    document.querySelector("output").textContent = romResult;
  }
});

document.querySelector("textarea").addEventListener("input", function (e) {
  document.querySelector("output").textContent =
    activeLang == "Int"
      ? intToRoman(e.target.value)
      : romanToInt(e.target.value);
});

document.querySelector(".delete-button").addEventListener("click", function () {
  document.querySelector("textarea").value = "";
  document.querySelector("output").textContent = "";
});

let clipboard = new ClipboardJS(".copy-button", {
  text: function (trigger) {
    return document
      .getElementById("output-copy")
      .innerText.replace(/\n+/g, "\n");
  },
});
