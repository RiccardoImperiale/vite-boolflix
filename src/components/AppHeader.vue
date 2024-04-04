<script>
import { store } from '../store.js';

export default {
    name: 'AppHeader',
    data() {
        return {
            store,
        }
    },
    methods: {
        filterMovies() {
            store.isMovies = true;
            store.isSeries = false;
            store.results = [];
            store.getAllGenres();
            store.getMovies();
        },
        filterSeries() {
            store.isSeries = true;
            store.isMovies = false;
            store.results = [];
            store.getAllGenres();
            store.getTvSeries();
        },
        toggleGenresBar() {
            store.isGenreBar = !store.isGenreBar;
        },
    }
}
</script>

<template>
    <header>
        <nav class="container">
            <div class="left">
                <img src="/img/boolflix-logo.png" alt="boolflix logo">
                <div class="links">
                    <span @click="filterMovies" :class="store.isMovies && 'is-active'">Movies</span>
                    <span @click="filterSeries" :class="store.isSeries && 'is-active'">TV Series</span>
                    <span @click="toggleGenresBar" :class="store.isGenreBar && 'is-active'">Genres</span>
                </div>
            </div>
            <div class="right">
                <input v-model="store.search" type="text" placeholder="Search Movies...">
                <transition name="inputIcon">
                    <i v-if="store.search !== ''" @click="store.getFilms" class="fa-solid fa-magnifying-glass"></i>
                </transition>
            </div>
        </nav>
    </header>
    <div class="bar_container">
        <transition name="genreBar">
            <div v-if="store.isGenreBar" class="genres_bar">
                <div class="container">
                    <div class="genres">
                        <span @click="store.getFilmsByGenre(genre.id)" v-for="genre in store.allGenres" class="genre"
                            :key="genre.id">{{ genre.name }}</span>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<style>
.bar_container {
    height: 65px;
    overflow: hidden;
    position: absolute;
    z-index: 2;
    width: 100%;
    margin: auto;

    .genres_bar {
        display: flex;
        align-items: center;
        width: 100%;
        height: 65px;
        background: linear-gradient(90deg, var(--bflix-darker) 0%, #b00000 50%, var(--bflix-darker) 100%);
        z-index: 1;
        font-size: .85rem;

        .genres {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            gap: .25rem;

            .genre {
                background-color: var(--bflix-dark);
                padding: .2rem .6rem;
                border-radius: .25rem;
                text-wrap: nowrap;
                cursor: pointer;
                color: var(--bflix-light);

                &:hover {
                    background-color: rgb(100, 0, 0);
                }
            }
        }
    }
}

header {
    background-color: var(--bflix-dark);
    color: var(--bflix-light);
    z-index: 2;

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
