const start=document.getElementById("start");

const intro=document.getElementById("intro");

const story=document.getElementById("storyScreen");

const text=document.getElementById("storyText");

const waves=document.getElementById("waves");

const frases=[

"Siempre me ha encantado el mar...",

"Porque siempre me hacía sentir libre.",

"Curiosamente...",

"A ti también te encanta el mar.",

"Y sin darme cuenta...",

"Cada playa comenzó a recordarme a ti.",

"Cada vez que veo un atardecer...",

"Pienso en ti.",

"Yori...",

"Hay algo que llevo muchísimo tiempo queriéndote preguntar."

];

start.onclick=()=>{

waves.play().catch(()=>{});

intro.classList.add("hide");

setTimeout(()=>{

intro.style.display="none";

story.classList.add("show");

historia(0);

},1000);

}

async function historia(i){

if(i>=frases.length){

pregunta();

return;

}

await escribir(frases[i]);

await esperar(2200);

await desaparecer();

historia(i+1);

}

function escribir(frase){

return new Promise(resolve=>{

let i=0;

text.innerHTML="";

const cursor='<span class="cursor"></span>';

const escribir=setInterval(()=>{

text.innerHTML=frase.substring(0,i)+cursor;

i++;

if(i>frase.length){

clearInterval(escribir);

text.innerHTML=frase;

resolve();

}

},45);

});

}

function desaparecer(){

return new Promise(resolve=>{

text.animate([

{opacity:1},

{opacity:0}

],{

duration:900,

fill:"forwards"

});

setTimeout(()=>{

text.innerHTML="";

text.style.opacity=1;

resolve();

},900);

});

}

function esperar(ms){

return new Promise(resolve=>setTimeout(resolve,ms));

}

function pregunta(){

text.innerHTML=`

<h1 style="font-size:64px;font-family:'Cormorant Garamond',serif;">Yori...</h1>

<p style="font-size:32px;margin-top:20px;">

¿Me darías otra oportunidad?

</p>

<div style="margin-top:45px;">

<button id="si">Sí 💜</button>

<button id="no" style="margin-left:20px;">No</button>

</div>

`;

iniciarBotonNo();

}

const mensajesNo = [

"¿Segura? 🥺",

"Buen intento. 😼",

"Las olas votaron por el 'Sí'. 🌊",

"Michael estaría decepcionado de ese clic. 😔",

"Abel escribiría otro álbum si pulsas ese botón. 🎤",

"Ni MJ pudo enseñarme a rendirme. 🕺",

"The Weeknd diría: Don't break my heart. 💔",

"El botón tiene ansiedad... por eso huye.",

"Creo que una estrella acaba de apagarse. ✨",

"¿Y si pruebas el otro botón? 💜"

];

let intentos = 0;

function iniciarBotonNo(){

const no = document.getElementById("no");

const si = document.getElementById("si");

no.addEventListener("mouseenter", mover);

no.addEventListener("click", mover);

si.addEventListener("click", finalFeliz);

}

function mover(e){

const no = e.target;

intentos++;

if(intentos>=8){

no.innerText="Bueno... respeto tu decisión 💜";

no.style.position="static";

no.removeEventListener("mouseenter", mover);

return;

}

const x=Math.random()*(window.innerWidth-170);

const y=Math.random()*(window.innerHeight-80);

no.style.position="fixed";

no.style.left=x+"px";

no.style.top=y+"px";

mostrarMensaje();

}

function mostrarMensaje(){

const viejo=document.getElementById("popup");

if(viejo) viejo.remove();

const div=document.createElement("div");

div.id="popup";

div.innerText=mensajesNo[
Math.floor(Math.random()*mensajesNo.length)
];

div.style.position="fixed";

div.style.top="70px";

div.style.left="50%";

div.style.transform="translateX(-50%)";

div.style.background="rgba(0,0,0,.35)";

div.style.padding="14px 24px";

div.style.borderRadius="18px";

div.style.backdropFilter="blur(10px)";

div.style.fontSize="18px";

div.style.opacity="0";

div.style.transition=".4s";

document.body.appendChild(div);

setTimeout(()=>{

div.style.opacity="1";

},20);

setTimeout(()=>{

div.remove();

},2200);

}

function finalFeliz(){

document.body.animate([

{filter:"brightness(1)"},

{filter:"brightness(1.4)"},

{filter:"brightness(1)"}

],{

duration:1800

});

story.innerHTML=`

<h1 style="font-family:'Cormorant Garamond',serif;font-size:68px;">

Gracias...

</h1>

<p style="font-size:30px;margin-top:25px;">

Prometo que esta vez no solo te lo diré.

<br><br>

Voy a demostrártelo.

💜

</p>

`;

}
