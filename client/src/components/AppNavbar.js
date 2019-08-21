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
                <div className="container">
                    <a href="/" className="navbar-brand">Shop Title</a>
                    <div className="flex-row">
                        <ul className="navbar-nav flex-row">
                            <li className="nav-item">
                                <Link to="/basket" className="navbar-link px-2">
                                    <img src="./images/basket.svg" alt="" />
                                    <span className="sr-only">Basket</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/search" className="navbar-link px-2">
                                    <img src="./images/search.svg" alt="" />
                                    <span className="sr-only">Search</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="navbar-link px-2">
                                    <img src="./images/user.svg" alt="" />
                                    <span className="sr-only">Account</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default AppNavbar;