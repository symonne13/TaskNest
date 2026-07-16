// ======================================
// TASKNEST AUTHENTICATION
// ======================================

const USERS_KEY = "tasknest_users";
const CURRENT_USER_KEY = "loggedInUser";

// ======================
// SIGN UP
// ======================

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        console.log("Signup started");

        if (!name || !email || !phone || !password || !confirmPassword) {
            alert("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        let users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

        console.log("Users before save:", users);

        users.push({
            id: crypto.randomUUID(),
            name,
            email,
            phone,
            password
        });

        localStorage.setItem(
            USERS_KEY,
            JSON.stringify(users)
        );

        console.log("Users after save:", users);
        console.log("Stored value:", localStorage.getItem(USERS_KEY));

        alert("Signup successful");

        window.location.href = "login.html";

    });

}

// ======================
// LOGIN
// ======================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const phone = document.getElementById("loginPhone").value.trim();
        const password = document.getElementById("loginPassword").value;

        const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

        console.log("Users:", users);
        console.log("Phone:", phone);
        console.log("Password:", password);

        const user = users.find(
            u => u.phone === phone && u.password === password
        );

        console.log("Matched:", user);

        if (!user) {
            alert("Invalid phone number or password.");
            return;
        }

        localStorage.setItem(
            CURRENT_USER_KEY,
            JSON.stringify(user)
        );

        window.location.href = "dashboard.html";

    });

}