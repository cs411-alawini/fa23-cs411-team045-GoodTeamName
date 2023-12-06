DELIMITER $$

CREATE TRIGGER LimitPlaylistSize
BEFORE INSERT
ON Contain
FOR EACH ROW
BEGIN
   -- get count of existing rows with same um_id
   DECLARE existing_vids BIGINT;
   SELECT COUNT(*) AS count INTO existing_vids
     FROM Contain c
    WHERE c.playListID = NEW.playListID;
   -- if already five rows, throw error
   IF existing_vids >= 100 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Playlists can not have more than 100 videos';
   END IF;
END$$

DELIMITER ;