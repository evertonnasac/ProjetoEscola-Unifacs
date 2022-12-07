import {Router} from "express"
import { DisciplinaController } from "../Controllers/DisciplinaController.js"

const route = Router()

route.post("/", DisciplinaController.insertDisciplina)

export default route