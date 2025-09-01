import { Request, Response, } from "express";
import AdotanteEntity from "../entities/AdotanteEntity";
import AdotanteRepository from "../repositories/AdotanteRepository";
import EnderecoEntity from "../entities/Endereco";
import * as yup from 'yup';
import { TipoRequestBodyAdotante, TipoRequestParamsAdotante, TipoResponseBodyAdotante } from "../tipos/tiposAdotante";


export default class AdotanteController {
  constructor(private repository: AdotanteRepository) { }
  async criaAdotante(req: Request<{}, {}, TipoRequestBodyAdotante>, res: Response) {
    const { nome, celular, endereco, foto, senha } = <AdotanteEntity>req.body;


    const novoAdotante = new AdotanteEntity(
      nome,
      senha,
      celular,
      foto,
      endereco
    );

    await this.repository.criaAdotante(novoAdotante);
    console.log(novoAdotante); 
    return res.status(201).json({ data: { id: novoAdotante.id, nome, celular, endereco } });
  }

  async atualizaAdotante(req: Request<TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante>, res: Response) {
    const { id } = req.params;
    const { success, message } = await this.repository.atualizaAdotante(
      Number(id),
      req.body as AdotanteEntity
    );

    if (!success) {
      return res.status(404).json({ error: message });
    }

    return res.sendStatus(204);
  }

  async listaAdotantes(req: Request<TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante>, res: Response) {
    const listaDeAdotantes = await this.repository.listaAdotantes();
    const data = listaDeAdotantes.map((adotante) => {
      return {
        id: adotante.id,
        nome: adotante.nome,
        celular: adotante.celular,
        endereco: adotante.endereco !== null ? adotante.endereco : undefined
      };
    })
    return res.json({ data });
  }

  async deletaAdotante(req: Request<TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante>, res: Response) {
    const { id } = req.params;

    const { success, message } = await this.repository.deletaAdotante(
      Number(id)
    );

    if (!success) {
      return res.status(404).json({ error: message });
    }
    return res.sendStatus(204);
  }
  async atualizaEnderecoAdotante(
    req: Request<TipoRequestParamsAdotante, {}, EnderecoEntity>,
    res: Response<TipoResponseBodyAdotante>
  ) {
    const { id } = req.params;

    const { success, message } = await this.repository.atualizaEnderecoAdotante(
      Number(id), req.body
    );

    if (!success) {
      return res.status(404).json({ error: message });
    }
    return res.sendStatus(204);
  }
}