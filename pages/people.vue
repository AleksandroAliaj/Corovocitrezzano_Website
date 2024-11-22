<script setup lang="js">

import ListComponent from "~/components/ListComponent.vue";

const people = ref(usePeopleStore().people), shown = ref(9), numberOfPeople = computed(() => people.value.length);
const paragraphs = ['LE NOSTRE VOCI,', 'UNITE PER TE!']
const mainImagePath = "/img/people/MAIN.webp"

function showMore() {
    if (shown.value + 6 > numberOfPeople.value)
        shown.value = numberOfPeople.value;
    else
        shown.value = shown.value + 6;
}

useHead({
  title: "Le Voci - Coro di Trezzano",
  meta:[
    {
      name:"description",
      content:"Questa pagina contiene una breve descrizione del nostro coro e dei membri che lo compongono. " +
          "Dopo, puoi trovare informazioni sui membri del coro con i link alle rispettive pagine personali."
    },
    {
      name:"keywords",
      content:"coro, voci, trezzano, chiesa, canto"
    }
  ]
})

</script>

<template>
    <MainImageComponent
            :paragraphs="paragraphs"
            :photo-src="mainImagePath"
            :left="false"/>
    <div class="title-with-lines" id="main-title"><h1>Le Nostre Voci</h1></div>
    <section>
        <div class="two-columns">
            <img src="/img/people/collaboration.webp" alt=""/>
            <div>
                <p>Il Coro di Trezzano è composto da un gruppo di appassionati cantanti che si dedicano a portare la musica nelle chiese di Trezzano e oltre. Il nostro coro è aperto a tutti coloro che desiderano unirsi a noi per esprimere la propria fede attraverso il canto. Siamo sempre alla ricerca di nuove voci e talenti!</p>
            </div>
        </div>
        <section>
            <div class="title-with-lines"><h2>I Nostri Membri</h2></div>
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
                <button v-show="shown < numberOfPeople" @click="showMore">Mostra più membri</button>
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