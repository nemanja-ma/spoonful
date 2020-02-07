import { elements, renderLoader, clearLoader} from './views/base';
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';

const state = {};

/// SEARCH CONTOLER

const controlSearch = async () => {
    // get query from view
    const  query = searchView.getInput();
       
    // add a serach obj into state
    if (query) {
        state.search = new Search(query);

        // prepare ui for results
        searchView.clearInpu(); 
        searchView.clearResults();
        renderLoader(elements.searchRes);

        //search for recipes
        await state.search.getResults()
        
        //render results
        clearLoader(elements.searchRes);
        searchView.renderResults(state.search.result); 
        console.log(state.search.result);    
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})

/// RECIPE CONTOLER

const constrolSearch = async () => {
    //get id from url
    const id = window.location.hash.replace('#', '');
    
    if (id) {
            //prepare ui for changes
            recipeView.clearRecipe();
            renderLoader(elements.recipe);

            //add a recipe obj into state
            state.recipe = new Recipe(id);
            console.log(state.recipe);
            
        try{
            //search for recipe data
            await state.recipe.getRecipe();

            //render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);

        } catch(error) {
            console.log('cant process data');
        }    
    }
}

['hashchange', 'load'].forEach(el => window.addEventListener(el, constrolSearch));
