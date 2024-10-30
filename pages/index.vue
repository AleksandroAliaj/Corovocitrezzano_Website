<script setup lang="js">
import {useRouter} from 'vue-router';
import {useRoute} from 'vue-router';
import {usePeopleStore} from '@/stores/people.ts';
import {computed, ref, reactive, onMounted} from 'vue';
import {useServiceStore} from "~/stores/services.ts";
import {useReviewStore} from "~/stores/reviews.ts";
import ListComponent from "~/components/ListComponent.vue";

const route = useRoute();
const peopleStore = usePeopleStore();
const serviceStore = useServiceStore();
const reviewStore = useReviewStore();
let numberOfShownReviews = ref(3);
let feedbackMessage = ref('')

function checkWindowSize() {
    if (window.innerWidth < 800)
        numberOfShownReviews.value = 1;
    else if (window.innerWidth < 1200)
        numberOfShownReviews.value = 2;
    else if (window.innerWidth < 1600)
        numberOfShownReviews.value = 3;
    else
        numberOfShownReviews.value = 4;
}

onMounted(() => {
    checkWindowSize()
    window.addEventListener("resize", () => {
        checkWindowSize()
    });
})

const serviceId = computed(() => route.params.id);
const service = computed(() => serviceStore.getService(parseInt(serviceId.value, 10)));
const person = computed(() => peopleStore.getPerson(service.value?.person));
let review = computed(() => (reviewStore.review.filter((r) => r.service === 1)));
const shownReviews = computed(() => review.value.slice(reviewsIndex.value, reviewsIndex.value + numberOfShownReviews.value))


const inputReview = reactive({
    name: '',
    surname: '',
    comment: '',
    date: '',
    service: 1
})

let sendingReview = {
    name: '',
    surname: '',
    comment: '',
    date: '',
    service: 1
}

async function addReview(event) {
    event.preventDefault();
    sendingReview.date = inputReview.date || new Date().toISOString().substring(0, 10); // Usa la data inserita o quella attuale
    sendingReview.name = inputReview.name;
    sendingReview.surname = inputReview.surname;
    sendingReview.comment = inputReview.comment;
    reviewStore.addReview(sendingReview).then(error => {
        if (error)
            feedbackMessage.value = error;
        else
            feedbackMessage.value = 'Un nuovo evento è stato registrato';
    });
    inputReview.name = '';
    inputReview.surname = '';
    inputReview.comment = '';
    inputReview.date = ''; // Reset campi form
    showForm.value = false; // Nascondi il form dopo l'invio
}

let numberOfReviews = computed(() => review.value.length);
let reviewsIndex = ref(0);

let showPasswordInput = ref(false);
let adminPassword = ref("");
let showForm = ref(false); // Visibilità del form di recensione

function togglePasswordInput() {
    showPasswordInput.value = true;
}

function checkAdminPassword() {
    if (adminPassword.value === "nuovoevento") {
        showForm.value = true;
        showPasswordInput.value = false;
        feedbackMessage.value = ""; // Pulisce eventuali messaggi di errore
    } else {
        feedbackMessage.value = "Non sei l'amministratore";
    }
}

const SEOData = computed(() => new Object({
    title: service.value ? service.value.name + " - Brave Sisters" : "Service not found - Brave Sisters",
    meta: [
        {
            name: "description",
            content: "This page contains a short description of " + service.value?.name + ". After that we can find the referent of this activity and the end some correlated images"

        },
        {
            name: "keywords",
            content: service.value?.name
        }
    ]
}))
const router = useRouter();
const imgBasePath = "/img/homepage/home_";
const numberOfImages = 6;

const paragraphs = ['CANTA CON NOI,', 'UNISCI LA TUA VOCE', 'PER UNA COMUNITÀ PIÙ FORTE']
const mainImagePath = "/img/homepage/MAIN.png"

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
  title: "Home - Coro delle voci di Trezzano",
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
                        
                        
                    </div>
                    <div id="reviews">
                        <NuxtLink v-show="numberOfReviews > numberOfShownReviews && reviewsIndex > 0" @click="reviewsIndex--;">
        <img alt="Left arrow" class="arrow" src="@/assets/icons/left-arrow.png"/>
    </NuxtLink>
    <div class="elements-list">
        <ListComponent
            v-for="review in shownReviews"
            :name="`${review.name} ${review.surname}`"
            :subtitle="`${new Date(review.date).toLocaleDateString('eng-us')}`"
            :type="'review'"
            :content="`${review.comment}`"
        />
    </div>
    <NuxtLink
        v-show="numberOfReviews > numberOfShownReviews && reviewsIndex + numberOfShownReviews !== numberOfReviews"
        @click="reviewsIndex++">
        <img alt="Right arrow" class="arrow" src="@/assets/icons/right-arrow.png"/>
    </NuxtLink>
</div>
<button class="centered-button" @click="togglePasswordInput">+</button>

<div v-if="showPasswordInput" class="password-container">
    <input type="password" v-model="adminPassword" placeholder="Inserisci password" />
    <div style="margin-right: 20px;"></div>
    <div style="margin-bottom: 20px;"></div>
    <button @click="checkAdminPassword">Invia</button>
    <p v-if="feedbackMessage">{{ feedbackMessage }}</p>
</div>

<h3 v-if="showForm">Aggiungi un nuovo evento</h3>
<form v-if="showForm" id="form">
    <div class="form-row">
        <div class="form-group">
            <label for="name">Luogo</label>
            <input v-model="inputReview.name" type="text" id="name" name="name" />
        </div>
        <div class="form-group">
            <label for="surname">Ora</label>
            <input v-model="inputReview.surname" type="text" id="surname" name="surname" />
        </div>
    </div>
    <div class="form-group">
        <label for="date">Data</label>
        <input v-model="inputReview.date" type="date" id="date" name="date" />
    </div>
    <div class="form-group full-width">
        <label for="comment">Descrizione</label>
        <textarea v-model="inputReview.comment" id="comment" name="comment"></textarea>
    </div>
    <br />
    <input type="submit" value="Add review" @click="addReview($event)" class="submit" />
</form>

            <div class="confirmation-message">
                {{ feedbackMessage }}
                
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
                            <div class="title-with-lines"><h2>Documenti</h2></div>
                            <div class="image-container" @click="goToProjects">
                                <img src="/img/homepage/2.webp" alt="Vai ai documenti"/>
                                <div class="hover-text">Scopri i nostri documenti</div>
                                <div class="hover-overlay"></div>
                            </div>
                        </div>
                        <div>
                            <div class="title-with-lines"><h2>Video</h2></div>
                            <div class="image-container" @click="goToServices">
                                <img src="/img/homepage/1.webp" alt="Vai ai video"/>
                                <div class="hover-text">Scopri i nostri video</div>
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

.centered-button {
    display: block;
    margin: 20px auto;
    font-size: 2rem;
    cursor: pointer;
}

.password-container {
    text-align: center;
    margin-top: 15px;
}



.arrow {
    width: 60px;
}

#review-section {
    margin-top: 20px;
    text-align: center;
}

#reviews {
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 40px;
}

#form {
    margin-top: 20px;
}

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