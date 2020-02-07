import axios from 'axios';
import {key, proxy} from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try{
            const res = await axios(`https://api.spoonacular.com/recipes/${this.id}/information?apiKey=${key}`);
            this.title=res.data.title;
            this.author=res.data.sourceName;
            this.img=res.data.image;
            this.url=res.data.sourceUrl;
            this.ingredients=res.data.extendedIngredients;
            this.time=res.data.readyInMinutes;
            this.servings=res.data.servings;    
        } catch(error) {
            alert('cant get recipe details');   
        }
    }

    /*
    updateServings (type) {
        //servings
        const newServings = type === 'dec' ? this.servings -1 : this.servings +1;

        //ingredients

        this.ingredients.forEach(ing => {
            ing.amount *= (newServings/this.servings)
        })
        this.servings = newServings
    }
    */
}