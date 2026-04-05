import youtubedl from 'youtube-dl-exec';
import fs from 'fs';

console.log("Downloading audio...");

youtubedl('ytsearch1:Kadhaippoma Video Ashok Selvan Ritika Singh Leon James', {
  extractAudio: true,
  audioFormat: 'm4a',
  output: './public/song.m4a',
  forceOverwrites: true,
}).then(output => {
  console.log("Download complete!");
}).catch(err => {
  console.error("Error downloading:", err);
});
