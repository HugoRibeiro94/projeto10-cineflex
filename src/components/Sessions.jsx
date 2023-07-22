import styled from "styled-components";

export default function Sessions(props){
    const {weekday, date, showtimes} = props;
    return(
        <>
            <SessionContainer>
                <div data-test="movie-day">{weekday} - {date}</div>                            
                    {showtimes.map( showtimes => 
                        <ButtonsContainer key = {showtimes.id}>
                            <button data-test="showtime" >{showtimes.name}</button>
                        </ButtonsContainer>)}                              
            </SessionContainer>
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