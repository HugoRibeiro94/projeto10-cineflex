import { useState } from "react";
import styled from "styled-components";

export default function Seats(props){

    const {name,isAvailable,seatsSelecionados,setSeatsSelecionados,indice} = props;
    console.log(indice);
    const [selecionado, setSelecionado] = useState(isAvailable);

    function selecionarAssento(selecionado,seatsSelecionados,indice){
        
        if(selecionado===false){
            alert("Esse assento não está disponível");
        }
        if(selecionado===true){
            setSelecionado('selecionado');
            setSeatsSelecionados([...seatsSelecionados,indice]);
        }
        if(selecionado==='selecionado'){
            setSelecionado(true);
            seatsSelecionados.pop();
        }
    } 
    console.log(seatsSelecionados);
    return(
        <>
            <SeatItem isAvailable={selecionado} data-test="seat" onClick={()=>selecionarAssento(selecionado,seatsSelecionados,indice)}>{name}</SeatItem>
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
        if(p.isAvailable==='selecionado'){
            return "rgba(123, 139, 153, 1)"
        }
    }};    
    background-color: ${(p)=>{
        if(p.isAvailable===true){
            return "rgba(195, 207, 217, 1)";
        }
        if(p.isAvailable===false){
            return "rgba(251, 225, 146, 1)";
        }
        if(p.isAvailable==='selecionado'){
            return "rgba(26, 174, 158, 1)";
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