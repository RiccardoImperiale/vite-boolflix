import { reactive } from 'vue';
import axios from 'axios';
const apiKey = '46be8bec12c11689d3357747050c2d2b';
const baseApi = 'https://api.themoviedb.org/3';

export const store = reactive({
    search: '',
    results: [],
    defaultSearch: 'Batman',
    genres: [],
    allGenres: [],
    isMovies: false,
    isSeries: false,
    isGenreBar: false,

    async getFilms() {
        this.reset();
        await this.getAllGenres();
        await this.getMovies();
        await this.getTvSeries();
    },
    reset() {
        this.results = [];
        this.isMovies = false;
        this.isSeries = false;
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
    async getAllGenres() {
        try {
            const moviesRes = await axios.get(`${baseApi}/genre/movie/list?api_key=${apiKey}`);
            const seriesRes = await axios.get(`${baseApi}/genre/tv/list?api_key=${apiKey}`);
            this.genres = {
                tv: seriesRes.data.genres,
                movies: moviesRes.data.genres
            };
            const allGenres = [...moviesRes.data.genres, ...seriesRes.data.genres];
            // Remove duplicate genres by using Set
            this.allGenres = Array.from(new Set(allGenres.map(genre => genre.id))).map(id => {
                return allGenres.find(genre => genre.id === id);
            });

        } catch (err) {
            console.error(err.message);
        }
    },
    async getFilmsByGenre(genreId) {
        this.results = [];
        try {
            const moviesRes = await axios.get(`${baseApi}/discover/movie?api_key=${apiKey}&with_genres=${genreId}`);
            const seriesRes = await axios.get(`${baseApi}/discover/tv?api_key=${apiKey}&with_genres=${genreId}`);
            for (const movie of moviesRes.data.results) {
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
            for (const tv of seriesRes.data.resultsies) {
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
    }
})

