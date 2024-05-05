const cards = document.querySelector("[data-add]"),
  main = document.querySelector("main"),
  container = main.querySelector(".container"),
  namesArr = [],
  contributionArr = [],
  removeBtn = document.querySelector("#remove"),
  calcBtn = document.querySelector("#calculate"),
  resultbtn = document.querySelector("#result"),
  modal = document.querySelector(".modal"),
  info = document.querySelector(".info"),
  close = document.querySelector(".close");

function openCloseModal() {
  modal.classList.toggle("show");
}

info.addEventListener("click", openCloseModal);

close.addEventListener("click", openCloseModal);

main.addEventListener("input", (e) => {
  if (e.target && e.target.classList.contains("contribution")) {
    if (e.target.value.match(/\D/g)) {
      e.target.classList.add("red");
    } else {
      e.target.classList.remove("red");
    }
  }
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    openCloseModal();
  }
});

function removeLastInput() {
  container.lastChild.remove();
}

function createCard() {
  const element = document.createElement("div");
  element.classList.add("persons");
  element.innerHTML = `
  <div>
  <label for="bbb">Имя</label>
  <input class="name" type="text" placeholder="Введите имя" />
  <label for="bbb">Портаченная сумма</label>
  <input class="contribution" type="text" placeholder="Внесенная сумма" />
</div>
  `;
  container.append(element);
}

removeBtn.addEventListener("click", removeLastInput);

calcBtn.addEventListener("click", () => {
  getStat();
  calculate();
});

cards.addEventListener("click", createCard);

function getStat() {
  const names = document.querySelectorAll(".name"),
    contribution = document.querySelectorAll(".contribution");

  names.forEach((el) => {
    namesArr.push(el.value);
  });
  contribution.forEach((money) => {
    contributionArr.push(Number(parseFloat(money.value)));
  });
}

function calculate() {
  resultbtn.innerText = "";
  let result = "";
  let index;
  if (
    contributionArr.some((el, i) => {
      index = i;
      return isNaN(el);
    })
  ) {
    resultbtn.innerText = `Проверьте внесенные данные для ${namesArr[index]} - в поле 'Потраченная сумма' должно быть число!`;
    namesArr.length = 0;
    contributionArr.length = 0;
    return;
  }
  let sum =
    contributionArr.reduce((acc, values) => {
      return acc + values;
    }, 0) / contributionArr.length;

  let owerpayers = [],
    lowerpayers = [];

  for (let i = 0; i < namesArr.length; i++) {
    result += `${namesArr[i]} заплатил ${contributionArr[i]} \n`;
    if (contributionArr[i] >= sum) {
      owerpayers.push([namesArr[i], contributionArr[i] - sum]);
    } else {
      lowerpayers.push([namesArr[i], sum - contributionArr[i]]);
    }
  }
  result += ` \n`;

  for (let i = 0; i < owerpayers.length; i++) {
    for (let j = 0; j < lowerpayers.length; j++) {
      if (owerpayers[i][1] == 0 || lowerpayers[j][1] == 0) {
        continue;
      } else if (owerpayers[i][1] >= lowerpayers[j][1]) {
        result += `${lowerpayers[j][0]} платит ${
          owerpayers[i][0]
        } сумму в ${lowerpayers[j][1].toFixed(2)}\n `;

        owerpayers[i][1] -= lowerpayers[j][1];
        lowerpayers[j][1] = 0;
      }
      if (owerpayers[i][1] < lowerpayers[j][1]) {
        result += `${lowerpayers[j][0]} платит ${
          owerpayers[i][0]
        } сумму в ${owerpayers[i][1].toFixed(2)}\n`;

        lowerpayers[j][1] -= owerpayers[i][1];
        owerpayers[i][1] = 0;
      }
    }
  }

  resultbtn.innerText = result;
  namesArr.length = 0;
  contributionArr.length = 0;
}
