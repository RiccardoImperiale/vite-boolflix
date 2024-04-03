<script>
import { store } from '../store.js';

export default {
    name: 'AppHeader',
    data() {
        return {
            store,
        }
    }
}
</script>

<template>
    <header>
        <nav>
            <input v-model="store.search" type="text" placeholder="Search Movies...">
            <button @click="store.getMovies">Search</button>
        </nav>
    </header>
</template>

<style></style>
