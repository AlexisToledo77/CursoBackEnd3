export class CustomError{
    static createError(name, cause, message, code=400){
        const error =new Error(message, {cause})

        error.custom=true
        error.name=name
        error.code=code

        return error
        
    }

}