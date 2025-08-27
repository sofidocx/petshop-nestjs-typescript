import { Request, Response } from "express";
import type TipoPet from "../tipos/pet";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";

let listaDePets: Array<TipoPet> = [];


let id = 0;
function geraId() {
    id = id + 1;
    return id;
}

export default class PetController {

    constructor(private repository: PetRepository) { }

    async criaPet(req: Request, res: Response) {
        const { adotado, especie, dataDeNascimento, nome } = <PetEntity>req.body;
        if (!Object.values(EnumEspecie).includes(especie)) {
            return res.status(400).json({ error: "Espécie Inválida" });
        }
        const novoPet = new PetEntity(nome, especie, dataDeNascimento, adotado);
        await this.repository.criaPet(novoPet);
        listaDePets.push(novoPet);
        return res.status(201).json(novoPet);

    }
    // retorna uma lista com todos os pets 
    async listaPets(req: Request, res: Response) {
       const listaDePets = await this.repository.listaPet(); 
        res.status(200).json(listaDePets);
    }

    //atualiza as infos de um pet no banco e retorna erro caso ele nao esteja cadastrado 
    async atualizaPet(req: Request, res: Response) {
    const { id } = req.params;
    const { success, message } = await this.repository.atualizaPet(
      Number(id),
      req.body as PetEntity
    );

    if (!success) {
      return res.status(404).json({ message });
    }
    return res.sendStatus(204);
  }

  async deletaPet(req: Request, res: Response) {
    const { id } = req.params;

    const { success, message } = await this.repository.deletaPet(Number(id));

    if (!success) {
      return res.status(404).json({ message });
    }
    return res.sendStatus(204);
  }
}