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



  document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const navList = document.querySelector('.nav-list');

    if (isLoggedIn) {
        const registerLink = navList.querySelector('a[href="register.html"]');
        const loginLink = navList.querySelector('a[href="login.html"]');

        if (registerLink) registerLink.textContent = 'Spēle';
        if (loginLink) {
            loginLink.textContent = 'Profils';
            loginLink.href = 'profile.html';
        }
    }
});

function loginSuccess() {
    localStorage.setItem('isLoggedIn', true);
    window.location.href = 'profile.html';
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
}

async function register() {
    const emailInput = document.getElementById("epasts").value;
    const passwordInput = document.getElementById("parole").value;

    try {
        const response = await fetch('./data/users.json');
        const users = await response.json();

        const user = users.find(u => u.epasts === emailInput && u.parole === passwordInput);

        if (user) {
            alert('Laipni lūdzam, Vadims!');
            window.location.href = "profile.html";
        } else {
            alert('Kaut kas nepareizi, mēģini vēl.');
        }
    } catch (error) {
        console.error('Radās sistēmas kļūda:', error);
        alert('An error occurred while logging in.');
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const categories = [
        { name: "electronics", file: "./data/electronics.json" },
        { name: "shops", file: "./data/shops.json" },
        { name: "parks", file: "./data/parks.json" },
        { name: "clubsbars", file: "./data/clubars.json" },
        { name: "views", file: "./data/views.json" }
    ];

    const placesList = document.getElementById("places-list");
    const categorySelect = document.getElementById("category-select");
    const placeDetails = document.getElementById("place-details");

    let allPlaces = [];

    const fetchData = async () => {
        const promises = categories.map(category =>
            fetch(category.file).then(response => response.json())
        );
        const results = await Promise.all(promises);
        allPlaces = results.flat();
        displayPlaces(allPlaces); 
    };

    const displayPlaces = (places) => {
        placesList.innerHTML = "";
        places.forEach(place => {
            const placeCard = document.createElement("div");
            placeCard.classList.add("place-cards");

            placeCard.innerHTML = `
                <div class="place-name">
                    <h2>${place.name}</h2>
                </div>
            `;

            placeCard.addEventListener("mouseenter", () => showPlaceDetails(place));
            placeCard.addEventListener("mouseleave", () => hidePlaceDetails());

            placesList.appendChild(placeCard);
        });
    };

    const showPlaceDetails = (place) => {
        placeDetails.style.display = 'block';
        placeDetails.innerHTML = `
            <h2>${place.name}</h2>
            <p><strong>Description:</strong> ${place.description}</p>
            <p><strong>Address:</strong> ${place.address}</p>
            <p><strong>Rating:</strong> ⭐ ${place.rating}</p>
            <div class="schedule-container">
                <span class="hover-label"><strong>Schedule</strong></span>
                <div class="schedule">
                    <ul>
                        ${Object.entries(place.schedule).map(([day, hours]) => `
                            <li><strong>${day}:</strong> ${hours}</li>
                        `).join('')}
                    </ul>
                </div>
            </div>
            <img src="${place.image}" alt="${place.name}">
        `;
    };

    const hidePlaceDetails = () => {
        placeDetails.style.display = 'none';
    };

    categorySelect.addEventListener("change", (event) => {
        const selectedCategory = event.target.value;
        if (selectedCategory === "all") {
            displayPlaces(allPlaces);
        } else {
            const filteredPlaces = allPlaces.filter(place =>
                categories.find(cat => cat.name === selectedCategory)?.file.includes(place.name)
            );
            displayPlaces(filteredPlaces);
        }
    });

    fetchData();
});