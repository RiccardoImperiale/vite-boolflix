<script>
import { store } from '../store.js';
import { defaultMovieOmj, defaultSeriesOmj } from '../data.js';
import Rellax from 'rellax';

export default {
    name: 'AppHeader',
    data() {
        return {
            store,
            defaultMovieOmj,
            defaultSeriesOmj
        }
    },
    methods: {
        filterCategory(title, category, defaultObj) {
            store.isGenreBar = false;
            store.titleSection = title;
            if (category === 'movie') {
                store.isMovies = true
                store.isSeries = false;
            } else {
                store.isMovies = false;
                store.isSeries = true;
            }
            store.results = [];
            store.getAllGenres();
            store.getAllMoviesAndSeries(category);
            store.showHero(defaultObj.src, defaultObj.title, defaultObj.overview, defaultObj.rating);
        },
        toggleGenresBar() {
            store.isGenreBar = !store.isGenreBar;
        },
    },
    mounted() {
        this.rellax = new Rellax('.rellax-item');
    },
    destroyed() {
        this.rellax && this.rellax.destroy();
    }
}
</script>

<template>
    <header class="rellax-item" data-rellax-speed="-5">
        <nav class="container">
            <div class="left">
                <img @click="store.allFilms" src="/img/boolflix-logo.png" alt="boolflix logo">
                <div class="links">
                    <span @click="filterCategory('Movies', 'movie', defaultMovieOmj)"
                        :class="store.isMovies && 'is-active'">Movies</span>
                    <span @click="filterCategory('Tv Series', 'tv', defaultSeriesOmj)"
                        :class="store.isSeries && 'is-active'">TV Series</span>
                    <span @click="toggleGenresBar" :class="store.isGenreBar && 'is-active'">Genres <i
                            class="fa-solid fa-chevron-left"
                            :class="store.isGenreBar ? 'arrow-down' : 'arrow-left'"></i></span>
                </div>
            </div>
            <div class="right">
                <input @keyup.enter="store.searchFilms" v-model="store.search" type="text"
                    placeholder="Search Movies...">
                <!-- <transition name="inputIcon"> -->
                <i @click="store.searchFilms" class="fa-solid fa-magnifying-glass"
                    :style="{ 'pointer-events': store.search !== '' ? 'auto' : 'none' }"></i>
                <!-- </transition> -->
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
.fa-chevron-left {
    position: relative;
    font-size: .85rem;
    vertical-align: middle;
    margin-left: .3rem;
}

.arrow-left {
    rotate: -90deg;
    transition: rotate .5s ease;
    bottom: .1rem;
}

.arrow-down {
    rotate: 0deg;
    transition: rotate .5s ease;
}

.bar_container {
    height: 65px;
    overflow: hidden;
    position: absolute;
    z-index: 1;
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
                    background-color: rgb(0, 0, 0);
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
                cursor: pointer;
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
