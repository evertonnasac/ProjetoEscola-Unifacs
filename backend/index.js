import express from "express";
import routeProfessor from "./routes/routeProfessor.js"
import routeAluno from "./routes/routeAluno.js";
import routeDisciplina from "./routes/routeDisciplina.js"
import routeTurma from "./routes/routeTurma.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))


app.use("/aluno", routeAluno)
app.use("/professor", routeProfessor)
app.use("/disciplina", routeDisciplina)
app.use("/turma", routeTurma)




app.listen(3000, () => {
    console.log("Rodando na porta 3000")
})



