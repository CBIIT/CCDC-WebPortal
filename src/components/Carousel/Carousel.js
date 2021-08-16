import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Carousel.css';

const Carousel = ({
    participatingResources, onLoadLandingParticipatingResources
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchPosition, setTouchPosition] = useState(null);

    useEffect(() => {
        if (participatingResources.length === 0) {
            onLoadLandingParticipatingResources().catch(error => {
                console.log(`Loading landing page participating resources failed ${error}`);
            });
        }
    }, []);

    const next = () => {
        if (currentIndex < (participatingResources.length - 3)) {
            setCurrentIndex(prevState => prevState + 1);
        }
    };

    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevState => prevState - 1);
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
                            <i className="fas fa-less-than" />
                        </button>
                    )
                    : (
                        <button type="button" className="left-arrow grayed-out" disabled="disabled">
                            <i className="fas fa-less-than" />
                        </button>
                    )
                }
                </div>
                <div className="carousel-content-wrapper" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
                    <div className="carousel-content show-3" style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}>
                        {participatingResources.map((pr) => {
                            return (
                                <article className="carousel-card">
                                    <div className="cardTitle">
                                        <div className="cardInfo">
                                            <div className="cardLabel">
                                                <span style={{ color: 'gray' }}> Participating Resources </span>
                                            </div>
                                            <div className="cardHeader">
                                                <h3>
                                                    {pr.name}
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="cardIcon">
                                            <i className="fas fa-archive" />
                                        </div>
                                    </div>
                                    <div className="cardContent">
                                        <h5>
                                            {pr.description}
                                            <span style={{ color: 'goldenrod' }}> READ MORE &#62; </span>
                                        </h5>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
                <div className="carousel-action-wrapper">
                {
                    currentIndex < (participatingResources.length - 3)
                     ? (
                        <button type="button" onClick={next} className="right-arrow">
                            <i className="fas fa-greater-than" />
                        </button>
                     )
                     : (
                        <button type="button" className="right-arrow grayed-out" disabled="disabled">
                            <i className="fas fa-greater-than" />
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