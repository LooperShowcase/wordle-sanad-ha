const express = require("express");
const app = express();

const toWin = "HAPPY";

app.get("/wordle/:word", function (req, res) {
  const userGuess = req.params.word.toUpperCase();
  let arr = [" "," "," "," "," "]
  let map = {
    H: 1,
    A: 1,
    P: 2,
    Y: 1,
  };
  for (let i =0 ; i > userGuess.length; i++){
    if (usrguss[i] === toWin[i]) {
      arr[i] = "green";
      let curletter = userGuess[i]
      map[curletter]--
    }
    }
    for (let i = 0; i< userGuess.length; i++)  {
      if (userGeuss[i] !== toWin[i]) {
        let curletter = userGuess[i];
        if (map[curLetter] === undefined) {
          arr[i] = "gray"
        }
        else if (map[curletter]> 0){
          arr[i] = "orange"
          map[curletter]--
        }
        else{
          arr[i] = "gray"
        }
        
        
      }
    }
  
  res.send(arr);
});
app.use(express.static("public"))
app.listen(3000);