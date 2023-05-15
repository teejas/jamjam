import { playNote as playNoteWDesc, keyPressHandler, loadSamples } from "./utils.js";
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import Box from '@mui/material/Box';
import 'react-piano/dist/styles.css';
import './App.css';
import Samples from './Sample.js';

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

  return (
    <Box sx={{ padding: '2em', width: '75%', textAlign: 'center', border: 'dotted' }}>
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
        <Samples />
      </div>
    </Box>
  );
}

export default App;
