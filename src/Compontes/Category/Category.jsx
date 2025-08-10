import { useState, useEffect } from "react";
import "./Category.scss";

const Category = ({ selectedCategory, setSelectedCategory }) => {
    const [categories, setCategories] = useState([]);
    const [isDropdown, setIsDropdown] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
                const data = await response.json();
                if (data.categories) {
                    setCategories(["All", ...data.categories.map((cat) => cat.strCategory)]);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsDropdown(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="categories-container">
            {isDropdown ? (
                <select
                    className="category-dropdown"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            ) : (
                <div className="category-buttons">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`category-btn ${selectedCategory === category ? "active" : ""}`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Category;
