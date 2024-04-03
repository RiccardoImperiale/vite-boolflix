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

}
</script>

<template>
    <main>
        <!-- movies -->
        <div v-if="store.moviesResults.length > 0" class="movies">
            <div v-for="movie in store.moviesResults" :key="movie.id" class="card">
                <h3>{{ movie.title }}</h3>
                <h4>{{ movie.original_title }}</h4>
                <img v-if="countryCodes.includes(movie.original_language)" width="30px"
                    :src="'/img/flags4x3/' + movie.original_language + '.svg'" alt="country flag">
                <h6 v-else>{{ movie.original_language }}</h6>
                <h5>{{ movie.vote_average }}</h5>
                <img :src="'https://image.tmdb.org/t/p/w342/' + movie.backdrop_path" alt="movie poster">
            </div>
            <hr>
        </div>
        <!-- tv series -->
        <div v-if="store.seriesResults.length > 0" class="series">
            <div v-for="serie in store.seriesResults" :key="serie.id" class="card">
                <h3>{{ serie.name }}</h3>
                <!-- <h4>{{ serie.original_title }}</h4> -->
                <img v-if="countryCodes.includes(serie.original_language)" width="30px"
                    :src="'/img/flags4x3/' + serie.original_language + '.svg'" alt="country flag">
                <h6 v-else>{{ serie.original_language }}</h6>
                <h5>{{ serie.vote_average }}</h5>
                <img :src="'https://image.tmdb.org/t/p/w342/' + serie.backdrop_path" alt="serie poster">
            </div>
        </div>
    </main>
</template>

<style></style>
