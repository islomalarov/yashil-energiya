"use client";

import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { NextButton, PrevButton } from "./TheCarouselArrowButtons";

import s from "./TheCarousel.module.scss";
import Image from "next/image";
import { usePrevNextButtons } from "@/hooks/usePrevNextButtons";

type PropType = {
  pictures: {
    fileName: string;
    url: string;
    height: number;
    width: number;
  }[];
  options?: EmblaOptionsType;
};

const TheCarousel: React.FC<PropType> = (props) => {
  const { pictures, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className={s.embla}>
      <div className={s.embla__viewport} ref={emblaRef}>
        <div className={s.embla__container}>
          {pictures.map((picture, index) => (
            <div className={s.embla__slide} key={index}>
              <Image
                className={s.embla__slide__img}
                src={picture.url}
                alt="Your alt text"
                width={picture.width || 1280}
                height={picture.height || 720}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={s.embla__controls}>
        <div className={s.embla__buttons}>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  );
};

export default TheCarousel;
