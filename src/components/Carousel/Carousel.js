import React, { useLayoutEffect, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DataResourceIcons from '../DataResourceIcons';
import './Carousel.css';
import arrowRightGold from '../../assets/img/arrow_right_gold.svg';
import arrowRightGray from '../../assets/img/arrow_right_gray.svg';

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

    useEffect(() => {
        if (participatingResources.length === 0) {
            onLoadLandingParticipatingResources().catch(error => {
              throw new Error(`Loading landing page participating resources failed ${error}`);
            });
        }
    }, []);

    const next = () => {
        if (currentIndex < (participatingResources.length - showCount)) {
            setCurrentIndex(prevState => prevState + 1);
            const ts = `translateX(-${(currentIndex + 1) * (100 / showCount)}%)`;
            setTransform({transform: ts});
        }
    };

    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevState => prevState - 1);
            const ts = `translateX(-${(currentIndex - 1) * (100 / showCount)}%)`;
            setTransform({transform: ts});
        }
    };

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
            next();
        }

        if (diff < -5) {
            prev();
        }

        setTouchPosition(null);
    };

    return participatingResources.length === 0
        ? (
            <div className="carousel-container">
                No Participating Resources available.
            </div>
        )
        : (
        <div className="carousel-container">
            <div className="carousel-wrapper">
                <div className="carousel-action-wrapper">
                {
                    currentIndex > 0
                     ? (
                        <button type="button" onClick={prev} className="left-arrow">
                            <img src={arrowRightGold} alt="arrow-right" />
                        </button>
                    )
                    : (
                        <button type="button" className="left-arrow" disabled="disabled">
                            <img src={arrowRightGray} alt="arrow-right" />
                        </button>
                    )
                }
                </div>
                <div className="carousel-content-wrapper" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
                    <div className={`carousel-content show-${showCount}`} style={transform}>
                        {participatingResources.map((pr, idx) => {
                            const key = `carousel_${idx}`;
                            let withLine = true;
                            if (showCount === 1) {
                              withLine = false;
                            } else if (showCount === 2) {
                              withLine = idx === currentIndex;
                            } else {
                              withLine = idx === currentIndex || (idx - 1) === currentIndex;
                            }
                            return (
                                <div key={key} className={withLine ? "carousel-card-with-line" : "carousel-card"}>
                                    <div className="cardTitle">
                                        <div className="cardInfo">
                                            <div className="cardLabel">
                                                <span style={{ color: 'gray' }}> Participating Resources </span>
                                            </div>
                                            <div className="cardHeader">
                                              <a className="cardHeader" href={`/resource/${pr.data_resource_id}`}><h4>{pr.resource_name.length > 55 ? `${pr.resource_name.substring(0, 55)} ...` : pr.resource_name}</h4></a>
                                            </div>
                                        </div>
                                        <div className="cardIcon">
                                          <DataResourceIcons participatingResource={pr.data_resource_id} type="white" />
                                        </div>
                                    </div>
                                    <div className="cardContent">
                                        <div>
                                            {pr.description.length > 80 ? `${pr.description.substring(0, 80)}...` : pr.description}
                                            {/* <span style={{ color: '#FFBF17' }}> READ MORE &#62; </span> */}
                                            <span><a href={`/resource/${pr.data_resource_id}`} style={{ color: '#FFBF17', textDecoration: 'none' }}> READ MORE &#62; </a></span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="carousel-action-wrapper">
                {
                    currentIndex < (participatingResources.length - showCount)
                     ? (
                        <button type="button" onClick={next} className="right-arrow">
                            <img src={arrowRightGold} alt="arrow-right" />
                        </button>
                     )
                     : (
                        <button type="button" className="right-arrow" disabled="disabled">
                            <img src={arrowRightGray} alt="arrow-right" />
                        </button>
                     )
                }
                </div>
            </div>
        </div>
    );
};

Carousel.propTypes = {
    participatingResources: PropTypes.array.isRequired,
    onLoadLandingParticipatingResources: PropTypes.func.isRequired,
};

export default Carousel;