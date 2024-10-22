<script setup lang="ts">
import {useServiceStore} from "~/stores/services";

const store = useServiceStore();
const services = store.service;

useHead({
  title: "Services - Brave Sisters",
  meta:[
    {
      name:"description",
      content:"This page makes a short description of all the services offered by Brave Sister. " +
          "After that it shows all the different services with the link to the corresponding page"
    },
    {
      name:"keywords",
      content:"services, meeting, support, assistance, counseling"
    }
  ]
}
)

const paragraphs = ['YOUR NEEDS,', 'OUR JOB']
const mainImagePath = "/img/services/MAIN.webp"
</script>

<template>
    <MainImageComponent
            :paragraphs="paragraphs"
            :photo-src="mainImagePath"
            :left="false"/>
    <div class="title-with-lines" id="main-title"><h1>Services</h1></div>
    <section id="service">
    <div class="two-columns">
      <img src="/img/services/home_2.webp" alt="" />
      <div>
        <p>At Brave Sisters, we provide essential support and guidance to women who have experienced domestic violence. Our services encompass psychological counseling to help manage trauma, legal assistance to navigate the judicial process, safety planning during times of crisis, job placement aid for financial independence, and expert advice on dealing with stalking situations. Each service is tailored to address the unique needs of our clients, empowering them to rebuild their lives with confidence and security.</p>
      </div>
    </div>
    <section id="our_project">
      <div class="title-with-lines"><h2>Our Services</h2></div>
    </section>
    <div class="elements-list">
      <ListComponent
          v-for="service in services"
          :id = "service.id"
          :name = "service.name"
          :type = "'services'"
      >
      </ListComponent>
    </div>
  </section>
</template>

<style scoped>
</style>