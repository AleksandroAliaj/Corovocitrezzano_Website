<script setup lang="js">

useHead({
  title: "Coro Voci Trezzano - Chi Siamo, Storia e Missione del Coro",
  meta: [
    {
      name: "description",
      content: "Scopri la storia, la missione e l'anima del Coro Voci di Trezzano. Fondata nel 2006, la nostra comunità musicale unisce passione, fede e armonia nelle chiese di Trezzano sul Naviglio. Unisciti a noi!"
    },
    {
      name: "keywords",
      content: "coro voci trezzano, coro ecclesiastico, storia del coro, missione corale, canto liturgico, musica sacra, trezzano sul naviglio, coro parrocchiale, santa gianna, sant'ambrogio"
    },
    {
      name: "og:title",
      content: "Coro Voci Trezzano - La Nostra Storia, Missione e Comunità"
    },
    {
      name: "og:description", 
      content: "Dal 2006, il Coro Voci di Trezzano porta musica, fede e comunità nelle chiese di Santa Gianna e Sant'Ambrogio. Scopri chi siamo!"
    },
    {
      property: "og:type",
      content: "website"
    },
    {
      name: "robots",
      content: "index, follow"
    }
  ]
})

const paragraphs = ['IL CANTO', 'DONA AMORE']
const mainImagePath = "/img/about-us-MAIN.png"
</script>

<template>
    <main>
        <MainImageComponent
            :paragraphs="paragraphs"
            :photo-src="mainImagePath"
            :left="false"/>
        <div class="title-with-lines" id="main-title"><h1>Chi Siamo</h1></div>
        <section>
            <section class="two-columns">
                <div>
                    <div class="title-with-lines"><h2>Missione</h2></div>
                    <p>
                        La missione del Coro Voci di Trezzano è quella di unire le persone attraverso la musica e il canto, creando un ambiente accogliente e inclusivo per tutti coloro che desiderano esprimere la propria fede e passione per la musica. Vogliamo contribuire alla vita comunitaria, portando gioia e armonia nelle celebrazioni religiose e negli eventi pubblici.
                    </p>
                </div>
                <div>
                    <div class="title-with-lines"><h2>Storia</h2></div>
                    <p>
                        Il Coro Voci di Trezzano è stato fondato nel 2006 da un gruppo di appassionati di musica e canto. Da allora, abbiamo lavorato instancabilmente per creare un coro che non solo esegue musica nelle chiese di Trezzano, ma che si impegna anche in eventi e concerti nella comunità. Ogni anno, accogliamo nuovi membri e continuiamo a crescere, mantenendo viva la nostra passione per la musica e il canto.
                    </p>
                </div>
            </section>
            <img id="center-picture" src="/img/homepage/building_photo.jpg" alt=""/>
            <section>
                <div class="title-with-lines"><h2>Posizione</h2></div>
                <section class="two-columns">
                    <div class="map">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22403.11664071025!2d9.04178237618183!3d45.421647548657326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786e83042f6419b%3A0xd000abf5d225ce44!2s20090%20Trezzano%20sul%20Naviglio%20MI!5e0!3m2!1sit!2sit!4v1729694612665!5m2!1sit!2sit"
                            width="100%"
                            height="450"
                            style="border:0;"
                            allowfullscreen="false"
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                    <div>
                        <h6>Dove ci trovi</h6>
                        <p>Trezzano sul Naviglio, Milano</p>
                        
                    </div>
                </section>
            </section>
        </section>
    </main>
</template>

<style scoped>
#center-picture {
    width: 100%;
}

h6 {
    color: #4c8189;
    font-size: 22px;
    margin: 0;
}

.map {
    width: 100%;
}
</style>