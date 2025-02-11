import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faUser,
  faList,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";

const updates = [
  {
    id: 1,
    icon: faUser,
    title: "Update 1",
    details: "Details of update 1",
    postDate: "2025-02-10",
    postBy: "User 1",
    likes: 10,
  },
  // Add more updates as needed
  {
    id: 2,
    icon: faUser,
    title: "Update 2",
    details: "Details of update 2",
    postDate: "2025-02-11",
    postBy: "User 2",
    likes: 5,
  },
];

const CommunityBoard = () => {
  const [view, setView] = useState("list");
  const [likes, setLikes] = useState(updates.map((update) => update.likes));

  const handleLike = (index) => {
    const newLikes = [...likes];
    newLikes[index] += 1;
    setLikes(newLikes);
  };

  return (
    <div className="glassmorphic">
      {/* Hero Title */}
      <div className="z-10 mb-5 grid gap-y-4 bg-[#f7f7f7] p-10 text-center shadow-md">
        <h1 className="text-[#FB6F92]">Community Updates</h1>
        <p className="text-black">
          Stay up-to-date with the latest community news and updates
        </p>
      </div>

      <div className="mb-4 flex justify-end px-4">
        <button onClick={() => setView("list")} className="mr-2">
          <FontAwesomeIcon icon={faList} className="mb-2" size="1x" />
          List
        </button>
        <button onClick={() => setView("grid")}>
          <FontAwesomeIcon icon={faLayerGroup} className="mb-2" size="1x" />
          Grid
        </button>
      </div>
      <div className={view === "list" ? "list-view p-4" : "grid-view p-4"}>
        {updates.map((update, index) => (
          <div
            key={update.id}
            className="update-card mb-4 rounded-lg bg-white p-4 shadow-md"
          >
            <FontAwesomeIcon icon={update.icon} className="mb-2" size="2x" />
            <h3 className="text-xl font-semibold">{update.title}</h3>
            <p>{update.details}</p>
            <p>Posted on: {update.postDate}</p>
            <p>Posted by: {update.postBy}</p>
            <button onClick={() => handleLike(index)} className="mt-2">
              <FontAwesomeIcon icon={faThumbsUp} /> {likes[index]}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityBoard;
