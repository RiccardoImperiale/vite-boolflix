import { reactive } from 'vue';
import axios from 'axios';
const apiKey = '46be8bec12c11689d3357747050c2d2b';

export const store = reactive({
    search: '',
    results: [],

    getFilms() {
        this.getMovies();
        this.getTvSeries();
    },
    getMovies() {
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${this.search}`)
            .then(res => {
                console.log(res.data)
                res.data.results.forEach(movie => {
                    this.results.push({
                        id: movie.id,
                        // category: 'movie',
                        genre_id: movie.genre_id,
                        title: movie.title,
                        language: movie.original_language,
                        origTitle: movie.original_title,
                        vote: movie.vote_average,
                        image: movie.poster_path,
                    })
                })
                console.log(this.results);
            }).catch(err => console.error(err.message));
    },
    getTvSeries() {
        axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${this.search}`)
            .then(res => {
                res.data.results.forEach(tv => {
                    this.results.push({
                        id: tv.id,
                        // category: 'series',
                        genre_id: tv.genre_id,
                        title: tv.name,
                        language: tv.original_language,
                        origTitle: null,
                        vote: tv.vote_average,
                        image: tv.poster_path,
                    })
                })
                console.log(this.results);
            }).catch(err => console.error(err.message));
    },
})

