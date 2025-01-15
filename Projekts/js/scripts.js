document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById("login-button");
    const loginDialog = document.getElementById("login-dialog");
    const closeDialog = document.getElementById("close-dialog");

    loginButton.addEventListener("click", () => {
        loginDialog.style.display = "block";
    });

    closeDialog.addEventListener("click", () => {
        loginDialog.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === loginDialog) {
            loginDialog.style.display = "none";
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navList = document.querySelector(".nav-list");

    hamburger.addEventListener("click", () => {
        navList.classList.toggle("active");
    });
});
