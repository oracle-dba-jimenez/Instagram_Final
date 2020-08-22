/*
Editar Perfil (usuario, idnombre, nombre, web, biografia, email, genero, telefono, imagen)
*/

document.addEventListener("DOMContentLoaded", function () {

    let user = JSON.parse(localStorage.getItem('userLogged'));
    let userToken = JSON.parse(localStorage.getItem('userToken'));

    const imgProfile = document.querySelector("#imgProfile");
    imgProfile.src = user.profile_image;

    const labelName = document.querySelector("#labelName");
    labelName.innerHTML = user.username;

    const fullName = document.querySelector("#full-name");
    fullName.value = user.name;

    const userName = document.querySelector("#user-name");
    userName.value = user.username;

    const webside = document.querySelector("#website");
    webside.value = user.webside;

    const bio = document.querySelector("#bio");
    bio.value = user.bio;

    const email = document.querySelector("#email");
    email.value = user.email;

    const gender = document.querySelector("#gender");
    gender.value = user.gender;

    const form = document.querySelector("#form");
    const loading = document.querySelector("#loading");

    let phoneMask = IMask(
        document.getElementById('phone'), {
        mask: '+{1}(000) 000-0000'
    });

    const phone = document.querySelector("#phone");
    phone.value = user.phone;

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        loading.removeAttribute("style");

        const inputFile = event.target.querySelector("#myFile").files[0];

        let new_values = {
            name: fullName.value,
            webside: webside.value,
            bio: bio.value,
            phone: phone.value,
            gender: gender.value,
            profile_image: user.profile_image,
            password: user.password
        };


        // Imagen del perfil
        if (inputFile != null) {

            // Verifica conexión
            firebase.auth().onAuthStateChanged(function (userToken) {
                if (userToken) {

                    const ref = firebase.storage().ref();
                    const name_file = new Date() + "@" + userName.value.trim() + "@PostImage";
                    const metadata = {
                        contentType: inputFile.type
                    };

                    const task = ref.child(name_file).put(inputFile, metadata);

                    task
                        .then(snapshot => snapshot.ref.getDownloadURL())
                        .then(url => {

                            // Busca las publicaciones
                            db.collection("posts").where('user_id', '==', user.id).get().then((querySnapshot) => {
                                querySnapshot.forEach((doc) => {
                                    let post = doc.data();
                                    console.log(post);
                                    let deft = db.collection('posts').doc(post.id);
                                    deft.update({
                                        active: true,
                                        user_img: url
                                    });

                                });

                                // Actualiza datos cambiados del usuario y foto
                                new_values.profile_image = url;
                                let docRef = db.collection('users').doc(user.id);
                                docRef.update(new_values).then(status => {

                                    user.bio = new_values.bio;
                                    user.name = new_values.name;
                                    user.webside = new_values.webside;
                                    user.phone = new_values.phone;
                                    user.gender = new_values.gender;
                                    user.profile_image = url;
                                    localStorage.setItem('userLogged', JSON.stringify(user));
                                    loading.style.display = 'none';

                                    setTimeout(function () {
                                        swal({
                                            title: "Completado!",
                                            text: "La información ha sido actualizada!",
                                            type: "success"
                                        }).then(function () {
                                            window.open('profile.html', '_self');
                                        });
                                    }, 1000);

                                });

                            });

                        })

                } else {
                    // Usuario no conectado.
                }
            });


            // Actualiza datos cambiados del usuario sin cambiar foto
        }
        else {
            let docRef = db.collection('users').doc(user.id);
            docRef.update(new_values).then(status => {

                user.bio = new_values.bio;
                user.name = new_values.name;
                user.webside = new_values.webside;
                user.phone = new_values.phone;
                user.gender = new_values.gender;
                localStorage.setItem('userLogged', JSON.stringify(user));
                loading.style.display = 'none';
                setTimeout(function () {
                    swal({
                        title: "Completado!",
                        text: "La información ha sido actualizada!",
                        type: "success"
                    }).then(function () {
                        window.open('profile.html', '_self');
                    });
                }, 1000);
            });

        };

    });
});

