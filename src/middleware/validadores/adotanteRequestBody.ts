import * as yup from 'yup'; 
import { Request, Response, NextFunction } from "express";
import { TipoRequestBodyAdotante } from '../../tipos/tiposAdotante';
import {pt } from 'yup-locale-pt'; 

yup.setLocale(pt); 

const esquemaBodyAdotante: yup.ObjectSchema<Omit<TipoRequestBodyAdotante, "endereco">> = yup.object({
  nome: yup.string().defined().required(),
  celular: yup.string().defined().matches(/^(\(?[0-9]{2}\)?)? ?([0-9]{4,5})-?([0-9]{4})$/gm, "Celular invalido"),
  senha: yup.string().defined().min(6).required().matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm, "Senha invalida"), 
  foto: yup.string().optional(),

});


const middlewareValidadorBodyAdotante = async (req: Request, res: Response, next: NextFunction ) => {
    
    try {

      //abortEarly - queremos passar por todos os erros possiveis antes de abortar o processo 
      await esquemaBodyAdotante.validate(req.body, { abortEarly: false });

      return next (); 

    } catch (error) {
      const yupErrors = error as yup.ValidationError;
      const validationErrors: Record<string, string> = {};

      yupErrors.inner.forEach((error) => {
        if(!error.path) return; 
          validationErrors[error.path] = error.message;
      }); 
      return res.status(400).json({ error: validationErrors })
    }

} 

export default middlewareValidadorBodyAdotante; 