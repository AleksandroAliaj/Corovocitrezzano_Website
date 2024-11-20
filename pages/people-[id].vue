<script setup lang="js">
import { useRoute, useRouter } from 'vue-router';
import { usePeopleStore } from '@/stores/people.ts';
import { computed, watch } from 'vue';
import { useProjectStore } from '~/stores/projects.ts';
import { useServiceStore } from '~/stores/services.ts';

useHead({
  title: person.value ? 
    (`${person.name} ${person.surname} - Membro del Coro Voci Trezzano`) : 
    ("Membri del Coro - Voci Trezzano"),
  meta: [
    {
      name: "description",
      content: person.value ? 
        (`Scopri ${person.name} ${person.surname}, ${person.role} del Coro Voci di Trezzano. Partecipa a progetti corali, servizi musicali e attività comunitarie nelle chiese di Trezzano sul Naviglio.`) : 
        ("Scopri i talenti e i membri del Coro Voci di Trezzano, una comunità musicale dedita al canto liturgico e corale.")
    },
    {
      name: "keywords",
      content: person.value ? 
        (`Coro Voci Trezzano, ${person.name} ${person.surname}, ${person.role}, musica corale, canto liturgico, santa gianna, sant'ambrogio`) : 
        ("Coro Voci Trezzano, membri del coro, musica corale, canto liturgico")
    },
    {
      name: "og:title",
      content: person.value ? 
        (`${person.name} ${person.surname} - Membro del Coro Voci Trezzano`) : 
        ("Membri del Coro Voci Trezzano")
    },
    {
      name: "og:description", 
      content: person.value ? 
        (`Conosci ${person.name} ${person.surname}, ${person.role} del Coro Voci di Trezzano. Scopri il suo contributo alla nostra comunità musicale.`) : 
        ("Scopri i talenti dietro il Coro Voci di Trezzano.")
    },
    {
      property: "og:type",
      content: "profile"
    },
    {
      name: "robots",
      content: "index, follow"
    }
  ]
})

const route = useRoute();
const router = useRouter();
const peopleStore = usePeopleStore();
const projectStore = useProjectStore();
const serviceStore = useServiceStore();

const personId = computed(() => route.params.id);
const person = computed(() => peopleStore.getPerson(parseInt(personId.value, 10)));
const projects = computed(() => projectStore.getPersonProjects(parseInt(personId.value, 10)));
const services = computed(() => serviceStore.getPersonServices(parseInt(personId.value, 10)));

// Watch person and redirect if not found
watch(person, (newValue) => {
  if (!newValue) {
    router.push('/people');
  }
}, { immediate: true });

const SEOData = computed(() => new Object ({
  title: person.value ? 
    (`${person.value.name} ${person.value.surname} - Coro Voci di Trezzano`) : 
    ("Persona non trovata! - Coro Voci di Trezzano"),
  meta: [
    {
      name: "description",
      content: person.value ? 
        (`Scopri il profilo di ${person.value.name} ${person.value.surname}, membro del Coro Voci di Trezzano. Qui puoi trovare informazioni sul suo ruolo, le attività e i progetti a cui partecipa.`) : 
        ("Scopri il profilo di un membro del Coro Voci di Trezzano.")
    },
    {
      name: "keywords",
      content: person.value ? 
        (`Coro Voci di Trezzano, ${person.value.name}, ${person.value.role}, musica, coro, attività`) : 
        ("Coro Voci di Trezzano, membri, musica, coro")
    }
  ]
}))
</script>

<template>
  <Head>
    <Title>{{SEOData.title}}</Title>
    <Meta v-for="meta in SEOData.meta" :name="meta.name" :content="meta.content"/>
  </Head>
  <main v-if="person">
    <section>
      <GeneralInfoComponent 
        :id="person.id" 
        :name="`${person.name} ${person.surname}`"
        :subtitle="person.role"
        :content="person.description"
        context="People"
        :total=100
      />
    </section>
    <section v-if="projects.length">
      <div class="title-with-lines">
        <h2>{{ person.name }} {{ person.surname }}'s projects</h2>
      </div>
      <div class="related-elements">
        <RelatedElementComponent
          v-for="project in projects"
          :id="project.id"
          :type="'projects'"
          :name="project.name"
          :description="project.description"
        />
      </div>
    </section>
    <section v-if="services.length">
      <div class="title-with-lines">
        <h2>{{ person.name }} {{ person.surname }}'s services</h2>
      </div>
      <div class="related-elements">
        <RelatedElementComponent
          v-for="service in services"
          :id="service.id"
          :type="'services'"
          :name="service.name"
          :description="service.description"
        />
      </div>
    </section>
  </main>
</template>

<style scoped>
main {
  padding-top: 30px;
}

.related-elements {
  display: flex;
  align-items: center;
}

@media (max-width: 800px) {
  .related-elements {
    flex-direction: column;
  }
}
</style>