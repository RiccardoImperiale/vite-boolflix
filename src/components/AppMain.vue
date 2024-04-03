<script>
import { store } from '../store.js';

export default {
    name: 'AppMain',
    data() {
        return {
            store
        }
    }
}
</script>

<template>
    <main>
        <template v-if="store.results.length > 0">
            <ul v-for="movie in store.results" :key="movie.id">
                <li>{{ movie.title }}</li>
                <li>{{ movie.original_title }}</li>
                <li>{{ movie.original_language }}</li>
                <li>{{ movie.vote_average }}</li>
            </ul>
        </template>
    </main>
</template>

<style></style>
