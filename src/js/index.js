import { elements, renderLoader, clearLoader} from './views/base';
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';

const state = {};
window.state=state;
/// SEARCH CONTOLER ///

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

/// RECIPE CONTOLER ///

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
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
 
        } catch(error) {
            console.log('cant process data'); 
        }    
    }
}

['hashchange', 'load'].forEach(el => window.addEventListener(el, constrolSearch));

//handling recipe button clicks

elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        
        //decrese if button is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngerdients(state.recipe);
            console.log(state.recipe.servings);
            
        }
    }   else if (e.target.matches('.btn-increase, .btn-increase *')) {
        //increse if button is clicked
        state.recipe.updateServings('inc')
        recipeView.updateServingsIngerdients(state.recipe);
        // call for the controlList function
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        controlList();
        // call for the controlLike function
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        controlLike();
    }
});


/// LIST CONTOLER ///

const controlList = () => {
    //create a new list if there is non
    if (!state.list) state.list = new List();

    //add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.amount, el.unit, el.name);
        listView.renderItem(item);
    })
}

//handle delete and update list item events

elements.shopping.addEventListener('click', e=> {
    const id = e.target.closest('.shopping__item').dataset.itemid;
    console.log(id)
    //handle dlt event
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        
        //delete the item from the state
        state.list.deleteItem(id);

        //delete from ui
        listView.deleteItem(id);
        //handle count update
    } else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
});

/// LIKES CONTOLER ///
state.likes = new Likes()
const controlLike = () => {
    if (!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;
    
    // user has NOT yet liked new recipe
    if(!state.likes.isLiked(currentID)) {
        //add like to the state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
        );    
        console.log(state.likes.getNumLikes())    

        //toggle the like button
        likesView.toggleLikeBtn(true);
       
        //add like to ui list
        console.log(state.likes)
        likesView.renderLike(newLike);

    //2 user HAS liked new recipe
    } else {
        //remove like from the state
        state.likes.deleteLike(currentID)
        console.log(state.likes.getNumLikes())
        
        //toggle the button
        likesView.toggleLikeBtn(false);
        
        //remove like from ui list
        likesView.deleteLike(currentID);
    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());
};
/*   
//resore liked recipes when the page loads
window.addEventListener('load', e => {
    state.likes = new Likes();

    //read the local storage
    state.likes.readStorage()

    //togle the button
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    //render existing likes
    state.likes.likes.forEach(like => likesView.renderLike(like))
});
*/