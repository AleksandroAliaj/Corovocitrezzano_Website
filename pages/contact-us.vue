<script setup lang="ts">
import { ref, onMounted } from 'vue';

const paragraphs = ['CONTATTACI', 'UNISCITI A NOI'];
const mainImagePath = "/img/contact-us-MAIN.webp";

useHead({
    title: "Contatta Coro Voci Trezzano - Informazioni e Iscrizioni",
    meta: [
        {
            name: "description",
            content: "Vuoi unirti al Coro Voci di Trezzano? Contattaci per informazioni su prove, eventi, iscrizioni e opportunità di canto corale a Trezzano sul Naviglio. Benvenuti tutti i livelli di esperienza!"
        },
        {
            name: "keywords",
            content: "contatti coro trezzano, iscrizione coro, canto corale trezzano, prove coro, musica sacra, coro parrocchiale, santa gianna, sant'ambrogio"
        },
        {
            name: "og:title",
            content: "Coro Voci Trezzano - Contatti e Unisciti a Noi"
        },
        {
            name: "og:description", 
            content: "Scopri come far parte del nostro coro. Contatti, FAQ e informazioni per musicisti di ogni livello a Trezzano sul Naviglio."
        },
        {
            property: "og:type",
            content: "website"
        },
        {
            name: "robots",
            content: "index, follow"
        }
    ]
})

const faq = [
    {
        question: "Dove si trova il Coro Voci di Trezzano?",
        answer: "Il coro si trova a Trezzano sul Naviglio, Milano. Puoi contattarci per maggiori informazioni."
    },
    {
        question: "Quali sono gli orari di apertura del coro?",
        answer: "Il coro è attivo durante le prove settimanali e per eventi speciali. Contattaci per dettagli."
    },
    {
        question: "Quali servizi offre il Coro Voci di Trezzano?",
        answer: "Offriamo concerti, eventi comunitari e opportunità per unirti a noi nel canto."
    },
    {
        question: "Posso partecipare se non ho esperienza nel canto?",
        answer: "Certo! Siamo aperti a tutti coloro che desiderano unirsi a noi, indipendentemente dall'esperienza."
    },
    {
        question: "Come posso contattare il coro?",
        answer: "Puoi contattarci via email o telefono. Trovi i dettagli qui sotto."
    }
];

const showAnswer = ref(Array(faq.length).fill(false));

const toggleAnswer = (index: number) => {
    showAnswer.value[index] = !showAnswer.value[index];
};

useHead({
    title: "Contattaci - Coro Voci di Trezzano",
    meta: [
        {
            name: "description",
            content: "Contatta il Coro Voci di Trezzano per informazioni su eventi, prove e come unirti a noi."
        },
        {
            name: "keywords",
            content: "Contatti, coro, Trezzano, musica, comunità"
        }
    ]
});
</script>

<template>
    <div>
        <main>
            <MainImageComponent
                :paragraphs="paragraphs"
                :photo-src="mainImagePath"
                :left="false" />
            <div class="title-with-lines" id="main-title"><h1>Contattaci</h1></div>
            <section>
                <section>
                    <div class="title-with-lines"><h2>FAQ</h2></div>
                    <ul>
                        <li v-for="(item, index) in faq" :key="index">
                            <div @click="toggleAnswer(index)" tabindex="0" v-on:keyup.enter="toggleAnswer(index)"
                                :class="{'faq-question': true, 'open': showAnswer[index]}">
                                {{ item.question }}
                                <span>{{ showAnswer[index] ? '▲' : '▼' }}</span>
                            </div>
                            <div v-if="showAnswer[index]" class="faq-answer">
                                {{ item.answer }}
                            </div>
                        </li>
                    </ul>
                </section>
                <section>
                    <p>Se non hai trovato risposta alla tua domanda, contattaci!</p>
                    <div class="title-with-lines"><h2>Contatti</h2></div>
                    <p>Email: corovocitrezzano@gmail.com</p>
                    <p>Telefono: +39 338 503 5136</p>
                </section>
            </section>
        </main>
    </div>
</template>

<style scoped>
p {
    text-align: center;
}

.faq-question {
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    background-color: white;
    margin: 0 auto;
    font-size: 1.2em;
    text-align: left;
}

.faq-answer {
    font-weight: 200;
    font-style: italic;
    padding: 10px;
    background-color: white;
    margin: 0 auto;
    text-align: left;
    border-bottom: 1px solid #ccc;
    font-size: 1em;
}

.faq-question.open {
    border-bottom: none;
}

ul {
    padding-left: 0;
    list-style-type: none;
}
</style>