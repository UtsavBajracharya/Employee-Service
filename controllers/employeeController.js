let employees = []; // In-memory employee data

// Fetch all employees
exports.getEmployees = (req, res) => {
    res.status(200).json(employees);
};

// Add a new employee
exports.addEmployee = (req, res) => {
    const { id, firstName, lastName, salary, department, email } = req.body;

    // Validate input
    if (!id || !firstName || !lastName || !salary || !department || !email) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if employee already exists
    const existingEmployee = employees.find((emp) => emp.id === id);
    if (existingEmployee) {
        return res.status(400).json({ message: 'Employee with this ID already exists.' });
    }

    // Add new employee
    employees.push({ id, firstName, lastName, salary, department, email });
    res.status(201).json({ message: 'Employee added successfully.' });
};

// Update an employee
exports.updateEmployee = (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, salary, department, email } = req.body;

    // Find the employee
    const employee = employees.find((emp) => emp.id === id);
    if (!employee) {
        return res.status(404).json({ message: 'Employee not found.' });
    }

    // Update fields
    employee.firstName = firstName;
    employee.lastName = lastName;
    employee.salary = salary;
    employee.department = department;
    employee.email = email;

    res.status(200).json({ message: 'Employee updated successfully.' });
};

// Delete an employee
exports.deleteEmployee = (req, res) => {
    const { id } = req.params;

    // Filter out the employee
    employees = employees.filter((emp) => emp.id !== id);

    res.status(200).json({ message: 'Employee deleted successfully.' });
};
