import {useDb} from "~/composables/db.js";

export default defineEventHandler(async (e) => {
    const {data} = await useDb().from('review').select()
    return data;
})
