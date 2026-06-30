const movieContainer = document.getElementById("movieContainer");
const seriesContainer = document.getElementById("seriesContainer");
const authButtons = document.getElementById("authButtons");

window.onload = () => {
    loadNavbar();
    loadMovies();
    loadSeries();
};

function loadNavbar() {
    authButtons.innerHTML = "";
    if (!Storage.isLoggedIn()) {
        authButtons.innerHTML = `
        <a href="login.html">Login</a>
        <a href="register.html">Register</a>
        `;
        return;
    }
    let html = `
    <a href="profile.html">${Storage.getUsername()}</a>
    `;
    if (Storage.getRole() === "admin") {
        document.getElementById("navLinks").innerHTML += `
        <li><a href="admin.html">Admin</a></li>
        `;
    }
    html += `
    <a href="#" id="logoutBtn">Logout</a>
    `;
    authButtons.innerHTML = html;
    document.getElementById("logoutBtn").onclick = () => {
        Storage.clear();
        location.reload();
    };
}

async function loadMovies() {
    const movies = await api("/films");
    movieContainer.innerHTML = "";
    movies.forEach(movie => {
        movieContainer.innerHTML += `
        <a href="movie.html?id=${movie.id}" style="text-decoration: none; color: inherit;">
            <div class="movie-card">
                <img src="images/${movie.poster || 'default-movie.jpg'}">
                <div class="movie-info">
                    <h3>${movie.name}</h3>
                    <p>${movie.genre}</p>
                    <span>⭐ ${movie.imdb_rating}</span>
                </div>
            </div>
        </a>
        `;
    });
}

async function loadSeries() {
    const series = await api("/series");
    seriesContainer.innerHTML = "";
    series.forEach(item => {
        seriesContainer.innerHTML += `
        <a href="single-series.html?id=${item.id}" style="text-decoration: none; color: inherit;">
            <div class="movie-card">
                <img src="images/${item.poster || 'default-series.jpg'}">
                <div class="movie-info">
                    <h3>${item.name}</h3>
                    <p>${item.genre}</p>
                    <span>⭐ ${item.imdb_rating}</span>
                </div>
            </div>
        </a>
        `;
    });
}
