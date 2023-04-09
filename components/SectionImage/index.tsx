import Image from "next/legacy/image";
import React from "react";

function SectionImage() {
  return (
    <>
      <Image
        src={
          "https://i.pinimg.com/564x/1b/fd/bc/1bfdbcfb01448f061592b0082f6799b3.jpg"
        }
        width={1080}
        height={960}
        alt=""
        className="object-fill w-full h-full"
      />
    </>
  );
}

export default SectionImage;
