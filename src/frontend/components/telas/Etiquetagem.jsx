import React, { useState, useEffect } from "react";
import CustomTabela from "../tabela";
import CustomModal from "../modals/CustomModal";
import api from "@/pages/api/api";
import FilterListIcon from "@mui/icons-material/FilterList";

const colunas = [
  { field: "etiqueta_id", headerName: "Código da Etiqueta" },
  { field: "cod_produto", headerName: "Código do Produto" },
  { field: "produto", headerName: "Produto" },
  { field: "preco", headerName: "Preço (R$)" },
];

export default function Etiquetagem() {
  const [dados, setDados] = useState([]);
  const [dadosFiltrados, setDadosFiltrados] = useState([]);
  const [produtosDisponiveis, setProdutosDisponiveis] = useState([]);
  const [isNovaEtiquetaModalOpen, setIsNovaEtiquetaModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [novaEtiqueta, setNovaEtiqueta] = useState({
    cod_produto: "",
    quantidade: "",
  });
  const [etiquetaSelecionada, setEtiquetaSelecionada] = useState(null);
  const [filtroProduto, setFiltroProduto] = useState("");
  const [filtroCodigo, setFiltroCodigo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getProdutos = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/api/Produto");
      setProdutosDisponiveis(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      alert("Erro ao carregar produtos. Tente novamente.");
    }
  };

  const getEtiquetas = async () => {
    try {
      setIsLoading(true);
      if (produtosDisponiveis.length === 0) {
        await getProdutos();
      }

      const response = await api.get("/api/Etiquetagem");
      const etiquetas = response.data.map((etiqueta) => {
        const produtoRelacionado = produtosDisponiveis.find(
          (p) => p.produto_id === etiqueta.produto_id
        );
        return {
          etiqueta_id: etiqueta.etiqueta_id,
          cod_produto: produtoRelacionado?.cod_produto || "Desconhecido",
          produto: produtoRelacionado?.produto || "Desconhecido",
          preco: `R$ ${etiqueta.preco_prod.toFixed(2).replace(".", ",")}`,
        };
      });
      setDados(etiquetas);
      setDadosFiltrados(etiquetas);
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao buscar etiquetas:", error);
      alert("Erro ao carregar etiquetas. Tente novamente.");
    }
  };

  useEffect(() => {
    getProdutos();
  }, []);

  useEffect(() => {
    if (produtosDisponiveis.length > 0) {
      getEtiquetas();
    }
  }, [produtosDisponiveis]);

  useEffect(() => {
    if (!filtroProduto && !filtroCodigo) {
      setDadosFiltrados(dados);
    } else {
      const filtrados = dados.filter((etiqueta) => {
        const incluiProduto = etiqueta.produto
          ?.toLowerCase()
          .includes(filtroProduto.toLowerCase());
        const incluiCodigo = etiqueta.cod_produto
          ?.toLowerCase()
          .includes(filtroCodigo.toLowerCase());
        return incluiProduto && incluiCodigo;
      });
      setDadosFiltrados(filtrados);
    }
  }, [filtroProduto, filtroCodigo, dados]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === "produto") {
      setFiltroProduto(value);
    } else if (name === "codigo") {
      setFiltroCodigo(value);
    }
  };

  const closeNovaEtiquetaModal = () => {
    setIsNovaEtiquetaModalOpen(false);
    setNovaEtiqueta({ cod_produto: "", quantidade: "" });
  };

  const handleNovaEtiquetaChange = (e) => {
    const { name, value } = e.target;

    if (name === "cod_produto") {
      const produtoSelecionado = produtosDisponiveis.find(
        (p) => p.cod_produto === value
      );
      setNovaEtiqueta({
        ...novaEtiqueta,
        cod_produto: value,
        produto: produtoSelecionado?.produto || "",
        produto_id: produtoSelecionado?.produto_id || "",
      });
    } else if (name === "quantidade") {
      const somenteNumeros = value.replace(/[^0-9]/g, "");
      setNovaEtiqueta({ ...novaEtiqueta, quantidade: somenteNumeros });
    } else {
      setNovaEtiqueta({ ...novaEtiqueta, [name]: value });
    }
  };

  const salvarNovaEtiqueta = async () => {
    if (novaEtiqueta.cod_produto && novaEtiqueta.quantidade) {
      const produtoSelecionado = produtosDisponiveis.find(
        (p) => p.cod_produto === novaEtiqueta.cod_produto
      );

      if (produtoSelecionado) {
        const precoPorKg = produtoSelecionado.preco_prod;
        const quantidadeEmKg = parseFloat(novaEtiqueta.quantidade);
        const precoFinal = ((precoPorKg * quantidadeEmKg) / 1000).toFixed(2);

        const etiquetaData = {
          produto_id: produtoSelecionado.produto_id,
          preco_prod: parseFloat(precoFinal),
        };

        try {
          const response = await api.post("/api/Etiquetagem", etiquetaData);
          const novaEtiquetaComId = {
            etiqueta_id: response.data.etiqueta_id,
            cod_produto: produtoSelecionado.cod_produto,
            produto: produtoSelecionado.produto,
            preco: `R$ ${precoFinal.replace(".", ",")}`,
          };

          setDados((prevDados) => [...prevDados, novaEtiquetaComId]);
          closeNovaEtiquetaModal();
        } catch (error) {
          console.error("Erro ao salvar etiqueta:", error);
          alert("Erro ao salvar a etiqueta. Tente novamente.");
        }
      }
    } else {
      alert("Por favor, preencha todos os campos antes de salvar.");
    }
  };

  const onPrint = (etiqueta) => {
    setEtiquetaSelecionada(etiqueta);
    setIsPrintModalOpen(true);
  };

  const onDelete = (etiqueta) => {
    setEtiquetaSelecionada(etiqueta);
    setIsDeleteModalOpen(true);
  };

  const closePrintModal = () => {
    setIsPrintModalOpen(false);
    setEtiquetaSelecionada(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setEtiquetaSelecionada(null);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/api/Etiquetagem/${etiquetaSelecionada.etiqueta_id}`);
      setDados((prevDados) =>
        prevDados.filter(
          (etiqueta) => etiqueta.etiqueta_id !== etiquetaSelecionada.etiqueta_id
        )
      );
      closeDeleteModal();
    } catch (error) {
      console.error("Erro ao excluir etiqueta:", error);
      alert("Erro ao excluir a etiqueta. Tente novamente.");
    }
  };

  return (
    <div className="estoque-container">
      <div className="title-filter">
        <div className="estoque-title">
          <span>ETIQUETAGEM</span>
        </div>
        <div className="modais-buttons-container">
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
              <input
                type="text"
                name="codigo"
                placeholder="CÓDIGO"
                value={filtroCodigo}
                onChange={handleFilterChange}
              />
            </div>
            <div className="modais-buttons-container">
              <button onClick={() => setIsNovaEtiquetaModalOpen(true)}>
                NOVA ETIQUETA
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="estoque-tabela-container">
        <CustomTabela
          colunas={colunas}
          dados={dadosFiltrados}
          isEtiquetagem={true}
          onPrint={onPrint}
          onDelete={onDelete}
          hasActions={true}
          isLoading={isLoading}
        />
      </div>
      <CustomModal
        isOpen={isNovaEtiquetaModalOpen}
        onClose={closeNovaEtiquetaModal}
      >
        <h3>NOVA ETIQUETA</h3>
        <div className="etiqueta-forms">
          <label>Código do Produto</label>
          <select
            name="cod_produto"
            value={novaEtiqueta.cod_produto}
            onChange={handleNovaEtiquetaChange}
            className="modal-produto-input"
          >
            <option value="">Selecione um produto</option>
            {produtosDisponiveis.map((produto) => (
              <option key={produto.produto_id} value={produto.cod_produto}>
                {produto.cod_produto} - {produto.produto}
              </option>
            ))}
          </select>
        </div>
        <div className="etiqueta-forms">
          <label>Nome do Produto</label>
          <input
            className="modal-produto-input"
            type="text"
            value={novaEtiqueta.produto || ""}
            disabled
          />
        </div>
        <div className="etiqueta-forms">
          <label>Quantidade (em kg)</label>
          <input
            type="text"
            name="quantidade"
            value={(novaEtiqueta.quantidade / 1000).toFixed(3)}
            className="modal-produto-input"
            onChange={(e) => handleNovaEtiquetaChange(e)}
            placeholder="Digite a quantidade em gramas"
          />
        </div>
        <div className="div-etiqueta-buttons">
          <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
            <button
              className="etiqueta-forms-button-cl"
              onClick={closeNovaEtiquetaModal}
            >
              Cancelar
            </button>
            <button
              className="etiqueta-forms-button-sl"
              onClick={salvarNovaEtiqueta}
            >
              Salvar
            </button>
          </div>
        </div>
      </CustomModal>
      <CustomModal
        isOpen={isPrintModalOpen}
        onClose={closePrintModal}
        width={"300px"}
      >
        <h3>Imprimir Etiqueta</h3>
        {etiquetaSelecionada && (
          <div>
            <p>
              <b>Produto:</b> {etiquetaSelecionada.produto}
            </p>
            <p>
              <b>Código:</b> {etiquetaSelecionada.cod_produto}
            </p>
            <p>
              <b>Preço:</b> {etiquetaSelecionada.preco}
            </p>
            <div className="modal-buttons">
              <button
                className="etiqueta-forms-button-cl"
                onClick={closePrintModal}
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </CustomModal>
      <CustomModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        width={"400px"}
      >
        <h3>EXCLUIR ETIQUETA</h3>
        {etiquetaSelecionada && (
          <div>
            <p>
              Tem certeza que deseja excluir a etiqueta do produto{" "}
              <b>{etiquetaSelecionada.produto}</b>?
            </p>
            <div className="div-etiqueta-buttons">
              <button
                className="etiqueta-forms-button-cl"
                onClick={closeDeleteModal}
              >
                Cancelar
              </button>
              <button
                className="etiqueta-forms-button-sl"
                onClick={confirmDelete}
              >
                Confirmar
              </button>
            </div>
          </div>
        )}
      </CustomModal>
    </div>
  );
}
