import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import InterfacePetRepository from "./interfaces/InterfacePetRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnumPorte from "../enum/EnumPorte";
import { NaoEncontrado } from "../utils/manipulaErros";

export default class PetRepository implements InterfacePetRepository {
  private petRepository: Repository<PetEntity>;
  private adotanterepository: Repository<AdotanteEntity>;

  constructor(
    petRepository: Repository<PetEntity>,
    adotanteRepository: Repository<AdotanteEntity>,
  ) {
    this.petRepository = petRepository;
    this.adotanterepository = adotanteRepository;
  }

  async criaPet(pet: PetEntity): Promise<void> {
    await this.petRepository.save(pet);
  }
  async listaPet(): Promise<PetEntity[]> {
    return await this.petRepository.find();
  }
  async atualizaPet(
    id: number,
    newData: PetEntity
  ): Promise<{ success: boolean; message?: string }> {
    const petToUpdate = await this.petRepository.findOne({ where: { id } });

    if (!petToUpdate) {
      throw new NaoEncontrado("Pet nao encontrado");
    }

    Object.assign(petToUpdate, newData);

    await this.petRepository.save(petToUpdate);

    return { success: true };
  }

  async deletaPet(id: number): Promise<{ success: boolean; message?: string }> {
      const petToRemove = await this.petRepository.findOne({ where: { id } });

      if (!petToRemove) {
        throw new NaoEncontrado("Pet nao encontrado");
      }

      await this.petRepository.remove(petToRemove);

      return { success: true };
  }

  async adotaPet(
    idPet: number, idAdotante: number
  ): Promise<{ success: boolean; message?: string; }> {
    const pet = await this.petRepository.findOne({ where: { id: idPet } });
    if (!pet) {
       throw new NaoEncontrado("Pet nao encontrado");
    }

    const adotante = await this.adotanterepository.findOne({
      where: { id: idAdotante }
    });

    if (!adotante) {
      throw new NaoEncontrado("Adotante nao encontrado");
    }

    pet.adotante = adotante;
    pet.adotado = true;
    await this.petRepository.save(pet);
    return { success: true };
  }

  async buscaPetPorCampoGenerico<Tipo extends keyof PetEntity>(campo: Tipo, valor: PetEntity[Tipo]): Promise<PetEntity[]> {
    const pets = await this.petRepository.find({ where: { [campo]: valor } });
    return pets;
  }
}
