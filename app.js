const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', employeeRoutes);

// Tell Express where to find the views
app.set('views', path.join(__dirname, 'views'));

// UI Endpoint
app.get('/', (req, res) => res.render('index'));

// Add port
const PORT = 3000;

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
