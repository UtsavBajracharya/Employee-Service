const EmployeeModel = require('../models/employeeModel');

exports.getEmployees = (req, res) => {
  res.json(EmployeeModel.getAllEmployees());
};

exports.addOrUpdateEmployee = (req, res) => {
  const { id, firstName, lastName, salary, working_department, email } = req.body;
  if (!id || !firstName || !lastName || !salary || !working_department || !email) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  const newEmployee = { id, firstName, lastName, salary, working_department, email };
  EmployeeModel.addOrUpdateEmployee(newEmployee);
  res.status(200).json({ message: 'Employee added/updated successfully.' });
};
