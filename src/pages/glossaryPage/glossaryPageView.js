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
`;

const Glossary = ({
    glossaryLetters,
    onLoadGlossaryLetters,
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
            <div>{key}</div>
        </GlossaryContainer>
    );
};

Glossary.propTypes = {
    glossaryLetters: PropTypes.object.isRequired,
    onLoadGlossaryLetters: PropTypes.func.isRequired,
  };

export default Glossary;