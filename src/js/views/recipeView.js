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

export const renderRecipe = (recipe) => {
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
                        <a class="btn-tiny recipe__info-buttons"> <i class="fa fa-minus"></i> </a>
                        <a class="btn-tiny recipe__info-buttons" style="  margin-left: 1rem;"> <i class="fa fa-plus"></i> </a>
                    </div>
                </div>
                <div class="col-3 col-sm-3 p-1">
                    <button class="btn btn-outline-danger btn-block recipe__love">
                        <i class="fa fa-heart"></i>
                    </button>
                </div>
                <div class="col-3 col-sm-3 p-1">
                    <button class="btn btn-outline-secondary btn-block recipe__love" href="${recipe.url}" target="_blank">
                        <i class="fa fa-info"></i>
                    </button>

                </div>
                <div class="col-3 col-sm-3 p-1">
                    <button class="btn btn-outline-success btn-block recipe__btn">
                        <i class="fa fa-caret-right"></i>
                    </button>
                </div>
            </div>
            <div class="row description ">
                <div class="col-4 col-sm-3 d-none d-sm-block">
                    <span>4 Servings</span>
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

