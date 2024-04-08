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
  <label for="bbb">Заплатил</label>
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
  console.log(contributionArr.length);
  let sum =
    contributionArr.reduce((acc, values) => {
      return acc + values;
    }, 0) / contributionArr.length;

  let owerpayers = [],
    lowerpayers = [];

  console.log(sum);
  let result = "";

  for (let i = 0; i < namesArr.length; i++) {
    result += `${namesArr[i]} заплатил ${contributionArr[i]} \n`;
    console.log(`${namesArr[i]} заплатил ${contributionArr[i]}`);
    if (contributionArr[i] >= sum) {
      owerpayers.push([namesArr[i], contributionArr[i] - sum]);
    } else {
      lowerpayers.push([namesArr[i], sum - contributionArr[i]]);
    }
  }

  console.log(owerpayers, owerpayers.length);
  console.log(lowerpayers);

  for (let i = 0; i < owerpayers.length; i++) {
    for (let j = 0; j < lowerpayers.length; j++) {
      if (owerpayers[i][1] == 0 || lowerpayers[j][1] == 0) {
        continue;
      } else if (owerpayers[i][1] >= lowerpayers[j][1]) {
        result += `${lowerpayers[j][0]} платит ${owerpayers[i][0]} сумму в ${lowerpayers[j][1]} денег \n `;

        console.log(`${lowerpayers[j][0]} рассчитался! \n`);

        owerpayers[i][1] -= lowerpayers[j][1];
        lowerpayers[j][1] = 0;
      }
      if (owerpayers[i][1] < lowerpayers[j][1]) {
        result += `${lowerpayers[j][0]} платит ${owerpayers[i][0]} сумму в ${owerpayers[i][1]} денег \n`;
        console.log(`${owerpayers[i][0]} получил свои деньги! \n`);

        lowerpayers[j][1] -= owerpayers[i][1];
        owerpayers[i][1] = 0;
      }
    }
  }
  resultbtn.innerText = result;
  namesArr.length = 0;
  contributionArr.length = 0;
  console.log(result);
}
