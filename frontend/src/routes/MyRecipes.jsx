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
        setFavorites(prevFavs => {
            const newFavorites = prevFavs.includes(index) 
                ? prevFavs.filter(i => i !== index)
                : [...prevFavs, index];
            return newFavorites;
        })
    }

    return ( 
        <div className="recipes-container"> 
            {recipes.map((recipe, index) => (
                <div key={index} 
                    className={`recipe-card fade-in ${favorites.includes(index) ? 'fav' : ''}`}
                    style ={{ animationDelay: `${index * 0.2}s`}}
                    >
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