import React from "react"
import {Link, useRouteMatch} from "react-router-dom";

const Header = () => {
    let {url} = useRouteMatch()

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
            <nav className="header-nav header-nav--admin">
                <ul className="header-nav__list">
                    <li className="header-nav__item">
                        <Link to={`${url}/users`}>Users</Link>
                    </li>
                    <li className="header-nav__item">
                        <Link to={`${url}/entry-forms`}>Entry Forms</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header