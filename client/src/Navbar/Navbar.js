import React, { Component } from "react";
import style from "./style.module.css";
import Stockmarket from "../Stockmarket/Stockmarket";
import Searchbar from "../Stockmarket/Searchbar";

const handleNavigation = (event, path) => {
    event.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
};


export default class Navbar extends Component {
      
   render() {
        return (
        <header className={style.box}>
        <Searchbar/>
        <nav className={style.navbar}>
            <a href="/stockmarket" onClick={(e) => handleNavigation(e, '/stock/AAPL?timeframe=1y')}>Stockmarket</a>
            <a href="/prediction" onClick={(e) => handleNavigation(e, '/prediction')}>Predictions</a>
            <a href="/" onClick={(e) => handleNavigation(e, '/')}>Home</a>
        </nav>
        </header>
        );
    }
}
