import React from 'react';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import Carousel from '../../components/common/Carousel';
import './landingPage.css';

const carouselCards = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}];

export default function HomePage() {
    return (
        <>
            <div className="searchContainer">
                <div className="heroImage" />
                <div className="heroTextContainer">
                    <div className="heroTextWrapper">
                        <div className="headerTitle">
                            Explore the Childhood Cancer Dataset Catalog
                        </div>
                        <div className="headerButtonSection">
                            <Link to="/about" className="headerLink">
                                <Button className="buttonText">
                                    <h6>
                                    &nbsp;About CCDC &emsp;&emsp;&emsp;
                                    <span style={{ color: 'gold' }}>&#9658;</span>
                                    </h6>
                                </Button>
                            </Link>
                        </div>
                        <div style={{ padding: 20, background: 'white', opacity: '0.0' }} />
                        <div className="sbExample-1">
                            <div className="search">
                                <input type="text" className="searchTerm" placeholder="  Search the Catalog " />
                                <button type="submit" className="searchButton">
                                    <svg
                                      width="30"
                                      fontWeight="500"
                                      ariaHidden="true"
                                      focusable="false"
                                      dataPrefix="fas"
                                      dataIcon="search"
                                      className="searchIcon"
                                      role="img"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 512 512"
                                    >
                                        <path
                                          fill="goldenrod"
                                          d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0
                                            208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7
                                            99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7
                                                0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128
                                                57.2 128 128 0 70.7-57.2 128-128 128z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="headerButtonSection">
                            <Link to="/advancedsearch" className="headerLink">
                                <Button className="buttonText">
                                    <h6>
                                    &nbsp;Advanced Search &emsp;
                                    <span style={{ color: 'gold' }}>&#9658;</span>
                                    </h6>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="cards">
                <Carousel show={3} cards={carouselCards} />
            </div>
            <div className="infoContainer">
                <div className="heroImage2" />
                <div className="heroTextContainer">
                    <div className="heroTextWrapper2">
                    <div className="row">
                        <div className="column1">
                            <div className="headerTitle2">
                                The CCDC&apos;s Approach to Delivering Data is Simple and Innovative
                            </div>
                            <div className="headerContent2">
                                WHAT CAN YOU EXPECT FROM THE CCDC
                            </div>
                        </div>
                        <div className="column2">
                            <p className="infoSection">
                                Explaination of new features, new resources, or highlighted user
                                success story. Use this space to explain the purpose of the CCDC
                                and goals for the site.
                                <br />
                                <br />
                                Give the site visitor the context to learn how this might help them,
                                both now and in the future. What is it that the user can do in the
                                CCDC that is difficult to do without CCDC?
                                <br />
                                <br />
                                Give the new site visitor some information to make them interested
                                in the capabilities of CCDC.
                                <br />
                                <br />
                            </p>
                            <Link to="/about" className="headerLink2">
                                <Button className="buttonText color-black">
                                    <h6>
                                        &nbsp;LEARN MORE &emsp;&emsp;&emsp; &emsp;&emsp;&emsp;
                                        <span style={{ color: 'gold' }}>&#9658;</span>
                                    </h6>
                                </Button>
                            </Link>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
}