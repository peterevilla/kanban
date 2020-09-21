import React from "react";

const ImageCard = (props) => {
  const tags = props.images.tags.split(",");
  return (
    <div class="max-w-sm rounded overflow-hidden shadow-lg">
      <img class="w-full" src={`${props.images.webformatURL}`} />
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">Photo by {props.images.user}</div>
        <ul class="text-gray-700 text-base">
          <li>
            <strong>Views: {props.images.views}</strong>
          </li>
          <li>
            <strong>Downloads: {props.images.downloads}</strong>
          </li>
          <li>
            <strong>Likes: {props.images.likes}</strong>
          </li>
        </ul>
      </div>
      <div class="px-6 py-4">
        {tags.map((item) => (
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            <a href='#'>#{item}</a>
          </span>
        ))}
      </div>
    </div>
  );
};

export default ImageCard;
