import styled from 'styled-components';

export const Container = styled.div`
    max-width: 900px;
    margin: 0 auto;
    padding-top: 180px;
    padding-bottom: 20px;
`;

export const Tabs = styled.div`
    display: flex;
    border-bottom: 1px solid #ccc;
`;

export const Tab = styled.button`
    padding: 10px 20px;
    border: none;
    background: none;
    cursor: pointer;
    border-bottom: 3px solid transparent;
    font-weight: ${(props) => (props.isActive ? 'bold' : 'normal')};
    color: ${(props) => (props.isActive ? '#000' : '#666')};

    &:hover {
        color: #000;
    }

    ${(props) => props.isActive && `
        border-bottom-color: #4871BF;
    `}
`;

export const Content = styled.div`
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 0 8px rgba(0,0,0,0.1);
`;

export const Section = styled.section`
    margin-bottom: 20px;
`;

export const Text = styled.div`
    font-size: 16px;
    color: #333;
    line-height: 1.5;
    text-align: justify;
    cursor: text;
    user-select: text;

    h1 {
        font-size: 24px;
        margin-bottom: 16px;
        color: #222;
        &::selection {
            background-color: #6584BE;
        }
    }
    h2 {
        margin: 15px 0;
        color: #4871BF;
        &::selection {
            background-color: #6584BE;
            color: black;
        }
    }
    p {
        margin-bottom: 10px;
        font-size: 14px;
        color: #666;
        &::selection {
            background-color: #6584BE;
            color: white;
        }
    }
    h4 {
        margin-bottom: 10px;
        font-size: 14px;
        color: #333;
        font-weight: semi-bold;
        &::selection {
            background-color: #6584BE;
        }
    }

    ul {
        padding-left: 20px;
    }

    li {
        margin-bottom: 8px;
        font-size: 13px;
        color: #666;
        display: list-item;
        list-style-type: disc;
        list-style-position: outside; 
        padding-left: 20px; 
        margin-left: 10px;
        text-indent: -20px; 
        &::selection {
            background-color: #6584BE;
            color: white;
        }
    }

`;