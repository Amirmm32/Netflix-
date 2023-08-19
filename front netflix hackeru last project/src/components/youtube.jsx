import React from 'react';
import YouTube from 'react-youtube';

const YouTubePlayer = ({ videoId, full }) => {
    if (full) {
        const opts = {
            height: '600px',
            width: '800px',
            playerVars: {
                autoplay: 1,
            },
        };
        return <YouTube videoId={videoId} opts={opts} />;
    }else {
        const opts = {
            // height: '200%',
            width: '100%',
            playerVars: {
                autoplay: 1,
                controls: 0,
            },
        };
        return <YouTube videoId={videoId} opts={opts} />;
    }
};

export default YouTubePlayer;
