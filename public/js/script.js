const form = document.getElementById('employeeForm');
const tableBody = document.querySelector('#employeeTable tbody');

// Fetch and display employees
async function fetchEmployees() {
    const response = await fetch('/api/employees');
    const employees = await response.json();

    tableBody.innerHTML = '';
    employees.forEach((employee) => {
        const row = `
            <tr>
                <td>${employee.id}</td>
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.salary}</td>
                <td>${employee.department}</td>
                <td>${employee.email}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Add or update employee
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    form.reset();
    fetchEmployees();
});

// Initial fetch
fetchEmployees();
