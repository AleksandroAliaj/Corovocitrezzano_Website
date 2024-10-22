import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useFetch } from '#app';

interface Person {
  id: number;
  name: string;
  surname: string;
  role: string;
  description: string;
}

export const usePeopleStore = defineStore('person', () => {
  const people = reactive([] as Person[]);

  async function init(){
    const { data } = await useFetch<Person[]>('/api/people');
    const list = data.value;
    if (list) {
      people.splice(0, people.length);  // Clear the list
      people.push(...list);
    }
  }

  function getPerson(peopleId: number) {
    return people.find((p: Person) =>
        p.id === peopleId
    );
  }

  init()

  return { people, getPerson };
});
