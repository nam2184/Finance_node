import React, { Component } from "react";
import style from "./style.module.css";
import Stockmarket from "../Stockmarket/Stockmarket";


const handleNavigation = (event, path) => {
    event.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
};


export default class Navbar extends Component {
      
   render() {
        return (
        <header className={style.box}>
        <a className={style.logo }href="#">YourDailyFinnance</a>
        <nav className={style.navbar}>
            <a href="/stockmarket" onClick={(e) => handleNavigation(e, '/stockmarket')}>Stockmarket</a>
            <a href="/prediction" onClick={(e) => handleNavigation(e, '/prediction')}>Predictions</a>
            <a href="/" onClick={(e) => handleNavigation(e, '/')}>Home</a>
        </nav>
        </header>
        );
    }
}