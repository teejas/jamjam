const express = require('express');
const redis = require('redis');
const fs = require('fs');
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json()
var webmParser = bodyParser.raw({type: "audio/webm", limit: '50mb'})

const redisClient = redis.createClient();

redisClient.on('error', err => console.log('Redis Client Error', err));

const app = express()
const port = 3000

app.use(express.static(__dirname + '/public'));

app.get('/', async (req, res) => {
  // const samples = await fs.promises.readdir(process.cwd() + '/../audiogen/samples');
  res.sendFile('index.html', { root: __dirname });
})

app.get('/getsamplenames', async (req, res) => {
  const samples = await fs.promises.readdir(process.cwd() + '/../audiogen/samples');
  res.send(samples);
})

app.get('/getsample/:sample', async (req, res) => {
  const sample = await fs.promises.readFile(process.cwd() + '/../audiogen/samples/' + req.params.sample);
  res.send(sample);
})

app.post('/generateaudio', jsonParser, async (req, res) => {
  await redisClient.connect();
  const sample = req.body.sample;
  if(!sample) {
    res.status(400).send('No sample provided');
  } else {
    await redisClient.set(sample, "audiogen");
    res.status(200).send('Enqueued task to generate audio')
  }
  await redisClient.disconnect();
})

app.post('/saverecording', webmParser, async (req, res) => {
  const recording = req.body;
  // console.log(recording);
  filePath = process.cwd() + '/../audiogen/samples/recording.webm';
  await fs.promises.writeFile(filePath, recording);
  res.status(200).send('Recording saved')
});

app.listen(port, () => {
  console.log(`jamjam listening on port ${port}`)
})