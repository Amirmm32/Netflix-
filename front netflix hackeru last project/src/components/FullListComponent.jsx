import React, { Component } from 'react';

class ContinueWatching extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [
                {
                    title: 'Horrible Bosses',
                    poster: '../images/movies/horrible-bosses-middle-poster.webp',
                    videoSource: './images/tv-show/videos/Never Have I Ever - Official Trailer - Netflix_2.mp4',
                    rated: '18+',
                    type: 'Movie',
                    genres: ['#Nudeity', '#sex', '#Comedy']
                },
                {
                    title: 'Horrible Bosses',
                    poster: '../images/movies/horrible-bosses-middle-poster.webp',
                    videoSource: './images/movies/videos/We\'re the Millers - Official Trailer [HD].mp4',
                    rated: '18+',
                    type: 'Movie',
                    genres: ['#Nudeity', '#sex', '#Comedy']
                },
                {
                    title: 'Horrible Bosses',
                    poster: '../images/movies/horrible-bosses-middle-poster.webp',
                    videoSource: './images/movies/videos/Murder Mystery - Trailer - Netflix.mp4',
                    rated: '18+',
                    type: 'Movie',
                    genres: ['#Nudeity', '#sex', '#Comedy']
                },
                {
                    title: 'Horrible Bosses',
                    poster: '../images/movies/horrible-bosses-middle-poster.webp',
                    videoSource: '../images/tv-show/videos/Never Have I Ever - Official Trailer - Netflix_2.mp4',
                    rated: '18+',
                    type: 'Movie',
                    genres: ['#Nudeity', '#sex', '#Comedy']
                },
                {
                    title: 'Horrible Bosses',
                    poster: '../images/movies/horrible-bosses-middle-poster.webp',
                    videoSource: '../images/tv-show/videos/Never Have I Ever - Official Trailer - Netflix_2.mp4',
                    rated: '18+',
                    type: 'Movie',
                    genres: ['#Nudeity', '#sex', '#Comedy']
                },
                {
                    title: 'Horrible Bosses',
                    poster: '../images/movies/horrible-bosses-middle-poster.webp',
                    videoSource: '../images/tv-show/videos/Never Have I Ever - Official Trailer - Netflix_2.mp4',
                    rated: '18+',
                    type: 'Movie',
                    genres: ['#Nudeity', '#sex', '#Comedy']
                },
                {
                    title: 'Horrible Bosses',
                    poster: '../images/movies/horrible-bosses-middle-poster.webp',
                    videoSource: '../images/tv-show/videos/Never Have I Ever - Official Trailer - Netflix_2.mp4',
                    rated: '18+',
                    type: 'Movie',
                    genres: ['#Nudeity', '#sex', '#Comedy']
                },
                {
                    title: 'Horrible Bosses',
                    poster: '../images/movies/horrible-bosses-middle-poster.webp',
                    videoSource: '../images/tv-show/videos/Never Have I Ever - Official Trailer - Netflix_2.mp4',
                    rated: '18+',
                    type: 'Movie',
                    genres: ['#Nudeity', '#sex', '#Comedy']
                }
                // Add more video data here if needed
            ]
        };
    }

    handleMouseEnter = (index) => {
        this.state.videos[index].play();
    };

    handleMouseLeave = (index) => {
        // this.state.videos[index].pause();
        this.state.videos[index].load();
    };

    render() {
        const { videos } = this.state;

        return (
            <section id="mylist" className="container ">
                <h4 className="mylist-heading">
                    All watching videos
                </h4>
                <div className="mylist-container d-flex flex-start flex-middle flex-no-wrap owl-carousel">
                    {videos.map((video, index) => (
                        <div className="video video-item " key={`frameofvideo-${index}-${video.title}`} onMouseEnter={() =>this.handleMouseEnter(index)}
                             onMouseLeave={() =>this.handleMouseLeave(index)}
                        >
                            <video
                                width="100%"
                                height="100%"
                                loop
                                className="mylist-img p-r-10 p-t-10 "
                                poster={video.poster}
                                key={`video-${index}-${video.title}`}
                                ref={(videoRef) => (this.state.videos[index] = videoRef)}
                            >
                                <source key={`source-video-${index}-${video.title}`} src={video.videoSource} type="video/mp4"  />
                                Your browser does not support the video tag.
                            </video>

                            <div className="video-description d-flex flex-end direction-column">
                                <div className="play-button">
                                    <svg viewBox="0 0 24 24">
                                        <path d="M6 4l15 8-15 8z" fill="black"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="heading f-w-8 text-shadow">
                                        {video.title}
                                    </h4>
                                </div>
                                <div className="info d-flex flex-middle flex-no-wrap">
                                    <p className="rated text-shadow"><strong>{video.rated}</strong></p>
                                    <p className="season-count text-shadow">{video.type}</p>
                                </div>
                                <div className="genere d-flex flex-no-wrap text-shadow">
                                    {video.genres.map((genre, idx) => (
                                        <p key={idx}>{genre}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }
}

export default ContinueWatching;
