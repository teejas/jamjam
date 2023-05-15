import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { loadSamples, playSong, generateAudio } from "./utils.js";

function Samples() {
  const [samples, setSamples] = useState([]);

  useEffect(() => {
    // React advises to declare the async function directly inside useEffect
    async function getSamples() {
      const sample_arr = await loadSamples();
      setSamples(sample_arr);
    };
    getSamples();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h2>Samples</h2>
      </Grid>
      {samples?.map((sample, index) => (
        <Grid item xs={samples.length%3} key={index}>
          <h3>{sample}</h3>
          <Button onClick={() => playSong(sample)}>Play</Button>
          <Button onClick={() => generateAudio(sample)}>Generate</Button>
        </Grid>
      ))}
    </Grid>
  );
}

export default Samples;