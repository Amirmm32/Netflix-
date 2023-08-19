import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import YouTubePlayer from './youtube';

const VideoComponent = (props) => {
    const {video, index, type} = props;
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    let trailerSrc = "";
    if (video.videos) {
        if (video.videos.length > 1){
           const trailer = video.videos.filter((video)=> video.type === "Trailer");
           if (!trailer){
                trailerSrc = video.videos[0].key;
           }else {
               trailerSrc = trailer[0].key;
           }
        }
    }
    return (
        <div
            key={`div-video-${type}-${index}`}
            className="video video-item"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ position: 'relative', width: '400px', height: '300px' }}
        >
            {video.videos && video.videos.length > 0 && isHovered && video.videos[0].key ? (
                    <div width="100%"
                         height="100%"
                         className="mylist-img p-r-10 p-t-10 ">
                        <YouTubePlayer videoId={video.videos[0].key} full={false} />
                    </div>

            ) : (
                <video
                    width="100%"
                    height="100%"
                    loop
                    className="mylist-img p-r-10 p-t-10 "
                    poster={video.posterUrl}
                >
                    {/*{trailerSrc !== "" ?  (<source src={"https://www.youtube.com/watch?v="+trailerSrc} type="video/mp4" />) : (<></>)}*/}
                    {/*Your browser does not support the video tag.*/}
                </video>

            )}

            <Link to={`/play/${video._id}`} className="video-link">
            <div className="video-description d-flex flex-end direction-column">
                <div className="play-button">
                    <svg viewBox="0 0 24 24">
                        <path d="M6 4l15 8-15 8z" fill="black"></path>
                    </svg>
                </div>
                <div>
                    <h4 className="heading f-w-8 text-shadow">{video.seriesTitle}</h4>
                </div>
                <div className="info d-flex flex-middle flex-no-wrap">
                    <p className="rated text-shadow">
                        <strong>{video.certificate}</strong>
                    </p>
                    <p className="season-count text-shadow">{video.runtime}</p>
                </div>
                <div className="genere d-flex flex-no-wrap text-shadow">
                    {video.genre.split(',').map((genre, idx) => (
                        <p key={idx}>{genre.trim()}</p>
                    ))}
                </div>
            </div>
            </Link>
        </div>
    )
}

export default VideoComponent;