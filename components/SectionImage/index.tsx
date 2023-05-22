import Image from "next/legacy/image";
import React from "react";

type props = {
  src: string;
};

function SectionImage(props: props) {
  return (
    <>
      <Image
        src={props.src}
        width={1080}
        height={960}
        alt=""
        className="object-fill w-full h-auto"
      />
    </>
  );
}

export default SectionImage;
