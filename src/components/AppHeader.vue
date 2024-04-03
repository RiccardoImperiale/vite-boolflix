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
            <button @click="store.getFilms">Search</button>
        </nav>
    </header>
</template>

<style></style>
