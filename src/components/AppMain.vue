<script>
import { store } from '../store.js';
import { defaultMovieOmj, countryCodes } from '../data.js';
import AppHero from './AppHero.vue';

export default {
    name: 'AppMain',
    components: {
        AppHero
    },
    data() {
        return {
            store,
            countryCodes,
            defaultMovieOmj,
        }
    },
    methods: {
        getRatingStars(rating) {
            return Math.ceil(rating /= 2);
        }
    },
    mounted() {
        store.allFilms();
        store.showHero(defaultMovieOmj.src, defaultMovieOmj.title, defaultMovieOmj.overview);
    }
}
</script>

<template>
    <AppHero />
    <main class="container" :class="store.isHeroGoingUp ? 'movies-go-up' : 'movies-go-down'">
        <!-- movies -->
        <Transition name="cards">
            <div v-if="store.results.length > 0">
                <h2 class="section_title">{{ store.titleSection }}</h2>
                <div class="movies">
                    <div v-for="movie in store.results" :key="movie.id" class="card">
                        <div class="image">
                            <img v-if="movie.image" :src="'https://image.tmdb.org/t/p/w300/' + movie.image"
                                alt="movie poster">
                            <div v-else class="no_image">{{ movie.title }}</div>
                        </div>
                        <!-- card info -->
                        <div @click="store.showHero(movie.heroImage, movie.title, movie.overview)" class="info">
                            <div class="top">
                                <div class="title">
                                    <h4>Title: </h4><span>{{ movie.title }}</span>
                                </div>
                                <div v-if="movie.origTitle && movie.origTitle !== movie.title" class="original_title">
                                    <h4>Original Title: </h4><span>{{ movie.origTitle }}</span>
                                </div>
                                <!-- genres -->
                                <div v-if="movie.genres.length > 0" class="genres">
                                    <h4>Genres: </h4><span v-for="genre in movie.genres">{{ genre.name }}</span>
                                </div>
                                <!-- actors -->
                                <div v-if="movie.actors" class="actors">
                                    <h4>Cast: </h4><span>{{ movie.actors }}</span>
                                </div>
                                <!-- rating -->
                                <div class="rating">
                                    <h4>Rating: </h4>
                                    <div class="stars">
                                        <i v-for="fullStar in getRatingStars(movie.vote)" :key="fullStar"
                                            class="fa-solid fa-star"></i>
                                        <i v-for="emptyStar in 5 - getRatingStars(movie.vote)" :key="emptyStar"
                                            class="fa-regular fa-star"></i>
                                    </div>
                                </div>
                                <!-- overview -->
                                <div v-if="movie.overview" class="overview">
                                    <h4>Overview: </h4>
                                    <span>{{ movie.overview }}</span>
                                </div>
                            </div>
                            <div class="bottom">
                                <img v-if="countryCodes.includes(movie.language)"
                                    :src="'/img/flags4x3/' + movie.language + '.svg'" alt="country flag">
                                <h4 v-else>{{ movie.language }}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
        <div v-show="store.results.length === 0" class="no_results">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <div>No Movies or TV Series found...</div>
        </div>
    </main>
</template>

<style>
.hero_section {
    height: 720px;
    overflow: hidden;
    margin-bottom: -8rem;
    position: relative;
    z-index: -1;

    .hero_image {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

    .hero_gradient {
        position: absolute;
        background: linear-gradient(transparent, var(--bflix-darker));
        height: 8rem;
        width: 100%;
        bottom: 0;
    }

    .hero_filter {
        position: absolute;
        inset: 0;
        /* background-color: var(--bflix-darker); */
        background: linear-gradient(90deg, var(--bflix-darker) 0%, transparent 100%);
        opacity: .8;
        /* mix-blend-mode: multiply; */
    }

    .text {
        padding-top: 10rem;
        padding-left: 6rem;
        width: 500px;
        position: absolute;
        top: 0;
        color: var(--bflix-light);

        & p {
            font-size: .85rem;
        }
    }
}

main {
    color: var(--bflix-light);
    position: relative;
    display: block;

    .section_title {
        color: var(--bflix-light);
        margin-bottom: 1rem;
        opacity: .5;
        font-weight: 500;
        /* mix-blend-mode: difference; */
    }

    .movies {
        display: flex;
        flex-wrap: wrap;
        gap: .25rem;

        .card {
            width: calc(100% / 5 - 0.25rem);
            position: relative;

            .image {
                height: 100%;

                & img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .no_image {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 4px solid var(--bflix-dark);
                }
            }

            .info {
                position: absolute;
                background-color: var(--bflix-darker);
                z-index: 1;
                inset: 0;
                opacity: 0;
                transition: opacity .5s ease;
                padding: 1rem;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                font-size: .85rem;
                cursor: pointer;

                .card:hover & {
                    opacity: .85;
                }

                .top {
                    & h4 {
                        display: inline;
                        font-size: 1rem;
                        color: var(--bflix-danger);
                    }

                    .original_title,
                    .actors,
                    .genres,
                    .rating,
                    .overview {
                        padding-top: .5rem;
                    }

                    .genres {
                        & span:not(:last-child):after {
                            content: ' - ';
                        }
                    }

                    .rating {
                        display: flex;
                        gap: .5rem;

                        .fa-solid {
                            color: var(--bflix-warning);
                        }
                    }

                    .overview {
                        height: 100px;
                        overflow-y: auto;
                        padding-right: .25rem;
                        text-overflow: ellipsis;
                        scrollbar-color: var(--bflix-warning) transparent;
                        scrollbar-width: thin;
                    }
                }

                .bottom {
                    border-radius: 50%;
                    width: 30px;
                    height: 30px;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    & img {
                        height: 100%;
                    }
                }
            }
        }
    }

    .no_results {
        text-align: center;
        margin-top: 10rem;

        & i {
            color: var(--bflix-warning);
            font-size: 2rem;
            margin-bottom: 1rem;
        }
    }
}

/* media queries -------------------------------->  */

@media screen and (min-width: 1530px) {
    main .movies .card {
        width: calc(100% / 6 - 0.25rem);
    }
}

@media screen and (max-width: 1440px) {
    main .movies .card {
        width: calc(100% / 5 - 0.25rem);
    }
}

@media screen and (max-width: 1280px) {
    main .movies .card {
        width: calc(100% / 4 - 0.25rem);
    }
}

@media screen and (max-width: 970px) {
    main .movies .card {
        width: calc(100% / 3 - 0.25rem);
    }
}

@media screen and (max-width: 768px) {
    main .movies .card {
        width: calc(100% / 2 - 0.25rem);
    }
}

@media screen and (max-width: 525px) {
    main .movies .card {
        width: calc(100% / 1 - 0.25rem);
    }
}
</style>
