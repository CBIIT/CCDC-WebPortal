import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Carousel from 'react-bootstrap/Carousel';
import ReactHtmlParser from "html-react-parser";
import externalIcon from "../../../assets/img/resource-00a272.svg";

const WidgetContainer = styled.div`
  box-sizing: border-box;
  display: grid;
  margin-top: 17px;
  background-color: #FFFFFF;
  box-shadow: -4px 11px 27px 6px rgba(28,29,29,0.5);
  opacity: 0.85;
  padding: 11px 25px 12px 25px;
  text-align: left;

  @media (max-width: 640px) {
    margin: 17px auto;
  }

  @media (min-width: 530px) {
    width: 480px;
  }
  
  @media (max-width: 530px) {
    width: calc(100vw - 50px);
  }
}
`;

const WidgetHeader = styled.div`
    color: #213963;
    font-family: Lato;
    font-size: 13px;
    font-weight: 700;
    line-height: 13px;
    padding-bottom: 3px;
`;

const WidgetContent = styled.div`
    width: 100%;
    margin-bottom: 15px;

    .carousel-indicators {
        padding: 0;
        margin: 0;
        right: 0;
        bottom: -7px;
        left: auto;
    }

    .carousel-indicators button {
        width: 55px;
        height: 5px;
        margin-left: 5px;
        cursor: pointer;
        background-color: #A8E2D1;
        border: 0;
        transition: opacity .6s ease;
    }
    .carousel-indicators button:hover {
        opacity: 1;
    }
    .carousel-indicators button.active {
        background-color: #2DC799;
    }
`;

const WidgetCard = styled.div`
    display: grid;
`;

const CardTitle = styled.div`
    font-family: Lato;
    font-size: 23px;
    font-weight: 900;
    line-height: 23px;
    height: 28px;
    overflow-y: auto;

    a {
        text-decoration: none;
        color: #00a272;
    }
`;

const UpdateCardDescription = styled.div`
    color: #000000;
    font-family: Lato;
    font-size: 14px;
    line-height: 17px;
    word-break: normal;

    @media (min-width: 530px) {
        height: 57px;
    }
    
    @media (max-width: 530px) {
        height: 74px;
    }

    a {
        text-decoration: none;
        color: #00a272;
        font-weight: 500;
    }
`;

const CardDescription = styled.div`
    color: #000000;
    font-family: Lato;
    font-size: 14px;
    line-height: 17px;
    word-break: normal;

    @media (min-width: 530px) {
        height: 57px;
    }
    
    @media (max-width: 530px) {
        height: 74px;
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
    useEffect(() => {
        if (widgetUpdates.length === 0) {
            onLoadWidgetUpdates().catch(error => {
                throw new Error(`Loading widget updates failed: ${error}`);
            });
        }
    }, []);

    return (
        <WidgetContainer>
            <WidgetHeader>FEATURED ITEMS</WidgetHeader>
            <WidgetContent>
                {
                    widgetUpdates.length > 0 && (
                        <Carousel controls={showArrows} interval={20000}>
                            {
                                widgetUpdates.map((item, idx) => {
                                    const itemKey = `update_${idx}`;
                                    const link = `/siteupdate#post${item.id}`;
                                    let desc = item.description;
                                    if (item.log_type === 0) {
                                        desc = desc.replace(/<a /g, "<a target=\"_blank\" ");
                                    } else {
                                        desc = desc.length > 100 ? `${desc.substr(0, 120)}...` : desc;
                                    }
                                    const hl = `${desc} <a href="${link}">Read More > </a>`;
                                    return (
                                        <Carousel.Item key={itemKey}>
                                            {
                                                item.log_type === 1 ? (
                                                    <WidgetCard>
                                                        <CardTitle>
                                                            <a href={link}>
                                                                {item.title}
                                                            </a>
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