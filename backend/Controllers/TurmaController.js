import connect from "../db/connect.js";

export class TurmaController {

    
    static insertTurma = async (req, res) => {
        
        const descTurma = req.body.descricao
        const sala = req.body.sala
        const idProfessor = req.body.professor

        const conn = await connect()

        try{
            const sql = "INSERT INTO tb_turma (desc_turma, sala_turma, id_professor)"
                         + "values ($1, $2, $3)"
        
            const values = [descTurma, sala, idProfessor]
            const result = await conn.query(sql, values)
            res.status(200).send(result[0])
        }
        catch(err){
            res.status(404).send(err)
        }
        finally{
            conn.release()
        }
    }

    static selectAllTurmas = async (req, res) => {

        const conn = await connect()

        try{
            const result = await conn.query("select tb_turma.desc_turma, tb_turma.sala_turma,"+
            " tb_professor.nome_professor from tb_turma, tb_professor where tb_professor.id_professor= "+
            "tb_turma.id_professor")
            res.status(200).json(result.rows)
        }
        catch(err){
            res.status(404).json({message: "Não foi possível realizar a operação"})
        }
        finally{
            conn.release()
        } 
    }

    static selectTurmasByModulo = async (req, res) => {
        const modulo = req.params.modulo        
        const conn = await connect()

        try{
            const sql = 
            "select tb_turma.id_turma, tb_turma.desc_turma," + 
            "tb_turma.id_professor, tb_professor.nome_professor, tb_professor.id_professor,"+
            "tb_disciplina.id_disciplina, tb_disciplina.nome_disciplina," + 
            "tb_disciplina.modulo from tb_turma, tb_professor," +
            "tb_disciplina where tb_turma.id_professor = tb_professor.id_professor " +
            "and tb_disciplina.modulo = $1 and tb_professor.id_disciplina = tb_disciplina.id_disciplina"
        
            const result = await conn.query(sql, [modulo])
            res.status(200).send(result.rows)
        }
        catch(err){
            res.status(404).json({message: "Não foi possível realizar a operação"})
        }
        finally{
            conn.release()
        }
    } 


    


}
