import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './routes/Home';
import MyRecipes from './routes/MyRecipes';
import Error from './components/Error';

function App() {

  const [recipeParams, setRecipeParams] = useState({
    mealType: '',
    adjective: '',
    allergies: [],
  });
  const [recipes, setRecipes] = useState(() => {
    const savedRecipes = localStorage.getItem('recipes')
    return savedRecipes ? JSON.parse(savedRecipes) : []
  })
    
  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes])
  

  const handleFormSubmit = async (formData) => {
    setRecipeParams(formData);
    console.log('form submitted:', formData);
    const response = await fetch('http://localhost:5000/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log('server response:', data.recipe);

    if (data.recipe.error) {
      alert('Error from server:', data.recipe.error);
    }
    else {
      setRecipes(prev => {
        const updated = [...recipes, data.recipe];
        console.log('✅ Updated recipes:', updated);

        window.alert("SUCCESS! Check the 'My Recipes' page to view your recipe!")
        return updated;
      })
    }
    
  }

  return (
    
    <div className="app-wrapper">
      <Navbar />
      <Error />
      <BrowserRouter>
        <Routes> 
          <Route path="/" element={ <Home onFormSubmit={handleFormSubmit} recipes={recipes}/> }/>
          <Route path="/my-recipes" element={ <MyRecipes
            recipes={recipes}
            setRecipes={setRecipes}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}



export default App;
