import React, { useState } from 'react';
import * as M from '../Main/MainStyle';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import image1 from '/src/assets/image/Main/image1.svg';
import image2 from '/src/assets/image/Main/image2.svg';
import image3 from '/src/assets/image/Main/image3.svg';
import image4 from '/src/assets/image/Main/image4.svg';
import arrowleft from '/src/assets/image/Main/arrowleft.svg';
import arrowright from '/src/assets/image/Main/arrowright.svg';

export default function Admin() {
    const images = [image1, image2, image3, image4];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slideIn, setSlideIn] = useState(true);
    const [showArrows, setShowArrows] = useState(false);

    const goToPrevious = () => {
        setSlideIn(false);
        setTimeout(() => {
            const isFirstSlide = currentIndex === 0;
            const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
            setCurrentIndex(newIndex);
            setSlideIn(true);
        }, 200); 
    };

    const goToNext = () => {
        setSlideIn(false);
        setTimeout(() => {
            const isLastSlide = currentIndex === images.length - 1;
            const newIndex = isLastSlide ? 0 : currentIndex + 1;
            setCurrentIndex(newIndex);
            setSlideIn(true);
        }, 200);
    };

    return (
        <>
        <div style={{width: '100%', minHeight: '22.6vh', backgroundColor: '#000', border: 'none'}}>
        </div>
        <div style={{ position: 'relative', alignItems: 'center', width: '100%', maxHeight: '100vh', overflow: 'hidden' }}
             onMouseEnter={() => setShowArrows(true)}
             onMouseLeave={() => setShowArrows(false)}>
            {showArrows && (
                <>
                <img src={arrowleft} alt="Previous" onClick={goToPrevious}
                     style={{ cursor: 'pointer', position: 'absolute', top: '50%', left: '32px', zIndex: 1000, transform: 'translateY(-50%)' }} />
                <img src={arrowright} alt="Next" onClick={goToNext}
                     style={{ cursor: 'pointer', position: 'absolute', top: '50%', right: '32px', zIndex: 1000, transform: 'translateY(-50%)' }} />
                </>
            )}
            <div style={{
                display: 'flex',
                transition: 'transform 0.5s ease-in-out',
                transform: `translateX(-${currentIndex * 100}%)`
            }}>
                {images.map((image, index) => (
                    <img key={index} src={image} alt={`Slide ${index}`} style={{ width: '100%', height: '100%' }} />
                ))}
            </div>
        </div>
        <div style={{width: '100%', minHeight: '20vh', backgroundColor: '#fff', border: 'none'}}>
        </div>
        <M.ContactWrapper>
            <div><h1>LET'S TALK</h1><p>Welcome to inquire or leave us a message, we will serve you wholeheartedly!</p></div>
            <M.Contact>Contact Us!</M.Contact>
        </M.ContactWrapper>
        </>
    );
}