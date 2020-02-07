import {elements} from './base'

export const getInput = () => elements.searchInput.value;

export const clearInpu = () => {
    elements.searchInput.value = '';
}

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
}

const renderRecipe = recipe => {
    const markap = `
    <a href="#${recipe.id}" class="results__link list-group-item list-group-item-action" >
        <div class="row align-items-center row-result">
            <div class="col-12 col-sm-3 p-0 m-0">
                <figure class="results__fig">
                    <img src="https://spoonacular.com/recipeImages/${recipe.id}-90x90.jpg" alt="${recipe.title}">
                </figure>
            </div>
            <div class="col-12 col-sm-9 p-2 ml-0 results__data">
                <h4 class="results__name">${recipe.title}</h4>
                <div class="recipe__info">
                    <div class="recipe__info__in">
                        <i class="fa fa-hourglass"></i>
                        <span class="recipe__info-data recipe__info-data--minutes">${recipe.readyInMinutes}</span>
                        <span class="recipe__info-text"> min</span>
                    </div>
                    <div class="recipe__info__in">
                        <i class="fa fa-user"></i>
                        <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
                        <span class="recipe__info-text"> person</span>
                    </div>
                    <div class="recipe__info__in ">
                        <i class="fa fa-leaf"></i>
                    </div>
                </div>
            </div>
        </div>
    </a>
    `;
    elements.searchResList.insertAdjacentHTML('afterbegin',markap);
};
export const renderResults = (recipes) => {
    recipes.forEach(renderRecipe);
};