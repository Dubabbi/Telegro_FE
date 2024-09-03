import React, { useState } from 'react';
import * as S from './MainStyle';
import * as L from '../Login/LoginStyle';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import image1 from '/src/assets/image/image1.svg';
import image2 from '/src/assets/image/image2.svg';
import image3 from '/src/assets/image/image3.svg';
import image4 from '/src/assets/image/image4.svg';

export default function Main() {
    const images = [image1, image2, image3, image4];
    const [currentIndex, setCurrentIndex] = useState(0);

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
        <div style={{ marginTop: '12%', position: 'relative', alignItems: 'center', width: '100%', maxHeight: '100vh', overflow: 'hidden' }}>
            <button onClick={goToPrevious} style={{ position: 'absolute', top: '50%', left: '32px', zIndex: 1000 }}>{"<"}</button>
            <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} style={{ width: '100%', height: '100%', transition: 'transform 0.5s ease-in-out' }} />
            <button onClick={goToNext} style={{ position: 'absolute', top: '50%', right: '32px', zIndex: 1000 }}>{">"}</button>
        </div>
    );
}