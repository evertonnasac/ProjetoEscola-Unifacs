import {Router} from "express"
import {ProfessorController} from "../Controllers/ProfessorController.js"

const route = Router()

route.post("/", ProfessorController.insertProfessor)
route.get("/", ProfessorController.selectAllProfessor)
route.get("/disciplina/:id", ProfessorController.selectProfessorByDisc)
route.get("/nome/:name", ProfessorController.selectProfessorByName)
route.get("/id/:id", ProfessorController.selectProfessorById)


export default route