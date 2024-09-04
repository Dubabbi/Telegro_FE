import React from "react";
import styled from 'styled-components';

const StyledFooter = styled.div`
    background: #fff;
    margin-bottom: 0;
`;

const FooterContent = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2rem 2rem;
    &.below {
        align-items: center;
        display: flex;
        flex-direction: row;
        margin-top: 0.2rem;
        margin-left: 3%;
    }
`;

const FooterText = styled.p`
    text-align: left;
    font-size: 13px;
    line-height: 15px;
    color: #000;
    font-weight: 600;
`;

const responsive = {
    large: `@media (max-width: 850px)`,
    small: `@media (max-width: 550px)`
};

const FooterHeading = styled.h1`
    ${responsive.large} {
        font-size: 44px;
        line-height: 50px;
    }
    ${responsive.small} {
        font-size: 34px;
        line-height: 42px;
    }
`;

export default function Footer() {
    return (
        <StyledFooter>
            <FooterContent>
                <FooterContent className="below">
                    <FooterText>© Copyright 2024 Telego</FooterText>
                </FooterContent>
            </FooterContent>
        </StyledFooter>
    );
}
