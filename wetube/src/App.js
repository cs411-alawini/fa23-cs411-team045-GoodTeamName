import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";

import Leftnav from "./components/leftnav/Leftnav";
import Topsearch from "./components/topsearch/Topsearch";

import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import Trending from "./pages/trending/Trending";
import Friends from "./pages/friends/Friends";
import Playlists from "./pages/playlists/Playlists";
import Videoinfo from "./pages/videoinfo/Videoinfo";
import Playlistinfo from "./pages/playlistinfo/Playlistinfo";
import Search from "./pages/search/Search";

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
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="trending" element={<Trending />} />
          <Route path="friends" element={<Friends />} />
          <Route path="playlists" element={<Playlists />} />
          <Route path="videoinfo/:id" element={<Videoinfo />} />
          <Route path="playlistinfo/:id" element={<Playlistinfo />} />
          <Route path="search/:searchTerm" element={<Search />} />
        </Route>{" "}
      </Routes>
    </div>
  );
}

export default App;
