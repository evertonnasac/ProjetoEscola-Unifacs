import {Router} from "express"
import {AlunoController} from "../Controllers/AlunoController.js"

const route  =  Router()

route.post("/", AlunoController.insertAluno)
route.get("/", AlunoController.selectAllAluno)
route.get("/matricula/:mat", AlunoController.selectAlunoByMatricula)
route.get("/nome/:name", AlunoController.selectAlunoByName)
route.post("/alocar", AlunoController.insertAlunoOnTurma)
route.post("/boletim", AlunoController.insertBoletinAluno)


export default route