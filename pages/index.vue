<script setup lang="js">
import {onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';

const router = useRouter();
const imgBasePath = "/img/homepage/home_";
const numberOfImages = 6;

const paragraphs = ['CANTA CON NOI,', 'UNISCI LA TUA VOCE', 'PER UNA COMUNITÀ PIÙ FORTE']
const mainImagePath = "/img/homepage/MAIN.webp"

const textVisibility = ref([false, false, false]);

onMounted(() => {
    setTimeout(() => {
        textVisibility.value[0] = true;
    }, 500);
    setTimeout(() => {
        textVisibility.value[1] = true;
    }, 1000);
    setTimeout(() => {
        textVisibility.value[2] = true;
    }, 1500);
})

useHead({
  title: "Home - Coro delle Chiese di Trezzano",
  meta:[
    {
      name:"description",
      content:"Questa è la home page del sito del Coro delle Chiese di Santa Gianna e Sant'Ambrogio di Trezzano sul Naviglio. Qui troverai informazioni sul nostro coro, le attività e gli eventi futuri, oltre a come unirti a noi e partecipare alla vita comunitaria attraverso il canto."
    },
    {
      name:"keywords",
      content:"coro, chiesa, Santa Gianna, Sant'Ambrogio, canto corale, Trezzano sul Naviglio, parrocchia, attività comunitarie"
    }
  ]
})

function goToPeople() {
    router.push(`/people`);
}

function goToProjects() {
    router.push(`/projects`);
}

function goToServices() {
    router.push(`/services`);
}
</script>

<template>
    <main>
        <MainImageComponent
                :paragraphs="paragraphs"
                :photo-src="mainImagePath"
                :left="true"/>
        <div class="title-with-lines" id="main-title"><h1>Benvenuto nel nostro coro!</h1></div>
        <section>
            <section>
                <div class="two-columns">
                    <div>
                        <p>Benvenuto nel sito del Coro delle Chiese di Santa Gianna e Sant'Ambrogio di Trezzano sul Naviglio. <br>
                        Il nostro coro è una comunità aperta a tutti coloro che desiderano esprimere la propria fede attraverso il canto. <br>
                        Partecipare al coro è un'opportunità per crescere spiritualmente, vivere momenti di condivisione e contribuire alle celebrazioni liturgiche con la musica. <br>
                        Siamo sempre alla ricerca di nuove voci! Se vuoi unirti a noi, troverai tutte le informazioni necessarie nel sito.
                        <br>
                        Goditi la visita e speriamo di vederti presto tra noi!
                        </p>
                    </div>
                    <div>
                        <div class="title-with-lines"><h2>Chi siamo</h2></div>
                        <div class="image-container" @click="goToPeople">
                            <img src="/img/homepage/collaboration_1.webp" alt="Vai alla sezione Chi Siamo"/>
                            <div class="hover-text">Scopri il nostro coro</div>
                            <div class="hover-overlay"></div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="choir-events">
                <div class="title-with-lines"><h2>Prossimi eventi</h2></div>
                <div>
                    <div>
                        <p>Il coro partecipa regolarmente a diverse celebrazioni ed eventi speciali. Ecco alcuni dei prossimi appuntamenti dove puoi ascoltarci:</p>
                        <ul>
                            <li>Messa Solenne a Santa Gianna, domenica alle 10:30</li>
                            <li>Concerto di Natale a Sant'Ambrogio, il 24 dicembre</li>
                            <li>Prove aperte al pubblico ogni venerdì sera</li>
                        </ul>
                        <p>Ti invitiamo a unirti a noi o a venire a sentirci in questi eventi. La musica è una parte fondamentale della nostra vita comunitaria!</p>
                    </div>
                </div>
            </section>
            <section id="activities">
                <div class="title-with-lines"><h2>Attività</h2></div>
                    <div>
                        <p>Il nostro coro svolge numerose attività, oltre a partecipare alle celebrazioni religiose. <br>
                        Organizziamo concerti, prove settimanali e partecipiamo ad eventi della comunità parrocchiale. Vieni a conoscerci meglio nelle sezioni dedicate ai nostri progetti e servizi.
                        </p>
                    </div>
                <div class="two-columns">
                        <div>
                            <div class="title-with-lines"><h2>Progetti</h2></div>
                            <div class="image-container" @click="goToProjects">
                                <img src="/img/homepage/1.webp" alt="Vai ai progetti"/>
                                <div class="hover-text">Scopri i nostri progetti</div>
                                <div class="hover-overlay"></div>
                            </div>
                        </div>
                        <div>
                            <div class="title-with-lines"><h2>Servizi</h2></div>
                            <div class="image-container" @click="goToServices">
                                <img src="/img/homepage/2.webp" alt="Vai ai servizi"/>
                                <div class="hover-text">Scopri i nostri servizi</div>
                                <div class="hover-overlay"></div>
                            </div>
                        </div>
                </div>
            </section>
            <GalleryComponent
                    :img-base-path=imgBasePath
                    :number-of-images=numberOfImages
            />
        </section>
    </main>
</template>

<style scoped>
* {
    margin: 0;
    box-sizing: border-box;
}

#choir-events {
    background-color: #ffffff;
    border-radius: 8px;
    text-align: center;
}

body {
    margin: 0;
    padding: 0;
}

.image-container {
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    overflow: hidden;
    border-radius: 15px;
    display: flex;
    justify-content: center;
}
.image-container:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.image-container img {
    border-radius: 8px;
    transition: opacity 0.3s ease;
    width: 500px;
}
.image-container:hover img {
    opacity: 0.6;
}
.hover-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 1.1em;
    text-align: center;
    background-color: #4c8189;
    padding: 10px 10px;
    border-radius: 10px;
    opacity: 0;
    transition: opacity 0.3s ease;
}
.image-container:hover .hover-text {
    opacity: 1;
}
#activities {
    text-align: center;
}

@media (max-width: 1000px) {
    .image-container img {
        width: 70%;
    }
}
@media (max-width: 600px) {
    .image-container img {
        width: 90%;
    }
}
</style>
