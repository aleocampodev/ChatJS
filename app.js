const button = document.querySelector('#button');
const nameuser = document.querySelector('#user');

firebase.auth().onAuthStateChanged(user => {
    if(user)
})