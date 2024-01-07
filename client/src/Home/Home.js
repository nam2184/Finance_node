import React, { Component } from "react";
import style from "./style.module.css"

export default class Home extends Component {
    render() {
        return (<section className={style.home}>
          <div className={style.home_content}>
            <h1 > My name is Nam Khanh Cao</h1>
            <h3>Fullstack developer/Network Engineer</h3>
            <p> Hi, I am a computer science student aspiring to be a full stack developer and 
              is currently studying cybersecurity and networking in the University of Technology 
              Sydney
            </p>
          </div>
          
        </section>)
        }
    }