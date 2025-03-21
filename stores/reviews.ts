import {defineStore} from 'pinia';
import {ref, reactive} from "vue";
import {useFetch} from "#app";

interface Review {
    id: number;
    location: string;
    hour: string;
    date: string;
    comment: string;
    service: number;
}

export const useReviewStore = defineStore('review', () => {
    const review = reactive([] as Review[]);

    async function addReview(newReview: Review) {
        if(newReview.location === '' || newReview.location === null)
            return 'You have to insert a name'
        if(newReview.hour === '' || newReview.hour === null)
            return 'You have to insert a surname'
        if(newReview.comment === '' || newReview.comment === null)
            return 'You have to insert a comment'
        const body = JSON.stringify(newReview)
        const response = await fetch('/api/review', {method: 'POST', body})
        if (response.ok) review.push(newReview)
        else return 'Server error, please retry'
    }
    
    async function deleteReview(reviewId: number) {
        try {
            const response = await fetch(`/api/review/${reviewId}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                // Remove the review from the local state
                const index = review.findIndex(r => r.id === reviewId);
                if (index !== -1) {
                    review.splice(index, 1);
                }
                return null;
            } else {
                return 'Server error, please retry';
            }
        } catch (error) {
            return 'Error during deletion';
        }
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
