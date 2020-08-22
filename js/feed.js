/*
Ver todas las publicaciones - post del InstaFamily
*/

// Despliega publicación - post con sus comentarios y me gusta (likes)
document.addEventListener("DOMContentLoaded", function () {
    const user = JSON.parse(localStorage.getItem('userLogged'));
    const feed = document.querySelector("#feed");
    const loading = document.querySelector("#loading");
    loading.removeAttribute("style");

    db.collection("posts").orderBy('date_created', "desc").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let post = doc.data();

            const div = document.createElement('div');

            div.className = 'photo';

            div.innerHTML = `
            <div class="photo">
            <header style="cursor: default;"  class="photo__header" onClick="detectProfile('`+ user.id + `','` + post.user_id + `')">
                <img style="width: 32px !important;height: 32px;" src="`+ post.user_img + `" class="photo__avatar" />
                <div class="photo__user-info">
                    <span class="photo__author">`+ post.username + `</span>
                    <span class="photo__location">`+ post.where_title + `</span>
                </div>
            </header>
            <img src="`+ post.image + `" />
            <div class="photo__info">
                <div class="photo__actions">
                    <span class="photo__action">
                        <i id='h@`+ post.id + `' onClick="hitLiked('` + post.id + `')" class="fa fa-heart-o fa-lg"></i>
                    </span>
                 
                </div>
                <span class="photo__likes"><span id='l@`+ post.id + `' >` + post.like + `</span> Me gusta</span>
                <span class="photo__comment">
                <span class="photo__comment-author" style="font-weight: 600;">`+ post.username + `</span> ` + post.description + `
            </span>
            
                <ul id='u@`+ post.id + `' class="photo__comments" style="margin-top: 3%;">  </ul>
                
                <span class="photo__time-ago">COMENTARIOS</span>
                <div class="photo__add-comment-container">
 
                <textarea href="javascript:void(0)"  id="d@`+ post.id + `" placeholder="Añadir un comentario..."></textarea>
                <a class="anchorComment" onClick="makeComment('d@`+ post.id + `')">Publicar</a> 
                
                </div>
            </div>
        </div>
            `;

            feed.appendChild(div);

            loading.style.display = 'none';

        });
    });
    makeHapped();

    loading.style.display = 'none';

});


// Determina quien hace el comentario en publicación propia o no
function detectProfile(user_logged_id, post_user_id) {
    if (user_logged_id == post_user_id) {
        window.open('profile.html', '_self');
    }
    else {
        window.open('my-profile.html?key=' + post_user_id, '_self');
    };
};


// Añade el comentario a la publicación - post (post activos)
function makeComment(textareaId) {
    let user = JSON.parse(localStorage.getItem('userLogged'));
    let id = textareaId;
    let ulId = textareaId.substring(1);
    let comment = document.getElementById(id).value;

    if (comment.length > 0) {
        loading.removeAttribute("style");
        let ul = document.getElementById("u" + ulId);

        const post_comment_Id = "post_comment_Id_" + Math.round((new Date().getTime() / 1000));
        const docRef = firestore.doc("posts_comments/" + post_comment_Id);
        let new_post_comment = {
            id: post_comment_Id,
            post_id: textareaId.substring(2),
            active: true,
            date_created: new Date(),
            description: comment,
            user_id: user.id,
            username: user.username,
        };

        docRef.set(new_post_comment).then(status => {
            ul.innerHTML = " <li><span class=\"photo__comment-author\">" + user.username + "</span> " + comment + "</li><br/>" + ul.innerHTML;
            loading.style.display = 'none';
            document.getElementById(id).value = "";
        });

    };

};


// Recarga cambios a publicación
function makeHapped() {
    db.collection("posts").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let post = doc.data();
            getComments(post.id);
        });
    });
};


// Carga los comentarios de la publicación
function getComments(post_id) {
    let ul = document.getElementById("u@" + post_id);

    db.collection("posts_comments").where('post_id', '==', post_id).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let comment = doc.data();
            ul.innerHTML = " <li><span class=\"photo__comment-author\">" + comment.username + "</span> " + comment.description + "</li><br/>" + ul.innerHTML;
        });
    });
};


// Actualiza los me gusta (likes)
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

