<!--
    This component is used to show a gallery.
-->

<script setup lang="js">
import {onMounted, ref} from "vue";

const props = defineProps({
    imgBasePath: String,
    numberOfImages: Number
})

onMounted(() => {
    window.addEventListener("resize", () => {
        if (window.innerWidth < 800)
            shownImages.value = 1;
        else if (window.innerWidth < 1000)
            shownImages.value = 2;
        else
            shownImages.value = 3;
    });
})


const currImage = ref(0);
let shownImages = ref(3);

function nextImages() {
    if (currImage.value === props.numberOfImages - 1)
        currImage.value = 0;
    else
        currImage.value++;
}

function previousImages() {
    if (currImage.value === 0)
        currImage.value = props.numberOfImages - 1;
    else
        currImage.value--;
}
</script>

<template>
    <section class="gallery">
        <div class="title-with-lines"><h2>Gallery</h2></div>
        <div class="gallery-container">
            <img alt="Previous image" src="@/assets/icons/left-arrow.png" v-show="numberOfImages > shownImages"
                 v-on:keyup.enter="previousImages"
                 tabindex="0"
                 @click="previousImages" class="arrow"/>
            <div class="gallery-images">
                <img v-for="i in shownImages" :src="imgBasePath + ((currImage + i - 1) % numberOfImages) + '.webp'"
                     :alt="'Gallery image ' + ((currImage + i - 1) % numberOfImages)">
            </div>
            <img alt="Next image" class="arrow" src="@/assets/icons/right-arrow.png" v-show="numberOfImages > shownImages"
                 v-on:keyup.enter="nextImages" tabindex="0"
                 @click="nextImages" />
        </div>
    </section>
</template>

<style scoped>
.gallery-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 15px;
}

.gallery-images {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 100%;
}

.arrow {
    width: 60px;
}

.gallery-images img {
    width: 32%;
    height: 350px;
    object-fit: cover;
    border-radius: 5px;
    gap: 0;
}

@media (max-width: 1000px) {
    .gallery-images img {
        width: 49%;
    }
}

@media (max-width: 800px) {
    .gallery-images img {
        width: 100%;
    }
}
</style>