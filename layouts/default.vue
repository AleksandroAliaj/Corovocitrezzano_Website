<script setup lang="js">
import {ref} from 'vue';

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
    parts: [{text: "Hello! I'm the <b>Brave Sisters bot</b>, and I'm here to answer all your questions for the <b>current legislation in Italy</b> against domestic violence and if you're in trouble in <b>finding information on this website</b>.<br><br>" +
            "Ask me whatever you want about these topics, but please, be detailed on your situation so that I can give you precise and exhaustive answers. <br><br> " +
            "Remember, you're <b>not alone!</b> Your safety is our job."}]
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
                            Contact us
                        </button>
                    </NuxtLink>
                </div>
                <nav>
                    <NuxtLink to="/about-us">About us</NuxtLink>
                    <NuxtLink to="/people">People</NuxtLink>
                    <div tabindex="0" id="activities"
                         v-on:keyup.enter="changeDisplay($event, $event.target.children[0]);"
                         @mouseenter="changeDisplay($event, $event.target.children[0], 'flex')"
                         @mouseleave="changeDisplay($event, $event.target.children[0], 'none')"
                         @click="changeDisplay($event, $event.target.children[0]);">
                        Activities
                        <div class="submenu">
                            <NuxtLink to="/projects">Projects</NuxtLink>
                            <NuxtLink to="/services">Services</NuxtLink>
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
                <p>Ask me!</p>
                <img src="@/assets/icons/delete.png"
                     tabindex="0" v-on:keyup.enter="showChatbot"
                     @click="showChatbot()" alt="Close chatbot"/>
            </div>
            <div id="chatbot-messages">
                <template v-for="element in messages">
                    <p v-bind:user="(element.role === 'user')?'true' : 'false'" v-html="element.parts[0].text"></p>
                </template>

            </div>
            <div id="chatbot-send-bar">
                <input aria-labelledby="chatbot-send-bar" v-model="inputValue" v-on:keyup.enter="onChatbotSend()"
                       placeholder="Send a message to the bot."/>
                <img tabindex="0" src="@/assets/icons/send-icon.png"
                     @click="onChatbotSend()" alt="Send message to the chatbot"/>
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
                    <p>+39 0574 53695</p>
                </div>
            </div>

        </div>
        <div id="bottom-bar">Copyright 2024 - Brave Sisters - All rights reserved</div>
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
    width: 90px;
    z-index: 111;
    right: -10px;
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
    height: 70%;
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
    height: 10%;
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
        height: 80%;
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
        width: calc(100% - 90px);
    }
}


</style>