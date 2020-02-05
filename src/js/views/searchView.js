import {elements} from './base'

export const getInput = () => elements.searchInput.value;

export const clearInpu = () => {
    elements.searchInput.value = '';
}

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
}

export const limitRecipeTitle = title => {
    const newTitile = [];
    if (title.length > 17) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= 17) {
                newTitile.push(cur);
            }
            return acc + cur.length;
        }, 0);

        return `${newTitile.join(' ')}...`;

    } 
    return title;
}
 
const renderRecipe = recipe => {
    const markap = `
    <li>
        <a class="results__link" href="#${recipe.id}">
            <figure class="results__fig">
                <img src="https://spoonacular.com/recipeImages/${recipe.id}-90x90.jpg"} alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">Ready in ${recipe.readyInMinutes}. For ${recipe.servings} people</p>
            </div>
        </a>
    </li>
    `;

    elements.searchResList.insertAdjacentHTML('afterbegin',markap);
};

const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1} </span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
    `

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let button;
    if (page===1 && pages > 1) {
        //only button for the next page
        button = createButton(page, 'next');

    } else if (page < pages) {
        //both buttons 
        button = `
        ${createButton(page, 'next')}
        ${createButton(page, 'prev')}
        `;

    } else if (page === pages && pages > 1) {
        //only button for the previous page
        button = createButton(page, 'prev');
    }
    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1) => {
    // render recipes
    const start = (page - 1) * 10;
    const end = page * 10;
    recipes.slice(start, end).forEach(renderRecipe);

    //reneder pag. buttons
    renderButtons(page, recipes.length, 10);
};

export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    });
    document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active');
}


