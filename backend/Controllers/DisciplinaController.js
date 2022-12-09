import connect from "../db/connect.js"

export class DisciplinaController {

    static insertDisciplina =  async (req, res) => {

        const conn = await connect()

        const nomeDisc = req.body.nome
        const modulo = req.body.modulo
       
        try{
            const query = "INSERT INTO tb_disciplina (nome_disciplina, modulo) VALUES ($1 , $2)"
            const values = [nomeDisc, modulo]
            await conn.query(query, values)
            res.status(200).send("Operação realizada com sucesso")
        }
        catch(err) {
            console.log(err)
            res.status(404).send("Operação não realizada")
        }
        finally{
            conn.release()
        }
    }


    static selectAllDisciplina = async (req, res) => {

        const conn = await connect()

        try{
            const result = await conn.query("select * from tb_disciplina order by nome_disciplina")
            res.status(200).json(result.rows)
        }
        catch(err){
            res.status(404).json({message: "Não foi possível realizar a operação"})
        }
        finally{
            conn.release()
        } 
    }



}