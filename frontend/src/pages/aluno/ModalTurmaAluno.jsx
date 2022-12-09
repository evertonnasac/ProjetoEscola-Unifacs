import { useState } from "react"
import api from "../../api/api"
import { Button } from "../../components/Button"
import { useEffect } from "react"
import "./ModalTurmaAluno.sass"

export const ModalTurmaAluno = ({visiblity, setVisibilty, matricula, modulo}) =>{
    
    const [disciplinas, setDisciplinas] = useState([])

    useEffect(() => {
        console.log(modulo)
        api.get("turma/modulos/" + modulo)
        .then(result => setDisciplinas(result.data))
        .catch(err => console.log(err))
    },[visiblity])

    const setAlunoOnTurma = async (idTurma) => {
        await api.post("/aluno/alocar", {matricula:matricula, turma : idTurma}).then(
            setDisciplinas((item) => {
                return item.map((disc) => disc.id_turma == idTurma ? {...disc, select : true } : {...disc} )
            })
        ).catch(err => console.log(err))

    }


    return(
        <div className={"modal_turma " + (visiblity == true ? "visibility" : "hidden") }>
            <div className="form_turma">
                {disciplinas.map((item)=> {
                    return <div className="content_disciplina">
                                <span className="nome_disciplina">{item.nome_disciplina}</span>
                                <span className="nome_professor">{item.nome_professor}</span>
                                <span className="desc_turma">{item.desc_turma}</span>  
                                {!item.select && 
                                    <div className="content_btn_turma">
                                    <Button onclick={() => setAlunoOnTurma(item.id_turma)} 
                                            type="primary">Adicionar</Button>
                                    </div>  
                                }    
                            </div>
                           
                })}
                    <div className="content_btn_modal_turma">
                        <Button type="primary" onclick={() => {
                            setVisibilty(!visiblity)}}>
                            Sair
                        </Button>
                    </div>
            </div>
        </div>
    )

}