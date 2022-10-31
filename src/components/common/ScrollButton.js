import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Button = styled.div`
   position: fixed; 
   width: 46px;
   left: 95%;
   bottom: 50px;
   height: 46px;
   border-radius:24px;
   font-size: 3rem;
   z-index: 1;
   cursor: pointer;
   color: #2DC799;
   background-color: #333333;
   :hover {
    color: #059268;
    cursor: pointer;
    background-color: #fff;
   }
   .icon-style {
    transform: translate(-1px, -14.5px);
   } 
`;

const ScrollButton = () => {
    const [visible, setVisible] = useState(false);
    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 200) {
            setVisible(true);
        } else if (scrolled <= 200) {
            setVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisible);
    }, []);

    return (
        <Button onClick={scrollToTop} style={{display: visible ? 'inline' : 'none'}}>
            <i className="fas fa-arrow-circle-up icon-style" />
        </Button>
    );
};

export default ScrollButton;
