DELIMITER //

CREATE TRIGGER after_create_playlist
AFTER INSERT ON UserPlaylist
FOR EACH ROW
BEGIN
    -- Check if the newly created playlist is "Friends' Playlists"
    IF NEW.playlistName = 'friends'' playlists' THEN
        -- Select friends with their first playlist and its first video
        INSERT INTO Contain (videoID, playListID)
        
        SELECT DISTINCT MIN(videos.videoID) AS selectedVideoID, NEW.playlistID
        FROM Friend
        JOIN UserPlaylist friendPlaylists ON Friend.userIDb = friendPlaylists.userID
        LEFT JOIN Contain ON friendPlaylists.playlistID = Contain.playListID
        WHERE Friend.userIDa = NEW.userID
        AND friendPlaylists.playlistID IS NOT NULL
        AND Contain.videoID IS NOT NULL
        GROUP BY Friend.userIDb, friendPlaylists.playlistID;

    END IF;
END;
//

DELIMITER ;
