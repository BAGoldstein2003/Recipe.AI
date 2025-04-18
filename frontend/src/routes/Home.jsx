import Form from '../components/Form';
import './Home.css'
import { useState, useEffect } from 'react'

export default function Home({ onFormSubmit, recipes }) {
    const [localRecipes, setLocalRecipes] = useState([]);

    return (
        <div className="home-wrapper">
            <h1 className="welcome">Welcome to Recipe.AI </h1>
            <h3 className="app-desc">Are you hungry and don't know what to eat? Try this AI Recipe tool to find a recipe of your liking, in the matter of seconds!</h3>
            <Form className="recipe-form" onFormSubmit={onFormSubmit}/>

        </div>
    )
}