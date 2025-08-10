import React, { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../../assets/logo-BfNap0Pe.png";

export default function Navbar() {
    const [isActive, setIsActive] = useState(false);

    const toggleMenu = () => {
        setIsActive(!isActive);
    };

    useEffect(() => {
        const closeMenuOnClick = (e) => {
            if (e.target.classList.contains("nav-link")) {
                setIsActive(false);
            }
        };

        document.addEventListener("click", closeMenuOnClick);
        return () => {
            document.removeEventListener("click", closeMenuOnClick);
        };
    }, []);

    return (
        <header className="header">
            <nav className={`navbar ${isActive ? "active" : ""}`}>
                <a href="/" className="nav-logo"><img src={logo} alt="Logo" /></a>
                <ul className="nav-menu">
                    <li className="nav-item">
                        <a href="/" className="nav-link"><i className="fa-solid fa-utensils"></i> Home</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link"><i className="fa-solid fa-utensils"></i> About</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link"><i className="fa-solid fa-utensils"></i> Contact</a>
                    </li>
                </ul>
            </nav>
            <div className={`hamburger ${isActive ? "active" : ""}`} onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </header>
    );
}
