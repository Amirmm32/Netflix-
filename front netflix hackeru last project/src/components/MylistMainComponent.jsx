import React, { useState, useEffect, useRef } from 'react';
import Movie from './movie';
const VideoList = (props) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include',
            redirect: 'follow',
        };

        // Fetch the API data here and update the state
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/movies/search?genres=${props.genre}`, requestOptions);
                const data = await response.json();
                if (!response.ok) throw new Error(`${data.message} (${response.status})`);
                setVideos(data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    const capitalizeString = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
     return (
            <section id="mylist" className="container" >
                <h4 className="mylist-heading">{capitalizeString(props.genre)} List</h4>
                <div className="mylist-container d-flex flex-start flex-middle flex-no-wrap owl-carousel">
                    {videos.map((video, index) => (
                            <Movie video={video} index={index} type={props.genre + "from-main"} />
                    ))}
                </div>
            </section>
        );
    
}

export default VideoList;
