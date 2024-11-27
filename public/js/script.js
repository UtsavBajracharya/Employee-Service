const form = document.getElementById('employeeForm');
const tableBody = document.querySelector('#employeeTable tbody');
const submitButton = document.getElementById('submitButton');
const updateButton = document.getElementById('updateButton');

let selectedEmployeeId = null; // To track employee being updated

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
                <td>
                    <button onclick="editEmployee('${employee.id}')">Edit</button>
                    <button onclick="deleteEmployee('${employee.id}')">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Add a new employee
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

// Update an employee
updateButton.addEventListener('click', async () => {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    await fetch(`/api/employees/${selectedEmployeeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    selectedEmployeeId = null;
    updateButton.style.display = 'none';
    submitButton.style.display = 'inline';
    form.reset();
    fetchEmployees();
});

// Edit an employee
function editEmployee(id) {
    const row = document.querySelector(`tr td:first-child[text="${id}"]`).parentElement;

    form.id.value = row.cells[0].innerText;
    form.firstName.value = row.cells[1].innerText;
    form.lastName.value = row.cells[2].innerText;
    form.salary.value = row.cells[3].innerText;
    form.department.value = row.cells[4].innerText;
    form.email.value = row.cells[5].innerText;

    selectedEmployeeId = id;
    updateButton.style.display = 'inline';
    submitButton.style.display = 'none';
}

// Delete an employee
async function deleteEmployee(id) {
    await fetch(`/api/employees/${id}`, {
        method: 'DELETE',
    });
    fetchEmployees();
}

// Initial fetch
fetchEmployees();
