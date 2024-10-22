<!--
  This component is used in each one of the main pages of the website to show a graphic layout with an image and some slogans at the beginning of the page.
-->

<script setup lang="js">
import {onMounted} from "vue";

const props = defineProps ({
    paragraphs: Array,
    photoSrc: String,
    left: Boolean
})

const textVisibility = ref([false, false, false]);

const photoComputedSrc = ref(props.photoSrc)

function checkWindowSize() {
    if (window.innerWidth < 800)
        photoComputedSrc.value = props.photoSrc.split(".")[0] + '600.' + props.photoSrc.split(".")[1]
    else
        photoComputedSrc.value = props.photoSrc
}

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
    checkWindowSize()
    window.addEventListener("resize", () => {
        checkWindowSize()
    });
})
</script>

<template>
    <div id="center" :class="left ? 'image-text-container-left' : 'image-text-container-right'">
        <img v-if="left" id="main-img" :src="photoComputedSrc" alt=""/>
        <div class="text-overlay" :style="!left ? 'align-items: flex-end;' : ''">
          <span v-for="(text, index) in paragraphs" :key="index"
                :class="{ 'visible': textVisibility[index] }" class="text-line">
            {{ text }}
          </span>
        </div>
        <img v-if="!left" id="main-img" :src="photoComputedSrc" style="border-radius: 0 0 0 20px;" alt=""/>
    </div>
</template>

<style scoped>


.image-text-container-right, .image-text-container-left {
    display: grid;
    gap: 1%;
    grid-template-columns: 3fr 1fr;
}
.image-text-container-right {
    grid-template-columns: 1fr 3fr;
}
#main-img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 0 0 20px 0;
    margin-left: 0;
    z-index: 1;
    padding-left: -20%;
    padding-right: -20%;
}
.text-overlay {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: 100%;
    font-size: 2em;
    line-height: initial;
    font-family: 'Impact', sans-serif;
    color: #ffffff;
    text-align: left;
    z-index: 0;
}
.text-line {
    opacity: 0;
    transform: translateX(-50%);
    transition: opacity 0.5s, transform 0.5s, filter 0.5s;
    filter: blur(5px);
    margin-bottom: 20px;
    background-color: #4c8189;
    padding: 20px 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
}

.text-line.visible {
    opacity: 1;
    transform: translateX(0%);
    filter: blur(0);
}
#center {
    padding: 0;
    margin: 0;
}
@media (max-width: 1000px) {
    .text-overlay {
        text-align: center;
        margin-left: auto;
        margin-right: auto;
        margin-top: 20px;

    }
    .image-text-container-right, .image-text-container-left {
        display: flex;
        flex-direction: column;
    }
    .image-text-container-right {
        flex-direction: column-reverse;
    }
    #main-img {
        border-left: none;
    }
}

@media (max-width: 600px) {
    .text-overlay {
        font-size: 1.4em;
    }
}
</style>