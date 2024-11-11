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

export const Text = styled.p`
    font-size: 16px;
    color: #333;
    line-height: 1.5;
`;
