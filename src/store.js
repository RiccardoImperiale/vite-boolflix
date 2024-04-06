import { reactive } from 'vue';
import axios from 'axios';
const apiKey = '46be8bec12c11689d3357747050c2d2b';
const baseApi = 'https://api.themoviedb.org/3';

export const store = reactive({
    search: '',
    results: [],
    genres: [],
    allGenres: [],
    isMovies: false,
    isSeries: false,
    isGenreBar: false,
    titleSection: 'Movies',
    isHero: true,
    isHeroGoingUp: false,
    heroContent: [],

    async searchFilms() {
        this.titleSection = 'Movies and Tv Series';
        this.reset();
        await this.getAllGenres();
        await this.searchMoviesAndSeries('movie');
        await this.searchMoviesAndSeries('tv');
    },
    async allFilms() {
        this.titleSection = 'Movies and Tv Series';
        this.reset();
        await this.getAllGenres();
        await this.getAllMoviesAndSeries('movie');
        await this.getAllMoviesAndSeries('tv');
    },
    reset() {
        this.results = [];
        this.isMovies = false;
        this.isSeries = false;
    },
    async getAllMoviesAndSeries(category) {
        // get all movies and tv series
        try {
            const res = await axios.get(`${baseApi}/discover/${category}?api_key=${apiKey}`);
            this.handleResponse(res.data.results, category);
        } catch (err) {
            console.error(err.message);
        }
    },
    async searchMoviesAndSeries(category) {
        // api call from search input
        try {
            const res = await axios.get(`${baseApi}/search/${category}?api_key=${apiKey}&query=${this.search}`);
            this.handleResponse(res.data.results, category);
        } catch (err) {
            console.error(err.message);
        }
    },
    async getActors(movieId, category) {
        try {
            // get first 5 actors
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
            // get genres divided into tv series or movie
            this.genres = {
                tv: seriesRes.data.genres,
                movie: moviesRes.data.genres
            };
            // get all genres in one array
            const allGenres = [...moviesRes.data.genres, ...seriesRes.data.genres];
            // remove duplicate genres by using Set
            this.allGenres = Array.from(new Set(allGenres.map(genre => genre.id))).map(id => {
                return allGenres.find(genre => genre.id === id);
            });

        } catch (err) {
            console.error(err.message);
        }
    },
    async getFilmsByGenre(genreId) {
        this.isMovies = false;
        this.isSeries = false;
        this.isHeroGoingUp = true;
        // change section title
        this.allGenres.forEach(gen => gen.id === genreId && (this.titleSection = gen.name));
        this.results = [];
        // get movie or tv series by genre
        try {
            const moviesRes = await axios.get(`${baseApi}/discover/movie?api_key=${apiKey}&with_genres=${genreId}`);
            const seriesRes = await axios.get(`${baseApi}/discover/tv?api_key=${apiKey}&with_genres=${genreId}`);
            this.handleResponse(moviesRes.data.results, 'movie');
            this.handleResponse(seriesRes.data.results, 'tv');
        } catch (err) {
            console.error(err.message);
        }
    },
    async handleResponse(data, category) {
        for (const item of data) {
            this.results.push({
                id: item.id,
                genre_ids: item.genre_ids,
                genres: this.genres[category].filter(genre => item.genre_ids.includes(genre.id)),
                title: item.title || item.name,
                overview: item.overview,
                language: item.original_language,
                origTitle: item.original_title || item.original_name,
                vote: item.vote_average,
                image: item.poster_path,
                actors: await this.getActors(item.id, category),
                heroImage: item.backdrop_path
            });
        }
    },
    showHero(movie) {
        this.isHero = true; // show hero section
        this.isGenreBar = false;
        this.isHeroGoingUp = false;
        // get all the content needed for the hero section
        console.log(movie);
        this.heroContent = {
            src: 'https://image.tmdb.org/t/p/original/' + movie.heroImage,
            title: movie.title,
            overview: movie.overview,
            rating: this.getRatingStars(movie.vote),
            genres: movie.genres
        }
    },
    getRatingStars(rating) {
        return Math.ceil(rating /= 2);
    }
})

