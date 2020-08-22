/*
Ver los perfiles de usuarios
*/

// Carga perfiles usuarios
document.addEventListener("DOMContentLoaded", function () {
    const feed = document.querySelector("#mainlist");
    const loading = document.querySelector("#loading");
    let user = JSON.parse(localStorage.getItem('userLogged'));
    loading.removeAttribute("style");

    db.collection("users").orderBy('username', "desc").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let user_s = doc.data();

            if (user_s.id != user.id) {

                const li = document.createElement('li');
                li.className = "explore__user";

                li.innerHTML = `
                <div class="explore__user-column">
                <img style="height: 55px;width: 55px;" src="`+ user_s.profile_image + `" class="explore__avatar"/>
                <div class="explore__info">
                    <span class="explore__username">`+ user_s.username + `</span>
                    <span class="explore__full-name">`+ user_s.name + `</span>
                </div>
                </div>
                <div class="explore__user-column">
                    <button onClick="window.open('my-profile.html?key=`+ user_s.id + `','_self')">Ver perfil</button>
                </div>
                `
                feed.appendChild(li);

            };

            loading.style.display = 'none';


        });
    });

});


// Busca un perfil por el nombre
function search() {
    let input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("mainlist");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByClassName("explore__full-name")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        }
        else {
            li[i].style.display = "none";
        };
    };
};

