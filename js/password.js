/*
Cambio de contraseña de usuario para entrada
*/

document.addEventListener("DOMContentLoaded", function () {

    let user = JSON.parse(localStorage.getItem('userLogged'));
    const imgProfile = document.querySelector("#imgProfile");
    imgProfile.src = user.profile_image;

    const labelName = document.querySelector("#labelName");
    labelName.innerHTML = user.username;

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        loading.removeAttribute("style");

        const passwordOne = event.target.querySelector("#password1").value;
        const passwordTwo = event.target.querySelector("#password2").value;

        if (passwordOne === passwordTwo) {
            if (passwordOne.length >= 6) {

                let docRef = db.collection('users').doc(user.id);
                docRef.update({ password: passwordOne }).then(status => {

                    let userToken = firebase.auth().currentUser;

                    console.log(userToken);

                    userToken.updatePassword(passwordOne).then(function () {
                        localStorage.clear();

                        loading.style.display = 'none';

                        setTimeout(function () {
                            swal({
                                title: "Completado!",
                                text: "La contraseña ha sido cambiada!",
                                type: "success"
                            }).then(function () {
                                window.open('index.html', '_self');
                            });
                        }, 1000);
                    }).catch(function (error) {
                        // Error.
                        console.log(error);
                    });
                });
            }
            else {
                swal("Corrija!", "Asegúrese que la contraseña tenga al menos 6 caracteres", "error");
                loading.style.display = 'none';
            }
        }
        else {
            swal("Corrija!", "Asegúrese de que ambos campos estén llenos con la misma contraseña.", "error");
            loading.style.display = 'none';
        };

    });
});

