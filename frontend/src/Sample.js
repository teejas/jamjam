import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import DownloadIcon from '@mui/icons-material/Download';
import PianoIcon from '@mui/icons-material/Piano';
import { loadSamples, playSong, generateAudio, getSong, uploadSample } from "./utils.js";

function Samples() {
  const [samples, setSamples] = useState([]);
  const [uploadFile, setUploadFile] = useState("");

  useEffect(() => {
    // React advises to declare the async function directly inside useEffect
    async function getSamples() {
      const sample_arr = await loadSamples();
      setSamples(sample_arr);
    };
    getSamples();
  }, []);

  return (
    <Grid container spacing={3}>
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
        <Button onClick={() => uploadSample(uploadFile)}>Upload...</Button>
      </Grid>
      <Grid item xs={12}>
        <input type="file" onChange={(event) => setUploadFile(event.target.files[0])} />
      </Grid>
    </Grid>
  );
}

export default Samples;