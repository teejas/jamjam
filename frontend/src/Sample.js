import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import DownloadIcon from '@mui/icons-material/Download';
import PianoIcon from '@mui/icons-material/Piano';
import { loadSamples, playSong, generateAudio, getSong, uploadSample, saveRecording, playSongFromURL } from "./utils.js";

function Samples(props) {
  const [samples, setSamples] = useState([]);
  const [uploadFile, setUploadFile] = useState("");
  const [hasChanged, setHasChanged] = useState(false);
  const [savedRecording, setSavedRecording] = useState(null);
  const [recordingState, setRecordingState] = useState(false);
  const recorder = props.recorder

  useEffect(() => {
    // React advises to declare the async function directly inside useEffect
    async function getSamples() {
      const sample_arr = await loadSamples();
      setSamples(sample_arr);
    };

    return () => {
      getSamples();
    }
  }, [hasChanged]);

  async function recorderButtonHandler() {
    console.log(recorder);
    if(recorder.state === "started") {
      const recording = await recorder.stop();
      // await saveRecording(recording);
      setSavedRecording(recording);
      setRecordingState(false);
      console.log("Stopped recording");
      setHasChanged(!hasChanged);
    } else {
      recorder.start();
      setRecordingState(true);
      console.log("Started recording");
    }
  }

  const saveRecordingHelper = async () => {
    await saveRecording(savedRecording);
    setSavedRecording(null);
    setHasChanged(!hasChanged);
  }

  const playRecordingHelper = async () => {
    const url = URL.createObjectURL(savedRecording);
    playSongFromURL(url);
  }

  var recordControls = [<Button onClick={recorderButtonHandler}>Press to start recording</Button>]
  if(recordingState) {
    recordControls = [<Button onClick={recorderButtonHandler}>Press to stop recording...</Button>]
  } else if(savedRecording) {
    recordControls = [
      <Button onClick={playRecordingHelper}>Play</Button>,
      <Button onClick={saveRecordingHelper}>Save</Button>,
      <Button onClick={() => setSavedRecording(null)}>Clear</Button>
    ]
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {recordControls?.map((recordControl, index) => (
          recordControl
        ))}
      </Grid>
      <Grid item xs={12}>
        <h2>Samples</h2>
      </Grid>
      {samples?.map((sample, index) => (
        <Grid item xs={3} key={index}>
          <h4>{sample}</h4>
          <Button onClick={() => playSong(sample)}><PlayCircleIcon /></Button>
          <Button href={getSong(sample)}><DownloadIcon /></Button>
          <Button onClick={() => generateAudio(sample)}><PianoIcon /></Button>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button onClick={() => {
          uploadSample(uploadFile);
          setHasChanged(!hasChanged);
        }}>Upload...</Button>
      </Grid>
      <Grid item xs={12}>
        <input type="file" onChange={(event) => setUploadFile(event.target.files[0])} />
      </Grid>
    </Grid>
  );
}

export default Samples;