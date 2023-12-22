import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';
import externalIcon from "../../assets/img/dataset-body.svg";

const GlossaryContainer = styled.div`
    a[target="_blank"] {
        background: url(${externalIcon}) right center no-repeat;
        padding-right: 30px;
        background-size: 32px;
        display: inline-table;
    }

    .glossaryPageContainer {
        margin: 0 auto;
        width: 1250px;
    }

    .glossaryPageHeader {
        padding: 50px 10px 20px 30px;
    }

    .glossaryHeaderText {
        color: #004187;
        font-size: 40px;
        font-family: Inter;
        font-weight: 600;
        line-height: 40px;
    }

    .filterLinks a:hover {
        color: #00a272;
    }

    .nav {
        width: 920px;
        height: 40px;
        text-align: center;
        margin-left: 140px;
        margin-top: 40px;
        margin-bottom: 50px;
        background-color: #F5F5F5;
        border-radius: 20px 20px 20px 20px;
    }

    .nav-link {
        width: 3%;
        color: black;
        position: relative;
        top: -20px;
    }

    .disabled {
        color: rgb(160, 160, 160);
    }

    .nav-link-active {
        color: #00a272;
        font-weight: bold;
        text-decoration: underline;
        text-underline-offset: 3px;
        text-decoration-thickness: 3px;
    }

    .glossaryGrid{
        color: white;
        border-bottom: 1px solid lightgray;
    }

    .glossaryPageSection1 {
        margin: 0 auto;
        width: 1250px;
        border-left: 1px solid lightgray;
        border-right: 1px solid lightgray;
    }

    .glossaryContent1 {
        width: 83%;
        padding: 40px 0px 60px 0px;
        text-align: left;
        margin-left: 100px;
        margin-right: 100px;
    }

    .filter-sections {
        width: 100%;
        display: block;
        overflow: hidden;
    }

    .filter-sections div {
        min-height: 50px;
        margin: 0.5em;
    }

    .glossaryItemHeader {
        color: #00a272;
        font-family: Inter;
        font-weight: 600;
        margin-bottom: 0px;
    }

    .glossaryItemType {
        color: #838383;
        font-size: 85%;
        font-family: Inter;
        font-weight: 600;
    }

    .glossaryItemDescription {
        padding-top: 5px;
        font-family: Lato;
        font-size: 17px;
    }

    .glossaryItemLink {
        margin-top: -10px;
        color: #00a272;
    }

    .glossaryItemLink a {
        margin-top: -10px;
        font-weight: 500;
        font-family: Lato;
        font-size: 17px;
        color: #00a272;
        text-decoration: none;
    }
`;

const Glossary = ({
    glossaryLetters,
    glossaryDetails,
    onLoadGlossaryLetters,
    onLoadGlossaryTermsByFirstLetter,
}) => {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const [key, setKey] = useState('A');

    const activeStyle = {
        color: '#00a272',
        fontWeight: 'bold',
        textDecoration: 'underline',
        textUnderlineOffset: '3px',
        textDecorationThickness: '3px',
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        if (Object.keys(glossaryLetters).length === 0) {
            onLoadGlossaryLetters().catch(error => {
                throw new Error(`Loading Glossary Letters from url query failed: ${error}`);
            });
        }
    }, []);

    useEffect(() => {
        if (!glossaryDetails[key]) {
            const termPara = {firstLetter: key};
            onLoadGlossaryTermsByFirstLetter(termPara).catch(error => {
                throw new Error(`Loading Glossary Terms By First Letter from url query failed: ${error}`);
            });
        }
    }, [key]);

    return (
        <GlossaryContainer>
            <div className="glossaryPageContainer">
                <div className="glossaryPageHeader">
                    <h2 className="glossaryHeaderText">
                        Data Catalog Glossary
                        <br />
                    </h2>
                    <div className="filterLinks">
                        <nav className="nav justify-content-center">
                        {
                            letters.map((letter, idx) => {
                                const glossaryidx = `glossary_${idx}`;
                                return (
                                    <a key={glossaryidx} className={glossaryLetters[letter] ? "nav-link" : "nav-link disabled"} style={key === letter ? activeStyle : null} href="#" onClick={() => setKey(letter)}>{letter}</a>
                                );
                            })
                        }
                        </nav>
                    </div>
                </div>
            </div>
            <div className="glossaryGrid" />
            <div className="glossaryPageSection1">
                <div className="glossaryContent1">
                    <div className="filter-sections">
                        {
                            glossaryDetails[key] && glossaryDetails[key].map((glossaryItem, idx) => {
                                const glossaryItemIdx = `glossaryItem_${idx}`;
                                const linkArr = glossaryItem.reference.split("http");
                                return (
                                    <div key={glossaryItemIdx}>
                                        <h2 className="glossaryItemHeader">{glossaryItem.name}</h2>
                                        <span className="glossaryItemType">{glossaryItem.category}</span>
                                        <p className="glossaryItemDescription">{glossaryItem.definition}</p>
                                        {
                                            glossaryItem.reference.includes("http")
                                            && (
                                                <>
                                                    <p className="glossaryItemLink">{linkArr[0].trim()}</p>
                                                    <p className="glossaryItemLink"><a href={'http'.concat(linkArr[1])} target="_blank" rel="noreferrer noopener">{'http'.concat(linkArr[1])}</a></p>
                                                </>
                                            )
                                        }
                                        <br />
                                    </div>
                                );
                            })
                        }
                        <br />
                    </div>
                </div>
            </div>
        </GlossaryContainer>
    );
};

Glossary.propTypes = {
    glossaryLetters: PropTypes.object.isRequired,
    glossaryDetails: PropTypes.object.isRequired,
    onLoadGlossaryLetters: PropTypes.func.isRequired,
    onLoadGlossaryTermsByFirstLetter: PropTypes.func.isRequired,
  };

export default Glossary;