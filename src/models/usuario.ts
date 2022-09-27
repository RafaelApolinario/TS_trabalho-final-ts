import { Recado } from './recado'

export interface Usuario {
    id: number;
    email: string;
    senha: string;
    recados: Recado[];
}

export type UsuarioLogin = Omit<Usuario, "id" | "recados">
