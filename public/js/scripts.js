const form = document.getElementById('employeeForm');
const employeeList = document.querySelector('tbody');

// Fetch and display employees
const fetchEmployees = async () => {
  const response = await fetch('/api/employees');
  const employees = await response.json();
  employeeList.innerHTML = employees.map(emp => `
    <tr>
      <td>${emp.id}</td>
      <td>${emp.firstName}</td>
      <td>${emp.lastName}</td>
      <td>${emp.salary}</td>
      <td>${emp.working_department}</td>
      <td>${emp.email}</td>
    </tr>
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
