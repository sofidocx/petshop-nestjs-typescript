import { Request, Response } from "express";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";
import EnumPorte from "../enum/EnumPorte";
import { TipoRequestBodyPet, TipoRequestParamsPet, TipoResponseBodyPet } from "../tipos/tiposPets";

export default class PetController {

  constructor(private repository: PetRepository) { }

  async criaPet(req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>, res: Response<TipoResponseBodyPet>) {
    const { adotado, especie, dataDeNascimento, nome, porte } = <PetEntity>req.body;
    if (!Object.values(EnumEspecie).includes(especie)) {
      return res.status(400).json({ error: "Espécie Inválida" });
    }

    if (porte && !(porte in EnumPorte)) {
      return res.status(400).json({ error: "Espécie Inválida" });
    }

    const novoPet = new PetEntity(nome, especie, dataDeNascimento, adotado, porte);
    await this.repository.criaPet(novoPet);
    return res.status(201).json({ data: { id: novoPet.id, nome, especie, porte } });

  }
  // retorna uma lista com todos os pets 
  async listaPets(req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>, res: Response<TipoResponseBodyPet>) {

    const listaDePets = await this.repository.listaPet();
    const data = listaDePets.map((pet) => {
      return {
        id: pet.id,
        nome: pet.nome,
        especie: pet.especie,
        porte: pet.porte,
      }
    })
    res.status(200).json({ data });
  }

  //atualiza as infos de um pet no banco e retorna erro caso ele nao esteja cadastrado 
  async atualizaPet(req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>, res: Response<TipoResponseBodyPet>) {
    const { id } = req.params;
    const { success, message } = await this.repository.atualizaPet(
      Number(id),
      req.body as PetEntity
    );

    if (!success) {
      return res.status(404).json({ error: message });
    }
    return res.sendStatus(204);
  }

  async deletaPet(req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>, res: Response<TipoResponseBodyPet>) {
    const { id } = req.params;

    const { success, message } = await this.repository.deletaPet(Number(id));

    if (!success) {
      return res.status(404).json({ error: message });
    }
    return res.sendStatus(204);
  }

  async adotaPet(req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>, res: Response<TipoResponseBodyPet>) {
    const { pet_id, adotante_id } = req.params;

    const { success, message } = await this.repository.adotaPet(
      Number(pet_id),
      Number(adotante_id)
    );

    if (!success) {
      return res.status(404).json({ error: message });
    }
    return res.sendStatus(204);
  }

  async buscaPetPorCampoGenerico(req: Request, res: Response) {
    const { campo, valor } = req.query;
    const listaDePets = await this.repository.buscaPetPorCampoGenerico(
      campo as keyof PetEntity,
      valor as string
    );
    return res.status(200).json(listaDePets);
  }
}