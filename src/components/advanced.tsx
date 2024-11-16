"use client";

import React, { useState, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";
import Image from "next/image";
import circle_icon from "@/assets/circle.svg";
import cross_icon from "@/assets/cross.svg";
import leader_board_img from "@/assets/leaderBoard.jpg";
import { Leaderboard } from "./leaderboard";
// const db = [
//   {
//     name: 'Richard Hendricks',
//     url: './img/richard.jpg'
//   },
//   {
//     name: 'Erlich Bachman',
//     url: './img/erlich.jpg'
//   },
//   {
//     name: 'Monica Hall',
//     url: './img/monica.jpg'
//   },
//   {
//     name: 'Jared Dunn',
//     url: './img/jared.jpg'
//   },
//   {
//     name: 'Dinesh Chugtai',
//     url: './img/dinesh.jpg'
//   }
// ]

const db = [
  {
    name: "@Jack870731",
    url: "./4.gif",
  },
  {
    name: "@Lily711201",
    url: "./5.gif",
  },
  {
    name: "@Rose851021",
    url: "./6.gif",
  },
];

function Advanced() {
  const [currentIndex, setCurrentIndex] = useState<number>(db.length - 1);
  const [lastDirection, setLastDirection] = useState();
  // used for outOfFrame closure
  const currentIndexRef = useRef<number>(currentIndex);
  const [showLeaderBoard, setShowLeaderBoard] = useState<boolean>(false);

  const childRefs: any = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const handleShowLeaderBoard = () => {
    setShowLeaderBoard(true);
  };
  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction: any, nameToDelete: any, index: number) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name: any, idx: number) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir: string) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  const handleSwipe = (direction: string) => {
    swipe(direction);
  };

  return (
    <div className="w-full h-[80%] flex flex-col justify-center items-center">
      {!showLeaderBoard && (
        <>
          <div className="cardContainer mx-auto">
            {currentIndex >= 0 ? (
              db.map((character, index) => (
                <TinderCard
                  ref={childRefs[index]}
                  className="swipe"
                  key={character.name}
                  onSwipe={(dir) => swiped(dir, character.name, index)}
                  onCardLeftScreen={() => outOfFrame(character.name, index)}
                >
                  <div className="card p-4">
                    <div className="h-[220px] overflow-hidden">
                      <img
                        src={character.url}
                        className="w-full mb-5 w-[220px]"
                      />
                    </div>
                    <h3 className="text-black">{character.name}</h3>
                    <div className="flex justify-between px-5">
                      <Image
                        src={cross_icon}
                        alt="dislike"
                        width={50}
                        height={50}
                        onClick={() => handleSwipe("left")}
                      />
                      <Image
                        src={circle_icon}
                        alt="like"
                        width={50}
                        height={50}
                        onClick={() => handleSwipe("right")}
                      />
                    </div>
                  </div>
                </TinderCard>
              ))
            ) : (
              <div className="w-full h-[300px] flex flex-col justify-center items-center">
                <h3 className="text-white text-center text-2xl block">
                  No more videos
                </h3>
              </div>
            )}
          </div>
          <div className="buttons mt-16 justify-between w-full">
            <button
              style={{ backgroundColor: !canSwipe ? "#c3c4d3" : "#58FFA3" }}
              onClick={() => swipe("left")}
              className="text-black w-1/2"
            >
              Dislike
            </button>
            <button
              style={{ backgroundColor: !canSwipe ? "#c3c4d3" : "#58FFA3" }}
              onClick={() => swipe("right")}
              className="text-black w-1/2"
            >
              Like
            </button>
          </div>
          {currentIndex < 0 && (
            <button
              onClick={handleShowLeaderBoard}
              className="text-black bg-[#9198e5] seelastweekbutton w-full"
            >
              See last week&apos;s ranking
            </button>
          )}
        </>
      )}
      {showLeaderBoard && (
        <div className="flex justify-center items-center w-[90%] h-[100%]">
          <Leaderboard />
        </div>
      )}
    </div>
  );
}

export default Advanced;
