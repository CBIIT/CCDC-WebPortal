import React, { useLayoutEffect, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import usePageVisibility from "./PageVisibility";
// import DataResourceIcons from '../DataResourceIcons';
// import arrowRightGold from '../../assets/img/arrow_right_gold.svg';
import startIcon from "../../assets/img/StartButtonIconGrey.svg";
import PauseIcon from "../../assets/img/PauseButtonIconGrey.svg";
import LeftIcon from "../../assets/img/carouselLeftButton.svg";
import MiddleIcon from "../../assets/img/carouselMiddleButton.svg";
import RightIcon from "../../assets/img/carouselRightButton.svg";

const CarouselContainer = styled.div`
    *,
    *::before,
    *::after {
    box-sizing: none;
    }

    @media (min-width: 1200px) {
        .carousel-container {
            width: 1200px;
        }
        .left-arrow, .right-arrow {
            width: 29px;
            margin-top: 85px;
        }
        .carousel-content-wrapper {
            width: 1142px;
        }
        .cardHeader h4 {
            font-size: 23px;
        }
    }

    @media (max-width: 1200px) {
        .left-arrow, .right-arrow {
            width: 18px;
            margin-top: 96px;
        }
        .carousel-wrapper {
            padding-inline: 18px;
        }
        .carousel-content-wrapper {
            width: calc(100% - 36px);
        }
    }

    @media (max-width: 376px) {
        .cardLabel {
            font-size: 0.8rem;
        }
        .cardHeader h4 {
            font-size: 1.1rem;
        }
        .cardContent {
            font-size: 0.8em !important;
        }
    }

    .carousel-container {
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        position: relative;
    }

    .carousel-wrapper {
        display: flex;
        width: 100%;
        position: relative;
    }

    .carousel-cover {
        position: absolute;
        left: 10%;
        width: 2px;
        border: 1px solid rgba(0, 0, 0, 0.9);
    }

    .carousel-action-wrapper {
        overflow: hidden;
        background: #212121;
        width: 20px;
    }

    .carousel-content-wrapper {
        overflow: hidden;
        height: 100%;
    }

    .carousel-content {
        display: flex;
        -ms-overflow-style: none;
        scrollbar-width: none;
        padding: 10px 0;
    }

    .carousel-content::-webkit-scrollbar {
        display: none;
    }

    .carousel-content > * {
        width: 100%;
        flex-shrink: 0;
        flex-grow: 1;
    }

    .carousel-content.show-1 > * {
        width: 100%;
    }

    .carousel-content.show-2 > * {
        width: 50%;
    }

    .carousel-content.show-3 > * {
        width: calc(100% / 3);
    }

    .left-arrow, .right-arrow {
        cursor: pointer !important;
        z-index: 1;
        padding: 0;
        border-radius: 24px;
        background-color: transparent;
        box-shadow: 0 0 0 0 blue;
        border: 0;
        color: white;
    }

    .left-arrow img {
        transform: rotate(180deg);
    }

    .carousel-card {
        display: grid;
        padding: 0 10px;
    }

    .carousel-card-with-line {
        display: grid;
        padding: 0 10px;
    }

    .cardContianer {
        margin: 40px 0;
        padding: 15px 25px; 
        border-radius: 15px;
        border: 1px solid #5A5A5A;
    }

    .cardContianer:hover {
        border-radius: 15px;
        border: 1px solid #C1C1C1;
    }

    .carousel-card:last-child {
        border-right: 0px;
    }

    .cardTitle {
        display: flex;
        height: 65px;
    }

    .cardInfo {
        width: 100%;
        /* padding-top: 10px; */
    }

    .cardIcon {
        width: 56px;
        color: white;
        font-size: 40px;
        text-align: center;
        padding-top: 10px;
    }

    .cardLabel {
        font-family: Lato;
        color: #ADADAD;
        width: 100%;
        font-size:14px;
    }

    .cardHeader {
        color: #FFBF17;
        width: 100%;
        text-decoration: none;
        font-size: 90%;
    }

    .cardHeader a:hover {
        color: #FFBF17;
    }

    .cardHeader h4{
        line-height: 18pt;
        font-weight: 900;
    }

    .cardContent {
        color: white;
        font-size: 90%;
        margin-top: 10px;
        height: 60px;
        /* line-height: 18pt; */
        /* padding-top: 16px; */
        width: 100%;
    }

    .controlPanel {
        position: absolute;
        display: flex;
        top: 235px;
        left: 888px;
        background-color: #212121;
        color: red;
        width: 238px;
        height: 49px;
        border-radius: 50px;
        padding: 8px 40px;
    }

    .carouselButton {
        margin: 0 4px;
    }

    .carouselPauseButton {
        margin-left: 20px;
    }

    .carouselLeftButton {
        width: 39px;
        height: 5px;
        margin-top: 12px;
        background: url(${LeftIcon}) right center no-repeat;
    }

    .carouselLeftButton:hover {
        background: url(${MiddleIcon}) right center no-repeat;
    }

    .carouselRightButton {
        width: 39px;
        height: 5px;
        margin-top: 12px;
        background: url(${RightIcon}) right center no-repeat;
    }

    .carouselRightButton:hover {
        background: url(${MiddleIcon}) right center no-repeat;
    }

    @media (max-width: 1200px) {
        .controlPanel{
            left: calc(100vw - 300px);
        }
    }
`;

let cardIdx = 0;
let timer = null;

const useShowCount = () => {
  const [showCount, setShowCount] = useState(3);
  useLayoutEffect(() => {
    function updateSize() {
      const width = window.innerWidth;
      if (width >= 1200) {
        setShowCount(3);
      } else if (width >= 768) {
        setShowCount(2);
      } else {
        setShowCount(1);
      }
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return showCount;
};

const Carousel = ({
    participatingResources, onLoadLandingParticipatingResources
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const showCount = useShowCount();
    const [touchPosition, setTouchPosition] = useState(null);
    const [transform, setTransform] = useState({ transform: "translateX(0%)" });
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [pause, setPause] = useState(false);
    const [iconUrl, setIconUrl] = useState(PauseIcon);
    const isVisible = usePageVisibility();

    const startTimer = () => {
        timer = setInterval(() => {
            const ts = `translateX(-${(cardIdx + 1) * (100 / showCount)}%)`;
            cardIdx += 1;
            setCurrentIndex(cardIdx);
            setTransform({transform: ts, transition: ".5s ease-out"});
        }, 3000);
    };

    const resetTimer = () => {
        clearInterval(timer);
        startTimer();
    };

    const nextSlide = () => {
        if (!pause) {
            resetTimer();
        }
        const ts = `translateX(-${(cardIdx + 1) * (100 / showCount)}%)`;
        cardIdx += 1;
        if (cardIdx === (participatingResources.length + showCount)) {
            setBtnDisabled(true);
            setTimeout(() => {
                setBtnDisabled(false);
            }, 500);
        }
        setCurrentIndex(cardIdx);
        setTransform({transform: ts, transition: "0.5s ease-out"});
    };

    const prevSlide = () => {
        if (!pause) {
            resetTimer();
        }
        const ts = `translateX(-${(cardIdx - 1) * (100 / showCount)}%)`;
        cardIdx -= 1;
        if (cardIdx === 0) {
            setBtnDisabled(true);
            setTimeout(() => {
                setBtnDisabled(false);
            }, 500);
        }
        setCurrentIndex(cardIdx);
        setTransform({transform: ts, transition: "0.5s ease-out"});
    };

    const clickPause = () => {
        if (pause) {
            resetTimer();
            setIconUrl(PauseIcon);
        } else {
            clearInterval(timer);
            setIconUrl(startIcon);
        }
        setPause(!pause);
    };

    useEffect(() => {
        if (!isVisible) {
            clearInterval(timer);
        }
        const len = participatingResources.length;
        if (len === 0) {
            onLoadLandingParticipatingResources().catch(error => {
              throw new Error(`Loading landing page participating resources failed ${error}`);
            });
        }
        if (participatingResources.length !== 0 && isVisible) {
            cardIdx = Math.floor(Math.random() * len) + showCount;
            const initialTs = `translateX(-${cardIdx * (100 / showCount)}%)`;
            setCurrentIndex(cardIdx);
            setTransform({transform: initialTs, transition: "none"});
            startTimer();
        }
        return () => clearInterval(timer);
    }, [participatingResources, isVisible]);

    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX;
        setTouchPosition(touchDown);
    };

    const handleTouchMove = (e) => {
        const touchDown = touchPosition;

        if (touchDown === null) {
            return;
        }

        const currentTouch = e.touches[0].clientX;
        const diff = touchDown - currentTouch;

        if (diff > 5) {
            nextSlide();
        }

        if (diff < -5) {
            prevSlide();
        }

        setTouchPosition(null);
    };

    const handleTransitionEnd = () => {
        if (cardIdx === 0) {
            cardIdx = participatingResources.length;
            const initialTs = `translateX(-${cardIdx * (100 / showCount)}%)`;
            setCurrentIndex(cardIdx);
            setTransform({transform: initialTs, transition: "none"});
        }

        if (cardIdx === (participatingResources.length + showCount)) {
            cardIdx = showCount;
            const initialTs = `translateX(-${cardIdx * (100 / showCount)}%)`;
            setCurrentIndex(cardIdx);
            setTransform({transform: initialTs, transition: "none"});
        }
    };

    return participatingResources.length === 0
        ? (
            <div className="carousel-container">
                No Participating Resources available.
            </div>
        )
        : (
        <CarouselContainer>
            <div className="carousel-container">
                <div className="carousel-wrapper">
                    <div className="carousel-action-wrapper">
                        {/* <button type="button" onClick={prevSlide} className="left-arrow" disabled={btnDisabled}>
                            <img src={arrowRightGold} alt="arrow-right" />
                        </button> */}
                    </div>
                    <div className="carousel-content-wrapper" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
                        <div className={`carousel-content show-${showCount}`} onTransitionEnd={handleTransitionEnd} style={transform}>
                        {participatingResources.slice(participatingResources.length - showCount).map((pr, idx) => {
                                const key = `carousel_${idx}_last_clone`;
                                let withLine = true;
                                if (showCount === 1) {
                                    withLine = false;
                                } else if (showCount === 2) {
                                    withLine = idx === currentIndex;
                                } else {
                                    withLine = idx === currentIndex || (idx - 1) === currentIndex;
                                }
                                return (
                                    <div key={key} className={withLine ? "carousel-card-with-line" : "carousel-card"} title={key}>
                                        <div className="cardContianer">
                                            <div className="cardTitle">
                                                <div className="cardInfo">
                                                    <div className="cardLabel">
                                                        <span> Participating Resources </span>
                                                    </div>
                                                    <div className="cardHeader">
                                                    <a className="cardHeader" href={`/resource/${pr.data_resource_id}`}><h4>{pr.resource_name.length > 40 ? `${pr.resource_name.substring(0, 40)} ...` : pr.resource_name}</h4></a>
                                                    </div>
                                                </div>
                                                {/* <div className="cardIcon">
                                                <DataResourceIcons participatingResource={pr.data_resource_id} type="white" />
                                                </div> */}
                                            </div>
                                            <div className="cardContent">
                                                <div>
                                                    {pr.description.length > 85 ? `${pr.description.substring(0, 85)}...` : pr.description}
                                                    {/* <span style={{ color: '#FFBF17' }}> READ MORE &#62; </span> */}
                                                    <span><a href={`/resource/${pr.data_resource_id}`} style={{ color: '#FFBF17', textDecoration: 'none' }}> READ MORE &#62; </a></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            {participatingResources.map((pr, idx) => {
                                const key = `carousel_${idx}`;
                                let withLine = true;
                                if (showCount === 1) {
                                    withLine = false;
                                } else if (showCount === 2) {
                                    withLine = (idx + showCount) === currentIndex;
                                } else {
                                    withLine = (idx + showCount) === currentIndex || (idx + showCount - 1) === currentIndex;
                                }
                                return (
                                    <div key={key} className={withLine ? "carousel-card-with-line" : "carousel-card"}>
                                        <div className="cardContianer">
                                            <div className="cardTitle">
                                                <div className="cardInfo">
                                                    <div className="cardLabel">
                                                        <span> Participating Resources </span>
                                                    </div>
                                                    <div className="cardHeader">
                                                    <a className="cardHeader" href={`/resource/${pr.data_resource_id}`}><h4>{pr.resource_name.length > 40 ? `${pr.resource_name.substring(0, 40)} ...` : pr.resource_name}</h4></a>
                                                    </div>
                                                </div>
                                                {/* <div className="cardIcon">
                                                <DataResourceIcons participatingResource={pr.data_resource_id} type="white" />
                                                </div> */}
                                            </div>
                                            <div className="cardContent">
                                                <div>
                                                    {pr.description.length > 85 ? `${pr.description.substring(0, 85)}...` : pr.description}
                                                    {/* <span style={{ color: '#FFBF17' }}> READ MORE &#62; </span> */}
                                                    <span><a href={`/resource/${pr.data_resource_id}`} style={{ color: '#FFBF17', textDecoration: 'none' }}> READ MORE &#62; </a></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            {participatingResources.slice(0, showCount).map((pr, idx) => {
                                const key = `carousel_${idx}_first_clone`;
                                let withLine = true;
                                if (showCount === 1) {
                                    withLine = false;
                                } else if (showCount === 2) {
                                    withLine = (idx + participatingResources.length + showCount) === currentIndex;
                                } else {
                                    withLine = (idx + participatingResources.length + showCount) === currentIndex || (idx + participatingResources.length + showCount - 1) === currentIndex;
                                }
                                return (
                                    <div key={key} className={withLine ? "carousel-card-with-line" : "carousel-card"} title={key}>
                                        <div className="cardContianer">
                                            <div className="cardTitle">
                                                <div className="cardInfo">
                                                    <div className="cardLabel">
                                                        <span> Participating Resources </span>
                                                    </div>
                                                    <div className="cardHeader">
                                                    <a className="cardHeader" href={`/resource/${pr.data_resource_id}`}><h4>{pr.resource_name.length > 40 ? `${pr.resource_name.substring(0, 40)} ...` : pr.resource_name}</h4></a>
                                                    </div>
                                                </div>
                                                {/* <div className="cardIcon">
                                                <DataResourceIcons participatingResource={pr.data_resource_id} type="white" />
                                                </div> */}
                                            </div>
                                            <div className="cardContent">
                                                <div>
                                                    {pr.description.length > 85 ? `${pr.description.substring(0, 85)}...` : pr.description}
                                                    {/* <span style={{ color: '#FFBF17' }}> READ MORE &#62; </span> */}
                                                    <span><a href={`/resource/${pr.data_resource_id}`} style={{ color: '#FFBF17', textDecoration: 'none' }}> READ MORE &#62; </a></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="carousel-action-wrapper">
                        {/* <button type="button" onClick={nextSlide} className="right-arrow" disabled={btnDisabled}>
                            <img src={arrowRightGold} alt="arrow-right" />
                        </button> */}
                    </div>
                </div>
                <div className="controlPanel">
                    <div className="carouselLeftButton" role="button" tabindex={0} onClick={prevSlide} onKeyDown={clickPause} disabled={btnDisabled}>
                        {/* <img src={LeftIcon} alt="leftbutton" /> */}
                    </div>
                    <div className="carouselButton">
                        <img src={MiddleIcon} alt="middlebutton" />
                    </div>
                    <div className="carouselRightButton" role="button" tabindex={0} onClick={nextSlide} onKeyDown={clickPause} disabled={btnDisabled}>
                        {/* <img src={RightIcon} alt="righttbutton" /> */}
                    </div>
                    <div className="carouselPauseButton" role="button" tabindex={0} onClick={clickPause} onKeyDown={clickPause}>
                        <img src={iconUrl} alt="pausebutton" />
                    </div>
                </div>
            </div>
        </CarouselContainer>
    );
};

Carousel.propTypes = {
    participatingResources: PropTypes.array.isRequired,
    onLoadLandingParticipatingResources: PropTypes.func.isRequired,
};

export default Carousel;