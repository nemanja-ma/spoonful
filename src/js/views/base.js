export const elements = {
    searchInput: document.querySelector('.search__field'),
    searchForm: document.querySelector('.search'),
    searchRes: document.querySelector('.results'),
    searchResList: document.querySelector('.results__list'),

    recipe: document.querySelector('.recipe'),

    shopping: document.querySelector('.shopping__list'),
    likesMenu: document.querySelector('.likes__field'),
    likesList: document.querySelector('.likes__list'),
    shopping: document.querySelector('.shopping__list'),
    likesMenu: document.querySelector('.likes__field'),
    likesList: document.querySelector('.likes__list')
};

export const renderLoader = parent => {
    const loader = `
        <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.loader`);
    if (loader) loader.parentElement.removeChild(loader);
};