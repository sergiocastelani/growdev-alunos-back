import { randomUUID } from "crypto";
import { Aluno } from "./aluno.model";

export class Avaliacao {
    public id: string;
    public aluno: Aluno;

    constructor(
        public disciplina: string,
        public nota: number,
        aluno: Aluno 
    ) {
        this.id = randomUUID();
        this.aluno = aluno; 
    }
}
