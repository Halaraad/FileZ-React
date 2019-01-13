import React, { Component } from 'react';

class Home extends Component {

    constructor(){
        super()
        this.state = { }
    }

    render() {
        return (
            <div class="main">
                <div class="headerHome">
                    <h1 class="header-h1">FileZ</h1>
                </div>
                <div class="description">
                    <h1 class="description-h1">FileZ</h1>
                    <a class="description-a" href="#">Contact Us</a>
                    <p class="description-p">Keep your files online.</p>
                </div>
                <div class="lorem">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime vitae minus possimus, veniam mollitia dolore neque fugiat omnis quos delectus eveniet officiis magnam! Odio provident tempore ipsa maiores quasi repudiandae Odio provident tempore ipsa maiores quasi repudiandae.
                </div>
                <div class="packages">
                    <h1 class="packages-h1">Filez Packages</h1>
                    <div class="packages-container">
                        <div class="package border-r">
                            <div class="package-header">
                                <h2 class="package-header-h2">Free Package</h2>
                                <h2 class="package-header-h2">$0.00</h2>
                            </div>
                            <p class="package-p">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime vitae minus possimus, veniam mollitia dolore neque fugi.</p>
                            <div class="choose-center">
                                <span class="package-choose">Current Package</span>
                            </div>
                        </div>
                        <div class="package border-l">
                            <div class="package-header">
                                <h2 class="package-header-h2">Standard Package</h2>
                                <h2 class="package-header-h2">$0.00</h2>
                            </div>
                            <p class="package-p">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime vitae minus possimus, veniam mollitia dolore neque fugiat omnis quos delectus eveniet.</p>
                            <div class="choose-center">
                                <span class="package-choose">Up Coming</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="buttons-img-container">
                    <img class="buttons-img" src={require("../assets/home.png")} width="300" />
                    <div class="buttons">
                        <a class="buttons-btn" href="#">Sign Up</a>
                        <span class="buttons-span">or</span>
                        <a class="buttons-btn" href="#">Sign In</a>
                    </div>
                </div>
                <div class="footer">
                    <a href="#"><img class="footer-img" src={require("../assets/facebook.png")} /></a>
                    <a href="#"><img class="footer-img2" src={require("../assets/email.png")} /></a>
                </div>
            </div>
        )
    }
}

export default Home;