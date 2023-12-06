import "./playlistmodal.css";
import React, { useEffect, useState } from "react";

function PlaylistModal(props) {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [added, setAdded] = useState([]);

    useEffect(() => {
    try {
        async function fetchPlaylists() {
        let res = await fetch(`http://35.239.242.245:8080/playlist?userID=${props.user.id}`);
        return await res.json();
        }
        
        async function fetchAdded(tempPlaylists) {
        let res = await fetch(`http://35.239.242.245:8080/video/${props.videoID}/p`);
        let existingData = await res.json();
        existingData = existingData.map((playlistObj) => playlistObj.playListID)
        let buttons = [];
        // Update buttons to reflect which playlists the video is already in
        if (existingData.length > 0) {
            buttons = tempPlaylists.map(() => false);
            for (let i = 0; i < tempPlaylists.length; i++) {
            if (existingData.includes(tempPlaylists[i].playlistID)) {
                buttons[i] = true;
            }
            }
        }
        return buttons;
        }

        const fetchBoth = async () => {
        const tempPlaylists = await fetchPlaylists();
        const tempAdded = await fetchAdded(tempPlaylists);
        setPlaylists(tempPlaylists)
        setAdded(tempAdded);
        setLoading(false);
        };

        fetchBoth();
    } catch (err) {
        console.error(err);
    }
    
    }, [props.user.id]);

    if (loading) {
    return (
        <div className="modal">
            <div className="modal-window">
            <button className='close-button' onClick={() => props.toClose()}><p>&#10005;</p></button>
                <h3>Select a Playlist</h3>
                <p>Loading...</p>
            </div>
        </div>
    );
    }

    if (playlists.length === 0) {
    return (
        <div className="modal">
            <div className="modal-window">
                <button className='close-button' onClick={() => props.toClose()}><p>&#10005;</p></button>
                <h3>Select a Playlist</h3>
                <p>No playlists found</p>
            </div>
        </div>
    );
    }

    async function addToPlaylist(e, idx) {
        
        try {
            const response = await fetch(`http://35.239.242.245:8080/playlist/${e.target.value}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({videoID: props.videoID})
            })
            const message = await response.json();
            console.log(message);
            if (message.sqlState === "45000") {
                alert("Playlists can not have more than 100 videos");
            } else {
                let newAdded = [...added];
                newAdded[idx] = true;
                setAdded(newAdded);
            }
    } catch (err) {
        console.error(err);
    }
    }

    return (
    <div className="modal">
        <div className="modal-window">
        <button className='close-button' onClick={() => props.toClose()}><p>&#10005;</p></button>
        <div className="modal-content">
            <h3>Select a Playlist</h3>
            <ul className="playlists-to-pick">
            {playlists.map((playlist, idx) => {
                return( 
                <li key={playlist.playlistID}>
                    <span>{playlist.playlistName}</span>
                    { added[idx] ?
                    <span className="btn added">Added</span>
                    :
                    <button className="btn" onClick={(e) => addToPlaylist(e, idx)} value={playlist.playlistID}>+ Add</button>
                    }
                </li>
                )
            })}
            </ul>
        </div>
        </div>
    </div>
    );
}


export default PlaylistModal;