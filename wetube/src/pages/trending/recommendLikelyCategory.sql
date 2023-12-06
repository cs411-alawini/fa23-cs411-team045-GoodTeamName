-- Not implemented on the sql server

DELIMITER $$

CREATE PROCEDURE RecommendCategory(IN user_id INT)
BEGIN
    -- Declare variables
    DECLARE done INT DEFAULT FALSE;
    DECLARE v_videoID VARCHAR(255);
    DECLARE v_category TEXT;
    DECLARE cur_playlist CURSOR FOR 
        SELECT DISTINCT videoCategory 
        FROM Video AS v
        JOIN Contain AS c ON v.videoID = c.videoID
        JOIN UserPlaylist AS up ON c.playListID = up.playlistID
        WHERE up.userID = user_id;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    -- Temporary table to store recommended videos
    CREATE TEMPORARY TABLE IF NOT EXISTS TempRecommendedVideos (
        videoID VARCHAR(255),
        videoTitle TEXT,
        videoCategory TEXT,
        videoView INT,
        videoLikes INT,
        channel TEXT
    );

    -- Open cursor
    OPEN cur_playlist;

    read_loop: LOOP
        FETCH cur_playlist INTO v_category;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Insert into temporary table based on trending criteria
        INSERT INTO TempRecommendedVideos
        SELECT *
        FROM Video AS v
        WHERE v.videoCategory = v_category
        AND v.videoID NOT IN (
            SELECT c.videoID FROM Contain AS c
            JOIN UserPlaylist AS up ON c.playListID = up.playlistID
            WHERE up.userID = user_id
        )
        ORDER BY v.videoLikes DESC, v.videoView DESC
        LIMIT 10000;

    END LOOP;

    -- Close cursor
    CLOSE cur_playlist;

    -- Select recommended videos with aggregation
    SELECT videoCategory, COUNT(*) AS TotalVideos, SUM(videoLikes) AS TotalLikes
    FROM TempRecommendedVideos
    GROUP BY videoCategory
    WITH ROLLUP;

    -- Clean up: drop the temporary table
    DROP TEMPORARY TABLE IF EXISTS TempRecommendedVideos;

END $$

DELIMITER ;
