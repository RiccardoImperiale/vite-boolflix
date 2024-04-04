import { reactive } from 'vue';
import axios from 'axios';
const apiKey = '46be8bec12c11689d3357747050c2d2b';

export const store = reactive({
    search: '',
    results: [],
    defaultSearch: 'The Lego Batman Movie',
    genres: {},

    getFilms() {
        this.results = [];
        this.getMovies();
        this.getTvSeries();
    },
    getGenres() {
        this.getMoviesGenres()
        this.getSeriesGenres()
        console.log(this.genres);
    },
    async getMovies() {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${this.search || this.defaultSearch}`);
            for (const movie of res.data.results) {
                this.results.push({
                    id: movie.id,
                    genre_ids: movie.genre_ids,
                    title: movie.title,
                    overview: movie.overview,
                    language: movie.original_language,
                    origTitle: movie.original_title,
                    vote: movie.vote_average,
                    image: movie.poster_path,
                    actors: await this.getActors(movie.id)
                });
            }
        } catch (err) {
            console.error(err.message);
        }
    },
    async getTvSeries() {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${this.search || this.defaultSearch}`)
            for (const tv of res.data.results) {
                this.results.push({
                    id: tv.id,
                    genre_ids: tv.genre_ids,
                    title: tv.name,
                    overview: tv.overview,
                    language: tv.original_language,
                    origTitle: tv.original_name,
                    vote: tv.vote_average,
                    image: tv.poster_path,
                    actors: await this.getActors(tv.id)
                })
            }
        } catch (err) {
            console.error(err.message);
        }
    },
    // 
    async getActors(movieId) {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`);
            let actors = res.data.cast.map(actor => actor.name);
            const first5actors = actors.slice(0, 5);
            return first5actors.join(", ");
        } catch (err) {
            console.error(err.message);
        }
    },
    async getMoviesGenres() {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
            this.genres.movies = res.data.genres;
        } catch (err) {
            console.error(err.message);
        }
    },
    async getSeriesGenres() {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}`);
            this.genres.tv = res.data.genres;
        } catch (err) {
            console.error(err.message);
        }
    }
})

