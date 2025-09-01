import PetEntity from "../entities/PetEntity";

type TipoRequestBodyPet=Omit<PetEntity, "id">;


type TipoRequestParamsPet={ id?: string, pet_id?: string, adotante_id?: string };


type TipoResponseBodyPet={
    dados?: Pick<PetEntity, "id" | "nome" | "porte" | "especie"> |
    Pick<PetEntity, "id" | "nome" | "porte" | "especie">[];
    erros?: unknown; //nao conhecemos o erro, mas queremos validar ele s
}

export { TipoRequestBodyPet, TipoResponseBodyPet, TipoRequestParamsPet}; 