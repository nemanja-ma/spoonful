import { elements } from "./base";

export const clearRecipe = () => {
    elements.recipe.innerHTML = '';
}

let createIngredient = ingredient => `
    <li class="recipe__item">
        <i class="fa fa-check"></i>
        <div class="recipe__count">${ingredient.amount}</div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${ingredient.unit} </span>
            ${ingredient.name}
        </div>
    </li>
    `; 

export const renderRecipe = (recipe, isLiked) => {
    const markap = `
        <figure class="recipe__fig">
            <img class="recipe__img" src="${recipe.img}" alt="${recipe.title}">
            <h2 class="recipe__title"><span>${recipe.title}</span></h2>
        </figure>

        <div class="container container-recipe">
            <div class="row">
                <div class="col-12 col-sm-12">
                    <div class="recipe__ingredients">
                        <ul class="recipe__ingredient-list">
                            ${recipe.ingredients.map(el => createIngredient(el)).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="container pt-3 pb-3 pl-0 pr-0">
            <div class="row pl-3 pr-3 recipe__details">
                <div class="col-3 col-sm-3 p-1">
                    <div class="recipe__info recipe__info__recipe text-align-center">
                        <a class="btn-tiny recipe__info-buttons btn-decrease"> <i class="fa fa-minus"></i> </a>
                        <a class="btn-tiny recipe__info-buttons btn-increase" style="  margin-left: 1rem;"> <i class="fa fa-plus"></i> </a>
                    </div>
                </div>
                <div class="col-3 col-sm-3 p-1">
                    <button class="btn ${isLiked ? "btn-danger" : "btn-outline-danger"} btn-block recipe__love">
                        <i class="fa fa-heart"></i>
                    </button>
                </div>
                <div class="col-3 col-sm-3 p-1">
                    <a target="blank" href="${recipe.url}" class="btn btn-outline-secondary btn-block" role="button"><i class="fa fa-info"></i></a>                        
                </div>
                <div class="col-3 col-sm-3 p-1">
                    <button class="btn btn-outline-success btn-block recipe__btn recipe__btn--add">
                        <i class="fa fa-caret-right"></i>
                    </button>
                </div>
            </div>
            <div class="row description ">
                <div class="col-4 col-sm-3 d-none d-sm-block">
                    <span class="recipe__info-data--people">${recipe.servings}</span><span> Servings</span>
                </div>
                <div class="col-3 col-sm-3 d-none d-sm-block">
                    <span>Add to Favorits</span>
                </div>
                <div class="col-3 col-sm-3 d-none d-sm-block">
                    <span>More Info</span>
                </div>
                <div class="col-2 col-sm-3 d-none d-sm-block">
                    <span>Add to the list</span>
                </div>
            </div>
        </div>
        </div>
    `;
    elements.recipe.insertAdjacentHTML('afterbegin', markap);
}

export const updateServingsIngerdients = recipe => {
    
    //update servings
    document.querySelector('.recipe__info-data--people').textContent = recipe.servings;

    //update ingredients
    const countElements = Array.from(document.querySelectorAll('.recipe__count'));
    countElements.forEach((el, i) => {
        el.textContent = recipe.ingredients[i].amount;
    })
};