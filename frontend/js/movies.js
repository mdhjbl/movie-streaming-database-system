const container = document.getElementById("movieContainer");

const authButtons = document.getElementById("authButtons");

const searchInput = document.getElementById("searchInput");

let movies = [];

window.onload = async () => {

    navbar();

    movies = await api("/films");

    showMovies(movies);

}

function navbar(){

    if(!Storage.isLoggedIn()){

        authButtons.innerHTML=`

        <a href="login.html">Login</a>

        <a href="register.html">Register</a>

        `;

        return;

    }

    authButtons.innerHTML=`

    <a href="profile.html">

    ${Storage.getUsername()}

    </a>

    <a href="#" id="logout">

    Logout

    </a>

    `;

    if(Storage.getRole()=="admin"){

        document.getElementById("navLinks").innerHTML+=`

        <li>

        <a href="admin.html">

        Admin

        </a>

        </li>

        `;

    }

    document.getElementById("logout").onclick=()=>{

        Storage.clear();

        location.reload();

    }

}

function showMovies(list){

    container.innerHTML="";

    list.forEach(movie=>{

        container.innerHTML+=`

        <div class="movie-card">

        <img src="images/${movie.poster || "default-movie.jpg"}">

        <div class="movie-info">

        <h3>${movie.name}</h3>

        <p>${movie.genre}</p>

        <p>${movie.release_year}</p>

        <span>

        ⭐ ${movie.imdb_rating}

        </span>

        <br><br>

        <a href="movie.html?id=${movie.id}">

        <button>

        View Details

        </button>

        </a>

        </div>

        </div>

        `;

    });

}

searchInput.addEventListener("keyup",()=>{

    const value=searchInput.value.toLowerCase();

    const filtered=movies.filter(movie=>{

        return movie.name.toLowerCase().includes(value);

    });

    showMovies(filtered);

});