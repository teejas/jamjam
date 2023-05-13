function playNote(note_description) {
  var key = note_description.toUpperCase();
  var note = key.replace("S", "#");
  if(note_description.includes("8")) {
    note = note.replace("8", "5")
  } else {
    note = note.concat("4")
  }
  const synth = new Tone.Synth().toDestination();
  console.log(note);
  synth.triggerAttackRelease(note, '8n')
}

function pianoKeyButtonHandler(event) {
  playNote(event.currentTarget.note_desc);
}

var buttons = document.getElementsByClassName("play-button");
for(var i = 0; i < buttons.length; i++) {
  buttons[i].note_desc = buttons[i].classList.item(1)
  buttons[i].addEventListener("click", pianoKeyButtonHandler);
};

document.addEventListener('keypress', (event) => {
  var name = event.key;
  var code = event.code;
  // Alert the key name and key code on keydown
  switch(name) {
    case 'a': 
      playNote(buttons[0].classList.item(1));
      break;
    case 'w':
      playNote(buttons[1].classList.item(1));
      break;
    case 's': 
      playNote(buttons[2].classList.item(1));
      break;
    case 'e':
      playNote(buttons[3].classList.item(1));
      break;
    case 'd': 
      playNote(buttons[4].classList.item(1));
      break;
    case 'f':
      playNote(buttons[5].classList.item(1));
      break;
    case 't': 
      playNote(buttons[6].classList.item(1));
      break;
    case 'g':
      playNote(buttons[7].classList.item(1));
      break;
    case 'y': 
      playNote(buttons[8].classList.item(1));
      break;
    case 'h':
      playNote(buttons[9].classList.item(1));
      break;
    case 'u': 
      playNote(buttons[10].classList.item(1));
      break;
    case 'j':
      playNote(buttons[11].classList.item(1));
      break;
    case 'k': 
      playNote(buttons[12].classList.item(1));
      break;
    default:
      // alert(`Key pressed ${name} \r\n Key code value: ${code}`);
      break;
  }
}, false);

// pitch ramp modulation
  // const now = Tone.now()
  // const osc = new Tone.Oscillator().toDestination();
  // // start at "C4"
  // osc.frequency.value = "C4";
  // // ramp to "C5" over 2 seconds
  // osc.frequency.rampTo("C5", 2)
  // osc.start(now);
  // osc.stop(now + 5);