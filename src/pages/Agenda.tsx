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
  const [selecionado, setSelecionado] = useState<{
    lancheManha: string;
    almoco: string;
    lancheTarde: string;
    xixi: string;
    coco: string;
    humor: string;
    observacao: string;
  } | null>(null);

  const [dataSelecionada, setDataSelecionada] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    const alunosStorage = localStorage.getItem("alunosCadastro");
    if (alunosStorage) {
      const todosAlunos: Aluno[] = JSON.parse(alunosStorage);
      // pega só 3 alunos para mostrar
      setAlunos(todosAlunos.slice(0, 3));
    }
  }, []);

  // Quando aluno ou data mudar, carrega dados da agenda para aquele aluno e data
  useEffect(() => {
    if (!alunoSelecionado) {
      setSelecionado(null);
      return;
    }

    const agendaStorage = localStorage.getItem("agendaPorAluno");
    if (!agendaStorage) {
      setSelecionado(null);
      return;
    }

    const parsed = JSON.parse(agendaStorage);
    const dadosDia = parsed?.[alunoSelecionado.nome]?.[dataSelecionada] || null;

    if (dadosDia) {
      setSelecionado(dadosDia);
    } else {
      setSelecionado(null);
    }
  }, [alunoSelecionado, dataSelecionada]);

  // Para selects só leitura: Remove seta dropdown via CSS inline style
  const selectReadOnlyStyle: React.CSSProperties = {
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    pointerEvents: "none", // bloqueia interação
    backgroundColor: "#f3f4f6", // cor de fundo semelhante ao input readOnly
    border: "1px solid #d1d5db",
    borderRadius: "0.375rem",
    padding: "0.5rem 0.75rem",
    width: "100%",
    color: "#374151",
    fontSize: "1rem",
  };

  const renderSelectReadOnly = (label: string, value: string) => (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select style={selectReadOnlyStyle} value={value} disabled>
        <option value={value}>{value || "—"}</option>
      </select>
    </div>
  );

  return (
    <div className="mb-12 min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-500">
        O que eu fiz hoje?
      </h1>

      <div className="w-full max-w-xl bg-white rounded-xl shadow-md p-6">
        <label htmlFor="aluno" className="block text-sm font-medium mb-2">
          Selecione o filho(a)
        </label>
        <select
          id="aluno"
          className="w-full border border-gray-300 rounded px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => {
            const aluno = alunos.find((a) => a.nome === e.target.value) || null;
            setAlunoSelecionado(aluno);
          }}
          value={alunoSelecionado?.nome || ""}
        >
          <option value="" disabled>
            Escolha um filho(a)
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

        {alunoSelecionado ? (
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

              <h2 className="text-2xl font-semibold">
                {alunoSelecionado.nome}
              </h2>
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

              {selecionado ? (
                <>
                  {renderSelectReadOnly(
                    "Lanche da manhã",
                    selecionado.lancheManha
                  )}
                  {renderSelectReadOnly("Almoço", selecionado.almoco)}
                  {renderSelectReadOnly(
                    "Lanche da tarde",
                    selecionado.lancheTarde
                  )}
                  {renderSelectReadOnly("Número 1 (xixi)", selecionado.xixi)}
                  {renderSelectReadOnly("Número 2 (cocô)", selecionado.coco)}
                  {renderSelectReadOnly("Humor", selecionado.humor)}

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Observação
                    </label>
                    <textarea
                      value={selecionado.observacao}
                      readOnly
                      className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 resize-none"
                      rows={3}
                    />
                  </div>
                </>
              ) : (
                <p className="text-center text-gray-500 mt-6">
                  Nenhuma informação registrada para esta data.
                </p>
              )}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500 mt-6">
            Selecione um filho(a) para ver as informações.
          </p>
        )}
      </div>
    </div>
  );
};

export default Agenda;
