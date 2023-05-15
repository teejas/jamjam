import { playNote as playNoteWDesc, keyPressHandler, loadSamples } from "./utils.js";
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
import './App.css';

const NOTES = ['c', 'cs', 'd', 'ds', 'e', 'f', 'fs', 'g', 'gs', 'a', 'as', 'b']

function App() {
  const firstNote = MidiNumbers.fromNote('c3');
  const lastNote = MidiNumbers.fromNote('f4');
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });
  window.addEventListener('keypress', keyPressHandler, false);
  loadSamples();

  return (
    <div className="App">
      <Piano
        noteRange={{ first: firstNote, last: lastNote }}
        playNote={(midiNumber) => {
          // Play a given note - see notes below
          var octave = Math.floor(midiNumber / NOTES.length)
          var note = NOTES[midiNumber % NOTES.length]
          var noteDesc = note.concat(octave.toString())
          playNoteWDesc(noteDesc)
        }}
        stopNote={(midiNumber) => {
          // Stop playing a given note - see notes below
        }}
        width={1000}
        keyboardShortcuts={keyboardShortcuts}
      />
      <div className="info">
          <a id="recording-link"></a>
          <table title="samples table" className="samples" id="samples-table"></table>
      </div>
    </div>
  );
}

export default App;
