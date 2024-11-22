<script setup lang="ts">
import { useServiceStore } from "~/stores/services";
import { ref, onMounted } from 'vue';

const store = useServiceStore();
const services = store.service;

const videoId = '7hGEKStPMTA'; // ID del video da mostrare

useHead({
  title: "Video - Coro Voci Trezzano",
  meta: [
    {
      name: "description",
      content: "Questa pagina offre una breve descrizione dei video del Coro Voci di Trezzano. " +
        "Gli utenti possono accedere ai video direttamente dal canale YouTube del coro."
    },
    {
      name: "keywords",
      content: "video, coro, canto, musica, Trezzano, YouTube"
    }
  ]
});

const paragraphs = ['VOCI CHE CANTANO,', 'IN ARMONIA'];
const mainImagePath = "/img/services/MAIN.webp";
</script>

<template>
    <MainImageComponent
            :paragraphs="paragraphs"
            :photo-src="mainImagePath"
            :left="false"/>
    <div class="title-with-lines" id="main-title"><h1>Video</h1></div>
    <section id="video-section">
      <div class="two-columns">
        <img src="/img/homepage/1.webp" alt="Immagine video Coro Voci Trezzano" />
        <div>
          <p>Scopri la magia del Coro Voci di Trezzano attraverso i nostri video. Catturiamo i momenti più belli dei nostri concerti e delle prove, mostrando l’armonia delle nostre voci e la passione che ci unisce. Ogni video è un frammento della nostra storia, da vivere e condividere.</p>
        </div>
      </div>
      <section id="our_videos">
        <div class="title-with-lines"><h2>I Nostri Video</h2></div>
        <div class="video-container">
            <div class="video-wrapper">
                <iframe 
                    :src="'https://www.youtube.com/embed/' + videoId" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
        </div>
      </section>
      <div class="youtube-button-container">
        <a href="https://www.youtube.com/channel/UC_ZO3R5VGFN2GVYQU0TQggQ" target="_blank">
            <button class="youtube-button">Visita il nostro Canale YouTube</button>
        </a>
      </div>
    </section>
</template>

<style scoped>
.youtube-button-container {
    text-align: center;
    margin-top: 20px;
}

.youtube-button {
    background-color: #ff0000;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.youtube-button:hover {
    background-color: #cc0000;
}

/* Stile per il contenitore video in 16:9 */
.video-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0; 
}

.video-wrapper {
    position: relative;
    width: 100%;
    max-width: 800px; /* Limita la larghezza massima per schermi grandi */
    padding-bottom: 56.25%; /* Proporzione 16:9 */
    height: 0;
}

.video-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
}
</style>
