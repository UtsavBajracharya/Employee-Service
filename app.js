const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const employeeRoutes = require('./routes/employeeRoutes');
const EmployeeModel = require('./models/employeeModel');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/api', employeeRoutes);

// UI Endpoint
app.get('/', (req, res) => {
    res.render('index', { employees: EmployeeModel.getAllEmployees() }); // Pass employee data to the view
});


// Add port
const PORT = 3000;

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
