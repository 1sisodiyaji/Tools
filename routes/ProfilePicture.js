const express = require('express');
const router = express.Router(); 
const { createCanvas } = require('canvas');

router.get('/getLetterPicture/:name/:color', (req, res) => { 
  let { name = 'Codesaarthi team', color = '#22D3EE' } = req.params;

  if (!name) {
    return res.status(400).send('Name parameter is required');
  }

  const words = name.split(' ');
  let initials = '';

  if (words.length === 1) {
    initials = words[0].charAt(0).toUpperCase();
  } else if (words.length === 2) {
    initials = words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
  } else {
    initials = words[0].charAt(0).toUpperCase() + words[words.length - 1].charAt(0).toUpperCase();
  }
  
const canvasSize = 200;  
const padding = 10;  
const canvas = createCanvas(canvasSize, canvasSize);
const ctx = canvas.getContext('2d');
 
const contentSize = canvasSize - 2 * padding;
 
ctx.fillStyle = color;
ctx.fillRect(0, 0, canvasSize, canvasSize);
 
ctx.fillStyle = 'white';
ctx.font = 'bold 5rem sans-serif';  
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';

// Adjust text position to account for padding
ctx.save(); // Save the current state
ctx.translate(canvasSize / 2, canvasSize / 2); // Move the origin to the center
ctx.fillText(initials, 0, 0); // Draw text at the new origin
ctx.restore(); // Restore the saved state

// Get the image data URL
const imageUrl = canvas.toDataURL();

  res.send({ imageUrl });
});


module.exports = router;
