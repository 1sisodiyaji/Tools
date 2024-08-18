const express = require('express');
const cors = require('cors');
require('dotenv').config();
const ProfilePicture = require('./routes/ProfilePicture');
const userRoutes = require('./routes/Admin');
const app = express();
 
app.use(cors({ origin: '*' }));
 
app.use(express.json());
 
app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.use("/api/profile_picture" ,ProfilePicture );
app.use("/api/user",userRoutes);
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
