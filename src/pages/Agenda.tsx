import React, { useEffect, useState } from "react";
import userPhoto from "../assets/perfil-sem.jpg";

type Aluno = {
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

const calcularIdade = (dataNascimento: string): number => {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const m = hoje.getMonth() - nascimento.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }
  return idade;
};

const Agenda: React.FC = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [alunoSelecionado, setAlunoSelecionado] = useState<Aluno | null>(null);
  const [atividades, setAtividades] = useState({
    lanchesManha: [] as string[],
    almoços: [] as string[],
    lanchesTarde: [] as string[],
    xixi: [] as string[],
    coco: [] as string[],
    humor: [] as string[],
  });

  const [selecionado, setSelecionado] = useState({
    lancheManha: "",
    almoco: "",
    lancheTarde: "",
    xixi: "",
    coco: "",
    humor: "",
    observacao: "",
  });

  const [dataSelecionada, setDataSelecionada] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    const alunosStorage = localStorage.getItem("alunosCadastro");
    if (alunosStorage) {
      setAlunos(JSON.parse(alunosStorage));
    }
  }, []);

  useEffect(() => {
    const dados = localStorage.getItem("atividades");
    if (dados) {
      const parsed = JSON.parse(dados);
      setAtividades({
        lanchesManha: parsed.lanchesManha || [],
        almoços: parsed.almoços || [],
        lanchesTarde: parsed.lanchesTarde || [],
        xixi: parsed.xixi || [],
        coco: parsed.coco || [],
        humor: parsed.humor || [],
      });
    }
  }, []);

  useEffect(() => {
    if (alunoSelecionado) {
      const agendaStorage = localStorage.getItem("agendaPorAluno");
      if (agendaStorage) {
        const parsed = JSON.parse(agendaStorage);
        const alunoAgenda = parsed[alunoSelecionado.nome]?.[dataSelecionada];
        if (alunoAgenda) {
          setSelecionado(alunoAgenda);
        } else {
          setSelecionado({
            lancheManha: "",
            almoco: "",
            lancheTarde: "",
            xixi: "",
            coco: "",
            humor: "",
            observacao: "",
          });
        }
      } else {
        setSelecionado({
          lancheManha: "",
          almoco: "",
          lancheTarde: "",
          xixi: "",
          coco: "",
          humor: "",
          observacao: "",
        });
      }
    } else {
      setSelecionado({
        lancheManha: "",
        almoco: "",
        lancheTarde: "",
        xixi: "",
        coco: "",
        humor: "",
        observacao: "",
      });
    }
  }, [alunoSelecionado, dataSelecionada]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const aluno = alunos.find((a) => a.nome === e.target.value) || null;
    setAlunoSelecionado(aluno);
  };

  const handleChange = (field: keyof typeof selecionado, value: string) => {
    const novoSelecionado = { ...selecionado, [field]: value };
    setSelecionado(novoSelecionado);

    if (!alunoSelecionado) return;

    const agendaStorage = localStorage.getItem("agendaPorAluno");
    const parsed = agendaStorage ? JSON.parse(agendaStorage) : {};

    if (!parsed[alunoSelecionado.nome]) {
      parsed[alunoSelecionado.nome] = {};
    }

    parsed[alunoSelecionado.nome][dataSelecionada] = novoSelecionado;
    localStorage.setItem("agendaPorAluno", JSON.stringify(parsed));
  };

  const renderDropdown = (
    label: string,
    options: string[],
    value: string,
    field: keyof typeof selecionado
  ) => (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => handleChange(field, e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Selecione uma opção</option>
        {options.map((opcao, index) => (
          <option key={index} value={opcao}>
            {opcao}
          </option>
        ))}
      </select>
    </div>
  );

  const temInformacaoPreenchida = Object.entries(selecionado).some(
    ([key, valor]) => key !== "observacao" && valor && valor.trim() !== ""
  );

  const handleEnviar = () => {
    alert(
      `Informações enviadas com sucesso para os pais do aluno "${alunoSelecionado?.nome}" na data ${dataSelecionada}!`
    );
  };

  return (
    <div className="mb-12 min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-500">Detalhes do Aluno</h1>

      <div className="w-full max-w-xl bg-white rounded-xl shadow-md p-6">
        <label htmlFor="aluno" className="block text-sm font-medium mb-2">
          Selecione o aluno
        </label>
        <select
          id="aluno"
          className="w-full border border-gray-300 rounded px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleSelectChange}
          defaultValue=""
        >
          <option value="" disabled>
            Escolha um aluno
          </option>
          {alunos.map((aluno) => (
            <option key={aluno.nome} value={aluno.nome}>
              {aluno.nome}
            </option>
          ))}
        </select>

        <div className="mb-6">
          <label htmlFor="data" className="block text-sm font-medium mb-2">
            Selecione a data
          </label>
          <input
            id="data"
            type="date"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={dataSelecionada}
            onChange={(e) => setDataSelecionada(e.target.value)}
            max={new Date().toISOString().split("T")[0]}
          />
        </div>

        {alunoSelecionado && (
          <>
            <div className="flex items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center mr-4 overflow-hidden">
                <img
                  src={userPhoto}
                  alt="Foto do aluno"
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "https://via.placeholder.com/96?text=Foto";
                  }}
                />
              </div>

              <h2 className="text-2xl font-semibold">{alunoSelecionado.nome}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Responsável 1 (Pai)
                </label>
                <input
                  type="text"
                  value={alunoSelecionado.nomePai}
                  readOnly
                  className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Responsável 2 (Mãe)
                </label>
                <input
                  type="text"
                  value={alunoSelecionado.nomeMae}
                  readOnly
                  className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
                />
              </div>
            </div>

            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Sexo</label>
                <input
                  type="text"
                  value={alunoSelecionado.sexo}
                  readOnly
                  className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Idade</label>
                <input
                  type="text"
                  value={calcularIdade(alunoSelecionado.dataNascimento)}
                  readOnly
                  className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Restrição alimentar
              </label>
              <textarea
                value={alunoSelecionado.restricaoAlimentar}
                readOnly
                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 resize-none"
                rows={2}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Alergia</label>
              <textarea
                value={alunoSelecionado.alergia}
                readOnly
                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 resize-none"
                rows={2}
              />
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-500">
                Agenda do Dia ({dataSelecionada})
              </h3>
              {renderDropdown(
                "Lanche da manhã",
                atividades.lanchesManha,
                selecionado.lancheManha,
                "lancheManha"
              )}
              {renderDropdown("Almoço", atividades.almoços, selecionado.almoco, "almoco")}
              {renderDropdown(
                "Lanche da tarde",
                atividades.lanchesTarde,
                selecionado.lancheTarde,
                "lancheTarde"
              )}
              {renderDropdown("Número 1 (xixi)", atividades.xixi, selecionado.xixi, "xixi")}
              {renderDropdown("Número 2 (cocô)", atividades.coco, selecionado.coco, "coco")}
              {renderDropdown(
                "Humor",
                ["Feliz", "Triste", "Estressado", "Sonolento", "Animado"],
                selecionado.humor,
                "humor"
              )}

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Observação</label>
                <textarea
                  value={selecionado.observacao}
                  onChange={(e) => handleChange("observacao", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 bg-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Digite aqui qualquer observação sobre o aluno..."
                />
              </div>

              {temInformacaoPreenchida && (
                <button
                  onClick={handleEnviar}
                  className="mt-6 w-full bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition"
                >
                  Enviar Informações
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Agenda;
