import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type AtividadesData = {
  lanchesManha: string[];
  almoços: string[];
  lanchesTarde: string[];
  xixi: string[];
  coco: string[];
};

const CadastroAtividades: React.FC = () => {
  const [lanchesManha, setLanchesManha] = useState<string[]>([""]);
  const [almoços, setAlmoços] = useState<string[]>([""]);
  const [lanchesTarde, setLanchesTarde] = useState<string[]>([""]);
  const [xixi, setXixi] = useState("");
  const [coco, setCoco] = useState("");

  const navigate = useNavigate()

  const handleChangeArray = (
    index: number,
    value: string,
    arr: string[],
    setArr: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const novoArray = [...arr];
    novoArray[index] = value;
    setArr(novoArray);
  };

  const handleAddInput = (
    arr: string[],
    setArr: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setArr([...arr, ""]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const novoCadastro = {
      lanchesManha: lanchesManha.filter((item) => item.trim() !== ""),
      almoços: almoços.filter((item) => item.trim() !== ""),
      lanchesTarde: lanchesTarde.filter((item) => item.trim() !== ""),
      xixi: xixi.trim() ? [xixi.trim()] : [],
      coco: coco.trim() ? [coco.trim()] : [],
    };

    // Pega o objeto armazenado ou inicializa vazio
    const atividadesExistentesRaw = localStorage.getItem("atividades");
    let atividadesExistentes: AtividadesData = {
      lanchesManha: [],
      almoços: [],
      lanchesTarde: [],
      xixi: [],
      coco: [],
    };

    if (atividadesExistentesRaw) {
      try {
        const parsed = JSON.parse(atividadesExistentesRaw);
        // Garantir que parsed tem as chaves com arrays, senão inicializa vazio
        atividadesExistentes = {
          lanchesManha: Array.isArray(parsed.lanchesManha)
            ? parsed.lanchesManha
            : [],
          almoços: Array.isArray(parsed.almoços) ? parsed.almoços : [],
          lanchesTarde: Array.isArray(parsed.lanchesTarde)
            ? parsed.lanchesTarde
            : [],
          xixi: Array.isArray(parsed.xixi) ? parsed.xixi : [],
          coco: Array.isArray(parsed.coco) ? parsed.coco : [],
        };
      } catch {
        // Se der erro, mantém objeto vazio inicial
      }
    }

    // Agora concatena os arrays já existentes com os novos valores
    const atualizado = {
      lanchesManha: [...atividadesExistentes.lanchesManha, ...novoCadastro.lanchesManha],
      almoços: [...atividadesExistentes.almoços, ...novoCadastro.almoços],
      lanchesTarde: [...atividadesExistentes.lanchesTarde, ...novoCadastro.lanchesTarde],
      xixi: [...atividadesExistentes.xixi, ...novoCadastro.xixi],
      coco: [...atividadesExistentes.coco, ...novoCadastro.coco],
    };

    // Salva o objeto atualizado
    localStorage.setItem("atividades", JSON.stringify(atualizado));

    // Limpa formulário
    setLanchesManha([""]);
    setAlmoços([""]);
    setLanchesTarde([""]);
    setXixi("");
    setCoco("");

    navigate("/home");
  };

  return (
    <div className="mb-12 min-h-screen bg-gray-100 flex justify-center items-start p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-lg"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Cadastro de Atividades</h1>

        {/* Lanche da manhã */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Lanche da manhã</label>
          {lanchesManha.map((item, idx) => (
            <div key={idx} className="flex mb-2 gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) =>
                  handleChangeArray(idx, e.target.value, lanchesManha, setLanchesManha)
                }
                className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite uma opção"
              />
              {idx === lanchesManha.length - 1 && (
                <button
                  type="button"
                  onClick={() => handleAddInput(lanchesManha, setLanchesManha)}
                  className="bg-green-500 text-white px-3 rounded hover:bg-green-600 transition"
                  aria-label="Adicionar mais lanche da manhã"
                >
                  +
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Almoço */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Almoço</label>
          {almoços.map((item, idx) => (
            <div key={idx} className="flex mb-2 gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) =>
                  handleChangeArray(idx, e.target.value, almoços, setAlmoços)
                }
                className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite uma opção"
              />
              {idx === almoços.length - 1 && (
                <button
                  type="button"
                  onClick={() => handleAddInput(almoços, setAlmoços)}
                  className="bg-green-500 text-white px-3 rounded hover:bg-green-600 transition"
                  aria-label="Adicionar mais almoço"
                >
                  +
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Lanche da tarde */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Lanche da tarde</label>
          {lanchesTarde.map((item, idx) => (
            <div key={idx} className="flex mb-2 gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) =>
                  handleChangeArray(idx, e.target.value, lanchesTarde, setLanchesTarde)
                }
                className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite uma opção"
              />
              {idx === lanchesTarde.length - 1 && (
                <button
                  type="button"
                  onClick={() => handleAddInput(lanchesTarde, setLanchesTarde)}
                  className="bg-green-500 text-white px-3 rounded hover:bg-green-600 transition"
                  aria-label="Adicionar mais lanche da tarde"
                >
                  +
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Xixi */}
        <div className="mb-6">
          <label htmlFor="xixi" className="block font-semibold mb-2">
            1 (Xixi)
          </label>
          <input
            id="xixi"
            type="text"
            value={xixi}
            onChange={(e) => setXixi(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Descreva o xixi"
          />
        </div>

        {/* Cocô */}
        <div className="mb-6">
          <label htmlFor="coco" className="block font-semibold mb-2">
            2 (Cocô)
          </label>
          <input
            id="coco"
            type="text"
            value={coco}
            onChange={(e) => setCoco(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Descreva o cocô"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          Salvar
        </button>
      </form>
    </div>
  );
};

export default CadastroAtividades;
