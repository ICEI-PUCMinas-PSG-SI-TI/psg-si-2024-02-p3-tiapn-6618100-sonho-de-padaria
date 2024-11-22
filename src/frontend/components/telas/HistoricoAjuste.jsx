import React, { useEffect, useState } from "react";
import CustomTabela from "../tabela";
import api from "@/pages/api/api";
import FilterListIcon from "@mui/icons-material/FilterList";
import { formatDate } from "../../utils/utils";

const colunas = [
  { field: "dataFormatada", headerName: "Data" },
  { field: "produto", headerName: "Produto" },
  { field: "qtd_transacao", headerName: "Quantidade" },
  { field: "tipo_trasacao", headerName: "Tipo de Transação" },
];

export default function HistoricoAjuste() {
  const [dados, setDados] = useState([]);
  const [dadosFiltrados, setDadosFiltrados] = useState([]);
  const [filtroProduto, setFiltroProduto] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchHistorico = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/api/TransacaoEstoque");
      const transacoes = response.data;

      const dadosComProduto = await Promise.all(
        transacoes.map(async (transacao) => {
          try {
            const produtoResponse = await api.get(
              `/api/Produto/${transacao.produto_id}`
            );
            if (produtoResponse) {
              return {
                ...transacao,
                tipo_trasacao:
                  transacao.tipo_trasacao === 1 ? "Adicionado" : "Removido",
                produto: produtoResponse.data.produto,
                dataFormatada: formatDate(transacao.data),
              };
            } else {
              return { ...transacao, produto: "Produto não encontrado" };
            }
          } catch (error) {
            return { ...transacao, produto: "Produto não encontrado" };
          }
        })
      );

      setDados(dadosComProduto);
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao buscar histórico de ajustes:", error);
      alert("Erro ao carregar o histórico. Tente novamente.");
    }
  };

  useEffect(() => {
    fetchHistorico();
  }, []);

  useEffect(() => {
    const dadosOrdenados = [...dados].sort(
      (a, b) => new Date(b.data) - new Date(a.data)
    );

    if (!filtroProduto) {
      setDadosFiltrados(dadosOrdenados);
    } else {
      const filtrados = dadosOrdenados.filter((transacao) => {
        const incluiProduto = transacao.produto
          ?.toLowerCase()
          .includes(filtroProduto.toLowerCase());
        return incluiProduto;
      });
      setDadosFiltrados(filtrados);
    }
  }, [filtroProduto, dados]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === "produto") {
      setFiltroProduto(value);
    }
  };

  const getRowClassName = (tipoTransacao) => {
    return tipoTransacao === "Adicionado" ? "row-green" : "row-red";
  };

  return (
    <div className="estoque-container">
      <div className="title-filter">
        <div className="estoque-title">
          <span>HISTÓRICO DE ESTOQUE</span>
        </div>
        <div className="filtros-button-container">
          <div className="filtros-container">
            <FilterListIcon style={{ width: "30px" }} />
            <input
              type="text"
              name="produto"
              placeholder="PRODUTO"
              value={filtroProduto}
              onChange={handleFilterChange}
            />
          </div>
        </div>
      </div>
      <div className="estoque-tabela-container">
        <CustomTabela
          colunas={colunas}
          dados={dadosFiltrados}
          hasActions={false}
          rowClassName={(row) => getRowClassName(row.tipo_trasacao)}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
