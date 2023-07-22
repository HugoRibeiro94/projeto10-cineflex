import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components"
import Sessions from "../../components/Sessions";

export default function SessionsPage() {

    const {idFilme} = useParams();
    const [sessions, setSessions] = useState([]);
    const [imagem, setImagem] = useState();
    const [titulo, setTitulo] = useState();

    useEffect(() =>{
        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`);

        promise.then( (resposta) => {
            setSessions(resposta.data.days);
            console.log(resposta.data.days);
            setImagem(resposta.data.posterURL);
            setTitulo(resposta.data.title);
            console.log(idFilme);
            
        });

        promise.catch( (erro) => {
            console.log(erro.response.data)
        });

    },[]);
   
    return (
        <PageContainer>
            Selecione o horário
            <div>
                {sessions.map((sessions) => (
                    <Sessions

                        key = {sessions.id}
                        weekday = {sessions.weekday}
                        date = {sessions.date}
                        showtimes = {sessions.showtimes}/>
                ))}
            </div>

            <FooterContainer>
                <div data-test="footer">
                    <img src={imagem} alt="poster" />
                </div>
                <div>
                    <p>{titulo}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`

const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`