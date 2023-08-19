import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const MovieInformation = () => {
  const [videoData, setVideoData] = useState(null);
  const apiUrl = "http://localhost:5000/api/movies/random"; // Replace with your API URL

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      credentials: "include",
      redirect: "follow",
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        // Once the data is fetched, save it to the state
        setVideoData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  if (!videoData) {
    // Render a loading state or return null while data is being fetched
    return <div>Loading...</div>;
  }

  return (
    <div>
      <section
        id="browse-dashboard"
        className="d-flex direction-column flex-start middle-align"
      >
        <div>
          <video
            className="hero-background-image"
            muted
            id="hero-video"
            poster={videoData.posterUrl}
          >
            {videoData.trailer? ( <> <source src={videoData.trailer} type="video/mp4" />
                Your browser does not support the video tag.</> ) : ( <></> )}
          </video>

          {/* left shadow */}
          <div className="shadow-layer"></div>
        </div>

        <div className="container text-container" style={{ zIndex: 5 }}>
          <div className="contentlogo">
            <h2>{videoData.seriesTitle}</h2>
          </div>
          <div className="movierelease">
            <span className="year">{videoData.releasedYear}</span>
            <span className="rating">{videoData.certificate}</span>
            <span className="timeduration">{videoData.runtime}</span>
          </div>
          <div className="ranking d-flex m-t-20 flex-middle">
            <svg id="top-10-badge" viewBox="0 0 28 30">
              <span className="rating">imdbRating: {videoData.imdbRating}</span>
            </svg>
          </div>
          <div className="genere d-flex flex-no-wrap text-shadow">
            {videoData.genre.split(",").map((genre, idx) => (
              <p key={idx}>. {genre.trim()} .</p>
            ))}
          </div>

          <div className="synopsis m-t-20" style={{ maxWidth: "500px" }}>
            <p>{videoData.overview}</p>
          </div>

          <div className="buttons-container m-t-20">
            <Link to={`/play/${videoData._id}`} className="video-link">
              <button className="play-button">
                <span>
                  <svg viewBox="0 0 24 24">
                    <path d="M6 4l15 8-15 8z" fill="currentColor" />
                  </svg>
                </span>{" "}
                Play
              </button>
            </Link>
            <Link to={`/play/${videoData._id}`} className="video-link">
              <button className="more-info-button m-t-20">
                <span>
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zm-2 0a8 8 0 0 0-8-8 8 8 0 0 0-8 8 8 8 0 0 0 8 8 8 8 0 0 0 8-8zm-9 6v-7h2v7h-2zm1-8.75a1.21 1.21 0 0 1-.877-.364A1.188 1.188 0 0 1 10.75 8c0-.348.123-.644.372-.886.247-.242.54-.364.878-.364.337 0 .63.122.877.364.248.242.373.538.373.886s-.124.644-.373.886A1.21 1.21 0 0 1 12 9.25z"
                      fill="currentColor"
                    />
                  </svg>
                </span>{" "}
                More Info
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MovieInformation;
