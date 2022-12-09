import connect from "../db/connect.js"

export class AlunoController {

    static insertAluno =  async (req, res) => {

        const conn = await connect()
       
        console.log(req.body)
        const nome = req.body.name
        const cpf = req.body.cpf
        const modulo = req.body.modulo


        try{
           
            const sql = "INSERT INTO tb_aluno (nome_aluno, cpf_aluno, modulo_atual) VALUES ($1, $2, $3)"

            const values = [nome, cpf, modulo]
            await conn.query(sql, values)
            res.status(200).json({message : "Operaçao realizada com sucesso"})
        }
       
        catch(err){
            console.log(err)
            res.status(404).json({message : "Não foi possível realizar  o operação"})
        }
        finally{
            conn.release()
        }

    }


    static selectAllAluno = async (req, res) => {

        const conn = await connect()

        try{
            const result = await conn.query("select * from tb_aluno order by nome_aluno")
            res.status(200).json(result.rows)
        }
        catch(err){
            res.status(404).json({message: "Não foi possível realizar a operação"})
        }
        finally{
            conn.release()
        } 
    }

    static selectAlunoByMatricula = async (req, res) => {

        const matricula = await req.params.mat

        const conn = await connect()

        console.log(matricula)
        
        try{
            const result = await conn.query("Select * from tb_aluno WHERE matricula_aluno = $1", [matricula])
            res.status(200).json(result.rows)
        }
        catch(err){
            console.log(err)
            res.status(404).json({message : "Não foi possível realizar a operaçao"})
        }
        finally{
            conn.release()
        } 
    }

    static selectAlunoByName = async (req, res) => {

        const name = await req.params.name

        const conn = await connect()
        
        try{
            const result = await conn.query("Select * from tb_aluno WHERE nome_aluno = $1 order by nome_aluno", [name])
            res.status(200).json(result.rows)
        }
        catch(err){
            res.status(404).json({message : "Não foi possível realizar a operaçao"})
        }
        finally{
            conn.release()
        } 
    }


    static insertAlunoOnTurma = async (req, res) =>{
        
        const matAluno = req.body.matricula
        const idTurma = req.body.turma

        console.log(matAluno, idTurma)

        const conn = await connect()

        try{
            const query = "INSERT INTO tb_aluno_turma (matricula_aluno, id_turma) VALUES ($1 , $2)"
            const values = [matAluno, idTurma]
            await conn.query(query, values)

            res.status(200).json({message: "Operação realizada com sucesso"})
        }
        catch(err){
            res.status(404).send("Não foi possível realizar a operação")
        }
        finally{
            conn.release()
        } 
    }

    static selectAlunoByModulo = async (req, res) => {

        const modulo = await req.params.modulo

        const conn = await connect()
        
        try{
            const result = await conn.query("Select * from tb_aluno WHERE modulo_atual = $1 order by nome_aluno" , [modulo])
            res.status(200).json(result.rows)
        }
        catch(err){
            res.status(404).json({message : "Não foi possível realizar a operaçao"})
        }
        finally{
            conn.release()
        } 
    }

    static selectTurmasByAlunoModulo = async (req, res) => {
        const modulo = req.query.modulo
        const matricula = req.query.matricula    
        const conn = await connect()

        try{
            const sql = 
           "select tb_aluno_turma.id_aluno_turma, tb_aluno.nome_aluno, tb_turma.desc_turma,"+
           "tb_professor.nome_professor, tb_disciplina.nome_disciplina from tb_aluno, tb_aluno_turma,"+
           "tb_professor, tb_disciplina, tb_turma where tb_aluno_turma.matricula_aluno = tb_aluno.matricula_aluno "+
           "AND tb_turma.id_professor = tb_professor.id_professor and "+
           "tb_disciplina.id_disciplina = tb_professor.id_disciplina "+
           "and tb_aluno_turma.id_turma = tb_turma.id_turma "+
           "and tb_aluno.matricula_aluno = $1 and tb_aluno.modulo_atual = $2"
        
            const result = await conn.query(sql, [matricula, modulo])
            res.status(200).send(result.rows)
        }
        catch(err){
            res.status(404).json({message: "Não foi possível realizar a operação"})
        }
        finally{
            conn.release()
        }
    } 
    


    static updateModuloAluno = async (req, res) => {
        const matAluno = req.body.matricula
        const modulo = req.body.modulo

        const conn = await connect()

        try{
            const query = "UPDATE tb_aluno SET modulo_atual = $1 WHERE matricula_aluno = $2)"
            const values = [matAluno, modulo]
            const result = await conn.query(query, values)
            res.staus(200).json(result.rows)
        }
        catch(err){
            res.status(404).json({message : "Não foi possível realizar a operaçao"})
        }
        finally{
            conn.release()
        } 
    }

    static insertBoletinAluno = async (req, res) => {
        const nota = req.body.nota
        const matricula = req.body.matricula
        const modulo = req.body.modulo
        
        let aprovado = nota >= 6 && true

        const conn = await connect()

        try{
            const query = "INSERT INTO tb_boletim (nota_boletim, modulo, matricula_aluno, aprovado )  VALUES ($1, $2, $3, $4)"
            const values = [nota, modulo, matricula, aprovado]
            const result = await conn.query(query, values)
           
            res.status(200).json(result.rows)
        }
        catch(err){
            res.status(404).status(200)
        }
        finally{
            conn.release()
        } 
    }

    

}

