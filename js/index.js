/*
Control principal de entrada
*/

document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector("#form");
    const loading = document.querySelector("#loading");


    form.addEventListener("submit", function (event) {
        event.preventDefault();
        loading.removeAttribute("style");

        const inputUserEmail = event.target.querySelector("#username").value;
        const inputPassWord = event.target.querySelector("#password").value;

        firebase.auth().signInWithEmailAndPassword(inputUserEmail, inputPassWord)
            .then(dataUser => {

                let docRef = db.collection('users').doc(dataUser.user.uid);
                docRef.get().then(function (doc) {

                    if (doc.exists) {
                        localStorage.setItem('userToken', JSON.stringify(dataUser.user));
                        localStorage.setItem('userLogged', JSON.stringify(doc.data()));
                        window.open('feed.html', '_self');
                        loading.style.display = 'none';
                        return 0;
                    }
                    else {
                        // doc.data() Podria no estar definido
                        console.log("No such document!");
                        console.log(doc);
                    };
                }).catch(function (error) {
                    console.log("Error getting document:", error);
                    loading.style.display = 'none';
                });

            }).catch(function (error) {
                // Manejo de error
                let errorCode = error.code;
                let errorMessage = error.message;
                // 
                loading.style.display = 'none';
                swal("Cuidado!", "Verifique las credenciales. Porque no existen en la base de datos.", "error");
            });
    });
});

