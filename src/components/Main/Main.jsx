import React, { useState } from 'react';
import * as M from './MainStyle';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import image1 from '/src/assets/image/Main/image1.svg';
import image2 from '/src/assets/image/Main/image2.svg';
import image3 from '/src/assets/image/Main/image3.svg';
import image4 from '/src/assets/image/Main/image4.svg';
import image5 from '/src/assets/image/Main/image5.svg';
import image6 from '/src/assets/image/Main/image6.svg';
import arrowleft from '/src/assets/image/Main/arrowleft.svg';
import arrowright from '/src/assets/image/Main/arrowright.svg';

export default function Main() {
    const images = [image1, image2, image3, image4, image5, image6];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showArrows, setShowArrows] = useState(false);

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <>
        <div style={{width: '100%', minHeight: '22.6vh', backgroundColor: '#000', border: 'none'}}>
        </div>
        <div 
          style={{ position: 'relative', alignItems: 'center', width: '100%', maxHeight: '100vh', overflow: 'hidden' }}
          onMouseEnter={() => setShowArrows(true)}
          onMouseLeave={() => setShowArrows(false)}
        >
            <img src={arrowleft} alt="Previous" onClick={goToPrevious}
                 style={{ cursor: 'pointer', position: 'absolute', top: '50%', left: '32px', zIndex: 1000, transform: 'translateY(-50%)', 
                          opacity: showArrows ? 1 : 0, transition: 'opacity 1s ease-in-out', transitionDelay: showArrows ? '0.5s' : '0s' }} />
            <img src={arrowright} alt="Next" onClick={goToNext}
                 style={{ cursor: 'pointer', position: 'absolute', top: '50%', right: '32px', zIndex: 1000, transform: 'translateY(-50%)',
                          opacity: showArrows ? 1 : 0, transition: 'opacity 1s ease-in-out', transitionDelay: showArrows ? '0.5s' : '0s' }} />
            <div style={{
                display: 'flex',
                transition: 'transform 0.5s ease-in-out',
                transform: `translateX(-${currentIndex * 100}%)`
            }}>
                {images.map((image, index) => (
                    <img key={index} src={image} alt={`Slide ${index}`} style={{ minWidth: '100%', height: '100%' }} />
                ))}
            </div>
        </div>
        </>

    );
}
