import styled from 'styled-components';
export const NavWrapper = styled.div`
  top: 0;
  width: 100%;
  background: #000;
  display: flex;
  align-items: center;
  z-index: 1000;
  padding: 1%;
  margin: 0;
`;

export const Logo = styled.a`
  width: 200px;
  font-size: 3rem;
  color: white;
  text-align: center;
  font-weight: bold;
  flex-shrink: 0;
`;

export const Inline = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin: 10%;
    margin-bottom: 5%;
    margin-top: 5%;
    flex-wrap: wrap;
`

export const Content = styled.div`
    position: relative;
    flex: 1;
    h1{
        font-size: 3rem;
        font-weight: bold;
    }

    p{
        font-size: 1.6rem;
        margin-top: 3%;
    }
`
export const Img = styled.img`
    max-height: 100vh;
    margin-right: 1%;
    width: auto;
    object-fit: cover; /* 이미지를 컨테이너 안에 꽉 채움 */
`

export const ImgWrapper = styled.div`
    width: 350px; /* 너비를 고정 */
    height: 450px; /* 높이를 고정 */
    display: flex;
    justify-content: center;
    align-items: center;
`;


  

export const LandingWrapper = styled.div`
    background-color: #F2F4F8;
    font-family: Roboto;
`

export const ButtonWrapper = styled.div`
    margin-top: 10%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 2%;
`

export const FirstButton = styled.button`
    background-color: #0F62FE;
    color: #fff;
    border-radius: 0.2rem;
    font-size: 1.7rem;
    padding: 2% 3%;
    white-space: nowrap;
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    p{
        align-items: center;
        margin: 3%;
    }
    img{
        max-width: 25%;
        margin: 3%;
        align-items: center;
    }
`

export const SecondButton = styled.button`
    background-color: #ffffff;
    color: #0F62FE;
    border-radius: 0.2rem;
    border: 1px solid #0F62FE;
    white-space: nowrap;
    font-size: 1.7rem;
    padding: 2% 3%;
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    p{
        align-items: center;
        margin: 3%;
    }
    img{
        max-width: 25%;
        margin: 3%;
        align-items: center;
    }
`

export const Intro = styled.div`
    text-align: center;
    align-items: center;
    position: relative;
    justify-content: center;
    margin-bottom: 5%;
`

export const InlineIntro = styled.div`
    text-align: center;
    align-items: center;
    margin-top: 10%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 3%;
`

export const Title = styled.div`
    background-color: #0F62FE;
    color: #fff;
    font-size: 2.2rem;
    padding: 0.8% 2%;
    border-radius: 3rem;
    font-weight: bold;
`

export const About = styled.div`
    font-size: 1rem;
    p{
        font-size: 1.3rem;
        font-weight: bold;
        margin-bottom: 1%;
    }

    h1{
        color: #0F62FE;
        font-weight: bold;
        font-size: 2rem;
    }
`

export const List = styled.div`
    font-size: 1.1vw;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 2%;
    p{
        cursor: pointer;
        text-decoration: underline;
    }
`

export const FooterWrapper = styled.div`
    background-color: #697077;
    font-size: 1.2vw;
    padding: 2% 0;
    margin-top: 4%;

`

export const FooterInline = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 90%;
    margin-left: 5%;

`

export const Footerline = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 80%;
    margin-left: 5%;

`

export const FooterTitle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 5%;

    img{
        max-height: 30%;
    }
    p{
        font-size: 1.44vw;
        color: #C1C7CD;
        font-weight: bold;
        @media(max-width: 800px){
            font-size: 1.64rem;
        }
    }

`
export const FooterEnd = styled.div`
    display: flex;
    background-color: #F2F4F8;
    border-radius: 2px;
    padding-left: 1%;
    padding-right: 3%;
    align-items: center;
    img{
        max-width: 20%;
        align-items: center;
    }
    p{
        font-size: 1vw;
        color: #697077;
        align-items: center;
        margin-bottom: 3%;
        @media(max-width: 800px){
            font-size: 1rem;
            padding-right: 5%;
        }
    }

`

export const FooterBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    white-space: nowrap;
    width: 40%;
    gap: 2%;
`

export const Contact = styled.button`
    background-color: #0F62FE;
    color: #fff;
    border: 1px solid #0F62FE;
    border-radius: 0.2rem;
    font-size: 1.5rem;
    padding: 2% 3%;
    border-radius: 2px;
    align-items: center;
    display: flex;
    font-weight: Semibold;
    flex-direction: row;
    justify-content: space-around;
    p{
        align-items: center;
        margin: 1%;
    }
`
export const TextWrapper = styled.div`
    flex-direction: column;
    text-align: left;
    margin-top: 3%;
    margin-bottom: 3%;
    color: #fff;
    margin-left: 5%;
    h1{
        font-size: 1.4rem;
        font-weight: semibold;
        margin-bottom: 1.3%;
    }

    p{
        font-size: 1.2rem;
        margin-bottom: 0.7%;
    }
`

export const Copyright = styled.div`
    flex-direction: column;
    text-align: left;
    margin-top: 2%;
    margin-bottom: 2%;
    color: #fff;
    margin-left: 5%;
    font-size: 1.3rem;
`