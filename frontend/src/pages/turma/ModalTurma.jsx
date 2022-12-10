import { useEffect } from "react"
import { useState } from "react"
import api from "../../api/api"
import { Button } from "../../components/Button"
import "./ModalTurma.sass"


export const ModalTurma = ({visiblity, setVisibilty, setProfessor}) =>{

    const [listProfessor, setListProfessor] = useState([])

    const selectProfessor = (id, nome) => {
        setProfessor(id, nome)
        setVisibilty(visiblity => !visiblity)
    }

    if(visiblity){
        api.get("/professor")
        .then(result => setListProfessor(result.data))
        .catch(err => console.log(err))
    }
   

    return(
        <div className={"modal_professor " + (visiblity == true ? "visibility" : "hidden") }>
            <div className="container_rows_professor">
         
                {listProfessor.map((item)=> {
                    return <div onClick={() => selectProfessor(Number(item.id_professor), item.nome_professor)} 
                                className="row_professor">{item.nome_professor}</div>
                           
                })}
            </div>
        </div>
    )

}