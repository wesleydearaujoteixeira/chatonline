const login = document.querySelector('.login');
const loginform = login.querySelector('.login__form');
const loginInput = login.querySelector('.login_input');




// agora o chat

const chat = document.querySelector('.chat');
const chatForm = chat.querySelector('.chat__form');
const chatInput = chat.querySelector('.chat__input');
const sectionChat = chat.querySelector('.chat__messages');

let websocket;

const createSelfElementTag = (content) => {
    
    const div = document.createElement('div');
    
    div.classList.add('message--self');
    div.innerHTML = content;


    return div;
}

const createOtherElementTag = (username, content, color) => {
    const div = document.createElement('div');
    const span = document.createElement('span');
    
    div.classList.add('message--other')
    
    span.classList.add('message--sender');
    span.style.color = color;
    span.innerHTML = username;

    div.appendChild(span);

    div.innerHTML += content;

    return div;
}



//message--receptor

const createUserElementTag = (username, content, color) => {
    const div = document.createElement('div');
    const span = document.createElement('span');
    
    div.classList.add('message--self')
    
    span.classList.add('message--receptor');
    span.style.color = color;
    span.innerHTML = username;

    div.appendChild(span);

    div.innerHTML += content;

    return div;
}




const user = {id: "", name: "", color: ""};

const colors = ["#a52a2a", "#7fff00", "#6495ed", "#5f9ea0", "#8a2be2"];
const autoColor = Math.floor(Math.random() * colors.length);


const onprocess = ({data}) => {
    const {id, name, color, content} = JSON.parse(data);

    const message = id !== user.id ? createOtherElementTag(name, content, color) : createUserElementTag(name, content, color);

    sectionChat.appendChild(message);


}


const handleLogin = (event) => {   
    event.preventDefault();

    user.id = crypto.randomUUID();
    user.name = loginInput.value;
    user.color = colors[autoColor];

    login.style.display = 'none';
    chat.style.display = 'flex';

    websocket = new WebSocket('ws://localhost:8080');
    websocket.onmessage = onprocess;

    console.log(user);



};

const handleForm = (event) => {
    event.preventDefault();


    const message = {
        id: user.id,
        name: user.name,
        color: user.color,
        content: chatInput.value,
    };
    chatInput.value = '';


    websocket.send(JSON.stringify(message));

}



loginform.addEventListener('submit', handleLogin);
chatForm.addEventListener('submit', handleForm);