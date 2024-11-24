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

// In-memory JSON array for employee data
const employees = [];

// Routes
app.use('/api', employeeRoutes);

// Tell Express where to find the views
app.set('views', path.join(__dirname, 'views'));

// UI Endpoint
app.get('/', (req, res) => {
    res.render('index', { employees }); // Pass employee data to the view
});

app.post('/add-employee', (req, res) => {
    const { firstName, lastName, id, salary, department, email } = req.body;
  
    // Check if employee exists
    const existingEmployee = employees.find((emp) => emp.id === id);
  
    if (existingEmployee) {
      // Update existing employee
      existingEmployee.firstName = firstName;
      existingEmployee.lastName = lastName;
      existingEmployee.salary = salary;
      existingEmployee.department = department;
      existingEmployee.email = email;
    } else {
      // Add new employee
      employees.push({ firstName, lastName, id, salary, department, email });
    }
  
    res.redirect('/'); // Reload the page after adding/updating
  });

// Add port
const PORT = 3000;

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
