import React, { useState, useEffect } from "react";
import CustomTabela from "../tabela";
import CustomModal from "../modals/CustomModal";
import ProdutoForms from "../modals/ProdutoForms";
import EstoqueAjusteForm from "../modals/AjusteEstoqueModal";
import api from "@/pages/api/api";
import FilterListIcon from "@mui/icons-material/FilterList";

const colunas = [
  { field: "cod_produto", headerName: "CÓDIGO" },
  { field: "produto", headerName: "PRODUTO" },
  { field: "tipo_prod", headerName: "TIPO" },
  { field: "qtd_estoque_prod", headerName: "QUANTIDADE" },
  { field: "unidade_prod", headerName: "UNIDADE" },
  { field: "preco_prod", headerName: "PREÇO BASE" },
];

const formatarPreco = (preco) => {
  if (typeof preco !== "number") return "R$ 0,00";
  return `R$ ${preco.toFixed(2).replace(".", ",")}`;
};

export default function Estoque({onNavigate}) {
  const [dados, setDados] = useState([]);
  const [dadosFiltrados, setDadosFiltrados] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEstoqueAjusteOpen, setIsEstoqueAjusteOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalType, setModalType] = useState("novo");
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [filtroProduto, setFiltroProduto] = useState("");
  const [filtroCodigo, setFiltroCodigo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchProdutos = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/api/Produto");
      const produtosFormatados = response.data.map((produto) => ({
        ...produto,
        preco_prod: formatarPreco(produto.preco_prod),
      }));
      setDados(produtosFormatados);
      setDadosFiltrados(produtosFormatados);
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      alert("Erro ao carregar os produtos. Tente novamente.");
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const handleFilterChange = (produtoFiltro, codigoFiltro) => {
    if (!produtoFiltro && !codigoFiltro) {
      setDadosFiltrados(dados);
      return;
    }

    const filtrados = dados.filter((produto) => {
      const incluiProduto = produto.produto
        ?.toLowerCase()
        .includes(produtoFiltro.toLowerCase());
      const incluiCodigo = produto.cod_produto
        ?.toLowerCase()
        .includes(codigoFiltro.toLowerCase());
      return incluiProduto && incluiCodigo;
    });

    setDadosFiltrados(filtrados);
  };

  useEffect(() => {
    handleFilterChange(filtroProduto, filtroCodigo);
  }, [filtroProduto, filtroCodigo]);

  const openModal = (type, produto) => {
    setModalType(type);
    setProdutoSelecionado(produto);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setProdutoSelecionado(null);
  };

  const handleEdit = (produto) => {
    openModal("editar", produto);
  };

  const handleAdjust = (produto) => {
    setProdutoSelecionado(produto);
    setIsEstoqueAjusteOpen(true);
  };

  const handleDelete = (produto) => {
    setProdutoSelecionado(produto);
    setIsDeleteModalOpen(true);
  };

  const closeEstoqueAjusteModal = () => {
    setIsEstoqueAjusteOpen(false);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  const confirmDelete = async () => {
    try {
      await api.delete(`/api/Produto/${produtoSelecionado.produto_id}`);
      setDados((prevDados) =>
        prevDados.filter(
          (produto) => produto.produto_id !== produtoSelecionado.produto_id
        )
      );
      fetchProdutos();
      closeDeleteModal();
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      alert("Erro ao excluir o produto. Tente novamente.");
    }
  };

  const handleSave = async (produto) => {
    const { produto_id, ...produtoData } = produto;
    try {
      if (modalType === "novo") {
        const response = await api.post("/api/Produto", produtoData);
        setDados((prevDados) => [...prevDados, response.data]);
        setDadosFiltrados((prevDados) => [...prevDados, response.data]);
        
      } else if (modalType === "editar") {
        await api.put(`/api/Produto/${produto_id}`, {
          ...produtoData,
          produto_id,
        });
        setDados((prevDados) =>
          prevDados.map((item) =>
            item.cod_produto === produto.cod_produto ? produto : item
          )
        );
        setDadosFiltrados((prevDados) =>
          prevDados.map((item) =>
            item.cod_produto === produto.cod_produto ? produto : item
          )
        );
      }
      fetchProdutos();
      closeModal();
    } catch (error) {
      console.error("Erro ao salvar produto:", error.response?.data || error);
      alert("Erro ao salvar o produto. Tente novamente.");
    }
  };

  return (
    <div className="estoque-container">
      <div className="title-filter">
        <div className="estoque-title">
          <span>CONTROLE DE ESTOQUE</span>
        </div>
        <div className="filtros-button-container">
          <div className="filtros-container">
            <FilterListIcon style={{ width: "30px" }} />
            <input
              type="text"
              placeholder="PRODUTO"
              value={filtroProduto}
              onChange={(e) => setFiltroProduto(e.target.value)}
            />
            <input
              type="text"
              placeholder="CÓDIGO"
              value={filtroCodigo}
              onChange={(e) => setFiltroCodigo(e.target.value)}
            />
          </div>
          <div className="modais-buttons-container">
            <button onClick={() => openModal("novo")}>NOVO PRODUTO</button>
            <button className="btn-hist-ajust-navg" onClick={() => onNavigate("historico")}>HISTÓRICO DE AJUSTE</button>
          </div>
        </div>
      </div>
      <div className="estoque-tabela-container">
        <CustomTabela
          colunas={colunas}
          dados={dadosFiltrados}
          onEdit={handleEdit}
          isAjuste={true}
          onAdjust={handleAdjust}
          hasActions={true}
          onDeleteProduct={handleDelete}
          isLoading={isLoading}
        />
      </div>
      <CustomModal isOpen={isModalOpen} onClose={closeModal}>
        <ProdutoForms
          tipo={modalType}
          produto={produtoSelecionado}
          onSave={handleSave}
          onCloseModal={closeModal}
        />
      </CustomModal>
      <CustomModal
        isOpen={isEstoqueAjusteOpen}
        onClose={closeEstoqueAjusteModal}
      >
        <EstoqueAjusteForm
          produtoSelecionado={produtoSelecionado}
          onClose={closeEstoqueAjusteModal}
          fetchProdutos={fetchProdutos}
        />
      </CustomModal>
      <CustomModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        width={"400px"}
      >
        <h3>Confirmar Exclusão</h3>
        <p>Deseja realmente excluir o produto selecionado?</p>
        <div
          style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}
        >
          <button
            className="etiqueta-forms-button-cl"
            onClick={closeDeleteModal}
          >
            Cancelar
          </button>
          <button className="etiqueta-forms-button-sl" onClick={confirmDelete}>
            Sim, excluir
          </button>
        </div>
      </CustomModal>
    </div>
  );
}
