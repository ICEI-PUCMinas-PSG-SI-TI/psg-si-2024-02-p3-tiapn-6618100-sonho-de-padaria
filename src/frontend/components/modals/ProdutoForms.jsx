import React, { useState } from "react";

const ProdutoForms = ({ tipo, produto, onSave, onCloseModal }) => {
  const [formData, setFormData] = useState(
    produto || {
      cod_produto: "",
      produto: "",
      tipo_prod: "",
      qtd_estoque_prod: 0,
      preco_prod: 0,
      unidade_prod: "",
    }
  );

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "cod_produto":
        if (!value) newErrors.cod_produto = "Código é obrigatório.";
        else delete newErrors.cod_produto;
        break;

      case "produto":
        if (!value) newErrors.produto = "Nome do produto é obrigatório.";
        else delete newErrors.produto;
        break;

      case "qtd_estoque_prod":
        if (isNaN(value) || value < 0)
          newErrors.qtd_estoque_prod =
            "Quantidade deve ser maior ou igual a 0.";
        else delete newErrors.qtd_estoque_prod;
        break;

      case "preco_prod":
        if (isNaN(value) || value < 0)
          newErrors.preco_prod = "Preço deve ser maior ou igual a 0.";
        else delete newErrors.preco_prod;
        break;

      case "unidade_prod":
        if (!value) newErrors.unidade_prod = "Unidade é obrigatória.";
        else delete newErrors.unidade_prod;
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const formattedValue =
      name === "qtd_estoque_prod" ? parseInt(value, 10) : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: formattedValue,
    }));

    validate(name, formattedValue);
  };

  const handlePrecoChange = (e) => {
    let rawValue = e.target.value || "";
    const onlyNumbers = rawValue.replace(/\D/g, "");
    const numericValue = onlyNumbers ? parseFloat(onlyNumbers) / 100 : 0;
    setFormData((prevData) => ({
      ...prevData,
      preco_prod: numericValue,
    }));

    e.target.value = numericValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handlePrecoBlur = () => {
    setFormData((prevData) => ({
      ...prevData,
      preco_prod: parseFloat(prevData.preco_prod),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    Object.keys(formData).forEach((key) => validate(key, formData[key]));

    if (Object.keys(errors).length > 0) return;

    try {
      setIsLoading(true);
      await onSave(formData);
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      setIsLoading(false);
    }
  };

  return (
    <form className="form-produto-container" onSubmit={handleSubmit}>
      <h3 className="modal-produto-title">
        {tipo === "novo" ? "Cadastrar Produto" : "Editar Produto"}
      </h3>
      <div className="modal-input-section-1">
        <div className="modal-produto-label-input">
          <label className="modal-produto-label">Código</label>
          <input
            type="text"
            name="cod_produto"
            value={formData.cod_produto}
            onChange={handleChange}
            disabled={tipo === "editar"}
            className="modal-produto-input"
          />
          {errors.cod_produto && (
            <span className="error-text">{errors.cod_produto}</span>
          )}
        </div>
      </div>
      <div className="modal-input-section-2">
        <div className="modal-produto-label-input">
          <label className="modal-produto-label">Produto</label>
          <input
            type="text"
            name="produto"
            value={formData.produto}
            onChange={handleChange}
            className="modal-produto-input"
          />
          {errors.produto && (
            <span className="error-text">{errors.produto}</span>
          )}
        </div>
        <div className="modal-produto-label-input">
          <label className="modal-produto-label">Tipo</label>
          <input
            type="text"
            name="tipo_prod"
            value={formData.tipo_prod}
            onChange={handleChange}
            className="modal-produto-input"
          />
        </div>
      </div>
      <div className="modal-input-section-2">
        <div className="modal-produto-label-input">
          <label className="modal-produto-label">Quantidade</label>
          <input
            type="number"
            name="qtd_estoque_prod"
            value={formData.qtd_estoque_prod}
            onChange={handleChange}
            className="modal-produto-input"
            disabled={tipo === "editar"}
          />
          {errors.qtd_estoque_prod && (
            <span className="error-text">{errors.qtd_estoque_prod}</span>
          )}
        </div>
        <div className="modal-produto-label-input">
          <label className="modal-produto-label">Unidade</label>
          <input
            type="text"
            name="unidade_prod"
            value={formData.unidade_prod}
            onChange={handleChange}
            className="modal-produto-input"
          />
          {errors.unidade_prod && (
            <span className="error-text">{errors.unidade_prod}</span>
          )}
        </div>
        <div className="modal-produto-label-input">
          <label className="modal-produto-label">Preço</label>
          <input
            type="text"
            name="preco_prod"
            value={formData.preco_prod.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
            onChange={handlePrecoChange}
            className="modal-produto-input"
          />

          {errors.preco_prod && (
            <span className="error-text">{errors.preco_prod}</span>
          )}
        </div>
      </div>
      <div className="div-etiqueta-buttons">
        <button className="etiqueta-forms-button-cl" onClick={onCloseModal}>
          Cancelar
        </button>
        <button
          className="etiqueta-forms-button-sl"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <span className="spinner"></span> : "Salvar"}
        </button>
      </div>
    </form>
  );
};

export default ProdutoForms;
