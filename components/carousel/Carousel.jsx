import styles from "./Carousel.module.css";
import { Carousel as AntCarousel } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const Carousel = () => {
  return (
    <AntCarousel autoplay className={styles["slider"]}>
      <LazyLoadImage src="/assets/images/carousel_1.jpg" effect="blur" />
      <LazyLoadImage src="/assets/images/carousel_2.jpg" effect="blur" />
      <LazyLoadImage src="/assets/images/carousel_3.jpg" effect="blur" />
    </AntCarousel>
  );
};
