import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";

import Leftnav from "./components/leftnav/leftnav";
import Topsearch from "./components/topsearch/topsearch";

import Login from "./pages/login/login";
import Dashboard from "./pages/dashboard/dashboard";
import Trending from "./pages/trending/trending";
import Friends from "./pages/friends/friends";
import Playlists from "./pages/playlists/playlists";
import Videoinfo from "./pages/videoinfo/videoinfo";
import Playlistinfo from "./pages/playlistinfo/playlistinfo";

function App() {
  const Layout = () => {
    return (
      <div className="main">
        <Topsearch />
        <div className="container">
          <div className="leftnavContainer">
            <Leftnav />
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="trending" element={<Trending />} />
          <Route path="friends" esslement={<Friends />} />
          <Route path="playlists" element={<Playlists />} />
          <Route path="videoinfo/:id" element={<Videoinfo />} />
          <Route path="playlistinfo/:id" element={<Playlistinfo />} />
        </Route>{" "}
      </Routes>
    </div>
  );
}

export default App;
