import logo from "../../src/images/logo.png"
import { useNavigate } from "react-router-dom"
import "./MenuLateral.sass"

const optionsHeader = [
    {
        item: "Disciplinas",
        link: "/disciplinas"
    },
    {
        item: "Alunos",
        link: "/aluno"
    },
    {
        item: "Professores",
        link: "/professor"
    },
    {
        item: "Turmas",
        link: "/turmas"
    }
]

export const MenuLateral = () =>{

    const nav = useNavigate()

    return(
        <aside>
            <img src = {logo} alt="logo" className="header_logo"/>
            <div className="container_options">
             {optionsHeader.map(item => <button onClick={()=>nav(item.link)} className="header_options">{item.item}</button>)}
            </div>
        </aside>
    )
}