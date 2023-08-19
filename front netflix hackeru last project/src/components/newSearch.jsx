import React, { useState, useEffect } from 'react';
import Swiper from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import SwiperCore, { Pagination } from 'swiper/core';

SwiperCore.use([Pagination]);

const MovieSearch = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [releasedYear, setReleasedYear] = useState('');
    const [genres, setGenres] = useState('');

    const apiUrl = 'http://localhost:5000/api/movies/'; // Replace with your API URL
    useEffect(() => {
        // Sample data from the output you provided
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include',
            redirect: 'follow',
        };
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                // Once the data is fetched, save it to the state
                setMovies(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
        setTotalPages(data.totalPages); // Set the total number of pages here from the response

        // Initialize Swiper
        const swiper = new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 10,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });

        return () => {
            swiper.destroy(); // Clean up Swiper when the component unmounts
        };
    }, []);
    const ITEMS_PER_PAGE = movies.limit;
    const sliceData = (data, currentPage) => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return data.slice(startIndex, endIndex);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const paginatedData = sliceData(data.data, currentPage);
    // Function to fetch movies from the API
    const fetchMovies = async () => {
        try {
            const response = await fetch(`${apiUrl}?seriesTitle=${searchQuery}&releasedYear=${releasedYear}&genres=${genres}`);
            const data = await response.json();
            setMovies(data.data);

        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    // Function to handle form submission and trigger API call
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchMovies();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter series title"
                />
                <input
                    type="text"
                    value={releasedYear}
                    onChange={(e) => setReleasedYear(e.target.value)}
                    placeholder="Enter released year"
                />
                <input
                    type="text"
                    value={genres}
                    onChange={(e) => setGenres(e.target.value)}
                    placeholder="Enter genres (comma-separated)"
                />
                <button type="submit">Search</button>
            </form>

            <div>
                {movies.map((movie) => (
                    <div key={movie._id}>
                        <h3>{movie.seriesTitle}</h3>
                        <p>Released Year: {movie.releasedYear}</p>
                        <p>Genres: {movie.genres.join(', ')}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieSearch;
