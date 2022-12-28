import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RECIPES = [];
const Recipes = () => {
const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/recipelist')
        .then((response) => {
            setRecipes(response.data)
        }) 
        ;
}, []);
  RECIPES = {...recipes};
}
export default RECIPES;
