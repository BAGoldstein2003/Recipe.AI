import './MyRecipes.css'
import { useState,useEffect } from 'react'

export default function MyRecipes({ recipes, setRecipes}) {
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

    return (
        <div className="recipes-container"> 
            {recipes.map((recipe, index) => (
                <div key={index} 
                className="recipe-card">
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