import Image from "next/legacy/image";
import { useState } from "react";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import { useEffect } from "react";
import { IconContext } from "react-icons";
import prisma from "@/utils/prisma";
import image1 from "../../public/6c3a3fba39bccabdc434c2b6f40632c9.jpg";
import image2 from "../../public/attachment.png";
import image3 from "../../public/backdrop-1920.jpg";
function Hero() {
  // create a slideshow with 3 images
  const [hero, setHero] = useState([image1, image2, image3]);
  const [index, setIndex] = useState(0);
  //create a radio button to switch between images
  const [checked, setChecked] = useState(false);
  //fetch the images from the api
  // useEffect(() => {
  //   prisma.hero
  //     .findMany()
  //     .then((res) => {
  //       const images = res.map((item) => item.image);
  //       setHero(images);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  //if the index change then the radio button will change
  useEffect(() => {
    const radio = document.getElementById(`hero${index}`) as HTMLInputElement;
    radio.checked = true;
  }, [index]);
  useEffect(() => {
    //set the interval to change the image every 5 seconds
    const interval = setInterval(() => {
      // if index is the last image, set index to 0
      index === hero.length - 1 ? setIndex(0) : setIndex(index + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [index, hero]);
  //handle the change of the radio button
  const handleClick = (e: any, index: number) => {
    setIndex(index);
    setChecked(!checked);
  };
  return (
    <div className="w-full relative">
      <div className="absolute z-20 bottom-0 w-full flex justify-center mb-2">
        {hero.map((item, index) => {
          return (
            <input
              type="radio"
              className="radio radio-primary"
              name="hero"
              id={`hero${index}`}
              key={index}
              placeholder="hero"
              onClick={(e) => handleClick(e, index)}
            />
          );
        })}
      </div>
      <div className="absolute top-0 w-full h-full items-center">
        <button
          className="absolute z-10 left-0 h-full hover:bg-gray-300 hover:bg-opacity-50"
          onClick={() => {
            // if index is 0, set index to the last image
            index === 0 ? setIndex(hero.length - 1) : setIndex(index - 1);
          }}
          title="previous"
        >
          <MdNavigateBefore className="text-7xl " color="white" />
        </button>
        <button
          className="absolute z-10 right-0 h-full hover:bg-gray-300 hover:bg-opacity-25"
          onClick={() => {
            // if index is the last image, set index to 0
            index === hero.length - 1 ? setIndex(0) : setIndex(index + 1);
          }}
          title="next"
        >
          <MdNavigateNext className="text-7xl" color="white" />
        </button>
      </div>
      <Image
        src={hero[index]}
        alt=""
        width={1920}
        height={1080}
        className="h-full w-full"
      />
    </div>
  );
}

export default Hero;
