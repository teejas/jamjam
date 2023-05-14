import { OCTAVE, pianoKeyButtonHandler, keyPressHandler } from "./utils.js";

document.getElementById("octaveDisplay").innerHTML = OCTAVE + " (Middle C)";

var buttons = document.getElementsByClassName("play-button");
for(var i = 0; i < buttons.length; i++) {
  buttons[i].note_desc = buttons[i].classList.item(1)
  buttons[i].addEventListener("click", pianoKeyButtonHandler);
};

document.addEventListener('keypress', keyPressHandler, false);