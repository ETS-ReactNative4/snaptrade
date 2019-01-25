import React from 'react';
import { Carousel, Modal } from 'react-bootstrap';

const TutorialModalUI = ({showTutorial, onHideTutorial}) =>
  <Modal show={showTutorial} onHide={onHideTutorial}>
    <Modal.Header closeButton>
    </Modal.Header>
    <Modal.Body>
      <Carousel>
        <Carousel.Item>
          <img width={950} height={550} src="/tutorial/home-page.jpg" />
        </Carousel.Item>
        <Carousel.Item>
          <img width={950} height={550} alt="900x500" src="/tutorial/discovery.jpg" />
        </Carousel.Item>
        <Carousel.Item>
          <img width={950} height={550} alt="900x500" src="/tutorial/technical-indicators.jpg" />
        </Carousel.Item>
        <Carousel.Item>
          <img width={950} height={550} alt="900x500" src="/tutorial/stock-summary.jpg" />
        </Carousel.Item>
        <Carousel.Item>
          <img width={950} height={550} alt="900x500" src="/tutorial/comments-share.jpg" />
        </Carousel.Item>
        <Carousel.Item>
          <img width={950} height={550} src="/tutorial/add-to-watchlist.jpg" />
        </Carousel.Item>
        <Carousel.Item>
          <img width={950} height={550} src="/tutorial/watchlist.jpg" />
        </Carousel.Item>
        <Carousel.Item>
          <img width={950} height={550} src="/tutorial/watchlist2.jpg" />
        </Carousel.Item>
      </Carousel>
    </Modal.Body>
  </Modal>

export default TutorialModalUI;
