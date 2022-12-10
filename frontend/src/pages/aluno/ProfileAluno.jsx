import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import iconProfile from "../../images/icon-profile.png"
import api from "../../api/api"
import {Button} from "../../components/Button"
import { ModalTurmaAluno } from "./ModalTurmaAluno"
import { ModalBoletim } from "./ModalBoletim.jsx"


import "./ProfileAluno.sass"

export const ProfileAluno = () => {

    const [aluno, setAluno] = useState([])
    const [turmas, setTurmas] = useState([])
    const [modal, setModal] = useState(false)
    const [modalBoletim, setModalBoletim] = useState(false)

    const {search} = useLocation()

    const getApi = async (url , setState) => {
       let result = await api.get(url)
        setState(result.data)
    }

    useEffect(()=>{

        const searchParams = new URLSearchParams(search)

        if(searchParams.get("matricula") && searchParams.get("modulo")){
            let mat = searchParams.get("matricula") || ""
            let modulo = searchParams.get("modulo") || ""

            const apiOn = async () => {
                await getApi("/aluno/matricula/" + mat, setAluno)
                await getApi(`aluno/turmas/?matricula=${mat}&modulo=${modulo}`, setTurmas)
            }

            apiOn()
           
        }
        
    },[search])


    return (
        <main className="main_profile_aluno">

            <ModalTurmaAluno 
                matricula={aluno.length > 0 ? aluno[0].matricula_aluno : 0}
                modulo = {aluno.length > 0 ? aluno[0].modulo_atual : 0}
                visiblity = {modal}
                setVisibilty = {setModal}
            />

            <ModalBoletim visibility={modalBoletim} setVisibility = {setModalBoletim} />

            <div className="header_profile_aluno">
                <img src= {iconProfile} alt="Foto de perfil" className="img_profile" />
                {aluno.map((aluno) => {
                    return   <div className="container_info_aluno">
                                <p className="nome_aluno">{aluno.nome_aluno || ""}</p>
                                <p className="cpf">CPF: {aluno.cpf_aluno || "" }</p>
                                <p className="matricula">N° mat.: {aluno.matricula_aluno || ""}</p>
                                <p className="modulo">Modulo {aluno.modulo_atual || ""}</p>
                                <div className="container_btn_modal">
                                    <div className="content_btn_modal">
                                        <Button type="primary" 
                                            onclick = {() => setModal(!modal)}>Matricular em turmas</Button>
                                    </div>
                                    <div className="content_btn_modal">
                                        <Button type="secondary" 
                                            onclick = {() => setModalBoletim(!modalBoletim)}>Gerar Boletim</Button>
                                    </div>
                                </div>
                                
                            </div>
                })}
                
            </div>
                <div className="container_turmas">
                {turmas.map((turma) => {
                    return <div className="card_turma"> 
                                <p className="desc_turma">{turma.desc_turma}</p>
                                <div className="card_turma_body">
                                    <p className="professor">{turma.nome_professor}</p>
                                    <p className="disciplina">{turma.nome_disciplina}</p>
                                </div>
                                
                            </div>
                })}
            </div> 
            
        </main>
    )



}