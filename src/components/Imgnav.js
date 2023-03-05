import "../CSS/imgnav.css";
import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";

export default function Imgnav() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item className='img-h'>
              <img
                className='d-block w-100'
                src='https://i.pinimg.com/564x/54/32/7c/54327ce9dc57d7227198ee04f5d37b25.jpg'
                alt='First slide'
              />

              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
                <Button>Show Now </Button>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className='img-h'>
              <div>
                <img
                  className='d-block w-100'
                  src='https://i.pinimg.com/736x/4c/a5/dc/4ca5dc1870187a868bf5c2c5fd607973.jpg'
                  alt='First slide'
                />
              </div>

              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
                <Button>Show Now </Button>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item className='img-h'>
              <img
                className='d-block w-100'
                src='https://i.pinimg.com/564x/38/fb/3d/38fb3d8ed46e1933d03796facd4b4402.jpg'
                alt='Third slide'
              />

              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
}
