import { useState } from "react"
import api from "../../api/api"
import {Button} from "../../components/Button"
import "./ModalBoletim.sass"


export const ModalBoletim = ({visibility, setVisibility, matricula, modulo}) => {

    const[nota, setNota] = useState()
    const [situacao, setSituacao] = useState("")

    const handleNota = (e) => {
        setNota(e.target.value)
    }
    const setBoletim = () => {
        nota < 6 ? setSituacao("Reprovado") : setSituacao("Aprovado")

        api.post("aluno/boletim", {matricula: matricula, modulo: modulo, nota: nota})
        .then(result => console.log(result))
        .catch(err => console.log(err))
        
    }

    return (
        <section className={"modal_nota "+ (visibility == true ? "visibility"  : "hidden")}>
            <div className="containet_main">
                <div className="content_input_nota">
                    <label htmlFor="nota">Nota</label>
                    <input type="number" 
                        name="nota" 
                        min="0" max="10" 
                        placeholder="Informe a nota do aluno" 
                        value = {nota}
                        onChange = {handleNota}
                        />
                </div>
                <div className={"content_button_boletim " + situacao} >
                    <Button type="primary" onclick={setBoletim}>Salvar</Button>
                </div>
                <div className="content_button_boletim " >
                    <Button type="error" onclick={() => setVisibility(!visibility)}>Sair</Button>
                </div>
                
                <div className= {"message " + situacao}>{situacao}</div>
            </div>
            
        </section>
    )
}