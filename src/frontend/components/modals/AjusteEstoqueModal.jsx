import api from "@/pages/api/api";
import React, { useState } from "react";

const EstoqueAjusteForm = ({
  produtoSelecionado,
  onSave,
  onClose,
  fetchProdutos,
}) => {
  const [formData, setFormData] = useState(produtoSelecionado || {});
  const [isSelectedAjuste, setIsSelectedAjuste] = useState(false);
  const [acaoAjuste, setAcaoAjuste] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [error, setError] = useState(null);

  const handleAjusteButton = (acao) => {
    setIsSelectedAjuste(true);
    setAcaoAjuste(acao);
    setSelectedButton(acao);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "ajuste") {
      const ajuste = Number(value || 0);
      const quantidadeAtual = Number(formData.qtd_estoque_prod || 0);

      if (acaoAjuste === "negativo" && ajuste > quantidadeAtual) {
        setError(
          "O ajuste negativo não pode ser maior que a quantidade atual."
        );
        return;
      } else {
        setError(null);
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (error) {
      alert("Corrija os erros antes de salvar.");
      return;
    }

    const ajuste = Number(formData.ajuste || 0);
    const quantidadeAtual = Number(formData.qtd_estoque_prod || 0);

    const quantidadeAjustada =
      acaoAjuste === "positivo"
        ? quantidadeAtual + ajuste
        : quantidadeAtual - ajuste;

    const { ajuste: _, ...updatedFormData } = {
      ...formData,
      qtd_estoque_prod: quantidadeAjustada,
    };

    const transacaoData = {
      produto_id: updatedFormData.produto_id,
      tipo_trasacao: acaoAjuste === "positivo" ? 1 : -1,
      qtd_transacao: ajuste.toString(),
      data: new Date().toISOString(),
    };

    try {
      const responseTransacao = await api.post(
        "api/TransacaoEstoque",
        transacaoData
      );

      console.log("Transação registrada com sucesso.");

      const responseUpdate = await api.put(
        `/api/Produto/${updatedFormData.produto_id}`,
        {
          ...updatedFormData,
          preco_prod:
            parseFloat(
              updatedFormData.preco_prod.replace("R$", "").replace(",", ".")
            ) || 0.0,
        }
      );
      fetchProdutos();

      console.log("Estoque atualizado com sucesso.");
      onClose();
    } catch (error) {
      console.error(
        "Erro ao realizar a transação e atualizar o estoque:",
        error
      );
    }
  };

  return (
    <form className="form-produto-container" onSubmit={handleSubmit}>
      <h3 className="modal-produto-title">AJUSTE DE ESTOQUE</h3>
      <div className="modal-input-section-1">
        <div className="modal-produto-label-input">
          <label className="modal-produto-label">Código</label>
          <input
            type="text"
            name="codigo"
            value={formData.cod_produto || ""}
            onChange={handleChange}
            disabled={true}
            className="modal-produto-input"
          />
        </div>
        <div className="modal-produto-label-input">
          <label className="modal-produto-label">Produto</label>
          <input
            type="text"
            name="produto"
            value={formData.produto || ""}
            onChange={handleChange}
            className="modal-produto-input"
            disabled={true}
          />
        </div>
      </div>
      <div className="modal-produto-label-input">
        <label className="modal-produto-label">Quantidade Atual</label>
        <input
          type="text"
          name="quantidade"
          value={formData.qtd_estoque_prod || ""}
          onChange={handleChange}
          className="modal-produto-input"
          disabled={true}
        />
      </div>
      <div className="ajuste-btn-input">
        <div className="buttons-ajuste">
          <span>Selecione a ação: </span>
          <div style={{display: 'flex', gap: '10px'}}>
            <button
              className={`ajuste-estoque-adicionar ${
                selectedButton === "positivo" ? "selected" : ""
              }`}
              type="button"
              onClick={() => handleAjusteButton("positivo")}
            >
              AJUSTE POSITIVO
            </button>
            <button
              className={`ajuste-estoque-remover ${
                selectedButton === "negativo" ? "selected" : ""
              }`}
              type="button"
              onClick={() => handleAjusteButton("negativo")}
            >
              AJUSTE NEGATIVO
            </button>
          </div>
        </div>
        {isSelectedAjuste && acaoAjuste && (
          <div className="input-ajuste-erro">
            <input
              type="number"
              name="ajuste"
              placeholder={`Digite o valor a ser ${
                acaoAjuste === "positivo" ? "aumentado" : "diminuído"
              }`}
              onChange={handleChange}
              className={`modal-produto-input ${error ? "input-error" : ""}`}
            />
            {error && <span className="error-text">{error}</span>}
          </div>
        )}
      </div>
      <div className="btn-ajuste-estoque">
        <button className="modal-produto-submit-button" type="submit">
          Salvar
        </button>
      </div>
    </form>
  );
};

export default EstoqueAjusteForm;
