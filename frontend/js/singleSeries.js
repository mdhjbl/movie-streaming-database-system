const id = new URLSearchParams(location.search).get("id");
const poster = document.getElementById("poster");
const title = document.getElementById("title");
const director = document.getElementById("director");
const genre = document.getElementById("genre");
const country = document.getElementById("country");
const language = document.getElementById("language");
const releaseYear = document.getElementById("releaseYear");
const rating = document.getElementById("rating");
const plot = document.getElementById("plot");
const comments = document.getElementById("comments");
const favoriteBtn = document.getElementById("favoriteBtn");
const watchBtn = document.getElementById("watchBtn");
const commentBtn = document.getElementById("commentBtn");
const commentText = document.getElementById("commentText");
const seasonContainer = document.getElementById("seasonContainer");

let seasonsCache = [];
let currentExpandedSeason = null;

window.onload = async () => {
    navbar();
    await loadSeries();
    await loadSeasons();
    await loadComments();
};

function navbar() {
    const authButtons = document.getElementById("authButtons");
    if (!Storage.isLoggedIn()) {
        authButtons.innerHTML = `
        <a href="login.html">Login</a>
        <a href="register.html">Register</a>
        `;
        return;
    }
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

async function loadSeries() {
    const data = await api("/series/" + id);
    poster.src = "images/" + (data.poster || "default-series.jpg");
    title.innerText = data.name;
    director.innerText = data.director;
    genre.innerText = data.genre;
    country.innerText = data.country;
    language.innerText = data.language;
    releaseYear.innerText = data.release_year;
    rating.innerText = data.imdb_rating;
    plot.innerText = data.plot;
}

async function loadSeasons() {
    seasonsCache = await api("/series/" + id + "/seasons");
    renderSeasons();
}

async function renderSeasons() {
    seasonContainer.innerHTML = "";
    for (const season of seasonsCache) {
        const seasonDiv = document.createElement("div");
        seasonDiv.className = "season-card";
        
        const header = document.createElement("div");
        header.className = "season-header";
        header.innerHTML = `
            <span class="season-arrow">▶</span>
            <span>Season ${season.season_number} (${season.episode_count} episodes)</span>
        `;
        header.onclick = () => toggleSeason(season.id, seasonDiv);
        
        const episodesDiv = document.createElement("div");
        episodesDiv.className = "episodes-container hidden";
        episodesDiv.id = `episodes-${season.id}`;
        
        seasonDiv.appendChild(header);
        seasonDiv.appendChild(episodesDiv);
        seasonContainer.appendChild(seasonDiv);
    }
}

async function toggleSeason(seasonId, seasonDiv) {
    const episodesDiv = document.getElementById(`episodes-${seasonId}`);
    
    if (currentExpandedSeason === seasonId) {
        episodesDiv.classList.add("hidden");
        seasonDiv.querySelector(".season-arrow").textContent = "▶";
        currentExpandedSeason = null;
    } else {
        if (currentExpandedSeason) {
            const prevDiv = document.getElementById(`episodes-${currentExpandedSeason}`);
            if (prevDiv) {
                prevDiv.classList.add("hidden");
                const prevHeader = prevDiv.parentElement.querySelector(".season-arrow");
                if (prevHeader) prevHeader.textContent = "▶";
            }
        }
        
        episodesDiv.classList.remove("hidden");
        seasonDiv.querySelector(".season-arrow").textContent = "▼";
        
        if (episodesDiv.children.length === 0) {
            await loadEpisodes(seasonId, episodesDiv);
        }
        
        currentExpandedSeason = seasonId;
    }
}

async function loadEpisodes(seasonId, container) {
    try {
        const episodes = await api("/series/season/" + seasonId + "/episodes");
        container.innerHTML = "";
        
        if (episodes.length === 0) {
            container.innerHTML = "<p class='no-episodes'>No episodes found</p>";
            return;
        }
        
        for (const ep of episodes) {
            const epDiv = document.createElement("div");
            epDiv.className = "episode-card";
            epDiv.innerHTML = `
                <div class="episode-number">${ep.episode_number}</div>
                <div class="episode-info">
                    <div class="episode-title">${ep.title}</div>
                    <div class="episode-meta">
                        ${ep.runtime ? `${ep.runtime} min` : ""}
                        ${ep.air_date ? ` • ${ep.air_date}` : ""}
                    </div>
                    ${ep.plot ? `<div class="episode-plot">${ep.plot}</div>` : ""}
                </div>
            `;
            container.appendChild(epDiv);
        }
    } catch (err) {
        container.innerHTML = `<p class='no-episodes'>Failed to load episodes</p>`;
    }
}

async function loadComments() {
    const data = await api("/comments/series/" + id);
    comments.innerHTML = "";
    data.forEach(comment => {
        comments.innerHTML += `
        <div class="comment">
            <h4>${comment.username}</h4>
            <p>${comment.comment}</p>
        </div>
        `;
    });
}

favoriteBtn.onclick = async () => {
    if (!Storage.isLoggedIn()) {
        alert("Please login first!");
        return;
    }
    await api("/favorites", "POST", { series_id: id });
    alert("Added to favorites!");
};

watchBtn.onclick = async () => {
    if (!Storage.isLoggedIn()) {
        alert("Please login first!");
        return;
    }
    await api("/watchlist", "POST", { series_id: id });
    alert("Added to watchlist!");
};

commentBtn.onclick = async () => {
    if (!Storage.isLoggedIn()) {
        alert("Please login first!");
        return;
    }
    const comment = commentText.value.trim();
    if (!comment) {
        alert("Please write a comment!");
        return;
    }
    await api("/comments", "POST", { series_id: id, comment });
    commentText.value = "";
    await loadComments();
};
