import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type LoginFormState = {
  username: string;
  password: string;
};

const Login = () => {
  const [form, setForm] = useState<LoginFormState>({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(form));
    navigate("/home");
  };

  useEffect(() => {
    if (!localStorage.getItem("alunosCadastro")) {
      localStorage.setItem(
        "alunosCadastro",
        JSON.stringify([
          {
            nome: "Junior Santos Silva",
            nomePai: "Pedro Da Silva",
            nomeMae: "Maria da Silva",
            dataNascimento: "2021-07-13",
            sexo: "Masculino",
            restricaoAlimentar: "Nenhum",
            alergia: "Amendoim",
            tipoSanguineo: "A-",
            medicamentoContinuo: "Nenhum",
          },
          {
            nome: "Luiza Ferreira Costa",
            nomePai: "Carlos Costa",
            nomeMae: "Fernanda Ferreira",
            dataNascimento: "2020-05-22",
            sexo: "Feminino",
            restricaoAlimentar: "Lactose",
            alergia: "Nenhuma",
            tipoSanguineo: "O+",
            medicamentoContinuo: "Omeprazol",
          },
          {
            nome: "Enzo Gabriel Lima",
            nomePai: "João Lima",
            nomeMae: "Aline Lima",
            dataNascimento: "2019-09-30",
            sexo: "Masculino",
            restricaoAlimentar: "Glúten",
            alergia: "Poeira",
            tipoSanguineo: "B+",
            medicamentoContinuo: "Nenhum",
          },
          {
            nome: "Isabela Rocha Mendes",
            nomePai: "Bruno Mendes",
            nomeMae: "Patrícia Rocha",
            dataNascimento: "2021-01-10",
            sexo: "Feminino",
            restricaoAlimentar: "Nenhuma",
            alergia: "Frutos do mar",
            tipoSanguineo: "AB+",
            medicamentoContinuo: "Desloratadina",
          },
          {
            nome: "Miguel Oliveira Souza",
            nomePai: "André Souza",
            nomeMae: "Cláudia Oliveira",
            dataNascimento: "2020-03-05",
            sexo: "Masculino",
            restricaoAlimentar: "Nenhuma",
            alergia: "Nenhuma",
            tipoSanguineo: "O-",
            medicamentoContinuo: "Nenhum",
          },
          {
            nome: "Laura Beatriz Martins",
            nomePai: "Daniel Martins",
            nomeMae: "Juliana Beatriz",
            dataNascimento: "2019-12-17",
            sexo: "Feminino",
            restricaoAlimentar: "Nenhuma",
            alergia: "Picada de inseto",
            tipoSanguineo: "A+",
            medicamentoContinuo: "Lorax",
          },
          {
            nome: "Rafael Augusto Pires",
            nomePai: "Fábio Pires",
            nomeMae: "Vanessa Augusto",
            dataNascimento: "2021-11-08",
            sexo: "Masculino",
            restricaoAlimentar: "Nenhuma",
            alergia: "Nenhuma",
            tipoSanguineo: "B-",
            medicamentoContinuo: "Nenhum",
          },
          {
            nome: "Manuela Alves Ribeiro",
            nomePai: "Renato Ribeiro",
            nomeMae: "Sabrina Alves",
            dataNascimento: "2020-06-18",
            sexo: "Feminino",
            restricaoAlimentar: "Ovo",
            alergia: "Corante",
            tipoSanguineo: "AB-",
            medicamentoContinuo: "Nenhum",
          },
        ])
      );
      console.log("Dados iniciais de alunos cadastrados com sucesso.");
    } else {
      console.log(
        "Já existem alunos cadastrados. Nenhuma alteração foi feita."
      );
    }

    const atividadesExistem = localStorage.getItem("atividades");
    if (!atividadesExistem) {
      localStorage.setItem(
        "atividades",
        JSON.stringify({
          lanchesManha: [
            "Sanduíche",
            "Biscoito",
            "Fruta",
            "Pão com manteiga",
            "Suco natural",
            "Leite com achocolatado",
          ],
          almoços: [
            "Feijão e Arroz",
            "Macarrão com carne moída",
            "Frango grelhado com legumes",
            "Sopa de legumes",
            "Arroz, feijão e ovo",
            "Estrogonofe com arroz",
          ],
          lanchesTarde: [
            "Banana",
            "Iogurte",
            "Maçã",
            "Pão de queijo",
            "Bolo de cenoura",
            "Torrada com geleia",
          ],
          xixi: ["Sim", "Não", "1 vez", "2 vezes ou mais"],
          coco: ["Sim", "Não", "Pediu para ir ao banheiro", "Usou fralda"],
          humor: [
            "Feliz",
            "Triste",
            "Estressado",
            "Sonolento",
            "Animado",
            "Brincalhão",
            "Choroso",
          ],
        })
      );
      console.log("Atividades cadastradas com sucesso.");
    } else {
      console.log("As atividades já estão cadastradas.");
    }
  }, []);

  return (
    <div className="mt-10 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-sm p-6 rounded-xl shadow-lg"
      >
        <h2 className="text-3xl font-bold text-blue-500 text-center mb-6">
          Login
        </h2>

        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-base font-medium text-gray-700 mb-1"
          >
            Usuário
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={form.username}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            placeholder="Digite seu usuário"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-base font-medium text-gray-700 mb-1"
          >
            Senha
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            placeholder="Digite sua senha"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium text-base hover:bg-blue-700 transition-colors"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
