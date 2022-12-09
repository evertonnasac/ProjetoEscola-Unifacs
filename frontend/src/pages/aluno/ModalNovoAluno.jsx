import { useState } from "react"
import {Input} from "../../components/Input"
import api from "../../api/api"
import "./ModalNovoAluno.sass"
import { Button } from "../../components/Button"

export const ModalNovoAluno = ({visibility, setVisibility}) => {

    const  [aluno, setAluno] = useState({name: "", cpf: "", modulo : 1})

    const handleAluno = (e) => {
        setAluno({...aluno, [e.target.name] : e.target.value})
    }

    const saveAluno = async () => {
       await api.post("/aluno", {...aluno})
       setAluno({name: "", cpf : "", modulo: 1})
       setVisibility("visibility")
    }
   
    return(
        <div className={"modal " + (visibility == true ? "visibility"  : "hidden")}>
            <div className = "form">
            <p className="title">Cadastrar Novo Aluno</p>
                <div className="container_input">
                    <Input
                        name="name"
                        placeholder = "Informe o nome do aluno"
                        text = "Nome"
                        type = "text"
                        value={aluno.name}
                        handleOnChange = {handleAluno}
                    />
                </div>
                <div className="container_input">
                    <Input
                        name="cpf"
                        placeholder = "Informe o CPF do aluno"
                        text = "CPF"
                        type = "text"
                        value={aluno.cpf}
                        handleOnChange = {handleAluno}
                    />
                </div>
                <div className="container_btn_modal">
                    <div className="content_btn_modal">
                        <Button onclick={saveAluno} type="primary"> Cadastrar</Button>
                    </div>
                    <div className="content_btn_modal">
                        <Button type="error" onclick={() => {
                            setVisibility(!visibility)
                            setAluno({name: "", cpf : "", modulo: 1})}}>
                            Cancelar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}