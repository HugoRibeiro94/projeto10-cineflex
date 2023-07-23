import { Link } from "react-router-dom";
import styled from "styled-components";
import Footer from "./Footer";

export default function Sessions(props){
    const {weekday, date, showtimes, imagem, titulo} = props;
    return(
        <>
            <SessionContainer>
                <div data-test="movie-day">
                    {weekday} - {date}                            
                    {showtimes.map( showtimes =>
                        <Link to = {`/assentos/${showtimes.id}`} key={showtimes.id} data-test="showtime"> 
                            <ButtonsContainer key = {showtimes.id}>
                                <button data-test="showtime" >{showtimes.name}</button>
                            </ButtonsContainer>
                        </Link>)}
                </div>                              
            </SessionContainer>

            <Footer imagem={imagem} titulo={titulo}/>
        </>
    )
}

const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
    }
    a {
        text-decoration: none;
    }
`