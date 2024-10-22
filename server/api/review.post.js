import {useDb} from "~/composables/db.js";

export default defineEventHandler(async (e) => {
    try {
        const body = await readBody(e)
        const review = JSON.parse(body)
        return await useDb().from('review').insert(review)
    } catch (e) {
        setResponseStatus(e, 500)
    }
})