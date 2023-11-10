import "../../scss/globals.scss";
import styles from "./page.module.scss";
import Link from "next/link";
import { links } from "@/data/links";

import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
// import ExampleCarouselImage from "components/ExampleCarouselImage";

interface LinkObj {
  img: string;
  body: string;
  url: string;
}
export const TheLinks = () => {
  return (
    <div className="container">
      <h3 className="title">Foydali havolalar</h3>
      <ul className={styles.links}>
        {links.map(({ body, img, url }: LinkObj) => (
          <li key={body}>
            <img src={img} alt="" />
            <p>{body}</p>
            <Link href={`https://${url}`} passHref>
              {url}
            </Link>
          </li>
        ))}
      </ul>
      <div>
        {/* <Carousel>
          <Carousel.Item>
            <img className="d-block w-100" src="" alt="" />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src="" alt="" />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src="" alt="" />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel> */}
      </div>
    </div>
  );
};
