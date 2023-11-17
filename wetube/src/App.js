import "./App.css";
import { Routes, Route, Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1>WETUBE</h1>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="trending" element={<Trending />} />
          <Route path="friends" esslement={<Friends />} />
          <Route path="playlists" element={<Playlists />} />
          <Route path="videoinfo/:id" element={<VideoInfo />} />
          <Route path="playlistinfo/:id" element={<PlaylistInfo />} /> */}
        </Route>{" "}
      </Routes>
    </div>
  );
}

export default App;

function Layout() {
  return (
    <div id="layout">
      <nav id="navbar">
        <ul>
          <li>
            <Link to="/">Login</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/trending">Trending</Link>
          </li>
          <li>
            <Link to="/friends">Gallery</Link>
          </li>
          <li>
            <Link to="/playlists">Gallery</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
