import {Input} from "../../components/Input"
import { Button } from "../../components/Button"
import { useState } from "react"
import { useEffect } from "react"
import { ModalTurma } from "./ModalTurma"
import api from "../../api/api"

import "./Turma.sass"

export const Turma = () => {

    const [turma, setTurma] = useState({descricao:"", sala: "", professor: 0})
    const [listTurma, setListTurma] = useState([])
    const [professor, setProfessor] =  useState("")
    const [visibility, setVisibilty] = useState(false)


    const setProfessorProp = (id,name) => {
        setTurma ({...turma, professor : id})
        setProfessor(name)
        console.log(turma)
    }

    const handleTurma = (e) => {
        setTurma ({...turma, [e.target.name] : e.target.value})
        console.log(turma)
    }

    const getListTurma =  async () => {
        const result = await api.get("/turma")
        setListTurma(result.data)
    }

    const saveTurma = async () => {
        await api.post("/turma", {...turma}).catch(err => console.log(err))
        getListTurma()
        setListTurma({descricao:"", sala: "", professor: 0})
        setProfessor("")
    }

    useEffect(()=>{

        const execApi = async () => {
            await getListTurma()
        }

        execApi()
            
    },[])

    return (
        <section className="page_turma">

            <ModalTurma setVisibilty={setVisibilty} visiblity={visibility} 
                            setProfessor = {setProfessorProp}/>

            <section className="form_turma">
                <div className="content_input_turma name" onClick={() => setVisibilty(!visibility)}>
                    <label htmlFor="professor">Professor</label>
                    <input
                        className="inputOut pointer"
                        type = "text"
                        text = "Professor"
                        disabled
                        placeholder="Professor"  
                        value={professor}  
                        name="professor"    
                    />
                </div>
                <div className="content_input_turma">
                    <Input
                        name= "descricao"
                        placeholder="Digite a descricao da turma"  
                        type="text"   
                        text="Desciricao"
                        value={turma.descricao}
                        handleOnChange = {handleTurma}
                    />
                </div>
                <div className="content_input_turma">
                    <Input
                        name= "sala"
                        placeholder="Informe a sala da turma"  
                        type="text"   
                        text="Sala"
                        value={turma.sala}  
                        handleOnChange = {handleTurma}
    
                    />
                </div>
                
                <div className="content_button_turma">
                    <Button type="primary" onclick={saveTurma} >Cadastrar</Button>
                </div>
            </section>

            <section className="container_list_turma">
                {listTurma.map((item, index) => {
                    return <div key={index} className="row_list_turma">
                                <div className="desc_turma">{item.desc_turma}</div>
                                <div className="sala_turma">{item.sala_turma}</div>
                                <div className="nome_professor">{item.nome_professor}</div>
                            </div>
                })}
            </section>
            
        </section>
    )
}