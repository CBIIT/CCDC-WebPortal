import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Carousel from 'react-bootstrap/Carousel';
import ReactHtmlParser from "react-html-parser";
import externalIcon from "../../../assets/img/resource-00a272.svg";

const WidgetContainer = styled.div`
  box-sizing: border-box;
  display: grid;
  width: 480px;
  margin-top: 17px;
  background-color: #FFFFFF;
  box-shadow: -4px 11px 27px 6px rgba(28,29,29,0.5);
  opacity: 0.9;
  padding: 6px 25px 12px 25px;
`;

const WidgetHeader = styled.div`
    color: #213963;
    font-family: Lato;
    font-size: 13px;
    font-weight: 700;
    line-height: 15px;
`;

const WidgetContent = styled.div`
    width: 100%;
    margin-bottom: 15px;

    .carousel-indicators {
        padding: 0;
        margin: 0;
        right: 0;
        bottom: -10px;
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
    color: #059268;
    font-family: Lato;
    font-size: 23px;
    font-weight: 900;
    line-height: 25px;
`;

const CardDescription = styled.div`
    color: #000000;
    font-family: Lato;
    font-size: 14px;
    line-height: 15px;
    padding-top: 6px;
    height: 80px;

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
                        <Carousel controls={showArrows} interval={500000}>
                            {
                                widgetUpdates.map((item, idx) => {
                                    const itemKey = `update_${idx}`;
                                    return (
                                        <Carousel.Item key={itemKey}>
                                            <WidgetCard>
                                                <CardTitle>{item.title}</CardTitle>
                                                <CardDescription>{ReactHtmlParser(item.description)}</CardDescription>
                                            </WidgetCard>
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