import {Model} from 'odoo-webkit'

const Movie = new Model('mr.movie');
const Type = new Model('mr.type');
const Category = new Model('mr.category');

export default{
    loadMovies({commit, dispatch}){
        //context.commit();
        //context.dispatch;
        Movie.all().then(res => commit('LOAD_MOVIES', res.records));

        //Category.all().then(console.log)
        //Type.all().then(console.log);

    },
    loadCategories({commit}){
        Category.all().then(res => commit('LOAD_CATEGORIES', res.records)); 
        Category.all().then(console.log);

    },
    loadTypes({commit}){
        Type.all().then(res => commit('LOAD_TYPES', res.records));

    },
    createCategory(){
        Category.create({name: 'Aventura'}).then(console.log);
        Category.create({name: 'Ciencia ficcion'}).then(console.log);
        Category.create({name: 'XXX'}).then(console.log);
        Category.create({name: 'Infantil'}).then(console.log);

    },
    createType(){
        Type.create({'name': 'Digital'}).then(console.log)
        Type.create({'name': '3D'}).then(console.log)
        Type.create({'name': 'Bluray'}).then(console.log)
        Type.create({'name': 'DvD'}).then(console.log)

    },
    createMovie({dispatch, commit}, movie){
        console.log(movie);
        movie.categories = [[6, false, movie.categories]];
        movie.types = [[6, false, movie.types]];

        Movie.create(movie).then(res => {
            dispatch('loadMovies');
            dispatch('toggleDialog');
            movie = {
                id: -1,
                name: '',
                categories: [],
                types: [],
                year: 0,
                description: '',
              }
        });

    },

    toggleDialog({commit}){
        commit('TOGGLE_DIALOG');
    },

    searchMovie({commit}, searchData){
        const Tmovie = new Model('mr.movie');

        commit('TOGGLE_LOADING');

        Tmovie.filter(['name', 'ilike', searchData])
            .get()
            .then(res => {
                commit('LOAD_MOVIES', res.records);

                setTimeout(()=>{
                    commit('TOGGLE_LOADING');
                }, 750);
            
            });
    }



};