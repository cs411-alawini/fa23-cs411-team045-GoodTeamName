const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const video = require("./routes/video");

app.use("/video", video);

const playlist = require("./routes/playlist");

app.use("/playlist", playlist);

const user = require("./routes/user");

app.use("/user", user);

const channelBar = require("./routes/bar");

app.use("/bar", channelBar);

const categoryPie = require("./routes/pie");

app.use("/pie", categoryPie);

app.listen(8080, () => {
  console.log(`Server is running on port 8080.`);
});
