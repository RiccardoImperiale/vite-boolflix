<script>
import { store } from '../store.js';
const defaultMovieOverview = 'Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world, challenging their very existence – and our own.'
const defaultSerieOverview = 'Seth Meyers, who is "Saturday Night Live’s" longest serving anchor on the show’s wildly popular "Weekend Update," takes over as host of NBC’s "Late Night" — home to A-list celebrity guests, memorable comedy and the best in musical talent. As the Emmy Award-winning head writer for "SNL," Meyers has established a reputation for sharp wit and perfectly timed comedy, and has gained fame for his spot-on jokes and satire. Meyers takes his departure from "SNL" to his new post at "Late Night," as Jimmy Fallon moves to "The Tonight Show".'

export default {
    name: 'AppHeader',
    data() {
        return {
            store,
        }
    },
    methods: {
        filterMovies() {
            store.isGenreBar = false;
            store.titleSection = 'Movies';
            store.isMovies = true;
            store.isSeries = false;
            store.results = [];
            store.getAllGenres();
            store.getAllMoviesAndSeries('movie');
            store.showHero('/sR0SpCrXamlIkYMdfz83sFn5JS6.jpg', 'Godzilla x Kong: The New Empire', defaultMovieOverview);
        },
        filterSeries() {
            store.isGenreBar = false;
            store.titleSection = 'Tv Series';
            store.isSeries = true;
            store.isMovies = false;
            store.results = [];
            store.getAllGenres();
            store.getAllMoviesAndSeries('tv');
            store.showHero('/dfX2UaHVE5c7kLBFbgmEZJuy4Ev.jpg', 'Late Night with Seth Meyers', defaultSerieOverview)
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
                <img @click="store.allFilms" src="/img/boolflix-logo.png" alt="boolflix logo">
                <div class="links">
                    <span @click="filterMovies" :class="store.isMovies && 'is-active'">Movies</span>
                    <span @click="filterSeries" :class="store.isSeries && 'is-active'">TV Series</span>
                    <span @click="toggleGenresBar" :class="store.isGenreBar && 'is-active'">Genres <i
                            class="fa-solid fa-chevron-left"
                            :class="store.isGenreBar ? 'arrow-down' : 'arrow-left'"></i></span>
                </div>
            </div>
            <div class="right">
                <input v-model="store.search" type="text" placeholder="Search Movies...">
                <transition name="inputIcon">
                    <i v-if="store.search !== ''" @click="store.searchFilms" class="fa-solid fa-magnifying-glass"></i>
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
