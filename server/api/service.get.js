import {useDb} from "~/composables/db.js"; // Importa il componente
export default defineEventHandler(async (e) => {
    const {data} = await useDb().from('service').select()
    return data;
})
