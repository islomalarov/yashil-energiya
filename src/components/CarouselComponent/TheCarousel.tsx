"use client";
import React, { useCallback } from "react";
import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./TheCarouselArrowButtons";

import s from "./TheCarousel.module.scss";
import Image from "next/image";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
  plantCode?: string;
};

const TheCarousel: React.FC<PropType> = (props) => {
  const { slides, options, plantCode } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;

    resetOrStop();
  }, []);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi, onNavButtonClick);

  return (
    <section className={s.embla}>
      <div className={s.embla__viewport} ref={emblaRef}>
        <div className={s.embla__container}>
          {slides.map((index) => {
            const plantImageSrc = require(`@/public/plants/${plantCode}/photo-${
              index + 1
            }.jpg`).default;
            return (
              <div className={s.embla__slide} key={index}>
                <Image
                  className={s.embla__slide__img}
                  src={plantImageSrc}
                  alt="Your alt text"
                />
              </div>
            );
          })}
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
