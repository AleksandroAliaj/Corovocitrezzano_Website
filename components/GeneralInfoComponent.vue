<!--
  This component is used when a frame with all the general info about elements (projects, people or services) must be shown,
  i.e., in the specific pages of single projects, people and services.
-->

<script setup lang="js">
import {useRouter} from "vue-router";
import People from "~/pages/people.vue";

const router = useRouter();
const props = defineProps({
    id: Number,
    name: String,
    subtitle: String,
    content: String,
    context: {
        type: String,
        default: 'People'
    },
    total: Number
});

const getPrevId = () => {
    if (props.id === 1)
        return `/${props.context}-${props.total}`
    else
        return `/${props.context}-${props.id - 1}`;
};

const getNextId = () => {
    if (props.id == props.total)
        return `/${props.context}-1`
    else
        return `/${props.context}-${props.id + 1}`;
};

const getImageSrc = () => {
    return `/img/people/${props.id}.webp`;
};
</script>

<template>
    <div class="back-to">
        <button @click="router.push(`/people`);">< Ritorna alla lista delle persone</button>
    </div>
    <div class="title-with-lines"><h2>{{ props.context }}</h2></div>
    <NuxtLink class="desktopVisible" :href="getPrevId()">
        <img alt="Back to all elements" class="arrow" id="left-arrow" src="@/assets/icons/left-arrow.png"/>
    </NuxtLink>
    <div class="generalInfo">

        <div>
            <img alt="Portrait" class="portrait" :src="getImageSrc()"/>
            <div>
                <h3>{{ name }}</h3>
                <h4>{{ subtitle }}</h4>
                <p>{{ content }}</p>
            </div>
        </div>

    </div>
    <NuxtLink class="desktopVisible" :href="getNextId()">
        <img alt="Next element" class="arrow" id="right-arrow" src="@/assets/icons/right-arrow.png"/>
    </NuxtLink>
    <div class="reducedVisible">
        <NuxtLink  :href="getPrevId()">
            <img alt="Left arrow" class="arrow" src="@/assets/icons/left-arrow.png"/>
        </NuxtLink>
        <NuxtLink :href="getNextId()">
            <img alt="Previous element" class="arrow" src="@/assets/icons/right-arrow.png"/>
        </NuxtLink>
    </div>

</template>

<style scoped>
button {
    margin-top: 30px;
}
.back-to {
    position: sticky;
    left: 30px;
    padding-left: 0;
    width: 100%;
    display: unset;
    top: 190px;
    z-index: 80;
}
.reducedVisible {
    display: none;
}
.arrow {
    width: 60px;
    position: fixed;
    top: 50%;
}
#left-arrow {
    left: 20px;
}
#right-arrow {
    right: 20px;
}

.generalInfo, .generalInfo > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    gap: 4%;
}

.portrait {
    width: 300px;
    height: 300px;
    object-fit: cover;
    border-radius: 50%;
    background-color: #d4dae5;
}



@media (max-width: 1400px) {

    .generalInfo > div {
        display: initial;
    }
}

@media (max-width: 1000px) {
    .back-to {
        position: revert;
    }
    button {
        margin-top: 0;
    }
    .desktopVisible {
        display: none;
    }
    .reducedVisible {
        display: flex;
        justify-content: space-between;
    }
    .arrow {
        position: unset;
    }
}

@media (max-width: 600px) {
    .portrait {
        width: 80%;
    }

    .arrow {
        width: 50px;
    }
}
</style>
