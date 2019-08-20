import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class AppNavbar extends Component {
    state = {
        isOpen: false
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {   
        return(
            <nav className="navbar navbar-dark bg-dark">
                <div class="container">
                    <a href="/" className="navbar-brand">Shop Title</a>
                    <div className="flex-row">
                        <ul className="navbar-nav flex-row">
                            <li className="nav-item">
                                <a class="navbar-link px-2" href="#">
                                    <img src="./images/basket.svg" />
                                    <span class="sr-only">Basket</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a class="navbar-link px-2" href="#">
                                    <img src="./images/search.svg" />
                                    <span class="sr-only">Search</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a class="navbar-link px-2" href="#">
                                    <img src="./images/user.svg" />
                                    <span class="sr-only">Account</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default AppNavbar;