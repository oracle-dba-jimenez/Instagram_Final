/*
Crear mis publicaciones activas
*/

document.addEventListener("DOMContentLoaded", function () {

    let user = JSON.parse(localStorage.getItem('userLogged'));
    let userToken = JSON.parse(localStorage.getItem('userToken'));

    let params = getSearchParameters();

    let post_id_param = params['key'];
    const imgProfile = document.querySelector("#imgProfile");
    imgProfile.src = user.profile_image;

    const labelName = document.querySelector("#labelName");
    labelName.innerHTML = user.username;

    const inputWhereTitle = document.querySelector("#wheretitle");
    const inputDescription = document.querySelector("#description");
    const specialDiv = document.querySelector("#s_div");

    if (post_id_param == undefined) {

        const form = document.querySelector("#form");
        const loading = document.querySelector("#loading");

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            loading.removeAttribute("style");
            // imagen
            const inputFile = event.target.querySelector("#fileM").files[0];
            // fecha
            const postId = "postId_" + Math.round((new Date().getTime() / 1000));
            const docRef = firestore.doc("posts/" + postId);
            const ref = firebase.storage().ref();
            const name_file = new Date() + "@" + inputWhereTitle.value.trim() + "@PostImage";
            const metadata = { contentType: inputFile.type };

            // Verifica conexión
            firebase.auth().onAuthStateChanged(function (userToken) {
                if (userToken) {
                    const task = ref.child(name_file).put(inputFile, metadata);

                    task
                        .then(snapshot => snapshot.ref.getDownloadURL())
                        .then(url => {
                            let new_post = {
                                id: postId,
                                active: true,
                                date_created: new Date(),
                                description: inputDescription.value,
                                where_title: inputWhereTitle.value,
                                image: url,
                                like: 0,
                                user_id: user.id,
                                username: user.username,
                                user_img: user.profile_image
                            };

                            docRef.set(new_post).then(status => {
                                form.reset();
                                loading.style.display = 'none';
                                swal("Completado!", "La publicación se ha grabado con éxito.", "success");
                            });
                        })
                }
                else {
                    // Usuario no conectado.
                }
            });
        });
    }
    else {

        // Busca mi publicación - post
        const img = document.getElementById("img_p");
        document.getElementById("fileM").required = false;
        db.collection("posts").where('id', '==', post_id_param).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                loading.removeAttribute("style");
                let post = doc.data();

                specialDiv.removeAttribute("style");

                img.src = post.image;

                inputWhereTitle.value = post.where_title;
                inputDescription.value = post.description;

                document.getElementById("createFile").style.display = "none";
                document.getElementById("btnDelete").style.display = "";
                document.getElementById("btn").value = "Actualizar";
                loading.style.display = 'none';

            });
        });

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            loading.removeAttribute("style");

            const inputFile = event.target.querySelector("#otherFile").files[0];

            // Valida conexión para actualizar
            firebase.auth().onAuthStateChanged(function (userToken) {
                if (userToken) {

                    if (inputFile === undefined) {

                        let docRef = db.collection('posts').doc(post_id_param);
                        docRef.update({
                            description: inputDescription.value,
                            where_title: inputWhereTitle.value,
                        }).then(() => {
                            loading.style.display = 'none';
                            swal("Completado!", "La publicación se ha grabado correctamente.", "success");
                        });

                    }
                    else {

                        // Almacena imagen de mi publicación
                        const ref = firebase.storage().ref();
                        const name_file = new Date() + "@" + inputWhereTitle.value.trim() + "@PostImage";
                        const metadata = { contentType: inputFile.type };

                        const task = ref.child(name_file).put(inputFile, metadata);

                        task
                            .then(snapshot => snapshot.ref.getDownloadURL())
                            .then(url => {

                                // Cambia mi publicación - post
                                let docRef = db.collection('posts').doc(post_id_param);
                                docRef.update({
                                    description: inputDescription.value,
                                    where_title: inputWhereTitle.value,
                                    image: url
                                }).then(() => {
                                    loading.style.display = 'none';
                                    img.src = url;
                                    swal("Completado!", "La publicación se ha actualizado correctamente.", "success");

                                });
                            });
                    };

                }
                else {
                    // Usuario no conectado.
                };
            });
        });
    };
});


// Busca parametro de mis publicaciones
function getSearchParameters() {
    let prmstr = window.location.search.substr(1);
    return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
};


// Retorna parametro de mis publicaciones-post
function transformToAssocArray(prmstr) {
    let params = {};
    let prmarr = prmstr.split("&");
    for (let i = 0; i < prmarr.length; i++) {
        let tmparr = prmarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    };
    return params;
};


// Borrar mi publicación - post
function deletePost() {
    swal({
        title: "¿Estas seguro?",
        text: "Una vez eliminada, no podrás recuperar esta publicación!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                loading.removeAttribute("style");
                let params = getSearchParameters();
                let post_id_param = params['key'];
                db.collection("posts").doc(post_id_param).delete().then(function () {
                    loading.style.display = 'none';
                    window.open('profile.html', '_self');
                }).catch(function (error) {
                    console.error("Error removing document: ", error);
                });
            };
        });
};

