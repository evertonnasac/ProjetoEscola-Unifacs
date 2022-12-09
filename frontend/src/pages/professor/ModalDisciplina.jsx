import { useEffect } from "react"
import { useState } from "react"
import api from "../../api/api"
import { Button } from "../../components/Button"
import "./ModalDisciplina.sass"


export const ModalDisciplina = ({visiblity, setVisibilty, setDisciplina}) =>{

    const [disciplinas, setDisciplinas] = useState([])

    const selectDisciplina = (id, nome) => {
        setDisciplina(id, nome)
        setVisibilty(visiblity => !visiblity)
    }

    if(visiblity){
        api.get("/disciplina")
        .then(result => setDisciplinas(result.data))
        .catch(err => console.log(err))
    }
   

    return(
        <div className={"modal_disciplina " + (visiblity == true ? "visibility" : "hidden") }>
            <div className="container_rows_disciplina">
         
                {disciplinas.map((item)=> {
                    return <div onClick={() => selectDisciplina(Number(item.id_disciplina), item.nome_disciplina)} 
                                className="row_disciplina">{item.nome_disciplina}</div>
                           
                })}
            </div>
        </div>
    )

}