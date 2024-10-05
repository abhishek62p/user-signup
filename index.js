const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminRouter = require('./routes/admin');
const userRoutes = require('./routes/user');

// Middleware for parsing request bodies

app.use(bodyParser.json());
app.use('/admin', adminRouter);
app.use('/user', userRoutes);

const PORT = 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));