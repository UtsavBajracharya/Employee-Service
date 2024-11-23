const form = document.getElementById('employeeForm');
const employeeList = document.getElementById('employeeList');

// Fetch and display employees
const fetchEmployees = async () => {
  const response = await fetch('/api/employees');
  const employees = await response.json();
  employeeList.innerHTML = employees.map(emp => `
    <div>
      <p>${emp.firstName} ${emp.lastName}</p>
      <p>ID: ${emp.id}</p>
      <p>Salary: ${emp.salary}</p>
      <p>Department: ${emp.working_department}</p>
      <p>Email: ${emp.email}</p>
    </div>
  `).join('');
};

// Submit form data
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  await fetch('/api/employees', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  form.reset();
  fetchEmployees();
});

fetchEmployees();
