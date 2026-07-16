// ===============================
// SIGN UP
// ===============================

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        // Validation
        if (!name || !email || !phone || !password || !confirmPassword) {
            alert("Please fill in all fields.");
            return;
        }

        // Kenyan phone number validation
        const phoneRegex = /^(07|01)\d{8}$/;

        if (!phoneRegex.test(phone)) {
            alert("Enter a valid phone number.");
            return;
        }

        // Password validation
        if (password.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        // Get users
        let users = JSON.parse(localStorage.getItem("tasknest_users")) || [];

        // Check duplicate phone number
        const exists = users.find(user => user.phone === phone);

        if (exists) {
            alert("An account with this phone number already exists.");
            return;
        }

        // Save user
        users.push({

    id: crypto.randomUUID(),

    name,

    email,

    phone,

    password

});

        localStorage.setItem("tasknest_users", JSON.stringify(users));

        alert("🎉 Account created successfully!");

        window.location.href = "login.html";

    });

}
// ===============================
// LOGIN
// ===============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const phone = document.getElementById("loginPhone").value.trim();
        const password = document.getElementById("loginPassword").value;

        let users = JSON.parse(localStorage.getItem("tasknestUsers")) || [];

        const user = users.find(u =>
            u.phone === phone &&
            u.password === password
        );

        if (!user) {

            alert("Invalid phone number or password.");

            return;

        }

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(user)
        );

        window.location.href = "dashboard.html";

    });

}