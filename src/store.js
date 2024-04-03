import { reactive } from 'vue';
import axios from 'axios';
const apiKey = '46be8bec12c11689d3357747050c2d2b';

export const store = reactive({
    search: '',
    moviesResults: [],
    seriesResults: [],

    getFilms() {
        this.getMovies();
        this.getTvSeries();
    },
    getMovies() {
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${this.search}`)
            .then(res => {
                this.moviesResults = res.data.results;
                console.log(this.results);
            }).catch(err => console.error(err.message));
    },
    getTvSeries() {
        axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${this.search}`)
            .then(res => {
                this.seriesResults = res.data.results;
                // res.data.results.forEach(tv => {
                //     this.tvResults.push({
                //         title: tv.name,
                //         language: tv.original_language,
                //         vote: tv.vote_average,
                //     })
                // })
                console.log(this.seriesResults);
            }).catch(err => console.error(err.message));
    },
})

