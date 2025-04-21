import './MyRecipes.css'
import { useState,useEffect } from 'react'
import { FiHeart } from "react-icons/fi";

export default function MyRecipes({ recipes, setRecipes, favorites, setFavorites}) {
    const [localRecipes, setLocalRecipes] = useState(recipes)

    
    useEffect(() => {
        setLocalRecipes(recipes)
        console.log('MyRecipes received updated recipes:', recipes);
    }, [recipes]);


    const handleClick = (indexToDelete) => {
        const updatedRecipes = localRecipes.filter((_, index) => index !== indexToDelete);
        setRecipes(updatedRecipes)
        setLocalRecipes(updatedRecipes)
    }

    const handleFavorite = (index) => {
        setFavorites(prev => {
            const newFavorites = prev.includes(index) 
                ? prev.filter(i => i !== index)
                : [...prev, index];
            return newFavorites;
        })
    }

    return (
        <div className="recipes-container"> 
            {recipes.map((recipe, index) => (
                <div key={index} 
                    className={`recipe-card ${favorites.includes(index) ? 'fav' : ''}`}>
                    <FiHeart 
                        className={`fav-heart ${favorites.includes(index) ? 'active' : ''}`} 
                        onClick={() => handleFavorite(index)}
                        fill={favorites.includes(index) ? 'red' : 'none'}
                        stroke='white'>
                    </FiHeart>
                    <h2>{recipe.title}</h2>
                    <h3>Ingredients</h3>
                    <ul>
                        {recipe.ingredients.sort().map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                    <h3>Instructions</h3>
                    <ol>
                        {recipe.instructions.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                        ))}
                    </ol>
                    <button onClick={() => handleClick(index)} className="del-button">Delete Recipe</button>
                </div>
            ))}
        </div>
    )
}