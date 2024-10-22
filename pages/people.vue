<script setup lang="js">

import ListComponent from "~/components/ListComponent.vue";

const people = ref(usePeopleStore().people), shown = ref(9), numberOfPeople = computed(() => people.value.length);
const paragraphs = ['BY YOUR SIDE,', 'FOR YOU!']
const mainImagePath = "/img/people/MAIN.webp"


function showMore() {
    if (shown.value + 6 > numberOfPeople.value)
        shown.value = numberOfPeople.value;
    else
        shown.value = shown.value + 6;
}

useHead({
  title: "People - Brave Sisters",
  meta:[
    {
      name:"description",
      content:"This page contains a short description of the team of employees that works in Brave Sisters. " +
          "After that it shows all the members of the team with the link to the corresponding personal pages."
    },
    {
      name:"keywords",
      content:"people, workers, employees, person, member"
    }
  ]
})

</script>

<template>
    <MainImageComponent
            :paragraphs="paragraphs"
            :photo-src="mainImagePath"
            :left="false"/>
    <div class="title-with-lines" id="main-title"><h1>People</h1></div>
    <section>
        <div class="two-columns">
            <img src="/img/people/collaboration.webp" alt=""/>
            <div>
                <p>At Brave Sister Center, our team consists of highly qualified professionals dedicated to supporting
                    women in need. Our staff includes psychologists specialized in gender-based violence, social workers
                    experienced in women's rights, lawyers knowledgeable in legal issues related to domestic violence,
                    and healthcare providers offering medical and psychological assistance. Additionally, we collaborate
                    with volunteers and interns who contribute to our daily work with passion and dedication.</p>
            </div>
        </div>
        <section>
            <div class="title-with-lines"><h2>Our People</h2></div>
            <div class="elements-list">
                <ListComponent
                        v-for="person in people.slice(0, shown)"
                        :key="person.id"
                        :id="person.id"
                        :name="`${person.name} ${person.surname}`"
                        :subtitle="person.role"
                        :type="'people'"
                        :content="person.description.slice(0, 80) + '...'"
                />
            </div>
            <div id="showMore">
                <button v-show="shown < numberOfPeople" @click="showMore">Show more people</button>
            </div>
        </section>
    </section>
</template>

<style scoped>
   #showMore {
       text-align: center;
       margin: 2%;
   }
</style>