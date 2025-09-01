import AdotanteEntity from "../entities/AdotanteEntity";

type TipoRequestBodyAdotante=Omit<AdotanteEntity, "id" | "pets">;


type TipoRequestParamsAdotante={ id?: string };


type TipoResponseBodyAdotante={
    dados?: Pick<AdotanteEntity, "id" | "nome" | "celular"| "endereco"> |
    Pick<AdotanteEntity, "id" | "nome" | "celular" | "endereco">[];
    erros?: unknown; //nao conhecemos o erro, mas queremos validar ele s
}

export { TipoRequestBodyAdotante, TipoResponseBodyAdotante, TipoRequestParamsAdotante}; 