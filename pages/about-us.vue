<script setup lang="js">

useHead({
  title: "About us - Brave Sisters",
  meta:[
    {
      name:"description",
      content:"In this page we can find a short description of the mission of our association and an other one about our history." +
          "After that we can find the location of our site and our opening time."
    },
    {
      name:"keywords",
      content: "About us, information, center, history"
    }
  ]
})

const paragraphs = ['YOUR ALLY,', 'FOR YOUR FREEDOM']
const mainImagePath = "/img/about-us-MAIN.webp"
</script>

<template>
    <main>
        <MainImageComponent
            :paragraphs="paragraphs"
            :photo-src="mainImagePath"
            :left="false"/>
        <div class="title-with-lines" id="main-title"><h1>About us</h1></div>
        <section>
            <section class="two-columns">
                <div>
                    <div class="title-with-lines"><h2>Mission</h2></div>
                    <p>
                        The mission of Brave Sister Center is to provide unwavering support, empowerment, and resources
                        to women
                        facing adversity, particularly those experiencing violence and family maltreatment. Through
                        compassionate care and tailored services, we strive to create a safe haven where women can find
                        solace,
                        regain their confidence, and rebuild their lives. Our dedicated team works tirelessly to foster
                        a
                        community of resilience and healing, and advocating for justice and equality for all women. At
                        Brave
                        Sister, we believe in the power of solidarity and the potential for positive change, endeavoring
                        to
                        break the cycle of violence and cultivate a future where every woman can thrive free from fear.
                    </p>
                </div>
                <div>
                    <div class="title-with-lines"><h2>History</h2></div>
                    <p>
                        Brave Sister Center was founded in 2006 by a group of passionate individuals dedicated to
                        addressing
                        the urgent need for support and advocacy for women facing violence and family maltreatment.
                        Despite
                        the challenges we have faced along the way, our commitment to our mission has never wavered.
                        With
                        each passing year, we have continued to adapt and innovate, striving to create a more inclusive
                        and
                        supportive environment for all women. As we look to the future, we remain steadfast in our
                        belief
                        that every woman deserves to live a life free from violence and fear, and we are dedicated to
                        doing
                        everything in our power to make that vision a reality.
                    </p>
                </div>
            </section>
            <img id="center-picture" src="/img/homepage/building_photo.webp" alt=""/>
            <section>
                <div class="title-with-lines"><h2>Location</h2></div>
                <section class="two-columns">
                    <div class="map">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2876.4934116439467!2d11.085237475822755!3d43.866327638620774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132af61bd731b397%3A0x10e39e397c812421!2sVia%20di%20Grignano%2C%20102%2C%2059100%20Prato%20PO!5e0!3m2!1sit!2sit!4v1716039615957!5m2!1sit!2sit"
                            width="100%"
                            height="450"
                            style="border:0;"
                            allowfullscreen="false"
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                    <div>
                        <h6>Opening hours</h6>
                        <p>Mon - Fri: 9:00 - 12:00 / 13:00 - 18:00<br>
                        Saturday: 9:00 - 12:00<br>
                            Sunday: Closed<br></p>
                        <h6>Address</h6>
                        <p>Via di Grignano 102, Prato</p>
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
