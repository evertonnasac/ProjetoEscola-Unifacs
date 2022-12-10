import { useState, useEffect } from "react"
import { CardAluno } from "../../components/CardAaluno.jsx"
import api from "../../api/api.js"
import { NavHorizontal } from "../../components/NavHorizontal.jsx"
import {Search} from "../../components/Search"
import {Button} from "../../components/Button"
import {ModalNovoAluno} from "./ModalNovoAluno"
import { ModalBoletim } from "./ModalBoletim.jsx"

import "./Aluno.sass"


const itemsNav = [
    {
        value : "Todos",
        selected : true,
        number: 4
    },
    {
        value : "Modulo 1",
        selected : false,
        number: 1
    },
    {
        value : "Modulo 2",
        selected : false,
        number: 2
    },
    {
        value : "Modulo 3",
        selected : false,
        number: 3
    }
   
]

export const Aluno = () => {

    const [alunos, setAlunos] = useState([])
    const [itemNavSelected, setItemNavSelected] = useState(itemsNav)
    const [selecAll, setSelectAll] = useState(true)
    const [modalNovoAluno, setModalNovoAluno] = useState(false)
    const [ModalBoletim, setModalBoletim] = useState(false)


    const setItemSelectedNav = async ({value, number}) => {
        setItemNavSelected(item => item.map((itemNav) => {
          return itemNav.value === value ? {...itemNav, selected : true} :
                 {...itemNav, selected : false}})
        )

        if(number == 4){
            setSelectAll(!selecAll)
            return
        }

        let data = await api.get("/aluno/modulo/" + number)
        setAlunos(data.data)
    }

    useEffect(() => {

       let data 

       async function getData() {
            data = await api.get("/aluno")
            setAlunos(data.data)
        }

       getData()

    },[selecAll])


    return(
        <section className="page_alunos">

            <ModalNovoAluno visibility={modalNovoAluno} setVisibility = {setModalNovoAluno}/>

            <div className="container_btn">
                <Button type="primary" onclick = {() => setModalNovoAluno(!modalNovoAluno)}>Novo Aluno</Button>
            </div>

            <div className="container_search">
                <Search/>
            </div>

            <NavHorizontal 
                arrayItens={itemNavSelected}
                state = {setItemSelectedNav}
            />

            <div className="main_alunos">
                {alunos.map((item, index)=>{
                    return  <CardAluno
                                matricula={item.matricula_aluno}
                                nome = {item.nome_aluno}
                                modulo = {item.modulo_atual}
                                key = {index}
                             />
                
                })}
            </div>
        
        </section>
    )

}