// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    nitro: {
        esbuild: {
            options: {
                target: 'esnext'
            }
        }
    },

    runtimeConfig: {
        supabaseUrl: process.env.SUPABASE_URL,
        supabaseKey: process.env.SUPABASE_KEY,
        genAIKey: process.env.GenAI_KEY
    },

    devtools: {enabled: true},
    app: {
        head: {
            title: 'Brave Sisters',
            script: [
                {}
            ],
            htmlAttrs: {
                lang: 'en'
            },
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' }
            ]
        }
    },
    css: ['~/assets/css/general.css'],
    modules: ['@pinia/nuxt'],
    pinia: {
        storesDirs: [
            './stores/**'
        ]
    }
})
