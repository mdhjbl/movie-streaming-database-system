const form = document.getElementById("loginForm");

form.addEventListener("submit", login);

async function login(e){

    e.preventDefault();

    const email=document.getElementById("email").value;

    const password=document.getElementById("password").value;

    const data=await api(

        "/auth/login",

        "POST",

        {

            email,

            password

        }

    );

    if(data.token){

        Storage.saveToken(data.token);

        Storage.saveRole(data.role);

        Storage.saveUsername(data.username);

        window.location.href="index.html";

    }

    else{

        alert(data.message);

    }

}