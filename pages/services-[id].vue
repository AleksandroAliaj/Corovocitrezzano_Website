<script setup lang="js">
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
let review = computed(() => (reviewStore.review.filter((r) => r.service === parseInt(serviceId.value))));
const shownReviews = computed(() => review.value.slice(reviewsIndex.value, reviewsIndex.value + numberOfShownReviews.value))

const imgBasePath = '/img/services/' + route.params.id + '/';
const numberOfImages = 3;

const inputReview = reactive({
    name: '',
    surname: '',
    comment: '',
    date: '',
    service: parseInt(serviceId.value)
})

let sendingReview = {
    name: '',
    surname: '',
    comment: '',
    date: '',
    service: parseInt(serviceId.value)
}

async function addReview(event) {
    event.preventDefault()
    sendingReview.date = new Date().toISOString().substring(0, 10)
    sendingReview.name = inputReview.name;
    sendingReview.surname = inputReview.surname;
    sendingReview.comment = inputReview.comment;
    reviewStore.addReview(sendingReview).then(error => {
        if (error)
            feedbackMessage.value = error;
        else
            feedbackMessage.value = 'Thank you for your feedback! Your review has been correctly registered.'
    })
    inputReview.name = null
    inputReview.surname = null
    inputReview.comment = null
}

let numberOfReviews = computed(() => review.value.length);
let reviewsIndex = ref(0);

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
</script>


<template>
    <Head>
        <Title>{{SEOData.title}}</Title>
        <Meta v-for="meta in SEOData.meta" :name="meta.name" :content="meta.content"/>
    </Head>

    <main v-if="service">
        <section id="service">
            <GeneralInfoComponent
                    :id="service.id"
                    :name="service.name"
                    :subtitle="'Service'"
                    :content="service.description"
                    context="services"
                    :total=5
            />
        </section>

        <section v-if="person">
            <h2 class="title-with-lines">Service's staff</h2>
            <div>
                <RelatedElementComponent
                        :id="person.id"
                        :type="'people'"
                        :name="person.name + ' ' + person.surname"
                        :description="person.description"
                />
            </div>
        </section>

        <section id="review-section">
            <div class="title-with-lines"><h2>Service's reviews</h2></div>
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
            <h3>Add a new review</h3>
            <form id="form">
                <div class="form-row">
                    <div class="form-group">
                        <label for="name">Name*</label>
                        <input v-model="inputReview.name" type="text" id="name" name="name"/>
                    </div>
                    <div class="form-group">
                        <label for="surname">Surname*</label>
                        <input v-model="inputReview.surname" type="text" id="surname" name="surname"/>
                    </div>
                </div>
                <div class="form-group full-width">
                    <label for="comment">Comment*</label>
                    <textarea v-model="inputReview.comment" id="comment" name="comment"
                    />
                </div>
                <br>
                <input type="submit" value="Add review" @click="addReview($event)" class="submit">
            </form>
            <div class="confirmation-message">
                {{ feedbackMessage }}
            </div>
        </section>

        <GalleryComponent
                :number-of-images=numberOfImages
                :img-base-path=imgBasePath
        />

        <br>
        <br>
    </main>
    <main v-else>
        <div class="error">
            <h2>Ops! Error 404: the service you're looking for is not present.</h2>
            <br>
            <button @click="$router.push('/services')">Back to all services</button>
        </div>
    </main>
</template>


<style scoped>
main {
    padding-top: 30px;
}

.arrow {
    width: 60px;
}

#review-section {
    text-align: center;
}

#reviews {
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
}
</style>
