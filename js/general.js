/*
Control de salida y almacenamiento local
para que el refresh no de error
*/

// Salir
function logOut(){
  localStorage.clear();
  window.open('index.html', '_self');
};

// Almacena cache
document.addEventListener("DOMContentLoaded", function () {
  let user = localStorage.getItem('userLogged');
  if (user === null)
    window.open('index.html', '_self');
});

