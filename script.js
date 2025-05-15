// Show Signup Section
function showSignup() {
    document.getElementById('signupSection').style.display = 'block';
}

// Handle Login
function login() {
    fetch('/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            username: document.getElementById('loginUsername').value,
            password: document.getElementById('loginPassword').value
        })
    }).then(response => {
        if (response.ok) {
            localStorage.setItem('loggedIn', 'true');  // Optional for basic session
            window.location.href = 'dashboard.html';
        } else {
            alert('Login failed! Check credentials.');
        }
    });
}

// Handle Signup
function signup() {
    fetch('/auth/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            username: document.getElementById('signupUsername').value,
            password: document.getElementById('signupPassword').value
        })
    }).then(response => {
        if (response.ok) {
            alert('Signup successful! Please login.');
            document.getElementById('signupSection').style.display = 'none';
        } else {
            alert('Signup failed! Try again.');
        }
    });
}

// Load Employees in Dashboard
function loadEmployees() {
    fetch('/employees')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('employeeTable');
            table.innerHTML = `<tr><th>Name</th><th>Department</th><th>Salary</th><th>Actions</th></tr>` +
                data.map(e => `
                    <tr>
                        <td>${e.name}</td>
                        <td>${e.department}</td>
                        <td>${e.salary}</td>
                        <td>
                            <button onclick="deleteEmployee('${e.id}')">Delete</button>
                        </td>
                    </tr>
                `).join('');
        });
}

// Add Employee
function addEmployee() {
    const employee = {
        name: document.getElementById('name').value,
        department: document.getElementById('department').value,
        salary: parseFloat(document.getElementById('salary').value)
    };

    fetch('/employees', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(employee)
    }).then(() => loadEmployees());
}

// Delete Employee
function deleteEmployee(id) {
    fetch(`/employees/${id}`, {method: 'DELETE'})
        .then(() => loadEmployees());
}

// Handle Logout
function logout() {
    localStorage.removeItem('loggedIn');
    window.location.href = 'login.html';
}

// Auto Load Employees when dashboard opens
if (window.location.pathname.endsWith('dashboard.html')) {
    loadEmployees();
}
