import AdotanteEntity from "../entities/AdotanteEntity";

type TipoRequestBodyAdotante=Omit<AdotanteEntity, "id">;


type TipoRequestParamsAdotante={ id?: string };


type TipoResponseBodyAdotante={
    data?: Pick<AdotanteEntity, "id" | "nome" | "celular"> |
    Pick<AdotanteEntity, "id" | "nome" | "celular">[];
    error?: unknown; //nao conhecemos o erro, mas queremos validar ele s
}

export { TipoRequestBodyAdotante, TipoResponseBodyAdotante, TipoRequestParamsAdotante}; 