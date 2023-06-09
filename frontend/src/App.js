import * as Tone from 'tone';
import { playNote as playNoteWDesc } from "./utils.js";
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
  const recorder = new Tone.Recorder();

  return (
    <Box sx={{ padding: '2em', width: '60%', textAlign: 'center', border: 'dotted' }}>
      <Piano
        noteRange={{ first: firstNote, last: lastNote }}
        playNote={(midiNumber) => {
          var octave = Math.floor(midiNumber / NOTES.length)
          var note = NOTES[midiNumber % NOTES.length]
          var noteDesc = note.concat(octave.toString())
          playNoteWDesc(noteDesc, recorder)
        }}
        stopNote={(midiNumber) => {
          // Stop playing a given note - see notes below
        }}
        width={1000}
        keyboardShortcuts={keyboardShortcuts}
      />
      <div className="info">
        <Samples recorder={recorder}/>
      </div>
    </Box>
  );
}

export default App;
