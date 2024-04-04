<script>
import { store } from '../store.js';

export default {
    name: 'AppMain',
    data() {
        return {
            store,
            countryCodes: ['ad', 'ae', 'af', 'ag', 'ai', 'al', 'am', 'ao', 'aq', 'ar', 'as', 'at', 'au', 'aw', 'ax', 'az', 'ba', 'bb', 'bd', 'be', 'bf', 'bg', 'bh', 'bi', 'bj', 'bl', 'bm', 'bn', 'bo', 'bq', 'br', 'bs', 'bt', 'bv', 'bw', 'by', 'bz', 'ca', 'cc', 'cd', 'cf', 'cg', 'ch', 'ci', 'ck', 'cl', 'cm', 'cn', 'co', 'cp', 'cr', 'cu', 'cv', 'cw', 'cx', 'cy', 'cz', 'de', 'dg', 'dj', 'dk', 'dm', 'do', 'dz', 'ec', 'ee', 'eg', 'eh', 'el', 'en', 'er', 'es', 'et', 'eu', 'fi', 'fj', 'fk', 'fm', 'fo', 'fr', 'ga', 'gb', 'gd', 'ge', 'gf', 'gg', 'gh', 'gi', 'gl', 'gm', 'gn', 'gp', 'gq', 'gr', 'gs', 'gt', 'gu', 'gw', 'gy', 'hi', 'hk', 'hm', 'hn', 'hr', 'ht', 'hu', 'ic', 'id', 'ie', 'il', 'im', 'in', 'io', 'iq', 'ir', 'is', 'it', 'ja', 'je', 'jm', 'jo', 'jp', 'ke', 'kg', 'kh', 'ki', 'km', 'kn', 'ko', 'kp', 'kr', 'kw', 'ky', 'kz', 'la', 'lb', 'lc', 'li', 'lk', 'lr', 'ls', 'lt', 'lu', 'lv', 'ly', 'ma', 'mc', 'md', 'me', 'mf', 'mg', 'mh', 'mk', 'ml', 'mm', 'mn', 'mo', 'mp', 'mq', 'mr', 'ms', 'mt', 'mu', 'mv', 'mw', 'mx', 'my', 'mz', 'na', 'nc', 'ne', 'nf', 'ng', 'ni', 'nl', 'no', 'np', 'nr', 'nu', 'nz', 'om', 'pa', 'pc', 'pe', 'pf', 'pg', 'ph', 'pk', 'pl', 'pm', 'pn', 'pr', 'ps', 'pt', 'pw', 'py', 'qa', 're', 'ro', 'rs', 'ru', 'rw', 'sa', 'sb', 'sc', 'sd', 'se', 'sg', 'sh', 'si', 'sj', 'sk', 'sl', 'sm', 'sn', 'so', 'sr', 'ss', 'st', 'sx', 'sy', 'sz', 'tc', 'td', 'tf', 'tg', 'th', 'tj', 'tk', 'tl', 'tm', 'tn', 'to', 'tr', 'tt', 'tv', 'tw', 'tz', 'ua', 'ug', 'uk', 'um', 'un', 'us', 'uy', 'uz', 'va', 'vc', 've', 'vg', 'vi', 'vn', 'vu', 'wf', 'ws', 'xk', 'xx', 'ye', 'yt', 'za', 'zh', 'zm', 'zw'],
        }
    },
    methods: {
        getRatingStars(rating) {
            return Math.ceil(rating /= 2);
        },
    },
    mounted() {
        this.store.getFilms();
    }
}
</script>

<template>
    <main class="container">
        <!-- movies -->
        <Transition name="cards">
            <div v-if="store.results.length > 0" class="movies">
                <div v-for="movie in store.results" :key="movie.id" class="card">
                    <div class="image">
                        <img v-if="movie.image" :src="'https://image.tmdb.org/t/p/w300/' + movie.image"
                            alt="movie poster">
                        <div v-else class="no_image">{{ movie.title }}</div>
                    </div>
                    <!-- card info -->
                    <div class="info">
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
            <div v-else class="no_results">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <div>No Movies or TV Series found...</div>
            </div>
        </Transition>
    </main>
</template>

<style>
.cards-enter-active,
.cards-leave-active {
    transition: all 1s ease;
}

.cards-enter-from,
.cards-leave-to {
    opacity: 0;
    transform: translatey(500px);
}

main {
    color: white;
    padding: 2rem 0;

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
        margin-top: 2rem;

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
