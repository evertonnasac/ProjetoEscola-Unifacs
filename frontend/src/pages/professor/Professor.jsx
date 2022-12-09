import {Input} from "../../components/Input"
import { Button } from "../../components/Button"
import { useState } from "react"
import { useEffect } from "react"
import api from "../../api/api"
import { ModalDisciplina } from "./ModalDisciplina"

import "./Professor.sass"

export const Professor = () => {

    const [professor, setProfessor] = useState({nome:"", cpf: "", titulacao: "", disciplina : 0})
    const [professorList, setProfessorList] = useState([])
    const [disciplina, setDisciplina] =  useState("")
    const [visibility, setVisibilty] = useState(false)


    const setDisciplinaProp = (id,name) => {
        setProfessor ({...professor, disciplina : id})
        setDisciplina(name)
    }

    const handleProfessor = (e) => {
        setProfessor ({...professor, [e.target.name] : e.target.value})
        console.log(professor)
    }

    const getProfessorList =  async () => {
        const result = await api.get("/professor")
        setProfessorList(result.data)
    }

    const saveProfessor = async () => {
        await api.post("/professor", {...professor}).catch(err => console.log(err))
        getProfessorList()
        setProfessor({nome:"", cpf: "", titulacao: "", disciplina : 0})
        setDisciplina("")
    }

    useEffect(()=>{

        const execApi = async () => {
            await getProfessorList()
        }

        execApi()
            
    },[])

    return (
        <section className="page_professor">
            <ModalDisciplina setVisibilty={setVisibilty} visiblity={visibility} 
                             setDisciplina = {setDisciplinaProp}/>
            <section className="form_professor">
                <div className="content_input name">
                    <Input
                        name= "nome"
                        placeholder="Digite o nome do professor"  
                        type="text"   
                        text="Nome"
                        value={professor.nome}
                        handleOnChange = {handleProfessor}
                    />
                </div>
                <div className="content_input">
                    <Input
                        name= "cpf"
                        placeholder="Digite o CPF do professor"  
                        type="text"   
                        text="CPF"
                        value={professor.cpf}  
                        handleOnChange = {handleProfessor}
    
                    />
                </div>
                <div className="content_input">
                    <label htmlFor="titulo">Titulação</label>
                    <select name="titulacao" id="titulo" className="inputOut pointer" onChange={handleProfessor}>
                        <option value="licenciado">Selecione</option>
                        <option value="licenciado">Licenciado</option>
                        <option value="mestre">Mestre</option>
                        <option value="doutor">Doutor</option>
                    </select>
                </div>
                <div className="content_input" onClick={() => setVisibilty(!visibility)}>
                    <label htmlFor="titulo">Disciplina</label>
                    <input
                        className="inputOut pointer"
                        type = "text"
                        text = "Disciplina"
                        disabled
                        placeholder="Disciplina"  
                        value={disciplina}      
                    />
                </div>
                <div className="content_button_prof">
                    <Button type="primary" onclick={saveProfessor} >Cadastrar</Button>
                </div>
            </section>

            <section className="container_list_professor">
                {professorList.map((item, index) => {
                    return <div key={index} className="row_list_professor">
                                <div className="name_professor">{item.nome_professor}</div>
                                <div className="titulo_professor">{item.titulo_professor}</div>
                                <div className="nome_disciplina">{item.nome_disciplina}</div>
                            </div>
                })}
            </section>
            
        </section>
    )
}