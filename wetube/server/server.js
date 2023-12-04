const express = require("express");
const cors = require("cors");
const session = require("express-session");

const app = express();

app.use(cors());
app.use(express.json());

// Add express-session middleware configuration
app.use(
  session({
    secret: "your-secret-key", // Replace with your own secret key
    resave: false,
    saveUninitialized: true,
  })
);

const video = require("./routes/video");

app.use("/video", video);

const playlist = require("./routes/playlist");

app.use("/playlist", playlist);

const user = require("./routes/user");

app.use("/user", user);

const friendslist = require("./routes/friendslist");

app.use("/friendslist", friendslist);

app.listen(8080, () => {
  console.log(`Server is running on port 8080.`);
});
