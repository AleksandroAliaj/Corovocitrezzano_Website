<!--
  This component is used when a list of elements (people, projects, services, reviews) must be shown,
  i.e., in the general pages about people, projects and services, with the list of all of them.
-->

<script setup lang="js">
defineProps({
  id: Number,
  name: String,
  subtitle: String,
  content: String,
  type: String    // type refers to where it has been used.
});

const getImageSrc = (type, id) => {
    return `/img/${type}/${id}.webp`;
};
</script>

<template>
  <NuxtLink :href="(id !== undefined) ? '/' + type + '-' + id.toString() : ''" class="border">
    <div class="generalInfo">
      <img v-if="type !== 'review'" class="portrait" alt="" :src="getImageSrc(type, id)" />
      <h3> {{ name }}</h3>
      <h4 v-if="subtitle">{{ subtitle }}</h4>
      <p v-if="content" style="font-size: 80%">{{ content }}</p>
    </div>
  </NuxtLink>
</template>

<style scoped>
.border {
  border: 1px solid #3a6775;
  padding: 10px;
  width: 220px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
  color: inherit;
    line-height: normal;
}

.border:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border: 1px solid #ccc;
}

.generalInfo, .generalInfo > div {
  align-items: center;
  justify-content: space-between;
  text-align: center;
}

.portrait {
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin: 5%;
  border-radius: 50%;
    background-color: #d4dae5;
}
@media (max-width: 250px) {
    .border {
        width: 80%;
    }
    .portrait {
        width: 60%;
    }
}
</style>
