<script setup lang="ts">
import { ref } from 'vue';

const password = ref('');
const isAuthenticated = ref(false);

useHead({
  title: "Documenti - Coro Voci Trezzano",
  meta: [
    {
      name: "description",
      content: "Questa pagina contiene una raccolta di documenti, spartiti, audio e libretti del Coro Voci di Trezzano."
    },
    {
      name: "keywords",
      content: "documenti, spartiti, audio, libretti, coro, Trezzano"
    }
  ]
});

const paragraphs = ['DOCUMENTI CORO,', 'ACCESSO RISERVATO'];
const mainImagePath = "/img/projects/MAIN.webp";

function authenticate() {
  if (password.value === 'documenticoro') {
    isAuthenticated.value = true;
  } else {
    alert('Password errata. Riprova.');
  }
}
</script>

<template>
    <MainImageComponent
            :paragraphs="paragraphs"
            :photo-src="mainImagePath"
            :left="false"/>
    <div class="title-with-lines" id="main-title"><h1>Documenti</h1></div>
    <section id="document-section">
      <div class="two-columns">
        <img src="/img/projects/home_3.webp" alt="" />
        <div>
          <p>Questa sezione contiene una raccolta di documenti, spartiti, audio e libretti del Coro Voci di Trezzano. Per accedere ai documenti, inserisci la password corretta.</p>
        </div>
      </div>
      <div v-if="!isAuthenticated" class="auth-container">
        <input type="password" v-model="password" placeholder="Inserisci la password" class="password-input"/>
        <button @click="authenticate" class="auth-button">Accedi</button>
      </div>
      <div v-else>
        <div class="title-with-lines"><h2>I Nostri Documenti</h2></div>
        <a href="https://drive.google.com/drive/u/3/folders/1MP2wY87oxkZr7GrSS1Qhy2QxrMc2OVoS" target="_blank">
          <button class="document-button">Accedi alla Cartella Documenti</button>
        </a>
      </div>
    </section>
</template>

<style scoped>
.auth-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
}

.password-input {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 80%;
    max-width: 300px;
    margin-bottom: 10px;
}

.auth-button {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.auth-button:hover {
    background-color: #0056b3;
}

.document-button {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 20px;
}

.document-button:hover {
    background-color: #0056b3;
}
</style>
