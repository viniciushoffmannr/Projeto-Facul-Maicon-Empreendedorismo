import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type LoginFormState = {
  username: string;
  password: string;
};

const hashAluno = (nome: string): number =>
  nome.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);

const gerarObservacao = (nome: string, data: string): string => {
  const hash = hashAluno(nome);
  const dia = new Date(data).getDate();

  const mensagens = [
    "Fez um ótimo lanche!",
    "Brincou bastante com os amigos.",
    "Estava um pouco cansado hoje.",
    "Participou das atividades com entusiasmo.",
    "Teve dificuldades para comer.",
    "Muito alegre e animado o dia todo.",
    "Precisa de atenção especial para medicação.",
  ];

  const idx = (hash + dia) % mensagens.length;
  return mensagens[idx];
};

const Login = () => {
  const [form, setForm] = useState<LoginFormState>({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  // Função auxiliar para pegar um item aleatório de um array
  const randomItem = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(form));
    navigate("/home");
  };

  useEffect(() => {
    // Só cadastra alunos se não tiver no storage
    if (!localStorage.getItem("alunosCadastro")) {
      const alunos = [
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
      ];

      localStorage.setItem("alunosCadastro", JSON.stringify(alunos));
      console.log("Dados iniciais de alunos cadastrados com sucesso.");
    } else {
      console.log("Já existem alunos cadastrados. Nenhuma alteração foi feita.");
    }

    if (!localStorage.getItem("atividades")) {
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

    // Gera agenda para últimos 2 dias com dados dinâmicos
    const alunosStorage = localStorage.getItem("alunosCadastro");
    const atividadesStorage = localStorage.getItem("atividades");

    if (alunosStorage && atividadesStorage) {
      const alunos = JSON.parse(alunosStorage);
      const atividades = JSON.parse(atividadesStorage);

      const agendaExistente = localStorage.getItem("agendaPorAluno");
      const agenda = agendaExistente ? JSON.parse(agendaExistente) : {};

      // datas para os últimos 2 dias (hoje e ontem)
      const hoje = new Date();
      const ontem = new Date(hoje);
      ontem.setDate(hoje.getDate() - 1);

      const dias = [ontem, hoje];

      alunos.forEach((aluno: any) => {
        if (!agenda[aluno.nome]) agenda[aluno.nome] = {};

        dias.forEach((dia) => {
          const dataStr = dia.toISOString().split("T")[0];

          // Só cria se não tiver ainda
          if (!agenda[aluno.nome][dataStr]) {
            agenda[aluno.nome][dataStr] = {
              lancheManha: randomItem(atividades.lanchesManha),
              almoco: randomItem(atividades.almoços),
              lancheTarde: randomItem(atividades.lanchesTarde),
              xixi: randomItem(atividades.xixi),
              coco: randomItem(atividades.coco),
              humor: randomItem(atividades.humor),
              observacao: gerarObservacao(aluno.nome, dataStr),
            };
          }
        });
      });

      localStorage.setItem("agendaPorAluno", JSON.stringify(agenda));
      console.log("Agenda dinâmica gerada para os últimos 2 dias.");
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
