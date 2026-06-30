const form = document.getElementById("registerForm");

form.addEventListener("submit", register);

async function register(e){

    e.preventDefault();

    const username = document.getElementById("username").value;

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    const birth_year = document.getElementById("birth_year").value;

    const result = await api(

        "/auth/register",

        "POST",

        {

            username,

            email,

            password,

            birth_year

        }

    );

    alert(result.message);

    if(result.message==="Register Successful"){

        location.href="login.html";

    }

}