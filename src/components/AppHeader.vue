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
        <nav class="container">
            <div class="left">
                <img src="/img/boolflix-logo.png" alt="">
                <div class="links">
                    <span>Movies</span>
                    <span>TV Series</span>
                </div>
            </div>
            <div class="right">
                <input v-model="store.search" type="text" placeholder="Search Movies...">
                <i @click="store.getFilms" class="fa-solid fa-magnifying-glass"></i>
            </div>
        </nav>
    </header>
</template>

<style>
header {
    background-color: var(--bflix-dark);
    color: var(--bflix-light);

    & nav {
        padding: 1.5rem 0;
        display: flex;
        align-items: center;

        .left {
            display: flex;
            margin-right: auto;
            align-items: center;

            & img {
                width: 140px;
                margin-right: 3rem;
            }

            .links {
                display: flex;
                gap: 1.5rem;
                cursor: pointer;
            }
        }

        .right {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: end;

            & input {
                width: 250px;
                background-color: transparent;
                border: none;
                outline: none;
                border-bottom: 1px solid var(--bflix-light);
                color: var(--bflix-light);
                padding: 1rem 0;
                font-size: 1rem;
            }

            & i {
                font-size: 1.2rem;
                cursor: pointer;
                position: absolute;
            }
        }

    }
}
</style>
