DELIMITER $$

CREATE PROCEDURE RecommendSingleVideo(IN user_id INT)
BEGIN
    -- Declare variables for the cursor
    DECLARE done INT DEFAULT FALSE;
    DECLARE v_videoID VARCHAR(255);
    DECLARE v_videoTitle TEXT;
    DECLARE v_videoCategory TEXT;
    DECLARE v_videoLikes INT;

    -- Declare the cursor for trending videos
    DECLARE trending_cursor CURSOR FOR 
        SELECT videoID, videoTitle, videoCategory, videoLikes
        FROM Video
        WHERE videoID NOT IN (
            SELECT c.videoID
            FROM Contain c
            JOIN UserPlaylist up ON c.playListID = up.playlistID
            WHERE up.userID = user_id
        )
        ORDER BY videoLikes DESC, videoView DESC
        LIMIT 1;

    -- Declare continue handler for when no more rows are found
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    -- Open the cursor
    OPEN trending_cursor;

    -- Fetch the top trending video that is not in the user's playlists
    FETCH trending_cursor INTO v_videoID, v_videoTitle, v_videoCategory, v_videoLikes;

    -- Check if a video was found
    IF NOT done THEN
        -- Recommend the video
        SELECT v_videoID AS RecommendedVideoID, 
               v_videoTitle AS Title, 
               v_videoCategory AS Category, 
               v_videoLikes AS Likes;
    ELSE
        -- If no video is found, return nothing
        SELECT NULL AS RecommendedVideoID, 
               NULL AS Title, 
               NULL AS Category, 
               NULL AS Likes;
    END IF;

    -- Close the cursor
    CLOSE trending_cursor;
END$$

DELIMITER ;
