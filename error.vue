<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
    error: Object as () => NuxtError
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
    <NuxtLayout>
        <div>
            <br>
            <h2>Ops! Error {{ error.statusCode }}: the content you're looking for is not present.</h2>
            <br>
            <button @click="handleError">Back to home</button>
        </div>
    </NuxtLayout>
</template>

<style scoped>
div {
    text-align: center;
    margin: 20px;
}
</style>
