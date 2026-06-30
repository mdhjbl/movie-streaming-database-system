window.onload = async () => {
    if (!Storage.isLoggedIn()) {
        location.href = "login.html";
        return;
    }
    navbar();
    await loadFavorites();
    await loadWatchlist();
};

function navbar() {
    const authButtons = document.getElementById("authButtons");
    authButtons.innerHTML = `
    <a href="profile.html">${Storage.getUsername()}</a>
    <a href="#" id="logout">Logout</a>
    `;
    if (Storage.getRole() === "admin") {
        document.getElementById("navLinks").innerHTML += `
        <li><a href="admin.html">Admin</a></li>
        `;
    }
    document.getElementById("logout").onclick = () => {
        Storage.clear();
        location.href = "index.html";
    };
}

async function loadFavorites() {
    const favorites = await api("/favorites");
    const container = document.getElementById("favoritesContainer");
    container.innerHTML = "";
    for (const fav of favorites) {
        let item;
        let link;
        if (fav.film_id) {
            item = await api("/films/" + fav.film_id);
            link = `movie.html?id=${item.id}`;
        } else if (fav.series_id) {
            item = await api("/series/" + fav.series_id);
            link = `single-series.html?id=${item.id}`;
        }
        if (!item) continue;
        container.innerHTML += `
        <div class="movie-card" style="position: relative;">
            <a href="${link}">
                <img src="images/${item.poster || (fav.film_id ? 'default-movie.jpg' : 'default-series.jpg')}">
                <div class="movie-info">
                    <h3>${item.name}</h3>
                    <p>${item.genre}</p>
                    <span>⭐ ${item.imdb_rating}</span>
                </div>
            </a>
            <button 
                style="position: absolute; top: 5px; right: 5px; background: #e74c3c; border: none; padding: 5px 10px; border-radius: 5px; color: white; cursor: pointer;"
                onclick="removeFavorite(${fav.id}, event)">Remove</button>
        </div>
        `;
    }
}

async function loadWatchlist() {
    const watchlist = await api("/watchlist");
    const container = document.getElementById("watchlistContainer");
    container.innerHTML = "";
    for (const item of watchlist) {
        let media;
        let link;
        if (item.film_id) {
            media = await api("/films/" + item.film_id);
            link = `movie.html?id=${media.id}`;
        } else if (item.series_id) {
            media = await api("/series/" + item.series_id);
            link = `single-series.html?id=${media.id}`;
        }
        if (!media) continue;
        container.innerHTML += `
        <div class="movie-card" style="position: relative;">
            <a href="${link}">
                <img src="images/${media.poster || (item.film_id ? 'default-movie.jpg' : 'default-series.jpg')}">
                <div class="movie-info">
                    <h3>${media.name}</h3>
                    <p>${media.genre}</p>
                    <span>⭐ ${media.imdb_rating}</span>
                </div>
            </a>
            <button 
                style="position: absolute; top: 5px; right: 5px; background: #e74c3c; border: none; padding: 5px 10px; border-radius: 5px; color: white; cursor: pointer;"
                onclick="removeWatchlist(${item.id}, event)">Remove</button>
        </div>
        `;
    }
}

async function removeFavorite(id, event) {
    event.preventDefault();
    if (!confirm("Remove from favorites?")) return;
    await api("/favorites/" + id, "DELETE");
    await loadFavorites();
}

async function removeWatchlist(id, event) {
    event.preventDefault();
    if (!confirm("Remove from watchlist?")) return;
    await api("/watchlist/" + id, "DELETE");
    await loadWatchlist();
}
