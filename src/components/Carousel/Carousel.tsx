import * as React from "react";
import styled, { css } from "styled-components";
import { ChevronLeftIcon, ChevronRightIcon } from '@pancakeswap-libs/uikit'

const SCarouselWrapper = styled.div`
  display: block;
`;

interface ICarouselSlide {
  active?: boolean;
}

const SCarouselSlide = styled.div<ICarouselSlide>`
  flex: 0 0 auto;
  opacity: ${props => (props.active ? 1 : 0)};
  transition: all 0.5s ease;
  width: 100%;
`;

interface ICarouselProps {
  currentSlide: number;
}

const SCarouselSlides = styled.div<ICarouselProps>`
  display: flex;
  ${props =>
    props.currentSlide &&
    css`
      transform: translateX(-${props.currentSlide * 100}%);
    `};
  transition: all 0.5s ease;
`;

const CarouselBlock = styled.div`
    &>div>button {
      border-radius: 50px;
      padding: 6px;
      svg {
        fill: #000;
        vertical-align: middle;
      }
    }
    position: relative;
`
const ArrowBlock = styled.div`
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 50%;
    width: 100%;
`

interface IProps {
  children: JSX.Element[];
}

const Carousel = ({ children }: IProps) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const activeSlide = children.map((slide, index) => (
    // <div>{index}</div>
    <SCarouselSlide active={currentSlide === index} key={index.toFixed(2)}>
      {slide}
    </SCarouselSlide>
  ));

  return (
    <CarouselBlock>
      <SCarouselWrapper>
        <SCarouselSlides currentSlide={currentSlide}>
          {activeSlide}
        </SCarouselSlides>
      </SCarouselWrapper>
      <ArrowBlock>
        <button type="button"
            onClick={() => {
              setCurrentSlide((currentSlide - 1 + activeSlide.length) % activeSlide.length);
            }}
          >
            <ChevronLeftIcon />
          </button>
          <button type="button"
            onClick={() => {
              setCurrentSlide((currentSlide + 1) % activeSlide.length);
            }}
          >
          <ChevronRightIcon />
        </button>
      </ArrowBlock>
    </CarouselBlock>
  );
};

export default Carousel;