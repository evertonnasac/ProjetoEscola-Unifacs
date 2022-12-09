import { useEffect } from "react"
import { useState } from "react"
import {Input} from "../../components/Input"
import api from "../../api/api"
import { Button } from "../../components/Button"
import "./Disciplina.sass"

export const Disciplina = () => {

    const [disciplinas, setDisciplinas] = useState([])
    const [disciplina, setDisciplina] = useState({nome: "", modulo : 0})

    const getApi = () =>{
        api.get("/disciplina").then(result => setDisciplinas(result.data))
    }

    const savedisciplina = () =>{
        api.post("/disciplina", {...disciplina}).then(result => console.log(result))
        setDisciplina({nome: "", modulo : 0})
        getApi()
    }


    const handleDisciplina = (e) => {
        setDisciplina({...disciplina, [e.target.name] : e.target.value })
    }


    useEffect(() => {
        api.get("/disciplina").then(result => setDisciplinas(result.data))
    },[])

    return(
        <section className="main_disciplina">
            <article className="form_disciplina">
                <div className="content_input_disc">
                    <Input
                        name = "nome"
                        text= "Disciplina"
                        placeholder="Digite o nome da disciplina"
                        type="text"
                        value={disciplinas.nome}
                        handleOnChange = {handleDisciplina}
                    />
                </div>
                <div className="content_select_disc">
                    <label htmlFor="titulo">Modulo</label>
                    <select name="modulo" id="titulo" className="inputOut pointer" 
                            onChange = {handleDisciplina} >

                        <option value="">Selecione</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                    </select>
                </div>
            </article>
            <div className="container_btn_add_disc" >
                <Button onclick={savedisciplina} type="primary">Incluir</Button>
             </div>
                

            <section className="container_disciplina">
                {disciplinas.map((item) => {
                    return <div className="row_disciplina">
                                <div className="nome_disciplina">
                                    {item.nome_disciplina} - M{item.modulo}
                                 </div>
                               
                           </div>
                })}
            </section>
        </section>
    )
}
