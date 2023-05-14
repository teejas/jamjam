const recorder = new Tone.Recorder();

var octave = 4;
document.getElementById("octaveDisplay").innerHTML = octave + " (Middle C)";

function changeOctave(new_octave) {
  octave = new_octave;
  if(octave == 4) {
    document.getElementById("octaveDisplay").innerHTML = octave + " (Middle C)";
  } else {
    document.getElementById("octaveDisplay").innerHTML = octave;
  }
}

function playNote(note_description) {
  var key = note_description.toUpperCase();
  var note = key.replace("S", "#");
  if(note_description.includes("8")) {
    note = note.replace("8", (octave + 1).toString())
  } else {
    note = note.concat(octave.toString())
  }
  const synth = new Tone.Synth().toDestination();
  if(recorder.state == "started") {
    const recsynth = new Tone.Synth().connect(recorder);
    recsynth.triggerAttackRelease(note, '8n')
  }
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

document.addEventListener('keypress', async (event) => {
  var name = event.key;
  var code = event.code;
  const anchor = document.getElementById("recording-link");
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
    case 'z':
      changeOctave(octave - 1);
      break;
    case 'x':
      changeOctave(octave + 1);
      break;
    case 'r':
      if(recorder.state == "started") {
        const recording = await recorder.stop();
        console.log(recording)
        const url = URL.createObjectURL(recording);
        anchor.download = "recording.webm";
        anchor.href = url;
        anchor.innerHTML = "Download recording";
        console.log("Stopped recording");
      } else {
        recorder.start();
        anchor.innerHTML = "Recording..."
        console.log("Started recording");
      }
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