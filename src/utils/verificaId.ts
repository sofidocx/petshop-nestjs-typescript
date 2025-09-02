import { Response, Request, NextFunction } from "express";
import { RequisicaoRuim } from "./manipulaErros";

export const verificaIdMiddleware = (req: Request, res:Response, next: NextFunction) => {
   const params = {...req.params};  

   for (const param in params) {
    //convertendo para numeros 
    if(!Number.isInteger(Number(params[param]))){
        throw new RequisicaoRuim(`O parametro ${param} deve ser um numero inteiro.`);
    }
   }
}