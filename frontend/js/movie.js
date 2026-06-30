const id = new URLSearchParams(location.search).get("id");
const poster = document.getElementById("poster");
const title = document.getElementById("title");
const director = document.getElementById("director");
const genre = document.getElementById("genre");
const country = document.getElementById("country");
const language = document.getElementById("language");
const runtime = document.getElementById("runtime");
const release = document.getElementById("release");
const rating = document.getElementById("rating");
const plot = document.getElementById("plot");
const favoriteBtn = document.getElementById("favoriteBtn");
const watchBtn = document.getElementById("watchBtn");
const commentBtn = document.getElementById("commentBtn");
const commentText = document.getElementById("commentText");

window.onload = async () => {
    navbar();
    await loadMovie();
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

async function loadMovie() {
    const movie = await api("/films/" + id);
    poster.src = "images/" + (movie.poster || "default-movie.jpg");
    title.innerText = movie.name;
    director.innerText = movie.director;
    genre.innerText = movie.genre;
    country.innerText = movie.country;
    language.innerText = movie.language;
    runtime.innerText = movie.runtime;
    release.innerText = movie.release_year;
    rating.innerText = movie.imdb_rating;
    plot.innerText = movie.plot;
}

async function loadComments() {
    const data = await api("/comments/film/" + id);
    const div = document.getElementById("comments");
    div.innerHTML = "";
    data.forEach(comment => {
        div.innerHTML += `
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
    await api("/favorites", "POST", { film_id: id });
    alert("Added to favorites!");
};

watchBtn.onclick = async () => {
    if (!Storage.isLoggedIn()) {
        alert("Please login first!");
        return;
    }
    await api("/watchlist", "POST", { film_id: id });
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
    await api("/comments", "POST", { film_id: id, comment });
    commentText.value = "";
    await loadComments();
};
