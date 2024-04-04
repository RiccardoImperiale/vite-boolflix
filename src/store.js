import { reactive } from 'vue';
import axios from 'axios';
const apiKey = '46be8bec12c11689d3357747050c2d2b';
const baseApi = 'https://api.themoviedb.org/3';

export const store = reactive({
    search: '',
    results: [],
    defaultSearch: 'Batman',
    genres: {},

    getFilms() {
        this.results = [];
        this.getGenres('tv');
        this.getGenres('movie');
        this.getMovies();
        this.getTvSeries();
    },
    async getMovies() {
        try {
            const res = await axios.get(`${baseApi}/search/movie?api_key=${apiKey}&query=${this.search || this.defaultSearch}`);
            for (const movie of res.data.results) {
                this.results.push({
                    id: movie.id,
                    genre_ids: movie.genre_ids,
                    genres: this.genres.movies.filter(genre => movie.genre_ids.includes(genre.id)),
                    title: movie.title,
                    overview: movie.overview,
                    language: movie.original_language,
                    origTitle: movie.original_title,
                    vote: movie.vote_average,
                    image: movie.poster_path,
                    actors: await this.getActors(movie.id, 'movie')
                });
            }
        } catch (err) {
            console.error(err.message);
        }
    },
    async getTvSeries() {
        try {
            const res = await axios.get(`${baseApi}/search/tv?api_key=${apiKey}&query=${this.search || this.defaultSearch}`)
            for (const tv of res.data.results) {
                this.results.push({
                    id: tv.id,
                    genre_ids: tv.genre_ids,
                    genres: this.genres.tv.filter(genre => tv.genre_ids.includes(genre.id)),
                    title: tv.name,
                    overview: tv.overview,
                    language: tv.original_language,
                    origTitle: tv.original_name,
                    vote: tv.vote_average,
                    image: tv.poster_path,
                    actors: await this.getActors(tv.id, 'tv')
                })
            }
        } catch (err) {
            console.error(err.message);
        }
    },
    async getActors(movieId, category) {
        try {
            const res = await axios.get(`${baseApi}/${category}/${movieId}/credits?api_key=${apiKey}`);
            let actors = res.data.cast.map(actor => actor.name);
            const first5actors = actors.slice(0, 5);
            return first5actors.join(", ");
        } catch {
            console.error(`Failed to fetch actors for movie id: ${movieId}`);
        }
    },
    async getGenres(category) {
        try {
            const res = await axios.get(`${baseApi}/genre/${category}/list?api_key=${apiKey}`);
            category === 'tv' && (this.genres.tv = res.data.genres);
            category === 'movie' && (this.genres.movies = res.data.genres);
        } catch (err) {
            console.error(err.message);
        }
    },
})

