const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Use Routes
app.use('/api', employeeRoutes);

// Home Route (Frontend)
app.get('/', (req, res) => {
    res.render('index');
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
