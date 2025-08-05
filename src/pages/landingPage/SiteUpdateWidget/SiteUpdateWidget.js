import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Carousel from 'react-bootstrap/Carousel';
import ReactHtmlParser from "html-react-parser";
import externalIcon from "../../../assets/img/resource-00a272.svg";
import startIcon from "../../../assets/img/StartButtonIcon.svg";
import PauseIcon from "../../../assets/img/PauseButtonIcon.svg";

const WidgetContainer = styled.div`
  height: 239px;
  box-sizing: border-box;
  margin-top: 17px;
  background: linear-gradient(266.35deg, rgba(255, 255, 255, 0.5) -14.82%, #FFFFFF 59.59%);
  //box-shadow: -4px 11px 27px 6px rgba(28,29,29,0.5);
  padding: 22px 25px 12px 25px;
  text-align: left;

  @media (min-width: 768px) {
    width: 547px;
  }
  
  @media (max-width: 767px) {
    width: calc(100vw - 50px);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.9) 44.07%, #FFFFFF 52.85%);
    border: 1.25px solid #0C325E;
    height: 370px;
  }
}
`;

const WidgetHeader = styled.div`
    color: #004187;
    font-family: Lato;
    font-size: 13px;
    font-weight: 700;
    line-height: 13px;
`;

const WidgetContent = styled.div`
    width: 100%;
    margin-bottom: 15px;
    margin-top: -6px;

    .pauseButton {
        width: 14px;
        height: 14px;
        position: relative;
        top: 171px;
        left: 490px;
        z-index: 10;
        @media (max-width: 767px) {
            top: 286px;
            left: calc(100vw - 130px);
        }
    }

    .pauseButtonImg {
        @media (max-width: 767px) {
            width: 26px;
            height: 26px;
        }
    }

    .carousel-indicators {
        padding: 0;
        margin: 0;
        right: 20px;
        bottom: -37px;
        left: auto;

        @media (max-width: 767px) {
            right: 45px;
        }
    }

    .carousel-indicators button {
        width: 39px;
        height: 5px;
        margin-left: 5px;
        cursor: pointer;
        background-color: #476A74;
        border: 0;
        transition: opacity .6s ease;
        opacity: 0.9;

        @media (max-width: 767px) {
            width: 64px;
            height: 8px;
        }
    }
    .carousel-indicators button:hover {
        opacity: 1;
    }
    .carousel-indicators button.active {
        background-color: #0F936C;
    }
`;

const WidgetCard = styled.div`
    // display: grid;
`;

const CardTitle = styled.div`
    h4 {
        font-family: Lato;
        font-size: 24px;
        font-weight: 600;
        line-height: 23px;
        height: 28px;
        overflow-y: auto;
        margin-bottom: 10px;
    }

    a {
        text-decoration: none;
        color: #00855D;
    }
`;

const UpdateCardDescription = styled.div`
    color: #000000;
    font-family: Inter;
    font-size: 18px;
    line-height: 100%;
    font-weight: 400;
    word-break: normal;

    @media (min-width: 768px) {
        height: 99px;
    }

    @media (max-width: 767px) {
        height: 215px;
        font-size: 19px;
        line-height: 28px;
    }

    a {
        text-decoration: none;
        color: #00855D;
        font-family: Lato;
        font-weight: 700;
        font-size: 13px;
        line-height: 100%;
        letter-spacing: 3%;
        text-transform: uppercase;
    }
`;

const CardDescription = styled.div`
    color: #000000;
    font-family: Inter;
    font-size: 18px;
    line-height: 100%;
    font-weight: 400;
    word-break: normal;

    @media (min-width: 768px) {
        height: 99px;
    }
    
    @media (max-width: 767px) {
        height: 215px;
        font-size: 19px;
        line-height: 28px;
    }

    a {
        text-decoration: none;
        color: #00a272;
        font-weight: 500;
    }
    a::after {
        content: " ";
        font-weight: bold;
        color: #004187;
        font-size: 14px;
        background-image: url(${externalIcon});
        background-repeat: no-repeat;
        background-size: 100%;
        background-position-y: 4px;
        background-position-x: -2px;
        width: 17px;
        height: 17px;
        display: inline-table;
    }
`;

const SiteUpdateWidget = ({
    widgetUpdates,
    onLoadWidgetUpdates,
}) => {
    const showArrows = false;
    const [pause, setPause] = useState(20000);
    const [iconUrl, setIconUrl] = useState(PauseIcon);
    useEffect(() => {
        if (widgetUpdates.length === 0) {
            onLoadWidgetUpdates().catch(error => {
                throw new Error(`Loading widget updates failed: ${error}`);
            });
        }
    }, []);

    const handleClickPauseButton = () => {
        if (pause === null) {
            setPause(20000);
            setIconUrl(PauseIcon);
        } else {
            setPause(null);
            setIconUrl(startIcon);
        }
    };

    return (
        <WidgetContainer>
            <WidgetHeader>FEATURED ITEMS</WidgetHeader>
            <WidgetContent>
                <div className="pauseButton" role="button" tabindex={0} onClick={handleClickPauseButton} onKeyDown={handleClickPauseButton}>
                    <img className="pauseButtonImg" src={iconUrl} alt="pausebutton" />
                </div>
                {
                    widgetUpdates.length > 0 && (
                        <Carousel controls={showArrows} interval={pause}>
                            {
                                widgetUpdates.map((item, idx) => {
                                    const itemKey = `update_${idx}`;
                                    const link = `/siteupdate#post${item.id}`;
                                    let desc = item.description;
                                    if (item.log_type === 0) {
                                        desc = desc.replace(/<a /g, "<a target=\"_blank\" ");
                                    } else {
                                        desc = desc.length > 150 ? `${desc.substr(0, 150)}...` : desc;
                                    }
                                    const hl = `${desc} <a href="${link}">Read More > </a>`;
                                    return (
                                        <Carousel.Item key={itemKey}>
                                            {
                                                item.log_type === 1 ? (
                                                    <WidgetCard>
                                                        <CardTitle>
                                                            <h4>
                                                            <a href={link}>
                                                                {item.title}
                                                            </a>
                                                            </h4>
                                                        </CardTitle>
                                                        <UpdateCardDescription>{ReactHtmlParser(hl)}</UpdateCardDescription>
                                                    </WidgetCard>
                                                ) : (
                                                    <WidgetCard>
                                                        <CardTitle>{item.title}</CardTitle>
                                                        <CardDescription>{ReactHtmlParser(desc)}</CardDescription>
                                                    </WidgetCard>
                                                )
                                            }
                                        </Carousel.Item>
                                    );
                                })
                            }
                        </Carousel>
                    )
                }
            </WidgetContent>
        </WidgetContainer>
    );
};

SiteUpdateWidget.propTypes = {
    widgetUpdates: PropTypes.array.isRequired,
    onLoadWidgetUpdates: PropTypes.func.isRequired,
};

export default SiteUpdateWidget;