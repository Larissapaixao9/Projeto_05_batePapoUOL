//1 passo é criar uma const q recebe o url da API 

const url="https://mock-api.driven.com.br/api/v6/uol/messages";
const url2="https://mock-api.driven.com.br/api/v6/uol/participants"
const url3="https://mock-api.driven.com.br/api/v6/uol/status"

let pegarUsuario;
let sendServidor;
let ggServidor;
let rUser;
let User;



function entrar_sala(){
    User={name:prompt("Digite seu nome de usuario")}

  
    pegarUsuario=axios.post(url2,User);

    pegarUsuario.catch(entrar_sala);
    pegarUsuario.then((resultado)=>{
        verificar()})
    }
//entrar_sala();

function continuar_verficando(){
    rUser=axios.post(url3,User);
    rUser.then((response)=>{
        
    })
    rUser.catch((error)=>{
        window.location.reload();
    })
}

function verificar(response){
    setInterval(continuar_verificando,5000);
}


function carregarUsuarios(){
    const promise=axios.get(url)
    promise.then(renderizarChat)
}
carregarUsuarios()

function renderizarChat(response){
    console.log(response)
    for(let i=0;i<response.data.length;i++){
    const m=response.data[i]
    const containerMensagem=document.querySelector(".container")
    if(response.data[i].text=="entra na sala..." && response.data[i].type=="status"){
        
        containerMensagem.innerHTML+=`<div class="mensagem cinza">${response.data[i].time} <b>${response.data[i].from}</b> ${response.data[i].text}</div>`
    }
    if(response.data[i].text=="sai da sala..." && response.data[i].type=="status"){
        
        containerMensagem.innerHTML+=`<div class="mensagem cinza">${response.data[i].time} <b>${response.data[i].from}</b> ${response.data[i].text}</div>`
    }
    if(response.data[i].type=="message" && response.data[i].to=="Todos"){
        //containerMensagem.innerHTML+=`<div class="mensagem white">${response.data[i].time}<b>${response.data[i].from} </b><span> para <b>todos</b>:</span> ${response.data[i].text}</div>` 
        containerMensagem.innerHTML+=`<div class="mensagem white">${response.data[i].time}  <b>${response.data[i].from} </b><span> para <b>todos</b>:</span> ${response.data[i].text}</div> `
    }
    if(response.data[i].type=="message" && response.data[i].to!="Todos"){
        containerMensagem.innerHTML+=`<div class="mensagem white">${response.data[i].time}<b>${response.data[i].from} </b><span> para <b>${response.data[i].to}</b>:</span> ${response.data[i].text}</div>` 
    }
    if(response.data[i].type=="private_message" && response.data[i].to==User.name){
        containerMensagem.innerHTML+=`<div class="mensagem reservada">${response.data[i].time}<b>${response.data[i].from} </b><span> reservadamente para: <b>${response.data[i].to}</b>:</span> ${response.data[i].text}</div>` 
    }
    if(response.data[i].type=="private_message" && response.data[i].to!=User.name){
        containerMensagem.innerHTML+="";
    }
    }
    let mensagemFinal=document.querySelector(".container")
    mensagemFinal[mensagemFinal.length-1].scrollIntoView()
    
}
setInterval(()=>{
    const atualizarMensagens=axios("https://mock-api.driven.com.br/api/v6/uol/messages");
    atualizarMensagens.then(renderizarChat);


},3000)



function enviar_mensagem(){

    const texto_mensagem=document.querySelector("input").value;

     minha_mensagem={ //mandar post para URL
        from:User.name,
        to:"Todos",
        text:texto_mensagem,
        type:"message",
    };

    sendServidor=axios.post(url,minha_mensagem)
    sendServidor.then((response)=>{
        ggServidor=axios(url);
        ggServidor.then(renderizarChat);})
        sendServidor.catch((error)=>{
            window.location.reload();
        })
    
}


const mensagemFinal=document.querySelector(".mensagem");
mensagemFinal.scrollIntoView(false);
//termina aqui!









