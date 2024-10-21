import React, { useState, useEffect } from 'react';
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
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 780);

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

    useEffect(() => {
        // 780px 이하일 때 자동 슬라이드 설정
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 780);
        };

        window.addEventListener('resize', handleResize);

        let interval;
        if (isMobile) {
            interval = setInterval(() => {
                goToNext();
            }, 3000);
        }

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, [currentIndex, isMobile]);

    return (
        <>
        <div style={{width: '100%', minHeight: '160px', backgroundColor: '#000', border: 'none'}}></div>
        <M.NewContainer
          onMouseEnter={() => setShowArrows(!isMobile && true)}
          onMouseLeave={() => setShowArrows(false)}
        >
            {/* 780px 초과일 때만 화살표 표시 */}
            {!isMobile && (
                <>
                <img src={arrowleft} alt="Previous" onClick={goToPrevious}
                    style={{ cursor: 'pointer', position: 'absolute', top: '50%', left: '32px', zIndex: 100, transform: 'translateY(-50%)', 
                             opacity: showArrows ? 1 : 0, transition: 'opacity 1s ease-in-out', transitionDelay: showArrows ? '0.5s' : '0s' }} />
                <img src={arrowright} alt="Next" onClick={goToNext}
                    style={{ cursor: 'pointer', position: 'absolute', top: '50%', right: '32px', zIndex: 100, transform: 'translateY(-50%)',
                             opacity: showArrows ? 1 : 0, transition: 'opacity 1s ease-in-out', transitionDelay: showArrows ? '0.5s' : '0s' }} />
                </>
            )}
            <div style={{
                display: 'flex',
                transition: 'transform 0.5s ease-in-out',
                transform: `translateX(-${currentIndex * 100}%)`
            }}>
                {images.map((image, index) => (
                    <M.ItemImage key={index} src={image} alt={`Slide ${index}`}/>
                ))}
            </div>
        </M.NewContainer>
        </>
    );
}
