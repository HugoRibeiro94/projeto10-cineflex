import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components"

export default function SuccessPage(props) {
    
    const { titulo,weekday,horario,ingressos,name, cpf} = props.sucesso;
    
    const navigate = useNavigate();

    function voltarHome() {
        navigate("/");
    }
    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer>
                <div data-test="movie-info">
                    <strong><p>Filme e sessão</p></strong>
                    <p>{titulo}</p>
                    <p>{weekday} - {horario}</p>
                </div>
            </TextContainer>

            <TextContainer>
                <strong><p>Ingressos</p></strong>
                <p data-test="seats-info">{ingressos.slice(1)}</p>
                
            </TextContainer>

            <TextContainer>
                <strong><p>Comprador</p></strong>
                <div data-test="client-info">
                    <p>Nome: {name}</p>
                    <p>CPF: {cpf}</p>
                </div>
            </TextContainer>

                <button data-test="go-home-btn" onClick={voltarHome}>Voltar para Home</button>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`