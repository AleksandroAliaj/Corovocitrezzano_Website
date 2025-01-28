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


let showDeletePasswordInput = ref(false);
let deleteAdminPassword = ref("");
let showDeleteSelection = ref(false);
let selectedReviewToDelete = ref(null);



function checkDeleteAdminPassword() {
    if (deleteAdminPassword.value === "eliminaevento") {
        showDeleteSelection.value = true;
        showDeletePasswordInput.value = false;
        feedbackMessage.value = ""; // Clear any error messages
    } else {
        feedbackMessage.value = "Non sei l'amministratore";
    }
}

async function deleteSelectedReview() {
    if (selectedReviewToDelete.value) {
        try {
            await reviewStore.deleteReview(selectedReviewToDelete.value);
            feedbackMessage.value = "Evento eliminato con successo";
            showDeleteSelection.value = false;
            selectedReviewToDelete.value = null;
        } catch (error) {
            feedbackMessage.value = "Errore durante l'eliminazione dell'evento";
        }
    } else {
        feedbackMessage.value = "Seleziona un evento da eliminare";
    }
}

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
    // Toggle the current state
    showPasswordInput.value = !showPasswordInput.value;
    
    // If we're hiding the password input, reset all related states
    if (!showPasswordInput.value) {
        adminPassword.value = "";
        showForm.value = false;
        feedbackMessage.value = "";
    }
    
    // Hide delete-related elements when toggling add
    showDeletePasswordInput.value = false;
    deleteAdminPassword.value = "";
    showDeleteSelection.value = false;
    selectedReviewToDelete.value = null;
}

function toggleDeletePasswordInput() {
    // Toggle the current state
    showDeletePasswordInput.value = !showDeletePasswordInput.value;
    
    // If we're hiding the delete password input, reset all related states
    if (!showDeletePasswordInput.value) {
        deleteAdminPassword.value = "";
        showDeleteSelection.value = false;
        selectedReviewToDelete.value = null;
        feedbackMessage.value = "";
    }
    
    // Hide add-related elements when toggling delete
    showPasswordInput.value = false;
    adminPassword.value = "";
    showForm.value = false;
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
useHead({
  title: "Coro Voci Trezzano - Canto Corale a Trezzano sul Naviglio",
  meta: [
    {
            name: "google-site-verification",
            content: "njoMrceFdnJOWLQl4PKP-WYKdn7f__adcuwA0fIieac"
    },
    {
      name: "description",
      content: "Il Coro delle Voci di Trezzano, attivo nelle Chiese di Santa Gianna e Sant'Ambrogio. Unisciti a noi per celebrazioni liturgiche, concerti e attività comunitarie. Appassionati di musica corale benvenuti!"
    },
    {
      name: "keywords",
      content: "coro trezzano, trezzano sul naviglio, canto corale, coro liturgico, santa gianna, sant'ambrogio, trezzano sul naviglio, musica sacra, coro parrocchiale, concerti, musica corale"
    },
    {
      name: "og:title",
      content: "Coro Voci Trezzano - Canto Corale a Trezzano sul Naviglio"
    },
    {
      name: "og:description", 
      content: "Scopri il nostro coro: passione, musica e comunità. Unisciti a noi nelle chiese di Santa Gianna e Sant'Ambrogio."
    },
    {
      property: "og:type",
      content: "website"
    }
  ]
}) 
const SEOData = computed(() => new Object({
    title: "Coro Voci Trezzano - Canto Corale a Trezzano sul Naviglio",
  meta: [
    {
      name: "description",
      content: "Il Coro delle Voci di Trezzano, attivo nelle Chiese di Santa Gianna e Sant'Ambrogio. Unisciti a noi per celebrazioni liturgiche, concerti e attività comunitarie. Appassionati di musica corale benvenuti!"
    },
    {
      name: "keywords",
      content: "coro trezzano, canto corale, coro liturgico, santa gianna, sant'ambrogio, trezzano sul naviglio, musica sacra, coro parrocchiale, concerti, musica corale"
    },
    {
      name: "og:title",
      content: "Coro Voci Trezzano - Canto Corale a Trezzano sul Naviglio"
    },
    {
      name: "og:description", 
      content: "Scopri il nostro coro: passione, musica e comunità. Unisciti a noi nelle chiese di Santa Gianna e Sant'Ambrogio."
    },
    {
      property: "og:type",
      content: "website"
    }
  ]
}))
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
                        <p>Benvenuto nel sito del Coro di Trezzano, spesso ci puoi sentire nelle Chiese di Santa Gianna e Sant'Ambrogio di Trezzano sul Naviglio, ma ci troverai anche in altri eventi. <br>
                        Il nostro coro è una comunità aperta a tutti coloro che desiderano esprimersi attraverso il canto. <br>
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
            :name="`${review.location} ${review.hour}`"
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


    <!-- Existing password input -->
    <div v-if="showPasswordInput" class="password-container">
        <input type="password" v-model="adminPassword" placeholder="Password per aggiungere" />
        <button @click="checkAdminPassword">Invia</button>
    </div>

    <!-- New delete password input -->
    <div v-if="showDeletePasswordInput" class="password-container">
        <input type="password" v-model="deleteAdminPassword" placeholder="Password per eliminare" />
        <button @click="checkDeleteAdminPassword">Invia</button>
    </div>

    <!-- Delete selection interface -->
    <div v-if="showDeleteSelection" class="delete-selection-container">
        <h3>Seleziona l'evento da eliminare:</h3>
        <div class="review-selection-list">
            <div 
                v-for="review in review" 
                :key="review.id"
                class="review-selection-item"
                :class="{ 'selected': selectedReviewToDelete === review.id }"
                @click="selectedReviewToDelete = review.id"
            >
                <p>{{ new Date(review.date).toLocaleDateString('it-IT') }} - {{ review.location }} {{ review.hour }}</p>
                <p class="review-comment">{{ review.comment }}</p>
            </div>
        </div>
        <button 
            @click="deleteSelectedReview"
            class="delete-button"
            :disabled="!selectedReviewToDelete"
        >
            Elimina evento selezionato
        </button>
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
    <div class="form-group full-width">
        <label for="date">Data</label>
        <input v-model="inputReview.date" type="date" id="date" name="date" />
    </div>
    <div class="form-group full-width">
        <label for="comment">Descrizione</label>
        <textarea v-model="inputReview.comment" id="comment" name="comment"></textarea>
    </div>
    <br />
    <input type="submit" value="Aggiungi evento" @click="addReview($event)" class="submit" />
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

.feedback-message {
    margin-top: 10px; /* Aggiungi un margine superiore per distanziare la scritta */
    color: red; /* Puoi cambiare il colore se necessario */
}

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

.button-container {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin: 20px auto;
}

.action-button {
    font-size: 2rem;
    cursor: pointer;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 5px;
    background-color: #4c8189;
    color: white;
    transition: background-color 0.3s ease;
}

.action-button:hover {
    background-color: #3a646a;
}

.delete-selection-container {
    margin: 20px auto;
    max-width: 600px;
}

.review-selection-list {
    margin: 15px 0;
    max-height: 300px;
    overflow-y: auto;
}

.review-selection-item {
    padding: 10px;
    margin: 5px 0;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.review-selection-item:hover {
    background-color: #f5f5f5;
}

.review-selection-item.selected {
    background-color: #e6f3f5;
    border-color: #4c8189;
}

.review-comment {
    font-size: 0.9em;
    color: #666;
    margin-top: 5px;
}

.delete-button {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.delete-button:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
}

.delete-button:hover:not(:disabled) {
    background-color: #c82333;
}
</style>