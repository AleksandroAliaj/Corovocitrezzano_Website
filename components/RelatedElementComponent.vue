<!--
  This component is used when a navigation to a related element (e.g., from a project to the responsible person) must be inserted.
-->

<script setup lang="js">
import {useRouter} from "vue-router";

const router = useRouter();
const props = defineProps({
    type: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description : {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        required: true,
    },
});

const getImageSrc = (type, id) => {
    return `/img/${type}/${id}.webp`;
};
</script>

<template>
    <NuxtLink :href="`/` + props.type + '-' + props.id">
        <div class="element">
            <img :src="getImageSrc(type, id)" alt=""/>
            <h3>{{ name }}</h3>
            <p>{{ description.slice(0, 250) + '...' }}</p>
        </div>
    </NuxtLink>
</template>

<style scoped>
.element {
    cursor: pointer;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
    flex: 0 1 auto;
    max-width: 500px;
    box-sizing: border-box;
    transition: transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;
    border: 1px solid transparent;
}

.element:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border: 1px solid #ccc;
}

.element img {
    width: 70%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    margin: 5%;
    border-radius: 50%;
    background-color: #d4dae5;
}
a {
    text-decoration: none;
}
</style>
