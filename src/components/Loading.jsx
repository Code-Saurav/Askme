import React from "react";
import loadingGif from "../asset/loading-green-loading.gif";

const Loading = () => {
  return (
    <div className="loadingModal">
      {" "}
      <img
        src={loadingGif}
        alt="My Gif"
        style={{ width: "100px", height: "100px" }}
      />
    </div>
  );
};

export default Loading;
