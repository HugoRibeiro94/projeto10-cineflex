import { useState } from "react";
import styled from "styled-components";

export default function Seats(props){

    const {name,isAvailable} = props;
    const [selecionado, setSelecionado] = useState(isAvailable);
    console.log(selecionado);

    function selecionarAssento(name){
        console.log(name);
        setSelecionado(name)
        console.log(selecionado);
    }
    return(
        <>
            <SeatItem isAvailable={isAvailable} data-test="seat" onClick={()=>selecionarAssento(name)}>{name}</SeatItem>
        </>
    );
}


const SeatItem = styled.div`
    border: 1px solid ${(p)=>{
        if(p.isAvailable===true){
            return "rgba(123, 139, 153, 1)";
        }
        if(p.isAvailable===false){
            return "rgba(247, 197, 43, 1)";
        }
    }};    
    background-color: ${(p)=>{
        if(p.isAvailable===true){
            return "rgba(195, 207, 217, 1)";
        }
        if(p.isAvailable===false){
            return "rgba(251, 225, 146, 1)";
        }
    }};    
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`