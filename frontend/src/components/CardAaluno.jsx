import iconProfile from "../../src/images/icon-avatar.png"
import logo from "../../src/images/logo.png"
import "./CardAluno.sass"
import { useNavigate } from "react-router-dom"

export const CardAluno = ({nome, matricula, modulo}) => {

    const nav = useNavigate()

    return(
        <div className="card_aluno" onClick={() => nav(`/aluno/profile/?matricula=${matricula}&modulo=${modulo}`)}>
            <div className="title_card">
                <img src= "" className = "img_logo" />
            </div>
            <div className="container_card">
                <img src= {iconProfile} className = "img_profile" />
                <div className="container_info">
                    <p className="nome_aluno">{nome}</p>
                    <p className="modulo">Módulo: {modulo}</p>
                    <p className="matricula_aluno">N° Mat. {matricula}</p>
                </div>
            </div>
        </div>
    )

}