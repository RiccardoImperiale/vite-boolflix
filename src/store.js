import { reactive } from 'vue';
import axios from 'axios';
const apiKey = '46be8bec12c11689d3357747050c2d2b';

export const store = reactive({
    search: '',
    results: [],

    getMovies() {
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${this.search}`)
            .then(res => {
                this.results = res.data.results;
                console.log(this.results);
            }).catch(err => console.error(err.message));
    },
})