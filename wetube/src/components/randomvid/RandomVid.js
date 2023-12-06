import {useState, useEffect} from 'react';
import YouTubeEmbed from '../thumbnail/Thumbnail';
import './randomvid.css';

function RandomVid(props) {
    const [randomID, setRandomID] = useState("");
    const [loading, setLoading] = useState(true);
    const [failed, setFailed] = useState(false);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        fetch('http://35.239.242.245:8080/video/find/r')
         .then(res => res.json())
         .then((data) => {
            setRandomID(data[0].videoID);
            setLoading(false);
         })
    }, [])

    async function addToPlaylist() {
        try {
            await fetch(`http://35.239.242.245:8080/playlist/${props.playlistID}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({videoID: randomID})
            })
            setAdded(true);
            props.rerenderCallback();
        } catch (err) {
            console.error(err);
            setFailed(true);
        }
    }

    if (loading) {
        return (
            <div className='video-card random-vid'>
                <p>
                    Loading random video...
                </p>
            </div>
        )
    }

    if (added) {
        return <div/>
    }

    if (failed) {
        return (
            <div className='video-card random-vid'>
                <p>
                    Failed to load random video
                </p>
            </div>
        )
    }

    return (
        <div value={randomID} className='random-vid'>
            {randomID.length > 0 ?
                <div>
                    {props.playlistID ? 
                        <button className='btn' onClick={() => addToPlaylist()}>+ Add to Playlist</button> 
                    : null}
                    <div className='video-card'>
                        <YouTubeEmbed videoId={randomID}/>
                    </div>
                </div>
             :
                <div/>
            }
        </div>
    )
}

export default RandomVid;