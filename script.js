// User array to store user objects
let users = [];

// Get form and table elements
const userForm = document.getElementById('userForm');
const userList = document.getElementById('userList');

// Function to add or update a user
function addOrUpdateUser(event) {
    event.preventDefault(); // Prevent form submission

    // Get input values
    const userIdInput = document.getElementById('userId');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');

    // Validate input values
    if (nameInput.value.trim() === '' || emailInput.value.trim() === '') {
        showMessage('error', 'Please enter name and email');
        return;
    }

    const userId = userIdInput.value.trim();

    // Check if the user is being added or updated
    if (userId === '') {
        // Create new user object
        const user = {
            id: generateId(),
            name: nameInput.value.trim(),
            email: emailInput.value.trim()
        };

        // Add user to the array
        users.push(user);

        showMessage('success', 'User added successfully');
    } else {
        // Find the user to be updated
        const user = users.find(u => u.id === userId);

        // Update user details
        user.name = nameInput.value.trim();
        user.email = emailInput.value.trim();

        showMessage('success', 'User updated successfully');

        // Clear the user id input field to allow adding new users
        userIdInput.value = '';
    }

    // Clear input fields
    nameInput.value = '';
    emailInput.value = '';

    // Refresh user list
    displayUsers();
}

// Function to delete a user
function deleteUser(userId) {
    // Remove user from the array based on userId
    users = users.filter(user => user.id !== userId);

    // Refresh user list
    displayUsers();

    showMessage('success', 'User deleted successfully');
}

// Function to edit a user
function editUser(userId) {
    // Find the user to be edited
    const user = users.find(u => u.id === userId);

    // Fill the form with the user's details
    const userIdInput = document.getElementById('userId');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    
    userIdInput.value = user.id;
    nameInput.value = user.name;
    emailInput.value = user.email;
}

// Function to display users in the table
function displayUsers() {
    // Clear previous user list
    userList.innerHTML = '';

    // Loop through users array and add rows to the table
    users.forEach(user => {
        const row = document.createElement('tr');

        // Add user name cell
        const nameCell = document.createElement('td');
        nameCell.innerText = user.name;
        row.appendChild(nameCell);

        // Add user email cell
        const emailCell = document.createElement('td');
        emailCell.innerText = user.email;
        row.appendChild(emailCell);

        // Add action cell with edit and delete buttons
        const actionCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.addEventListener('click', () => {
            editUser(user.id);
        });
        actionCell.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => {
            deleteUser(user.id);
        });
        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);

        // Add row to the table
        userList.appendChild(row);
    });
}

// Function to generate a unique user id
function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// Function to show messages
function showMessage(type, message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(type);
    messageDiv.innerText = message;
    userForm.insertBefore(messageDiv, userForm.firstChild);

    // Remove message after 3 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Event listener for form submission
userForm.addEventListener('submit', addOrUpdateUser);
