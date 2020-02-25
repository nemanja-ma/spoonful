import { elements } from './base';
import { limitRecipeTitle } from './searchView';

export const toggleLikeBtn = isLiked => {
    const iconString = isLiked ? 'btn-danger' : 'btn-outline-danger';
    document.querySelector('.recipe__details button').setAttribute('class',`btn ${iconString} btn-block recipe__love`)
};

export const toggleLikeMenu = numLikes => {
    elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
};

export const renderLike = like => {
    const markap = `
        <li>
            <a class="likes__link" href="#${like.id}">
                <div class="likes__data">
                    <h4 class="likes__name">${like.title}</h4>
                </div>
            </a>
        </li>
    `;
    elements.likesList.insertAdjacentHTML('beforeend', markap);
};

export const deleteLike = id => {
    const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
    if (el) el.parentElement.removeChild(el);
};
  