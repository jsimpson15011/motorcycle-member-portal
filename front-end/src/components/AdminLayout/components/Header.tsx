import React from "react"
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
            <nav className="header-nav">
                <ul className="header-nav__list">
                    <li className="header-nav__item">
                        <Link to="/">To Home Page</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header