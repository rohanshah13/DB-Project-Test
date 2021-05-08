import React, { Component } from "react";

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

import MovieCard from "./movie-card.component";
import MyNavbar from "./navbar.component";

import CardColumns from 'react-bootstrap/CardColumns'

function MovieList(props) {
    const movies = props.movies;
    const listItems = movies.map((movie) =>
        <li key={movie.movieID}>
            <MovieCard title={movie.name} rating={movie.rating} id={movie.id}/>
        </li>
    )

    return (
        <div>
            <h4>Watchlist</h4>
            <CardColumns>
                {listItems}
            </CardColumns>
        </div>
    )
}

export default class Watchlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            currentUser: AuthService.getCurrentUser()
        }

        if(!this.state.currentUser){
            this.props.history.push('/login');
        }
    }

    componentDidMount() {
        UserService.getWatchlist().then(
            response => {
                console.log(response);
                let movies = response.data;
                this.setState({ movies: movies });
            },
            error => {
                console.log(error);
            }
        )
    }

    render() {
        return (
            <div>
                < MyNavbar />
                < MovieList movies={this.state.movies}/>
            </div>
        )
    }
}