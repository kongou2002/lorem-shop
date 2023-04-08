import Image from "next/legacy/image";
import React from "react";

function SectionImage() {
  return (
    <div>
      <Image
        src={"https://randommer.io/images/clothes/Ski%20Suit.webp"}
        width={1080}
        height={960}
        alt=""
      />
    </div>
  );
}

export default SectionImage;
