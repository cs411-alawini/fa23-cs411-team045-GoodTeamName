# Database Implementation

### Connecting to GCP
```gcloud sql connect wetube --user=root;```

```show databases;```

```use wetube_database;```

```show tables;```

![image10](https://github.com/cs411-alawini/fa23-cs411-team045-GoodTeamName/assets/92764125/5df0f2dc-29ba-4a1a-9ae6-72c41879cc71)

![image4](https://github.com/cs411-alawini/fa23-cs411-team045-GoodTeamName/assets/92764125/28d907b4-040b-4a7b-821a-60522ff8c5d5)

### DDL Commands
```SQL
-- User
CREATE TABLE Users (
userID INT,
userName VARCHAR(20),
userPassword VARCHAR(20).
userRegion VARCHAR(20)
PRIMARY KEY(userID)
);


-- UserPlaylist
CREATE TABLE UserPlaylist (
playlistID INT,
playlistName VARCHAR(30),
userID INT,
PRIMARY KEY(playlistID, userID),
FOREIGN KEY(userID) REFERENCES Users(userID)
ON DELETE CASCADE
ON UPDATE CASCADE
);


-- Trending Video: --
CREATE TABLE Video (
videoID VARCHAR(255),
videoTitle TEXT,
videoCategory TEXT,
videoView INT,
videoLikes INT,
channel text,
PRIMARY KEY(videoId)
);


-- RecommendedVideo
CREATE TABLE RecommendedVideo (
userID INT,
videoID VARCHAR(255),
PRIMARY KEY (userID, videoID),
FOREIGN KEY(videoID) REFERENCES Video(videoID)
ON DELETE CASCADE
ON UPDATE CASCADE,
FOREIGN KEY(userID) REFERENCES Users(userID)
ON DELETE CASCADE
ON UPDATE CASCADE
);


-- Region --
CREATE TABLE Region (
regionID INT,
regionName VARCHAR(20),
PRIMARY KEY(regionID)
);


-- RegionTrendingAnalysis --
CREATE TABLE RegionTrendingAnalysis (
analysisID VARCHAR(20),
regionID INT,
totalvideoCount INT,
category1 TEXT,
category2 TEXT,
category3 TEXT,
category4 TEXT,
category5 TEXT,
category6 TEXT,
category7 TEXT,
category8 TEXT,
category9 TEXT,
category10 TEXT,
category11 TEXT,
category12 TEXT,
category13 TEXT,
category14 TEXT,
category15 TEXT,
category16 TEXT,
category17 TEXT,
category18 TEXT,
category19 TEXT,
category20 TEXT,
category21 TEXT,
category22 TEXT,
category23 TEXT,
category24 TEXT,
category25 TEXT,
category26 TEXT,
category27 TEXT,
category28 TEXT,
category29 TEXT,
PRIMARY KEY(analysisID, regionID),
FOREIGN KEY(regionID) REFERENCES Region(regionID)
ON DELETE CASCADE
ON UPDATE CASCADE
);


-- Many to many relations --
-- Friend --
CREATE TABLE Friend(
userIDa INT,
userIDb INT,
PRIMARY KEY(userIDa, userIDb),
FOREIGN KEY(userIDa) REFERENCES Users(userID)
ON DELETE CASCADE
ON UPDATE CASCADE,
FOREIGN KEY(userIDb) REFERENCES Users(userID)
ON DELETE CASCADE
ON UPDATE CASCADE
);


-- Contains --
CREATE TABLE Contain(
videoID VARCHAR(50),
playListID INT,
PRIMARY KEY(videoID, playListID),
FOREIGN KEY(videoID) REFERENCES Video(videoID)
ON DELETE CASCADE
ON UPDATE CASCADE,
FOREIGN KEY(playListID) REFERENCES UserPlaylist(playListID)
ON DELETE CASCADE
ON UPDATE CASCADE
);
```

### Inserting Data
![image2](https://github.com/cs411-alawini/fa23-cs411-team045-GoodTeamName/assets/92764125/73db81be-244d-4fe1-b12b-53b3159b58d9)

# Advanced Queries
### Advanced Query 1
- Advanced features: join multiple relations & set operations
- Recommend users the videos that thiers friends have in the playlist && trending video in the category they choose
```SQL
(SELECT DISTINCT c.videoID
FROM Contain c
JOIN UserPlaylist up ON c.playListID = up.playlistID
JOIN Friend f ON f.userIDb = up.userID
WHERE f.userIDa = 1
LIMIT 20)

UNION

(SELECT DISTINCT videoID
FROM Video
WHERE videoLikes > 100000 AND videoCategory = '20'
LIMIT 20);
```
Screenshots of the top 15 results:

![image3](https://github.com/cs411-alawini/fa23-cs411-team045-GoodTeamName/assets/92764125/7a445786-c6d7-4e0d-ac7f-adf8a7a4ffb5)

### Advanced Query 2
- Advanced features: subquery & `GROUP BY`
- Percentage of the max category overall

```SQL
SELECT (groupCount / totalCount) * 100 AS countPer, (groupLike / totalLike) * 100 AS likePer, videoCategory
FROM (
SELECT COUNT(*) AS totalCount, SUM(videoLikes) AS totalLike
FROM Video
) t1
CROSS JOIN (
SELECT COUNT(*) AS groupCount, SUM(videoLikes) AS groupLike, videoCategory
FROM Video
GROUP BY videoCategory
ORDER BY groupCount DESC
LIMIT 15
) t2;
```
Screenshot of the top 15 results:
![image](https://github.com/cs411-alawini/fa23-cs411-team045-GoodTeamName/assets/92764125/ab15e172-4363-4f8f-af08-675fdddc4c7a)


# Indexing Analysis

### Query 1

Command:
![image1](https://github.com/cs411-alawini/fa23-cs411-team045-GoodTeamName/assets/92764125/2dab4bae-baff-4d94-8d47-b5521e38df28)

Analysis before indexing:
![image7](https://github.com/cs411-alawini/fa23-cs411-team045-GoodTeamName/assets/92764125/85ee24f9-a9ef-44b4-8a85-d036ffbe1de5)
This query has a high cost due to our use of a set operation, in this case `UNION`, which contributed the vast majority of the 10036 cost. Making this union more efficient was our main goal with the indexing.

Attempt 1: Index on `videoLikes`
![image9](https://github.com/cs411-alawini/fa23-cs411-team045-GoodTeamName/assets/92764125/191c71b0-5103-4185-ae0e-78da3abc856a)
By adding an index on the `videoLikes` attribute, we reduced the cost to 8760. This was a notable but not extreme performance improvement due to a reduced cost of the union.

Attempt 2: Index on `videoCategory`
![image12](https://github.com/cs411-alawini/fa23-cs411-team045-GoodTeamName/assets/92764125/d704e6ba-b733-44ef-8572-6bc807213620)
The index on `videoCategory` massively improved the performance, reducing the cost down to 2730. We think this is because indexing on category will drastically improve the filtering on category. Intuitively, we think this has a better performance than the like because it’s more effective to recommend videos based on the category than on the popularity (likes). 

Attempt 3: Index on `videoLikes` and `videoCategory`
![image2](https://github.com/cs411-alawini/fa23-cs411-team045-GoodTeamName/assets/92764125/ff916e58-08c9-4f9e-9c18-0f3b339585e0)
This combination of the two indices got us the massive benefits of the category index plus the less impressive benefits of the like index, reducing the cost to 2460.

### Query 2

Command:
![image](https://github.com/cs411-alawini/fa23-cs411-team045-GoodTeamName/assets/92764125/52a485f6-cd0b-4676-bbaa-942b35126f48)

Analysis before indexing:
![image](https://github.com/cs411-alawini/fa23-cs411-team045-GoodTeamName/assets/92764125/1ef364e7-f482-451e-9d20-8648b99508fb)
This query has a high cost on table scan on Video table  and a relatively lower cost on scanning t2(the subquery). This is because video table has much more rows inside it (>10k), while t2 only has 15 rows. 

Attempt 1: Index on `videoCategory`
![image](https://github.com/cs411-alawini/fa23-cs411-team045-GoodTeamName/assets/92764125/c3dedd23-3558-41c8-b017-d7f26263d31f)
Since we grouped by the category, we added the category to be the index, but it didn’t change the cost. We think this is because indexing helps to filter the category quicker, but we have already group the data into categories. Since we can't do anything to lower the number of tuples we are examining in t1 (we have to count every single tuple), nothing much can be improved there with indexing. This became a repeated pattern for the indexes we tried.

Attempt 2: Index on `videoLikes`
![image](https://github.com/cs411-alawini/fa23-cs411-team045-GoodTeamName/assets/92764125/abdfdefa-dd32-4a76-ac9e-443dd3d3ae41)
Then we chose like to be the index since that’s the another attribute in the query. However, this also didn’t do much, leaving the cost relatively the same. We think this is because inside the query, we only sum up the `videoLikes`, and didn’t perform filters based on the likes. Thus indexing on videoLikes will not help reduce the cost. 

Attempt 3: Index on `channel`
![image](https://github.com/cs411-alawini/fa23-cs411-team045-GoodTeamName/assets/92764125/9510844b-10ee-4b95-8fc9-5fc9dd61e5f9)
Then we chose channel to be the index since we think videos made from the same channel may belong to the same category, reducing the cost to filter by categories. However, this also didn’t do much.
