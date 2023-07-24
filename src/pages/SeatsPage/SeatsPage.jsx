import axios from "axios";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components"
import Footer from "../../components/Footer";
import Seats from "../../components/Seats";
import { useState } from "react";

export default function SeatsPage() {

    const {idSessao} = useParams();
    const [seats, setSeats] = useState([]);
    const [imagem, setImagem] = useState();
    const [titulo, setTitulo] = useState();
    const [weekday, setWeekday] = useState();
    const [horario, setHorario] = useState();
    const [seatsSelecionados, setSeatsSelecionados] = useState([]);
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");

    useEffect(() =>{
        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`);

        promise.then( (resposta) => {
            setSeats(resposta.data.seats);
            console.log(resposta.data.seats);
            setImagem(resposta.data.movie.posterURL);
            setTitulo(resposta.data.movie.title);
            setHorario(resposta.data.name);
            setWeekday(resposta.data.day.weekday);
        });

        promise.catch( (erro) => {
            console.log(erro.response.data)
        });

    },[]);

    function salvarCompra(event){

        event.preventDefault();

        const novaCompra = {
            ids: seatsSelecionados,
            name: name,
            cpf: cpf
        }

        const promise = axios.post('https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many',novaCompra);
        promise.then(resposta=> console.log(resposta.data));
        promise.catch( erro => alert('nao foi'));
    }
    console.log(seatsSelecionados);
    return (
        <PageContainer>
            Selecione o(s) assento(s)
            <SeatsContainer>
                {seats.map( seats => 
                    <Seats
                        key={seats.id}
                        indice={seats.id}
                        name={seats.name}
                        isAvailable={seats.isAvailable}
                        seatsSelecionados={seatsSelecionados}
                        setSeatsSelecionados={setSeatsSelecionados}/>
                    )}
            </SeatsContainer>
            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle item={'selecionado'} />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle item={'disponivel'} />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle item={'indisponivel'} />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                <form >
                    Nome do Comprador:
                    <input 
                        data-test="client-name" 
                        value={name}
                        onChange={ e => setName(e.target.value)} 
                        type="text" 
                        placeholder="Digite seu nome..." 
                        required
                    />

                    CPF do Comprador:
                    <input 
                        data-test="client-cpf" 
                        value={cpf}
                        onChange={ e => setCpf(e.target.value)}
                        type="number" 
                        placeholder="Digite seu CPF..." 
                        required
                    />
                    <Link to="/sucesso">
                        <button 
                            data-test="book-seat-btn" 
                            type="submit"
                            onClick={salvarCompra} 
                            >
                                Reservar Assento(s)
                        </button>
                    </Link>
                </form>
            </FormContainer>

            <Footer imagem={imagem} titulo={titulo} weekday={weekday} name={horario}/>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${(p)=>{
        if(p.item==='disponivel'){
            return "rgba(123, 139, 153, 1)";
        }
        if(p.item==='indisponivel'){
            return "rgba(247, 197, 43, 1)";
        }
        if(p.item==='selecionado'){
            return "rgba(123, 139, 153, 1)";
        }
    }};       // Essa cor deve mudar
    background-color:  ${(p)=>{
        if(p.item==='disponivel'){
            return "rgba(195, 207, 217, 1)";
        }
        if(p.item==='indisponivel'){
            return "rgba(251, 225, 146, 1)";
        }
        if(p.item==='selecionado'){
            return "rgba(26, 174, 158, 1)";
        }
    }};   // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
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