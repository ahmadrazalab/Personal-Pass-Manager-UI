function generatePassword() {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&";
    // const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[]|:;<>,.?/~";
    let password = "";
    for (let i = 0; i < length; ++i) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    document.getElementById("password").value = password;
}

document.getElementById("passwordForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const url = document.getElementById("url").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    fetch('/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, username, password }),
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        document.getElementById("url").value = '';
        document.getElementById("username").value = '';
        document.getElementById("password").value = '';
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

window.onload = function() {
    fetch('/passwords')
    .then(response => response.json())
    .then(data => {
        const passwordDisplay = document.getElementById("passwordDisplay");
        data.forEach(password => {
            passwordDisplay.innerHTML += `
                <div class="password-item">
                    <p><strong>URL:</strong> ${password.url}</p>
                    <p><strong>Username:</strong> ${password.username}</p>
                    <p><strong>Password:</strong> ${password.password}</p>
                    <button class="delete-button" data-id="${password.id}">Delete</button>
                    <hr>
                </div>
            `;
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    // Add event listener to toggle passwords button
    const togglePasswordsButton = document.getElementById("togglePasswords");
    togglePasswordsButton.addEventListener("click", function() {
        const passwordsList = document.getElementById("passwordDisplay");
        if (passwordsList.style.display === "none") {
            passwordsList.style.display = "block";
            togglePasswordsButton.textContent = "Hide Passwords";
        } else {
            passwordsList.style.display = "none";
            togglePasswordsButton.textContent = "Show Passwords";
        }
    });

    // Add event listener to delete buttons
    document.addEventListener("click", function(event) {
        if (event.target.classList.contains("delete-button")) {
            const passwordId = event.target.dataset.id;
            fetch(`/delete/${passwordId}`, {
                method: 'DELETE'
            })
            .then(response => response.text())
            .then(data => {
                alert(data);
                // Refresh displayed passwords after deletion
                fetch('/passwords')
                .then(response => response.json())
                .then(data => {
                    const passwordDisplay = document.getElementById("passwordDisplay");
                    passwordDisplay.innerHTML = ""; // Clear existing content
                    data.forEach(password => {
                        const passwordItem = document.createElement("div");
                        passwordItem.classList.add("password-item");
                        passwordItem.innerHTML = `
                            <p><strong>URL:</strong> ${password.url}</p>
                            <p><strong>Username:</strong> ${password.username}</p>
                            <p><strong>Password:</strong> ${password.password}</p>
                            <button class="delete-button" data-id="${password.id}">Delete</button>
                            <hr>
                        `;
                        passwordDisplay.appendChild(passwordItem);
                    });
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    });
};
