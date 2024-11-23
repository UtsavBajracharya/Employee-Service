let employees = [];

module.exports = {
  getAllEmployees: () => employees,

  addOrUpdateEmployee: (newEmployee) => {
    const index = employees.findIndex(emp => emp.id === newEmployee.id);
    if (index !== -1) {
      employees[index] = newEmployee; // Update if ID exists
    } else {
      employees.push(newEmployee); // Add if ID is new
    }
  },
};
