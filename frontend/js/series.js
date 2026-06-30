const container = document.getElementById("seriesContainer");

const authButtons = document.getElementById("authButtons");

const searchInput = document.getElementById("searchInput");

let series = [];

window.onload = async () => {

    navbar();

    series = await api("/series");

    showSeries(series);

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

function showSeries(list){

    container.innerHTML="";

    list.forEach(item=>{

        container.innerHTML+=`

        <div class="movie-card">

            <img src="images/${item.poster || "default-series.jpg"}">

            <div class="movie-info">

                <h3>${item.name}</h3>

                <p>${item.genre}</p>

                <p>${item.release_year}</p>

                <span>

                ⭐ ${item.imdb_rating}

                </span>

                <br><br>

                <a href="single-series.html?id=${item.id}">

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

    showSeries(

        series.filter(item=>

            item.name.toLowerCase().includes(value)

        )

    );

});