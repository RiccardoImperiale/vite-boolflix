<script>
import { store } from '../store.js';

export default {
    name: 'AppHeader',
    data() {
        return {
            store,
            isMovies: false,
            isSeries: false
        }
    },
    methods: {
        filterMovies() {
            this.isMovies = true;
            this.isSeries = false;
            store.results = [];
            store.getGenres('movie');
            store.getMovies();
        },
        filterSeries() {
            this.isSeries = true;
            this.isMovies = false;
            store.results = [];
            store.getGenres('tv');
            store.getTvSeries();
        },
    }
}
</script>

<template>
    <header>
        <nav class="container">
            <div class="left">
                <img src="/img/boolflix-logo.png" alt="">
                <div class="links">
                    <span @click="filterMovies" :class="isMovies && 'is-active'">Movies</span>
                    <span @click="filterSeries" :class="isSeries && 'is-active'">TV Series</span>
                    <span>Genres</span>
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
.is-active {
    color: var(--bflix-secondary);
}

header {
    background-color: var(--bflix-dark);
    color: var(--bflix-light);

    & nav {
        padding: 1rem 0;
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
                max-width: 250px;
                width: 300px;
                background-color: transparent;
                border: none;
                outline: none;
                border-bottom: 1px solid var(--bflix-secondary);
                color: var(--bflix-light);
                padding: .65rem 0;
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

/* media queries --------------------------------_>  */

@media screen and (max-width: 768px) {
    header nav {
        position: relative;

        padding: 1rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .left {
            display: flex;
            align-items: center;

            & img {
                width: 140px;
                margin-right: 3rem;
            }

            .links {
                display: none;
            }
        }

        .right {
            width: 100%;

            & input {
                width: 100%;
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
