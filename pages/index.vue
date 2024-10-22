<script setup lang="js">
import {onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';

const router = useRouter();
const imgBasePath = "/img/homepage/home_";
const numberOfImages = 6;

const paragraphs = ['REACT NOW,', 'DON\'T WAIT', 'ANY LONGER']
const mainImagePath = "/img/homepage/MAIN.webp"

const textVisibility = ref([false, false, false]);

onMounted(() => {
    // Animate text appearance
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
  title: "Home - Coro Trezzano",
  meta:[
    {
      name:"description",
      content:"This is the home page of the site. In this page , after an image and a short slogan,we can find " +
          " a short text that encourages, in case of violence, seeking help and emphasizes that support is available, urging those in immediate danger to call emergency service." +
          " After that we can find a page with the hyperlink to the most important page of the site: people, project and services. " +
          " In the end there's a short gallery with some images."
    },
    {
      name:"keywords",
      content:"domestic violence, women safety, violence against women, help for women, stalking, sexual abuse, help, support for women"
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
        <div class="title-with-lines" id="main-title"><h1>Welcome, brave sister!</h1></div>
        <section>
            <section>
                <div class="two-columns">
                    <div>
                        <p>Welcome to our website! <br>
                        Brave Sisters is an helpful center for women in difficulties due to domestic violence.
                        If you're looking for help either for you or for a loved one, you are in the right place! <br>
                        In this website you'll find all the information about our job and our experience. <br>
                            Enjoy us!
                        <br>
                        If you're in trouble for some reasons, you can use, by clicking on the icon in the right bottom corner of the page, our bot: it will help you about the current legislation in Italy against domestic violence and also to navigate through the different sections of this website.
                        <br>
                        We're here for you and for your safety! You're not alone.</p>
                    </div>
                    <div>
                        <div class="title-with-lines"><h2>People</h2></div>
                        <div class="image-container" @click="goToPeople">
                            <img src="/img/homepage/collaboration_1.webp" alt="Go to people"/>
                            <div class="hover-text">Meet the team</div>
                            <div class="hover-overlay"></div>
                        </div>
                    </div>
                </div>

            </section>
            <section id="warning-signs">
                <div class="title-with-lines"><h2>Signs of violence</h2></div>
                <div>
                    <div>
                        <p>Violence can take many forms. If you experience any of these, you may be in an abusive
                            situation:</p>
                        <ul>
                            <li>Your partner constantly criticizes or humiliates you</li>
                            <li>You feel afraid of your partner or anxious to please them</li>
                            <li>Your partner controls your finances or who you see</li>
                            <li>Your partner threatens you or your loved ones</li>
                            <li>You feel pressured or forced into intimate situations</li>
                        </ul>
                        <p>Remember, you're not alone. Help is available. If you're in immediate danger, call emergency
                            services, or contact us using our phone number: +39 0574 53695.</p>
                    </div>
                </div>
            </section>

            <section id="activities">
                <div class="title-with-lines"><h2>Activities</h2></div>
                    <div>
                        <p>There are many different activities we put in place to assist women victims of violence throughout the entire journey they face to overcome it. <br>
                        You can discover them by visiting the pages related to our projects and our services: <br>
                        </p>
                    </div>
                <div class="two-columns">
                        <div>
                            <div class="title-with-lines"><h2>Projects</h2></div>
                            <div class="image-container" @click="goToProjects">
                                <img src="/img/homepage/1.webp" alt="Go to projects"/>
                                <div class="hover-text">Discover our projects</div>
                                <div class="hover-overlay"></div>
                            </div>
                        </div>
                        <div>
                            <div class="title-with-lines"><h2>Services</h2></div>
                            <div class="image-container" @click="goToServices">
                                <img src="/img/homepage/2.webp" alt="Go to services"/>
                                <div class="hover-text">Discover our services</div>
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

#warning-signs {
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
