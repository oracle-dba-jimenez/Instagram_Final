/*
Control de crear usuario nuevo
*/

document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector("#form");
    const loading = document.querySelector("#loading");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        loading.removeAttribute("style");

        const inputFile = event.target.querySelector("#file").files[0];
        const inputEmail = event.target.querySelector("#email").value;
        const inputName = event.target.querySelector("#name").value;
        const inputUserName = event.target.querySelector("#username").value;
        const inputPassWord = event.target.querySelector("#password").value;

        // Imagen del perfil
        const ref = firebase.storage().ref();
        const name_file = new Date() + "@" + inputUserName + "@ProfileImage";
        const metadata = { contentType: inputFile.type };

        // Uso de Auth de firebase de google
        let dataUserHolder = {};
        firebase.auth().createUserWithEmailAndPassword(inputEmail, inputPassWord)
            .then(dataUser => {

                dataUserHolder = dataUser.user;
                firebase.auth().onAuthStateChanged(function (dataUserHolder) {
                    if (dataUserHolder) {

                        // Crea usuario en colección de datos para perfiles
                        const docRef = firestore.doc("users/" + dataUserHolder.uid);
                        const task = ref.child(name_file).put(inputFile, metadata);

                        task
                            .then(snapshot => snapshot.ref.getDownloadURL())
                            .then(url => {

                                let new_user = {
                                    id: dataUserHolder.uid,
                                    active: true,
                                    bio: "",
                                    date_created: new Date(),
                                    email: inputEmail,
                                    gender: "",
                                    name: inputName,
                                    username: inputUserName,
                                    password: inputPassWord,
                                    phone: "",
                                    profile_image: url,
                                    webside: ""
                                };

                                docRef.set(new_user).then(status => {
                                    form.reset();
                                    loading.style.display = 'none';
                                    swal("Correcto!", "La cuenta se ha creado con éxito", "success");

                                });

                            });
                    }
                    else {
                        // Usuario no conectado.
                    }
                });

            }).catch(function (error) {
                // Maneja error.
                let errorCode = error.code;
                let errorMessage = error.message;
                // 
            });
    });
});

