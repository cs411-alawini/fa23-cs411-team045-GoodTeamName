import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";

import Leftnav from "./components/leftnav/Leftnav";
import Topsearch from "./components/topsearch/Topsearch";

import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Trending from "./pages/trending/Trending";
import Friends from "./pages/friends/Friends";
import Playlists from "./pages/playlists/Playlists";
import Videoinfo from "./pages/videoinfo/Videoinfo";
import Playlistinfo from "./pages/playlistinfo/Playlistinfo";

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
