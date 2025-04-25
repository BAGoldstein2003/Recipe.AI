import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './routes/Home';
import MyRecipes from './routes/MyRecipes';
import Alertbox from './components/Alertbox';

function App() {
  //state for saving recipes
  const [isLoadingRecipe, setIsLoadingRecipe] = useState(false);
  const [recipes, setRecipes] = useState(() => {
    const savedRecipes = localStorage.getItem('recipes')
    return savedRecipes ? JSON.parse(savedRecipes) : []
  });
  const [favorites, setFavorites] = useState(() => {
    const localRecipes = localStorage.getItem('favorites');
    if (localRecipes) {
        try {
            return JSON.parse(localRecipes);
        } catch {
            return [];
        }
    }
    return [];
  });

    //handle refreshes
    useEffect(() => {
      window.addEventListener('load', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }, []);


  //useEffects HERE
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites]);
  

  //add to local storage every time recipes changes
  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);
  

  const handleFormSubmit = async (formData) => {
    try {
    setIsLoadingRecipe(true);
    console.log('form submitted:', formData);
    const response = await fetch('https://recipe-ai-server.onrender.com/submit', {
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
      setIsLoadingRecipe(false);
      return;
    }
    else {
      setRecipes(prev => {
        const updated = [...recipes, data.recipe];
        console.log('✅ Updated recipes:', updated);
        window.alert("SUCCESS! Check the 'My Recipes' page to view your recipe!");
        return updated;
      })
    }
   } catch (error) {
    console.error('Error:', error);
  } finally {

    setIsLoadingRecipe(false);
  }
    
  }


  return (
    
    <div className="app-wrapper">
    {isLoadingRecipe && <Alertbox isActive={isLoadingRecipe}/>}  
      <Navbar />
      <BrowserRouter>
        <Routes> 
          <Route path="/" element={ <Home onFormSubmit={handleFormSubmit} recipes={recipes}/> }/>
          <Route path="/my-recipes" element={ <MyRecipes
            recipes={recipes}
            setRecipes={setRecipes}
            favorites={favorites}
            setFavorites={setFavorites}
            />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}



export default App;
