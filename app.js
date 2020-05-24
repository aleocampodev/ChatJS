const buttons = document.querySelector('#buttons');
const nameUser = document.querySelector('#nameUser');
const buttonOne = ` <button id="closeSesion" class="button1">Cerrar sesion</button> `;
const buttonTwo = ` <button id="access" class="button2">Acceder</button> `
const form = document.querySelector('#form');
const inputChat = document.querySelector('#inputChat');
const protectContent= document.querySelector('#protectContent')
const content = document.querySelector('#container');
const text = document.querySelector('#text');
const navigation = document.querySelector('.navigation')
const navigationMain =document.querySelector('.navigation-main')




firebase.auth().onAuthStateChanged( user => {
    if(user){
        console.log(user);
        buttons.innerHTML= buttonOne;

        
        nameUser.innerHTML= ` <p class="text2">Bienvenido, ${user.displayName} </p>`
        
        closeSesion()

       form.style.display='flex';

        contentChat(user)

       content.classList.remove('main-content');
        navigation.classList.remove('navigation1');
        navigationMain.classList.remove('navigation-main1');
        navigation.classList.toggle('navigation2');
        text.innerHTML = '';
        

       
        

    }else{
        console.log('no existe user');
        buttons.innerHTML = buttonTwo;

        logIn()
        nameUser.innerHTML='Chat';

        form.style.display='none';
        content.classList.toggle('main-content');
        text.innerHTML= `
            <p class="text-main">Debes iniciar sesión</p>
        `
        navigation.classList.toggle('navigation1')
        navigationMain.classList.toggle('navigation-main1')
        navigation.classList.remove('navigation2')
        
        
    

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

const closeSesion = () => {
    const closeSesion = document.querySelector('#closeSesion')

    closeSesion.addEventListener('click' , () => {
        firebase.auth().signOut();
    })
}

const contentChat = (user) => {

    /*-protectContent.innerHTML= ` 
    <span class="main1">Mensaje del usuario</span>
    <span class="main2">Mensaje entrante</span>
    `*/
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        console.log(inputChat.value)

        if(!inputChat.value.trim()){
            console.log('input vacio')
            return
        }

        firebase.firestore().collection('chat').add({
            texto:inputChat.value,
            uid: user.uid,
            fecha:Date.now()
        })
            .then(res => {console.log('mensaje guardado')})
            .catch(e => console.log(e))
        
            inputChat.value = '';

    })

    firebase.firestore().collection('chat').orderBy('fecha')
    .onSnapshot(query =>{
        //console.log(query)
        protectContent.innerHTML=''
        query.forEach(doc => {
            console.log(doc.data())
            if(doc.data().uid === user.uid){
                protectContent.innerHTML += `
                <div class="main1">
                    <span class="main3">${doc.data().texto}</span>
                </div>
                `
            }else{
                protectContent.innerHTML += `
                    <span class="main2">${doc.data().texto}</span> 
                `
            }

            protectContent.scrollTop = protectContent.scrollHeight
        })
    })
}
