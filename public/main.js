let noc = 5;
let now = 6;
let gameDiv = document.getElementById("game");

for (let i = 0; i < now; i++) {
  let wordDiv = document.createElement("div");
  wordDiv.className = "word";

  for (let j = 0; j < noc; j++) {
    let charDiv = document.createElement("div");
    charDiv.className = "letter";
    wordDiv.appendChild(charDiv);
  }
  gameDiv.appendChild(wordDiv);
}
let curWord = 0;
let curChar = 0;
document.addEventListener("keydown", async function (event) {
  let wordDiv = gameDiv.children[curWord];
  if (event.code == "Backspace") {
    let charToDel = wordDiv.children[curChar - 1];
    charToDel.innerHTML = "";
    curChar--;
  } else if (event.code == "Enter") {
    if (curChar == noc) {
      const word = getCurrentWord();
      const result = await (await fetch("/wordle/" + word)).json();
      for (let i = 0; i < word.length; i++) {
        wordDiv.children[i].style.background = result[i];
      }
      curWord++;
      curChar = 0;
    }
  } else if (curChar < noc && isLetter(event.key)) {
    let charArr = wordDiv.children[curChar]; // get letter
    charArr.innerHTML = event.key;
    curChar++;
  }
});

function getCurrentWord() {
  let word = "";
  let wordDiv = gameDiv.children[curWord];
  for (let i = 0; i < noc; i++) {
    let charDiv = wordDiv.children[i];
    word = word + charDiv.innerHTML;
  }
  return word;
}

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}
const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    

    element.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      element.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    element.addEventListener('animationend', handleAnimationEnd, {once: true});
  });
