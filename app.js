const buttons = document.querySelector("#buttons");
const nameUser = document.querySelector("#nameUser");
const buttonOne = ` <button id="signIn">Cerrar sesion</button> `;
const buttonTwo = ` <button id="access">Acceder</button> `



firebase.auth().onAuthStateChanged( user => {
    if(user){
        console.log('hi');
        buttons.innerHTML= buttonTwo

    }else{
        console.log('no existe user');
        buttons.innerHTML = buttonOne;

    }
})
