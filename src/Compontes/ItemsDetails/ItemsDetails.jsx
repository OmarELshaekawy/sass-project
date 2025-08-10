import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ItemsDetails.css";

export default function ItemDetails() {
    const { id } = useParams();
    const navigate = useNavigate(); 
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id || isNaN(id)) {
            navigate("/");
            return;
        }

        axios
            .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then((res) => {
                setMeal(res.data.meals ? res.data.meals[0] : null);
            })
            .catch((error) => {
                console.error("Error fetching meal details:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id, navigate]);

    if (loading) return <div className="loader"></div>;

    if (!meal) {
        return (
            <div className="not-found">
                <h2>Meal not found! 🍽️</h2>
                <button onClick={() => navigate("/")} className="back-button">
                    العودة للصفحة الرئيسية
                </button>
            </div>
        );
    }


    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
            ingredients.push({ ingredient, measure });
        }
    }

    return (
        <div className="meal-details main-content w-10/12 mx-auto my-6">
           
            <div className="left-section">
                <h2>{meal.strMeal}</h2>
                <img src={meal.strMealThumb} className="img-details" alt={meal.strMeal} />
                <div className="meal-info">
                    <p><strong>Category:</strong> {meal.strCategory}</p>
                    <p><strong>Area:</strong> {meal.strArea}</p>
                </div>
                <div className="more-about-meal">
                    <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer">
                        <button className="youtube">
                            <i className="fa-brands fa-youtube"></i> YouTube
                        </button>
                    </a>
                    <a href={meal.strSource} target="_blank" rel="noopener noreferrer">
                        <button className="website">
                            <i className="fa-solid fa-globe"></i> Source
                        </button>
                    </a>
                </div>
            </div>

         
            <div className="meal-text">
                <p><strong>Instructions:</strong> {meal.strInstructions}</p>
            </div>

            
            <div className="ingredients">
                <h3>Ingredients</h3>
                <ul>
                    {ingredients.map((item, index) => (
                        <li key={index}>
                            <strong>{item.ingredient}:</strong> {item.measure}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
