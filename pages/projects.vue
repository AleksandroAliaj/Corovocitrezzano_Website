<script setup lang="ts">

  import {useProjectStore} from "~/stores/projects";
  import ListComponent from "~/components/ListComponent.vue";

  const store = useProjectStore();
  const projects = store.project;


  useHead({
    title: "Project - Brave Sisters",
    meta:[
      {
        name:"description",
        content:"This page contains a short description of all the projects organized by Brave Sisters. " +
            "After that it shows all the different with the link to the corresponding page"
      },
      {
        name:"keywords",
        content:"projects, initiatives, programs, community"
      }
    ]
  })

  const paragraphs = ['YOUR LIFE,', 'YOUR choices']
  const mainImagePath = "/img/projects/MAIN.webp"
</script>

<template>
    <MainImageComponent
            :paragraphs="paragraphs"
            :photo-src="mainImagePath"
            :left="false"/>
    <div class="title-with-lines" id="main-title"><h1>Projects</h1></div>
    <section id="project">
    <div class="two-columns">
      <img src="/img/projects/home_3.webp" alt="" />
      <div>
        <p>Brave Sisters offers a range of projects aimed at empowering women affected by domestic violence, fostering resilience and promoting a brighter future. Our initiatives engage survivors and past victims in meaningful actions to reclaim their lives. From vocational training programs designed to enhance job skills and promote financial independence, to community-driven efforts that encourage women to share their experiences and support one another, each project is crafted to empower and inspire.
          Additionally, we focus on securing a stable future for children impacted by violence, providing essential support and resources. Our projects also include sports activities aimed at improving both mental and physical health, contributing to holistic recovery.</p>
      </div>
    </div>
    <section id="our_project">
      <div class="title-with-lines"><h2>Our Projects</h2></div>
    </section>
    <div class="elements-list">
      <ListComponent
          v-for="project in projects"
          :id = "project.id"
          :name = "project.name"
          :type = "'projects'"
      >
      </ListComponent>
    </div>
  </section>
</template>

<style scoped>
</style>