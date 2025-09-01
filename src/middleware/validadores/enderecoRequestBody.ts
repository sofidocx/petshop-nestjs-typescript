import * as yup from 'yup'; 
import { Request, Response, NextFunction } from "express";
import EnderecoEntity from '../../entities/Endereco';

const esquemaBodyEndereco: yup.ObjectSchema<Omit<EnderecoEntity, "id">> = 
yup.object({
  cidade: yup.string().defined().required(),
  estado: yup.string().defined()
});


const middlewareValidadorBodyEndereco = async (req: Request, res: Response, next: NextFunction ) => {
    
    try {

      //abortEarly - queremos passar por todos os erros possiveis antes de abortar o processo 
      await esquemaBodyEndereco.validate(req.body, { abortEarly: false });

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

export default middlewareValidadorBodyEndereco; 