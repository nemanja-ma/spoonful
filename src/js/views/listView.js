import { elements } from "./base";

export const renderItem = item => {

    const markap = `
    <li class="list-group-item shopping__item data-itemid=${item.id}">
        <div class="container list_paddzero">
            <div class="row list_paddzero  align-items-center">
                <div class="col-5 col-sm-5 shpping__count list_paddzero">
                    <input type="number" class="shopping__count-value" value="${item.count}" step="${item.count}"><span> ${item.unit}</span>
                </div>
                <div class="col-5 col-sm-6 list_paddzero">
                    <p class="shopping__description ">${item.ingredient}</p>
                </div>
                <div class="col-1 col-sm-1 list_paddzero justify-content-right">
                    <a href="#" class="shopping__delete btn-tiny"><i class="fa fa-times-circle"></i></a>
                </div>
            </div>
        </div>
    </li>
    `;


    elements.shopping.insertAdjacentHTML('beforeend', markap);
};

export const deleteItem = id => {
    const item = document.querySelector(`[data-itemid="${id}"]`);
    item.parentElement.removeChild(item);
}; 