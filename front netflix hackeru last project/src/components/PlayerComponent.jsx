import React, {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import 'vidstack/styles/defaults.css';
import 'vidstack/styles/community-skin/video.css';
import YouTubePlayer from './youtube';
import { MediaCommunitySkin, MediaOutlet, MediaPlayer, MediaPoster } from '@vidstack/react';
const MovieInformation = () => {
    const [videoData, setvideoData] = useState('');
    const { videoId } = useParams();
    useEffect(() => {
    const fetchData = async () => {
            try {
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                const requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    credentials: 'include',
                    redirect: 'follow',
                };
                const response = await fetch(`http://localhost:5000/api/movies/${videoId}`, requestOptions);
                const data = await response.json();
                if (!response.ok) throw new Error(`${data.message} (${response.status})`);
                setvideoData(data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [videoId]);


    return (
        <>
            <div className="videocontainer">
                {!videoData.videos ? (
                    <div className="movielogo">
                        <img src={videoData.posterUrl} alt={videoData.seriesTitle} />
                    </div>
                ) : videoData.videos[0]["site"] === "YouTube"? (
                    <YouTubePlayer videoId={videoData.videos[0].key} full={true} />
                ) : (
                    <MediaPlayer
                        src={videoData.videoSource}
                        title={videoData.seriesTitle}
                        poster={videoData.posterUrl}
                        aspectRatio={16 / 9}
                        crossorigin=""
                    >
                        <MediaOutlet>
                            <MediaPoster alt={videoData.seriesTitle} />
                        </MediaOutlet>
                        <MediaCommunitySkin />
                    </MediaPlayer>
                )}
            </div>

            <section className="movieinformation container">
                <div className="movielogo">
                    <h2>{videoData.seriesTitle}</h2>
                </div>
                <div className="movierelease">
                    <span className="year">{videoData.releasedYear}</span>
                    <span className="rating">{videoData.certificate}</span>
                    <span className="timeduration">{videoData.runtime}</span>
                </div>
                <div className="description">{videoData.overview}</div>
                <div className="castinformation">
                    <p>
                        <span className="name">Director:</span> {videoData.director}
                    </p>
                    <p>
                        <span className="name">Star One:</span> {videoData.starFirst}
                    </p>
                    <p>
                        <span className="name">Star Two:</span>  {videoData.starSecond}
                    </p>
                    <p>
                        <span className="name">Star Three:</span> {videoData.starThird}
                    </p>
                    <p>
                        <span className="name">Star Four:</span> {videoData.starFourth}
                    </p>
                    
                </div>
                <div className="actions d-flex flex-start flex-middle">
                    <a href="#" className="link-item">
                        <i className="fa fa-plus"></i>
                        <br />
                        My List
                    </a>
                    <a href="#" className="link-item">
                        <i className="fa fa-thumbs-up"></i>
                        <br />
                        Like
                    </a>
                    <a href="#" className="link-item">
                        <i className="fa fa-share"></i>
                        <br />
                        Share
                    </a>
                    <a href="#" className="link-item">
                        <i className="fa fa-download"></i>
                        <br />
                        Download
                    </a>
                </div>
            </section>
        </>
    );
};

export default MovieInformation;
