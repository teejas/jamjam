const recorder = new Tone.Recorder();
var OCTAVE = 4;

function changeOctave(octave) {
  OCTAVE = octave;
  if(OCTAVE == 4) {
    document.getElementById("octaveDisplay").innerHTML = OCTAVE + " (Middle C)";
  } else {
    document.getElementById("octaveDisplay").innerHTML = OCTAVE;
  }
}

function playNote(note_description) {
  var key = note_description.toUpperCase();
  var note = key.replace("S", "#");
  if(note_description.includes("8")) {
    note = note.replace("8", (OCTAVE + 1).toString())
  } else {
    note = note.concat(OCTAVE.toString())
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

async function recorderButtonHandler(event) {
  const anchor = document.getElementById("recording-link");
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
}

async function keyPressHandler(event) {
  var name = event.key;
  var buttons = document.getElementsByClassName("play-button");
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
      changeOctave(OCTAVE - 1);
      break;
    case 'x':
      changeOctave(OCTAVE + 1);
      break;
    case 'r':
      await recorderButtonHandler();
      break;
    default:
      // alert(`Key pressed ${name} \r\n Key code value: ${code}`);
      break;
  }
}

export { OCTAVE, pianoKeyButtonHandler, keyPressHandler }