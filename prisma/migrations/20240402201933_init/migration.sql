-- CreateEnum
CREATE TYPE "TipoAluno" AS ENUM ('T', 'M', 'F');

-- CreateTable
CREATE TABLE "aluno" (
    "id" UUID NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "senha" VARCHAR(50) NOT NULL,
    "tipo" "TipoAluno",
    "token" TEXT,
    "idade" SMALLINT,
    "dthr_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dthr_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "aluno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "endereco" (
    "id_aluno" UUID NOT NULL,
    "rua" VARCHAR(30) NOT NULL,
    "cidade" VARCHAR(30) NOT NULL,
    "uf" CHAR(2) NOT NULL,
    "dthr_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dthr_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "endereco_pkey" PRIMARY KEY ("id_aluno")
);

-- CreateTable
CREATE TABLE "avaliacao" (
    "id" UUID NOT NULL,
    "disciplina" VARCHAR(30) NOT NULL,
    "nota" DECIMAL(3,1) NOT NULL,
    "id_aluno" UUID NOT NULL,
    "dthr_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dthr_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "avaliacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "turma" (
    "id" UUID NOT NULL,
    "programa" VARCHAR(30) NOT NULL,
    "edicao" VARCHAR(30) NOT NULL,
    "max_alunos" INTEGER,

    CONSTRAINT "turma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "matricula" (
    "id_aluno" UUID NOT NULL,
    "id_turma" UUID NOT NULL,
    "dt_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "matricula_pkey" PRIMARY KEY ("id_aluno","id_turma")
);

-- CreateIndex
CREATE UNIQUE INDEX "aluno_email_key" ON "aluno"("email");

-- AddForeignKey
ALTER TABLE "endereco" ADD CONSTRAINT "endereco_id_aluno_fkey" FOREIGN KEY ("id_aluno") REFERENCES "aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avaliacao" ADD CONSTRAINT "avaliacao_id_aluno_fkey" FOREIGN KEY ("id_aluno") REFERENCES "aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matricula" ADD CONSTRAINT "matricula_id_aluno_fkey" FOREIGN KEY ("id_aluno") REFERENCES "aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matricula" ADD CONSTRAINT "matricula_id_turma_fkey" FOREIGN KEY ("id_turma") REFERENCES "turma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
