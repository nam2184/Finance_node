import React, { Component } from "react";
import style from "./style.module.css"

export default class Home extends Component {
    render() {
        return (<section className={style.home}>
          <div className={style.home_content}>
            <h1 >DailyFinance</h1>
            <h3>Home to recieve updates and manage your daily finances</h3>
           </div>
          
        </section>)
        }
    }
