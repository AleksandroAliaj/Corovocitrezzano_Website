import {defineStore} from 'pinia';
import {ref, reactive} from "vue";
import {useFetch} from "#app";

interface Review {
    id: number;
    name: string;
    surname: string;
    date: string;
    comment: string;
    service: number;
}

export const useReviewStore = defineStore('review', () => {
    const review = reactive([] as Review[]);

    async function addReview(newReview: Review) {
        if(newReview.name === '' || newReview.name === null)
            return 'You have to insert a name'
        if(newReview.surname === '' || newReview.surname === null)
            return 'You have to insert a surname'
        if(newReview.comment === '' || newReview.comment === null)
            return 'You have to insert a comment'
        const body = JSON.stringify(newReview)
        const response = await fetch('/api/review', {method: 'POST', body})
        if (response.ok) review.push(newReview)
        else return 'Server error, please retry'
    }

    async function init() {
        const {data} = await useFetch<Review[]>('/api/review');
        const list = data.value;
        if (list) {
            review.splice(0, review.length);  // Clear the list
            review.push(...list);
        }
    }

    init()

    return {review, addReview};
});
