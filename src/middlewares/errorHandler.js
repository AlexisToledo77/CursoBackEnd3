import fs from 'fs'

export const errorHandler = (error, req, res, next) => {
    console.log(`Ocurrio un error en el servidor ${error.message}`)
    let log = "./src/logs/error.log"
    if(fs.existsSync(log)) {
        fs.appendFileSync(log, "\n"+JSON.stringify({name: error.name, error:error.message, detalle:error.stack}))
    }else{
        fs.writeFileSync(log, JSON.stringify({name: error.name, error:error.message, detalle:error.stack}))
    }

    if(error.custom){
        res.setHeader('Content-Type','application/json')
        return res.status(error.code).json({error:`Ocurrio un error en el servidor`, name:error.name, message:error.message, cause:error.cause})
    } else{
        res.setHeader('Content-Type','application/json')
    return res.status(500).json({error:`Ocurrio un error en el servidor`})
    }

    

}
