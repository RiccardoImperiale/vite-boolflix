import { reactive } from 'vue'

export const store = reactive({
    search: '',

    getMovies() {
        console.log(this.search, 'click');
        // axios.get('http://localhost:3000/products').then(res => {
        //     this.products = res.data;
        // }).catch(err => console.error(err.message));
    },
})