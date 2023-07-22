import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components"
import Sessions from "../../components/Sessions";
import Footer from "../../components/Footer";

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

            <Footer imagem={imagem} titulo={titulo}/>

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