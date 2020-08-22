/*
Control del perfil de usuario (usuario, idnombre, nombre, web, biografia, email, genero, telefono, imagen)
*/

document.addEventListener("DOMContentLoaded", function () {
    const loading = document.querySelector("#loading");

    let user = JSON.parse(localStorage.getItem('userLogged'));

    const profile_img = document.querySelector("#profile_img");
    profile_img.src = user.profile_image;

    const name = document.querySelector("#username");
    name.innerHTML = user.username;


    const counter_post = document.querySelector("#postCounter");
    counter_post.innerHTML = 0;

    const person_name = document.querySelector("#personname");
    person_name.innerHTML = user.name;

    const bio = document.querySelector("#bio");
    bio.innerHTML = user.bio;

    const sex = document.querySelector("#sex");

    switch (user.gender) {
        case 'M':
            sex.innerHTML = 'Masculino';
            break;
        case 'F':
            sex.innerHTML = 'Femenino';
            break;
        default:
            sex.innerHTML = 'No definido';
    };

    const tel = document.querySelector("#tel");
    tel.innerHTML = user.phone;

    const anchor = document.querySelector("#webside");
    anchor.innerHTML = user.webside;
    anchor.setAttribute('href', user.webside);

    loading.removeAttribute("style");

    showPost(user.id);

});


// Despliega mis publicaciones
function showPost(user_id) {
    const post_div = document.querySelector("#post_div");
    let counter = 0;
    const counter_post = document.querySelector("#postCounter");

    db.collection("posts").where('user_id', '==', user_id).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let post = doc.data();
            const div = document.createElement('div');
            div.addEventListener("click", () => { window.open('single-post.html?key=' + post.id, '_self') });
            div.className = 'profile__photo';

            div.innerHTML = `

            <img  style="    width: 100%;height: 150px;" src="`+ post.image + `" />
                <div class="profile__photo-overlay">
                    <span class="overlay__item">
                        <i class="fa fa-heart"></i>
                        `+ post.like + `
                       
                    </span>

                </div>
              
                
                
            `;

            post_div.appendChild(div);
            counter_post.innerHTML = ++counter;
        });

        loading.style.display = 'none';
    });
};


// Busca los comentarios de mis publicaciones
function getComments(post_id) {
    let ul = document.getElementById("u@" + post_id);
    db.collection("posts_comments").where('post_id', '==', post_id).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let comment = doc.data();
            ul.innerHTML = " <li><span class=\"photo__comment-author\">" + comment.username + "</span> " + comment.description + "</li><br/>" + ul.innerHTML;
        });
    });
};


// Controla mis me gusta (likes)
function hitLiked(element_id) {
    let li = document.getElementById("h@" + element_id);
    let like_element = document.getElementById("l@" + element_id);
    let like_value = parseInt(like_element.innerHTML);
    let like_new_value = 0;
    if (li.classList.contains("fa-heart-o")) {
        // + 1 like
        li.classList.remove("fa-heart-o");
        li.classList.add("fa-heart");
        li.style.color = 'red';
        like_new_value = (like_value + 1);

    }
    else {
        // - 1 like
        li.classList.remove("fa-heart");
        li.classList.add("fa-heart-o");
        li.style.color = 'black';
        like_new_value = (like_value - 1);
    };

    like_element.innerHTML = like_new_value;
    let docRef = db.collection('posts').doc(element_id);
    docRef.update({
        like: like_new_value
    });
};

