<script setup lang="js">
import {ref} from 'vue';

const inspirationalQuotes = [
    "La musica è l’arte invisibile che ci permette di comunicare senza barriere, di parlare attraverso note che risuonano nei cuori di chi ascolta.",
    "Cantare è molto più che emettere suoni; è dare voce alla nostra anima, trasmettere ciò che le parole da sole non possono esprimere.",
    "Il coro è come un grande abbraccio fatto di voci, dove ognuno porta la propria unicità per creare un’armonia indimenticabile.",
    "Quando cantiamo insieme, la nostra voce diventa più grande, più forte e più bella, un messaggio di unione che vola nell’aria.",
    "La musica ha il potere di farci viaggiare dentro noi stessi e, allo stesso tempo, di connetterci con chiunque intorno a noi.",
    "Ogni canzone cantata in coro è una storia che prende vita, un viaggio che porta ognuno di noi in un luogo di pace e armonia.",
    "Attraverso il canto, diamo forma ai nostri sogni e rendiamo eterno ogni sentimento, trasformando ogni emozione in melodia.",
    "Un coro è un insieme di voci e di anime; ogni nota è un pezzo di storia, ogni armonia un ricordo condiviso.",
    "La musica è un linguaggio che parla direttamente al cuore, un dialogo tra chi canta e chi ascolta, al di là di qualsiasi parola.",
    "Cantare insieme è come respirare all'unisono, creare un ritmo comune che lega i nostri cuori in un'unica pulsazione.",
    "Quando le nostre voci si uniscono, creiamo una forza invisibile che può emozionare, confortare, ispirare e cambiare il mondo.",
    "Ogni coro è un piccolo miracolo: persone diverse che diventano una sola anima, che trasformano la loro diversità in armonia.",
    "Cantare in un coro è ascoltare l’altro con rispetto, cercare l’armonia e costruire insieme qualcosa che supera le nostre singole voci.",
    "La musica è la voce dell'universo, e quando la cantiamo, diventiamo parte di un qualcosa di più grande, di infinito.",
    "La vera magia della musica sta nel potere di portare serenità dove c’è caos, e di creare bellezza dove prima non c'era nulla.",
    "Ogni volta che cantiamo insieme, celebriamo la bellezza della vita, ricordando che siamo tutti parte di un’unica melodia.",
    "Cantare è come fare un dono: la nostra voce si unisce a quella degli altri e si diffonde nell'aria come una carezza sonora.",
    "Il coro è una famiglia di suoni e di anime che si sostengono a vicenda, creando una musica che sa di speranza e di armonia.",
    "Quando canti con il cuore, puoi toccare chiunque, ovunque, perché la musica è un linguaggio che ogni anima può comprendere.",
    "Ogni prova, ogni brano è un’occasione per crescere insieme, per perfezionare le nostre voci e trovare un equilibrio collettivo.",
    "La musica ci insegna che la bellezza può nascere anche dalla semplicità, che ogni piccola nota può fare la differenza.",
    "Il coro è un luogo dove le voci diventano abbracci, dove ogni suono è un invito alla connessione e alla condivisione.",
    "Ogni canzone è una promessa di speranza, un modo per ricordarci che, anche nei momenti difficili, la bellezza esiste.",
    "Cantare ci libera, ci permette di esprimere chi siamo e di raccontare le nostre storie attraverso una melodia condivisa.",
    "Un coro è un sogno di suoni e di voci che si uniscono, una poesia scritta insieme per celebrare la vita e l’umanità.",
    "La musica ci insegna ad ascoltare e ad ascoltarci, a capire che solo insieme possiamo creare qualcosa di veramente grande.",
    "Ogni volta che cantiamo, doniamo una parte di noi stessi, un pezzo di cuore che si fonde con le voci di chi ci sta accanto.",
    "La musica è un vento che soffia tra di noi, che accarezza i nostri cuori e ci ricorda che l’armonia è possibile.",
    "Cantare è un atto di coraggio e di amore, un modo per aprire il cuore e lasciare che gli altri vi entrino attraverso il suono.",
    "La musica è la nostra guida silenziosa, che ci accompagna attraverso i momenti più bui e quelli più luminosi della vita.",
    "Il coro è un universo di voci che si intrecciano, che insieme formano un mosaico sonoro fatto di sogni e di speranza.",
    "Cantare insieme è come un viaggio condiviso, dove ognuno porta la sua esperienza, la sua storia, il suo cuore.",
    "Attraverso il canto, possiamo arrivare dove le parole non possono, raggiungere angoli dell'anima nascosti e lontani.",
    "Il coro ci insegna a cercare l’armonia, a rispettare la diversità, a capire che ogni voce è indispensabile per creare bellezza.",
    "Cantare è come volare insieme, al di sopra dei problemi quotidiani, in un mondo fatto di note e di pura emozione.",
    "La musica è un rifugio, un luogo dove possiamo essere noi stessi, condividere gioie, dolori, speranze e sogni.",
    "Ogni nota è un pezzo di vita, un ricordo che risuona nell’aria e trova posto nel cuore di chi lo ascolta.",
    "Cantare in coro è come creare un ponte fatto di suoni e di emozioni, che ci connette in un modo unico e speciale.",
    "La musica è la forza che ci unisce, che ci ricorda che siamo tutti parte di un’unica, grande melodia.",
    "Ogni canzone è un momento di libertà, un'opportunità per esprimere ciò che le parole non possono dire.",
    "Il coro è un luogo dove si costruisce un’armonia comune, dove ogni voce trova la sua parte e contribuisce al tutto.",
    "Cantare è un modo per rendere visibili le emozioni, per trasformare i sentimenti in qualcosa che gli altri possono sentire.",
    "Quando cantiamo insieme, siamo una sola anima, un solo battito, un solo respiro che racconta la bellezza della vita.",
    "La musica è una luce che illumina la nostra strada, un compagno silenzioso che ci sostiene anche nei momenti difficili.",
    "Cantare in coro è come danzare all'unisono, una sinfonia di movimenti che si fondono in una sola melodia.",
    "Ogni volta che cantiamo, creiamo un ricordo condiviso, un momento che rimarrà con noi per sempre.",
    "La musica è come un sogno che si diffonde, un respiro di speranza che ci ricorda la bellezza dell'essere vivi.",
    "Cantare insieme ci ricorda che non siamo soli, che ogni nota è un legame che ci unisce e ci avvicina agli altri.",
    "Ogni melodia che creiamo insieme è un dono, un pezzo di vita che condividiamo con chi ci sta accanto.",
    "Il coro è un luogo di gioia, un rifugio dove possiamo essere noi stessi, dove ogni voce trova il suo spazio.",
    "La musica è un'onda che ci trasporta, un respiro che ci unisce e ci invita a vedere la bellezza che ci circonda."
];


// Seleziona una frase casuale
const randomQuote = inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];


onUpdated(() => {
    // To close the menu if open on the mobile
    changeDisplay(null, document.querySelector("nav"), "none")
})

function changeDisplay(evt, element, newValue) {
    if (evt)
        evt.stopPropagation();
    if (newValue) {
        newValue === 'none' ?
            element.removeAttribute("style")
            : element.style.display = newValue
    } else {
        element.style.display === 'flex' ?
            element.removeAttribute("style")
            : element.style.display = 'flex'
    }
}


function showChatbot() {
    let chatbotIcon = document.querySelector("#chatbot-icon");
    let chatbotDiv = document.querySelector("#chatbot");
    if (chatbotDiv.style.display === "none") {
        chatbotDiv.style.display = "unset";
        chatbotIcon.style.right = "0";
        chatbotIcon.style.transform = "scale(1.2)";
    } else {
        chatbotDiv.style.display = "none";
        chatbotIcon.removeAttribute("style");
    }
}

let history = [];

const messages = ref([{
    role: "model",
    parts: [{text: randomQuote}]
}])

const inputValue = ref('');
let isQueuing = false;

async function onChatbotSend() {
    const newMessage = inputValue.value
    if (newMessage && !isQueuing) {
        isQueuing = true;
        inputValue.value = '';

        history.push({role: "user", parts: [{text: newMessage}]})
        messages.value.push({role: "user", parts: [{text: newMessage}]})

        const request = {
            history: history,
            message: newMessage
        };

        await fetch("/api/chatbot", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(request)
        }).then(async response => {
            if (response.status === 200) {
                const answerMess = await response.text()
                history.push({role: "model", parts: [{text: answerMess}]})
                messages.value.push({role: "model", parts: [{text: convert(answerMess)}]})
                if (window.innerWidth > 800 && (newMessage.length >= 1000 || answerMess.length >= 1000)) {
                    document.getElementById("chatbot").style.width = '60%';
                    document.getElementById("chatbot").style.height = '85%';
                }
            } else {
                messages.value.push({
                    role: "model",
                    parts: [{text: "I'm sorry but I'm not able to give you an answer in that moment, due to temporarily unavailability of the server. Please, try again."}]
                })
                history.pop()
            }
        })
        isQueuing = false;
        document.getElementById("chatbot-messages").lastElementChild.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest"
        });
    }

}

function convert(message) {
    return message.replaceAll("\n", "<br>").replaceAll(/(\*\*.*?\*\*)/g, function (match) {
        return "<strong>" + match.slice(2, -2) + "</strong>"
    }).replaceAll("*", "&bull;")
}
</script>

<template>
    <head>
        <link rel="icon" type="image/x-icon" href="/public/logo.png" />
        <meta name="google-site-verification" content="njoMrceFdnJOWLQl4PKP-WYKdn7f__adcuwA0fIieac" />
        
    </head>
    <header>
        <div @click="$router.push('/')" style="cursor: pointer;"
        tabindex="0" v-on:keyup.enter="$router.push('/')">
            <img alt="" class="logo" src="@/assets/logos/logo.png"/>
            <div>
                <div class="title-with-lines" id="main-title">
                    <h1>coro voci</h1>
                </div>
                <h2>Uniti per una comunità più forte, Trezzano S/N</h2>
            </div>
        </div>
        <div>
            <div id="menu">
                <img tabindex="0" v-on:keyup.enter="changeDisplay($event, $event.target.parentElement.querySelector('nav'));" alt="Open menu" class="ourIcon" src="@/assets/icons/menu.png"
                     @click="changeDisplay($event, $event.target.parentElement.querySelector('nav'));"/>
                <div style="text-align: right;">
                    <NuxtLink to="/contact-us">
                        <button>
                            Unisciti!
                        </button>
                    </NuxtLink>
                </div>
                <nav>
                    <NuxtLink to="/about-us">Chi Siamo</NuxtLink>
                    <NuxtLink to="/people">Le Voci</NuxtLink>
                    <div tabindex="0" id="activities"
                         v-on:keyup.enter="changeDisplay($event, $event.target.children[0]);"
                         @mouseenter="changeDisplay($event, $event.target.children[0], 'flex')"
                         @mouseleave="changeDisplay($event, $event.target.children[0], 'none')"
                         @click="changeDisplay($event, $event.target.children[0]);">
                        Altro
                        <div class="submenu">
                            <NuxtLink to="/projects">Documenti</NuxtLink>
                            <NuxtLink to="/services">Video</NuxtLink>
                        </div>
                        <img alt="Open submenu" class="ourIcon" src="@/assets/icons/arrow down.png"
                             @click="changeDisplay($event, $event.target.previousElementSibling)">
                    </div>
                </nav>
            </div>
        </div>
    </header>

    <main>
        <img tabindex="0" v-on:keyup.enter="showChatbot"
             id="chatbot-icon" @click="showChatbot()" src="@/assets/icons/chatbot.png" alt="Open chatbot"/>
        <div id="chatbot" style="display: none;">
            <div id="chatbot-top-bar">
                <p>Ispirazione del giorno</p>
                <img src="@/assets/icons/delete.png"
                     tabindex="0" v-on:keyup.enter="showChatbot"
                     @click="showChatbot()" alt="Close chatbot"/>
            </div>
            <div id="chatbot-messages">
                <template v-for="element in messages">
                    <p v-bind:user="(element.role === 'user')?'true' : 'false'" v-html="element.parts[0].text"></p>
                </template>

            </div>
            <div >
                
            </div>
        </div>
        <slot/>
    </main>

    <footer>
        <div>
            <div style="border-radius: 15px 15px 15px 5px; background-color:  rgba(255,255,255,0.8);">
                <img class="ourIcon" src="@/assets/icons/address.png" alt=""/>
                <div style="display: initial;">
                    <p style="letter-spacing: .1rem;">LOCALITA'</p>
                    <p>Trezzano Sul Naviglio, Milano</p>
                </div>

            </div>
            <div style="border-radius: 15px; background-color:  rgba(255,255,255,0.8);">
                <img class="ourIcon" src="@/assets/icons/hour.png" alt=""/>
                <div style="display: initial;">
                    <p style="letter-spacing: .1rem;">VIENI A SENTIRCI</p>
                    <p></p>
                </div>
            </div>
            <div style="border-radius: 15px 15px 5px 15px; background-color:  rgba(255,255,255,0.9);">
                <img class="ourIcon" src="@/assets/icons/phone-call.png" alt=""/>
                <div style="display: initial;">
                    <p style="letter-spacing: .1rem;">PER INFORMAZIONI</p>
                    <p>+39 338 503 5136</p>
                </div>
            </div>

        </div>
        <div id="bottom-bar">Copyright 2024 - Coro Voci Trezzano - All rights reserved</div>
    </footer>
</template>

<style scoped>
main {
    background-color: white;
}

/**************** HEADER ******************/
header #main-title {
    padding: 0;

}
header #main-title > h1 {
    min-width: 220px;
    font-size: 35px;
    padding: 0;
}
header #main-title:before, header #main-title:after {
    background: linear-gradient(to right, #b7403c 0%, #b7403c 40%);
}

header h2 {
    letter-spacing: 1px;
    font-size: 17px;
    padding: 0;
}
header {
    display: flex;
    justify-content: space-between;
    position: sticky;
    top:0;
    padding: 30px 5% 30px 5%;
    z-index: 109;
    background-image: url("/header.webp");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    border-image: linear-gradient(to right, #d4dae5 0%, #b7403c 5%, #b7403c 95%, #d4dae5 100%) 1;

    border-width: 0 0 4px 0;
    border-style: solid;
}
header > div {
    display: flex;
    align-items: center;
    text-align: left;
    z-index: 110;

}
.logo {
    width: 90px;
    margin-right: 10px;
}
.ourIcon {
    cursor: pointer;
//border-left: #b7403c solid 2px; width: 35px; width: 25px; margin-left: 10px;
}


/*************** MENU ****************/
.router-link-active, .router-link-exact-active {
    color: #4c8189;
    font-weight: 650;
}
.router-link-active > button, .router-link-exact-active > button {
    background-color: #b7403c;
}
nav {
    display: flex;
    justify-content: center;
    gap: 40px;
    font-size: 17px;
    line-height: 40px;
    border-radius: 15px;
    padding: 0 10px 0 15px;
    background-color: rgba(255, 255, 255, 0.8);
}
a[active="true"] {
}

#activities {
    position: relative;
    cursor: pointer;
    user-select: none;
}

.submenu {
    position: absolute;
    flex-direction: column;
    background-color: rgba(255, 255, 255, 0.9);
    width: 90px;
    top: 40px;
    display: none;
    font-size: 17px;
    padding: 0 15px 0 15px;
}

a {
    text-decoration: none;
}

a:hover {
    color: #4c8189;
}

#menu > img {
    display: none;
}

#menu {
    line-height: 50px;
}


/****************************** CHATBOT ********************************/
#chatbot-icon {
    position: fixed;
    width: 80px;
    z-index: 111;
    right: 1px;
    bottom: 5%;
    padding: 10px;
    cursor: pointer;
    transition: right .5s, transform .5s;
}

#chatbot-icon:hover {
    right: 0;
    transform: scale(1.2);
}


#chatbot {
    position: fixed;
    z-index: 110;
    right: 2%;
    bottom: 8%;
    width: 40%;
    height: 26%;
    background-color: #ffffff;
    border: 5px solid #4c8189;
    border-radius: 10px;
    transition: width .5s;
}

#chatbot-send-bar {
    position: absolute;
    bottom: 0;
    width: calc(100% - 120px);
    height: 5%;
    margin: 10px;
    border: #4c8189 2px solid;
    border-radius: 3px;
    align-items: center;
    padding: 0.5%;
    display: flex;
    justify-content: space-between;
}

#chatbot img {
    height: 70%;
    cursor: pointer;
}

#chatbot-send-bar > input {
    border: none;
    width: 96%;
    font-size: 18px;
}

#chatbot-send-bar > input:focus {
    outline: none;
}

#chatbot-top-bar {
    position: absolute;
    top: 0;
    background-color: #4c8189;
    color: #ffffff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 17%;
    font-size-adjust: revert;
}

#chatbot-top-bar > p {
    padding-left: 1.5%;
}

#chatbot-top-bar img {
    height: 40px;
}

#chatbot-messages {
    position: absolute;
    width: 100%;
    max-height: 80%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    bottom: 10%;
}

/*Messages coming from the chatbot*/
#chatbot-messages > p {
    background-color: #90b4b9;
    margin: 7px 10% 7px 2%;
    max-width: 90%;
    width: fit-content;
    border-radius: 10px;
    padding: 12px;
    word-wrap: break-word;
}

/* Messages coming from the agent*/
#chatbot-messages > p[user="true"] {
    align-self: end;
    text-align: right;
    margin: 7px 2% 7px 10%;
    background-color: #e2e2e2;
}

/************************* FOOTER **************************/
footer {
    flex-shrink: 0;
    text-align: center;
    padding: 0;

    color: #5c5c5c;

    font-family: Figtree, serif;
    font-size: 14px;

    background-image: url("/footer.webp");
    background-repeat: no-repeat;
    background-position: top;
    background-size: 100% 100%;
    background-color: white;
    border-image: linear-gradient(to right, #d4dae5 0%, #b7403c 5%, #b7403c 90%, #d4dae5 100%) 1;

    border-width: 4px 0 0 0;
    border-style: solid;
}

footer .ourIcon {
    cursor: unset;
}

footer div {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 10px;
}

footer > div {
    background-color: unset;
    padding: 30px;
}


footer p {
    margin: 0;
}

#bottom-bar {
    background-color: rgba(255, 255, 255, 0.9);
    padding: 10px;
    margin: 0;
    color: #5c5c5c;
    font-size: 12px;
}

/************************ **************************/

@media (max-width: 1400px) {
    #chatbot {
        width: 60%;
    }
}

@media (max-width: 1000px) {
    header {
        flex-direction: column;
    }
    nav {
        display: none;
        flex-direction: column;
        gap: 0;
        background-color: rgb(255, 255, 255, 0.93);
        border-bottom: 2px #b7403c solid;
        position: absolute;
        border-left: 2px #b7403c solid;
        border-right: 2px #b7403c solid;
        border-radius: 0 0 10px 10px;
        top: 84px;
        width: 90%;
        padding: 20px;
        text-align: left;
        font-size: 20px;
    }
    .submenu {
        background-color: rgb(255, 255, 255, 0.93);

    }
    header div {
        justify-content: center;
        flex-direction: row;
    }
    #menu > img {
        display: initial;
        width: 40px;
        height: 10%;
    }
    #menu {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-left: 10px;
        margin-right: 10px;
        position: relative;
    }
    footer {
        background-image: url("/footer1000.webp");
    }
    footer > div {
        flex-direction: column;
        gap: 0;
    }
    #chatbot {
        width: 90% !important;
        font-size: 18px;
    }
    #chatbot-send-bar input {
        width: 90%;
    }
}

@media (max-width: 600px) {
    footer {
        background-image: url("/footer600.webp");
    }
    #chatbot{
        height: 26%;
    }


}

@media (max-width: 300px) {
    header #main-title > h1 {
        min-width: unset;
    }
    .logo {
        width: 40%;
    }
    #chatbot-icon {
        width: 60px;
    }
    #chatbot-send-bar {
        width: calc(100%);
    }
}


</style>