<script setup lang="ts">
import {ref, onMounted} from 'vue';

const paragraphs = ['REACH US,', 'ENJOY US']
const mainImagePath = "/img/contact-us-MAIN.webp"

const faq = [
    {
        question: "Where is the Brave Sisters center located?",
        answer: "The center is located at Via di Grignano, 102, 59100 Prato (PO). You can reach us by bus (lines 210 and SC) or by train (Prato Centrale station)."
    },
    {
        question: "What are the opening hours of the center?",
        answer: "The center is open Monday to Friday from 9:00 am to 12:00 pm and from 1:00 pm to 6:00 pm. On Saturday, it is open from 9:00 am to 12:00 pm. It is closed on Sunday."
    },
    {
        question: "What services does the Brave Sisters center offer?",
        answer: "We offer psychological support, legal consultations, conversations with experts, assistance for imminent danger situations, and a list of available jobs for women."
    },
    {
        question: "Can I get free legal assistance at the center?",
        answer: "Yes, regardless of income, victims of domestic violence are entitled to legal aid at the state's expense. Contact us for more information and assistance."
    },
    {
        question: "Who works at the Brave Sisters center?",
        answer: "Our staff includes psychologists, lawyers, psychiatrists, economy experts, and EMDR experts. You can find more details about our team on our website."
    },
    {
        question: "Does the center provide support for stalking cases?",
        answer: "Yes, we offer support for victims of stalking. Contact us to learn more about our services."
    },
    {
        question: "Can I participate in the center's projects if I have experienced violence in the past?",
        answer: "Yes, we have various projects to help women who have experienced violence to improve their lives. Contact us to learn more about these projects."
    },
    {
        question: "How can I report an incident of domestic violence?",
        answer: "If you have experienced domestic violence, it's important to go to the nearest emergency room for necessary medical care. Then, contact a lawyer to draft and file the complaint. Our lawyers can assist you with this process."
    },
    {
        question: "Does the center offer psychological support for victims of violence?",
        answer: "Yes, our center provides psychological support for victims of domestic violence. Contact us to schedule an appointment or for more information."
    },
    {
        question: "Can I attend group therapy sessions at the center?",
        answer: "Yes, we offer group therapy sessions to share experiences and receive support from other women victims of violence. Contact us to learn more about these sessions."
    }
];

const showAnswer = ref(Array(faq.length).fill(false));
const messageSent = ref(false);

const toggleAnswer = (index: number) => {
    showAnswer.value[index] = !showAnswer.value[index];
};

const handleTextareaInput = (event: Event) => {
    const textarea = event.target as HTMLTextAreaElement;
    if (textarea.value.length > 150) {
        textarea.value = textarea.value.substring(0, 500);
    }
};

const handlePhoneInput = (event: Event) => {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '').slice(0, 12);
};

const handleSubmit = (event: Event) => {
    event.preventDefault();
    messageSent.value = true;

    const form = event.target as HTMLFormElement;
    form.reset();

    setTimeout(() => {
        messageSent.value = false;
    }, 7000);
};

onMounted(() => {
    const textarea = document.getElementById('message') as HTMLTextAreaElement;
    if (textarea) {
        textarea.addEventListener('input', handleTextareaInput);
    }

    const phoneInput = document.getElementById('phone') as HTMLInputElement;
    if (phoneInput) {
        phoneInput.addEventListener('input', handlePhoneInput);
    }
});

useHead({
  title: "Contact us - Brave Sisters",
  meta:[
    {
      name:"description",
      content:"In this page we can find a form to compile used to ask anything to our team by giving an name, surname, email, phone number(not mandatory) and a text" +
          ". After there's a list of the most frequent questions so that you have a possibility to find an answer to your doubt only by looking at them"

    },
    {
      name:"keywords",
      content: "Contact, ask, question, communicate, help, assistance"
    }
  ]
})
</script>

<template>
    <div>
        <main>
            <MainImageComponent
                :paragraphs="paragraphs"
                :photo-src="mainImagePath"
                :left="false"/>
            <div class="title-with-lines" id="main-title"><h1>Contact us</h1></div>
            <section>
                <section>
                    <div class="title-with-lines"><h2>FAQ</h2></div>
                    <ul>
                        <li v-for="(item, index) in faq" :key="index">
                            <div @click="toggleAnswer(index)" tabindex="0" v-on:keyup.enter="toggleAnswer(index)"
                                 :class="{'faq-question': true, 'open': showAnswer[index]}">
                                {{ item.question }}
                                <span>{{ showAnswer[index] ? '▲' : '▼' }}</span>
                            </div>
                            <div v-if="showAnswer[index]" class="faq-answer">
                                {{ item.answer }}
                            </div>
                        </li>
                    </ul>
                </section>
                <section>
                    <p>If you haven't found an answer to your question, contact us! We'll answer as soon as possible:</p>
                    <div class="title-with-lines"><h2>Contact form</h2></div>
                    <form @submit="handleSubmit">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="name">Name*</label>
                                <input type="text" id="name" name="name" required/>
                            </div>
                            <div class="form-group">
                                <label for="surname">Surname*</label>
                                <input type="text" id="surname" name="surname" required/>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="email">Email*</label>
                                <input type="email" id="email" name="email" required/>
                            </div>
                            <div class="form-group">
                                <label for="phone">Phone number</label>
                                <input type="tel" id="phone" name="phone"/>
                            </div>
                        </div>
                        <div class="form-group full-width">
                            <label for="message">Text*</label>
                            <textarea id="message" name="message" required></textarea>
                        </div>
                        <div class="submit-container">
                            <input type="submit" class="submit" value="Send">
                            <span v-if="messageSent" class="confirmation-check">✔</span>
                        </div>
                    </form>
                    <div v-if="messageSent" class="confirmation-message">
                        Message sent correctly, you will be contacted as soon as possible.
                    </div>
                </section>
            </section>
        </main>
    </div>
</template>


<style scoped>
p {
    text-align: center;
}

.faq-question {
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    background-color: white;
    margin: 0 auto;
    font-size: 1.2em;
    text-align: left;
}

.faq-answer {
    font-weight: 200;
    font-style: italic;
    padding: 10px;
    background-color: white;
    margin: 0 auto;
    text-align: left;
    border-bottom: 1px solid #ccc;
    font-size: 1em;
}

.faq-question.open {
    border-bottom: none;
}

ul {
    padding-left: 0;
    list-style-type: none;
}
</style>

