import * as Tone from 'tone';
import {Howl} from 'howler';

const baseUrl = "http://localhost:3001/";
const recorder = new Tone.Recorder();
var currentOctave = 4; // global variable

function changeOctave(octave) {
  currentOctave = octave;
  if(currentOctave == 4) {
    document.getElementById("octaveDisplay").innerHTML = currentOctave + " (Middle C)";
  } else {
    document.getElementById("octaveDisplay").innerHTML = currentOctave;
  }
}

function playNote(note_description) {
  var key = note_description.toUpperCase();
  var note = key.replace("S", "#");
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

function playSongHandler(event) {
  const url = baseUrl + "getsample/" + event.currentTarget.sample;
  var sound = new Howl({
    src: [url],
    format: ["webm", "mp3", "wav"]
  });
  sound.play();
}

function generateAudioHandler(event) {
  const url = baseUrl + "generateaudio";
  console.log(event.currentTarget.sample);
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({sample: event.currentTarget.sample}), // The data
    headers: {
          'Content-Type': 'application/json'
        }
  }).catch(function (error) {
    console.warn('Something went wrong.', error);
  });
}

function loadSamples() {
  fetch(baseUrl + "getsamplenames").then(function (response) {
    // The API call was successful!
    return response.json();
  }).then(function (samples_arr) {
    if(samples_arr.length > 0) {
      var table = document.getElementById("samples-table");
      table.innerHTML = `
      <table class="samples" id="samples-table">
          <tr>
              <th>Name</th>
              <th>Play</th>
              <th>Generate</th>
          </tr>
      </table>
      `
      samples_arr.forEach(sample => {
        var row = document.createElement("tr");
        var sample_name = document.createElement("td");
        var sample_play = document.createElement("td");
        var sample_gen = document.createElement("td");
        var sample_play_button = document.createElement("button");
        var sample_gen_button = document.createElement("button");
        sample_name.innerHTML = sample;
        sample_play_button.innerHTML = "Play" // "<button>Play</button>";
        sample_play_button.addEventListener("click", playSongHandler);
        sample_play_button.sample = sample;
        sample_gen_button.innerHTML = "Generate" // "<button>Generate</button>";
        sample_gen_button.addEventListener("click", generateAudioHandler);
        sample_gen_button.sample = sample;
        sample_play.appendChild(sample_play_button);
        sample_gen.appendChild(sample_gen_button);
        row.appendChild(sample_name);
        row.appendChild(sample_play);
        row.appendChild(sample_gen);
        table.appendChild(row);
      })
    }
  }).catch(function (err) {
    // There was an error
    console.warn('Something went wrong.', err);
  });
}

function saveRecording(recording) {
  fetch(baseUrl + "saverecording", {
    method: 'POST',
    body: recording, // The data
    headers: {
      'Content-Type': 'audio/webm;codecs=opus' // The type of data you're sending
    }
  }).catch(function (error) {
    console.warn('Something went wrong.', error);
  });
  loadSamples(); // load samples again
}

async function recorderButtonHandler(event) {
  const anchor = document.getElementById("recording-link");
  if(recorder.state == "started") {
    const recording = await recorder.stop();
    saveRecording(recording);
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
  var code = event.code;
  switch(name) {
    // case 'z':
    //   changeOctave(currentOctave - 1);
    //   break;
    // case 'x':
    //   changeOctave(currentOctave + 1);
    //   break;
    case 'r':
      await recorderButtonHandler();
      break;
    default:
      console.log(`Key pressed ${name} \r\n Key code value: ${code}`);
      break;
  }
}

export { playNote, keyPressHandler, loadSamples }