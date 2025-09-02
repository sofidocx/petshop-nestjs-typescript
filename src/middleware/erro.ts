import { EnumHttpStatusCode } from "../enum/enumHttpStatusCode";
import ManipulaErros from "../utils/manipulaErros"; 
import { NextFunction, Request, Response } from "express";

export const erroMiddleware = (
  erro: ManipulaErros,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode =
    erro.statusCode ?? EnumHttpStatusCode.INTERNAL_SERVER_ERROR;

  const mensagem = erro.statusCode ? erro.message : "Erro interno do servidor";

  res.status(statusCode).json({ mensagem });
  return next();
};