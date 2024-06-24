import React from "react";

const Image = ({ containerStyles, width, height, src, imageStyles }) => {
  return (
    <div className={containerStyles}>
      <img
        loading="lazy"
        width={width}
        height={height}
        src={src}
        className={`w-full h-full ${imageStyles}`}
        alt="image"
      />
    </div>
  );
};

export default Image;
