import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as ScrollToTopButton } from '../../assets/img/Scroll_to_top.svg';
import { ReactComponent as ScrollToTopButtonActive } from '../../assets/img/Scroll_to_top_active.svg';

const Button = styled.div`
   position: fixed; 
   right: 25px;
   bottom: 25px;
   height: 50px;
   width: 50px;
   font-size: 3rem;
   z-index: 1;
   cursor: pointer;
`;

const ScrollButton = () => {
    const [visible, setVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
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
        <Button onClick={scrollToTop} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} style={{display: visible ? 'inline' : 'none'}}>
            {!isHovering && <ScrollToTopButton style={{ display: 'block' }} />}
            {isHovering && <ScrollToTopButtonActive style={{ display: 'block' }} />}
        </Button>
    );
};

export default ScrollButton;
