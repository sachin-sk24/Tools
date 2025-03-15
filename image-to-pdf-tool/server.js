const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.post('/convert', upload.array('images'), (req, res) => {
  // Process images and convert to PDF using a library like pdf-lib
  res.send('PDF conversion logic here');
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
