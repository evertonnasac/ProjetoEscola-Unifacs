import { Router } from "express";
import { TurmaController } from "../Controllers/TurmaController.js"

const route = Router()

route.get("/", TurmaController.selectAllTurmas)
route.post("/", TurmaController.insertTurma)
route.get("/modulos/:modulo", TurmaController.selectTurmasByModulo)


export default route