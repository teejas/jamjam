import * as Tone from 'tone';
import {Howl} from 'howler';

const baseUrl = "http://localhost:3001/";
var currentOctave = 4; // global variable

function changeOctave(octave) {
  currentOctave = octave;
  if(currentOctave == 4) {
    document.getElementById("octaveDisplay").innerHTML = currentOctave + " (Middle C)";
  } else {
    document.getElementById("octaveDisplay").innerHTML = currentOctave;
  }
}

function playNote(note_description, recorder) {
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

function getSong(sample) {
  const url = baseUrl + "getsample/" + sample;
  return url
}

function playSongFromURL(url) {
  var sound = new Howl({
    src: [url],
    format: ["webm", "mp3", "wav"]
  });
  sound.play();
}

function playSong(sample) {
  const url = baseUrl + "getsample/" + sample;
  playSongFromURL(url)
}

function generateAudio(sample) {
  const url = baseUrl + "generateaudio";
  console.log(sample);
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({sample: sample}), // The data
    headers: {
          'Content-Type': 'application/json'
        }
  }).catch(function (error) {
    console.warn('Something went wrong.', error);
  });
}

async function loadSamples() {
  let ret = await fetch(baseUrl + "getsamplenames").then(function (response) {
    // The API call was successful!
    return response.json();
  }).catch(function (err) {
    // There was an error
    console.warn('Something went wrong.', err);
  });
  return ret;
}

async function saveRecording(recording) {
  await fetch(baseUrl + "saverecording", {
    method: 'POST',
    body: recording, // The data
    headers: {
      'Content-Type': 'audio/webm;codecs=opus' // The type of data you're sending
    }
  }).catch(function (error) {
    console.warn('Something went wrong.', error);
  });
}

function uploadSample(file) {
  console.log(file);
  fetch(baseUrl + "uploadsample", {
    method: 'POST',
    body: file,
  }).catch(function (error) {
    console.warn('Something went wrong.', error);
  });
}

export { playNote, loadSamples, playSong, generateAudio, getSong, uploadSample, saveRecording, playSongFromURL }