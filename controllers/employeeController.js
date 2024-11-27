let employees = []; // In-memory employee data

// Fetch all employees
exports.getEmployees = (req, res) => {
    res.status(200).json(employees);
};

// Add or update an employee
exports.addOrUpdateEmployee = (req, res) => {
    const { id, firstName, lastName, salary, department, email } = req.body;

    // Validate input
    if (!id || !firstName || !lastName || !salary || !department || !email) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if employee exists
    const existingEmployee = employees.find((emp) => emp.id === id);

    if (existingEmployee) {
        // Update employee
        existingEmployee.firstName = firstName;
        existingEmployee.lastName = lastName;
        existingEmployee.salary = salary;
        existingEmployee.department = department;
        existingEmployee.email = email;
    } else {
        // Add new employee
        employees.push({ id, firstName, lastName, salary, department, email });
    }

    res.status(200).json({ message: 'Employee added/updated successfully.' });
};
