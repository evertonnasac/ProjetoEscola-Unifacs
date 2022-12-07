import pg from "pg"

async function connect(){
   
    if(global.connection){
      
        return global.connection.connect()
    }

    const pool = new pg.Pool({
        connectionString: "postgres://ojfzqcod:m9nyYClBYbSskfX8QLIJDLlEPSRA3Kz9@babar.db.elephantsql.com/ojfzqcod"
    })

    global.connection = pool

    return pool.connect()
}

export default connect