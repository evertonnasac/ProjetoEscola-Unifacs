import connect from "../db/connect.js"

export class ProfessorController {
    

    static insertProfessor =  async (req, res) => {

        const conn = await connect()
       
        const nome = req.body.nome
        const cpf = req.body.cpf
        const titulacao = req.body.titulacao
        const id_disciplina = Number(req.body.disciplina)

        console.log(nome)


        try{
           
            const sql = "INSERT INTO tb_professor  (nome_professor, cpf_professor, titulo_professor, id_disciplina)" 
                            + "values ($1, $2, $3, $4)"

            const values = [nome, cpf, titulacao, id_disciplina]
            await conn.query(sql, values)
            res.status(200).send({message: "Operação realizada com sucesso"})
        }
       
        catch(err){
            console.log(err)
            res.status(404).send({message: "Não foi possível realizar a operação"})
        }
        finally{
            conn.release()
        }

    }

    static  selectAllProfessor  = async (req, res) => { 

        let conn = await connect()

        try{

            const result = await conn.query("SELECT tb_professor.nome_professor,"+
            " tb_professor.titulo_professor, tb_professor.cpf_professor,"+
            "tb_disciplina.nome_disciplina  FROM tb_professor, tb_disciplina "+
            "WHERE tb_professor.id_disciplina = tb_disciplina.id_disciplina order by nome_professor")
            
            res.status(200).send(result.rows)
        }
        catch(err){
            res.status(404).send(err)
        }
        finally{
            conn.release()
        } 
     
    }

    static  selectProfessorByDisc = async (req, res) => {
        
        const idDisc = req.params.id

        let conn = await connect()

        try{
            const result = await conn.query("SELECT *  FROM tb_professor WHERE id_disciplina = $1", [idDisc])
            res.status(200).send(result.rows)
        }
        catch(err){
            res.status(404).send("Não foi possível realizar a operação")
        }
        finally{
            conn.release()
        } 
    }

    static  selectProfessorByName = async (req, res) => {
        
        const name = req.params.name
        console.log(name)

        let conn = await connect()

        try{
            const result = await conn.query("SELECT *  FROM tb_professor WHERE nome_professor = $1", [name])
            res.status(200).send(result.rows)
        }
        catch(err){
            res.status(404).send("Não foi possível realizar o operação")
        }
        finally{
            conn.release()
        } 
    }


    static  selectProfessorById = async (req, res) => {
        
        const name = req.params.id

        let conn = await connect()

        try{
            const result = await conn.query("SELECT *  FROM tb_professor WHERE id_professor = $1", [name])
            res.status(200).send(result.rows)
        }
        catch(err){
            throw res.status(404).send("Não foi possível realizar a operação")
        }
        finally{
            conn.release()
        } 
    }
}