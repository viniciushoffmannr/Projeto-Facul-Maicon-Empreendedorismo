import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type AlunoForm = {
  nome: string;
  nomePai: string;
  nomeMae: string;
  dataNascimento: string;
  sexo: string;
  restricaoAlimentar: string;
  alergia: string;
  tipoSanguineo: string;
  medicamentoContinuo: string;
};

const CadastroAluno: React.FC = () => {
  const [form, setForm] = useState<AlunoForm>({
    nome: "",
    nomePai: "",
    nomeMae: "",
    dataNascimento: "",
    sexo: "",
    restricaoAlimentar: "",
    alergia: "",
    tipoSanguineo: "",
    medicamentoContinuo: "",
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    const alunosStorage = localStorage.getItem("alunosCadastro");
    const alunos: AlunoForm[] = alunosStorage ? JSON.parse(alunosStorage) : [];

    alunos.push(form);

    localStorage.setItem("alunosCadastro", JSON.stringify(alunos));

    setForm({
      nome: "",
      nomePai: "",
      nomeMae: "",
      dataNascimento: "",
      sexo: "",
      restricaoAlimentar: "",
      alergia: "",
      tipoSanguineo: "",
      medicamentoContinuo: "",
    });

    navigate("/home");
  };

  return (
    <div className="mb-12 min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md p-6 w-full max-w-md overflow-auto max-h-[90vh]"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-500">
          Cadastro do Aluno
        </h2>

        <div className="mb-4">
          <label htmlFor="nome" className="block text-sm font-medium mb-1">
            Nome do aluno
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite o nome do aluno"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="nomePai" className="block text-sm font-medium mb-1">
            Nome do pai
          </label>
          <input
            type="text"
            id="nomePai"
            name="nomePai"
            value={form.nomePai}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite o nome do pai"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="nomeMae" className="block text-sm font-medium mb-1">
            Nome da mãe
          </label>
          <input
            type="text"
            id="nomeMae"
            name="nomeMae"
            value={form.nomeMae}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite o nome da mãe"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="dataNascimento"
            className="block text-sm font-medium mb-1"
          >
            Data de nascimento
          </label>
          <input
            type="date"
            id="dataNascimento"
            name="dataNascimento"
            value={form.dataNascimento}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="sexo" className="block text-sm font-medium mb-1">
            Sexo
          </label>
          <select
            id="sexo"
            name="sexo"
            value={form.sexo}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="" disabled>
              Selecione o sexo
            </option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="restricaoAlimentar"
            className="block text-sm font-medium mb-1"
          >
            Restrição alimentar
          </label>
          <input
            type="text"
            id="restricaoAlimentar"
            name="restricaoAlimentar"
            value={form.restricaoAlimentar}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Descreva restrição alimentar"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="alergia" className="block text-sm font-medium mb-1">
            Alergia
          </label>
          <input
            type="text"
            id="alergia"
            name="alergia"
            value={form.alergia}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Descreva alergia"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="tipoSanguineo"
            className="block text-sm font-medium mb-1"
          >
            Tipo sanguíneo
          </label>
          <select
            id="tipoSanguineo"
            name="tipoSanguineo"
            value={form.tipoSanguineo}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="" disabled>
              Selecione o tipo sanguíneo
            </option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="medicamentoContinuo"
            className="block text-sm font-medium mb-1"
          >
            Medicamento contínuo
          </label>
          <input
            type="text"
            id="medicamentoContinuo"
            name="medicamentoContinuo"
            value={form.medicamentoContinuo}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Informe medicamento contínuo"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default CadastroAluno;
