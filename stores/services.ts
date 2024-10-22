import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import { useFetch } from '#app';

interface Service {
    id: number;
    name: string;
    description: string;
    person: number
}

export const useServiceStore = defineStore('service', () => {
    const service = reactive([] as Service[]);

    async function init(){
        const { data } = await useFetch<Service[]>('/api/service');
        const list = data.value;
        if (list) {
            service.splice(0, service.length);  // Clear the list
            service.push(...list);
        }
    }

    function getPersonServices(personId: number) {
        return service.filter((service: Service) => service.person === personId)
    }

    function getService(serviceId: number) {
        return service.find((p: Service) => p.id === serviceId);
    }

    init()

    return { service, getPersonServices, getService };
});
