import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useFetch } from '#app';

interface Event {
    id?: number;
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
}

export const useEventStore = defineStore('events', () => {
    const events = reactive([] as Event[]);

    async function addEvent(newEvent: Event) {
        if (!newEvent.title) return 'Devi inserire un titolo';
        if (!newEvent.date) return 'Devi inserire una data';
        if (!newEvent.time) return 'Devi inserire un orario';
        if (!newEvent.location) return 'Devi inserire un luogo';
        if (!newEvent.description) return 'Devi inserire una descrizione';

        const body = JSON.stringify(newEvent);
        const response = await fetch('/api/event', { method: 'POST', body });
        if (response.ok) events.push(newEvent);
        else return 'Errore del server, riprova';
    }

    async function init() {
        const { data } = await useFetch<Event[]>('/api/event');
        const list = data.value;
        if (list) {
            events.splice(0, events.length); // Pulisci la lista esistente
            events.push(...list);
        }
    }

    init();

    return { events, addEvent };
});
