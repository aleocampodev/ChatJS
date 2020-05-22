const buttons = document.querySelector("#buttons");
const nameUser = document.querySelector("#nameUser");
const buttonOne = ` <button id="signIn">Cerrar sesion</button> `;
const buttonTwo = ` <button id="access">Acceder</button> `
const form = document.querySelector('#form');
const inputChange = querySelector('#inputChange')



firebase.auth().onAuthStateChanged( user => {
    if(user){
        console.log('user');
        buttons.innerHTML= buttonOne;
        
        nameUser.innerHTML= user.displayName;
        signIn()
        contentChat(user)

        form.style.display='block'

    }else{
        console.log('no existe user');
        buttons.innerHTML = buttonTwo;

        logIn()
        nameUser.innerHTML='Chat';

        form.style.display="none"

    }
});

const logIn = () => {
    const access = document.querySelector('#access');

    access.addEventListener('click', async() => {
        try{
            const provider = new firebase.auth.GoogleAuthProvider();
            await firebase.auth().signInWithPopup(provider)

        } catch(error){
            console.log(error)
        }
    })
}

const signIn = () => {
    const signIn = document.querySelector('#signIn')

    signIn.addEventListener('click' , () => {
        firebase.auth().signOut();
    })
}

const contentChat = (user) => {
    form.addEventListener('submit', (e) => {
        e.preventDefault()
    })
}
