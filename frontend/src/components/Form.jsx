import { useState, useEffect } from 'react';
import './Form.css';
import foodData from '../data/foodData.json';

export default function Form({ onFormSubmit }) {
    const [selectedAdjective, setSelectedAdjective] = useState('')
    const [selectedMealType, setSelectedMealType] = useState('')
    const [selectedAllergies, setSelectedAllergies] = useState([])

    const foodAdjectives = foodData.food_adjectives
    const allergies = foodData.food_allergies
    const mealTypes = [
        "breakfast", "lunch", "dinner"
    ]


    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!selectedAdjective || !selectedMealType) {
            alert('Please select both an adjective and a meal type.');
            return;
        }
        const formData = {
            mealType: selectedMealType,
            adjective: selectedAdjective,
            allergies: selectedAllergies
        }
        onFormSubmit(formData);
        window.scrollTo({ top: 0, behavior: 'smooth'});        
    }

    const handleAdjectiveChange = (e) => {
        setSelectedAdjective(e.target.value);
    }

    const handleMealTypeChange = (e) => {
        setSelectedMealType(e.target.value);
    }

    const handleAllergyChange = (e) => {
        const allergy = e.target.value;
        if (e.target.checked) {
            setSelectedAllergies(prev => [...prev, allergy]);
        }
        else {
            setSelectedAllergies(prev => prev.filter(item => item !== allergy));
        }
    }


    return (
        <form className="recipe-form" onSubmit={handleSubmit}>
            <label className="form-label" htmlFor="adjective">Describe Your Dish</label>
            <select
                name="adjective"
                value={selectedAdjective}
                onChange={handleAdjectiveChange}
                className="form-selectbox">
                <option value="" disabled>Select an Adjective</option>
                {
                    foodAdjectives.sort().map((adjective, idx) => (
                        <option key={idx} value={adjective}>{adjective}</option>
                    ))
                }
            </select>

            <label className='form-label' htmlFor="mealType">Time of Day</label>
            <select
                name="mealType"
                value={selectedMealType}
                onChange={handleMealTypeChange}
                className="form-selectbox">
                <option value="" disabled>Select a Meal Type</option>
                {
                    mealTypes.sort().map((meal, idx) => (
                        <option key={idx} value={meal}>{meal}</option>
                    ))
                }
            </select>

            <div className="allergies-container">
                <label className='form-label'>Select Allergies</label>
                <div className="allergies-grid">
                {
                    allergies.sort().map((allergy, idx) => (
                        <div key={idx}>
                            <input
                                type="checkbox"
                                value={allergy}
                                onChange={handleAllergyChange}
                            />
                            <label>{allergy}</label>
                        </div>
                    ))
                }
                </div>
            </div>
        
            <button type="submit" className="form-submit">Generate Recipe!</button>
        </form>
    )
}