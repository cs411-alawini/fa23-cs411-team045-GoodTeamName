import React from "react";

const YouTubeEmbed = ({ videoId }) => {
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;

  return (
    <div
      style={{
        overflow: "hidden",
        paddingBottom: "56.25%",
        position: "relative",
        height: 0,
      }}
    >
      <iframe
        src={embedUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
        style={{
          left: 0,
          top: 0,
          height: "100%",
          width: "100%",
          position: "absolute",
        }}
      />
    </div>
  );
};

export default YouTubeEmbed;
