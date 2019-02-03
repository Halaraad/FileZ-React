import React, { Component } from "react";

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <div class="home-main">
          <div class="home-header">
            <h1>FileZ</h1>
            <div className="register-login">
              <img src="/assets/images/key.png" width="15" height="15" />
              <a href="/signup">Register</a>
              <a href="/signin">Login</a>
            </div>
          </div>
          <div class="description">
            <h1>FileZ</h1>
            <a href="#">
              <img class="description-img" src="/assets/images/email.png" />
              Contact Us
            </a>
            <p>Keep your files online.</p>
          </div>
          <div class="lorem">
            <p>FileZ is a cloud storage service operated for your company.</p>
            <p>With FileZ free plan, you get 100 MB of free storage.</p>
          </div>
          <div class="packages">
            <h1>Filez Packages</h1>
            <div class="packages-container">
              <div class="package border-b">
                <div class="package-header">
                  <h2>Free Package</h2>
                  <h2><img src="/assets/images/free.png" /> $0.00</h2>
                </div>
                <p class="package-p">
                Store up to <span className="bold">100</span> MegaBytes of free storage.
                </p>
                <div>
                  <span class="package-choose b">Sign Up</span>
                </div>
              </div>
              <div class="package border-b">
                <div class="package-header">
                  <h2>Economic Package</h2>
                  <h2><img src="/assets/images/paid.png" /> $3.50</h2>
                </div>
                <p class="package-p">
                  Store up to <span className="bold">1</span> GigaBytes of storage.
                </p>
                <div>
                  <span class="package-choose b">Sign Up & Upgrade</span>
                </div>
              </div>
              <div class="package border-b">
                <div class="package-header">
                  <h2>Standard Package</h2>
                  <h2><img src="/assets/images/paid.png" /> $7.00</h2>
                </div>
                <p class="package-p">
                Store up to <span className="bold">10</span> GigaBytes of storage.
                </p>
                <div>
                  <span class="package-choose b">Sign Up & Upgrade</span>
                </div>
              </div>
              <div class="package border-b">
                <div class="package-header">
                  <h2>Business Package</h2>
                  <h2><img src="/assets/images/paid.png" /> $12.00</h2>
                </div>
                <p class="package-p">
                Store up to <span className="bold">100</span> GigaBytes of storage.
                </p>
                <div>
                  <span class="package-choose b">Sign Up & Upgrade</span>
                </div>
              </div>
            </div>
          </div>
          <div class="buttons-img-container">
            <img class="buttons-img" src="/assets/images/home.png" width="300" />
            <div class="buttons">
              <a class="buttons-btn" href="/signup">
                Sign Up
              </a>
              <span class="buttons-span">or</span>
              <a class="buttons-btn" href="/signin">
                Sign In
              </a>
            </div>
          </div>
          <div class="footer">
            <a href="#">
              <img class="footer-img" src="/assets/images/facebook.png" />
            </a>
            <a href="#">
              <img class="footer-img2" src="/assets/images/email.png" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;