import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import CustomTabela from "../tabela";
import CustomModal from "../modals/CustomModal";
import api from "@/pages/api/api";

export default function Vendas() {
  const [vendas, setVendas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerVendaModalOpen, setIsVerVendaModalOpen] = useState(false);
  const [detalhesVenda, setDetalhesVenda] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [novaVenda, setNovaVenda] = useState({
    funcionario_id: "",
    data_venda: new Date().toISOString().split("T")[0],
    total_venda: 0,
    produtos: [],
    status: false,
  });
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [quantidade, setQuantidade] = useState(1);
  const [produtosVenda, setProdutosVenda] = useState([]);
  const [filtroFuncionario, setFiltroFuncionario] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");

  const fetchData = async (endpoint, setState, errorMessage) => {
    try {
      const response = await api.get(endpoint);
      setState(response.data);
    } catch (error) {
      console.error(errorMessage, error);
    }
  };

  const fetchVendas = async () => {
    try {
      const [vendasResponse, funcionariosResponse] = await Promise.all([
        api.get("/api/Venda"),
        api.get("/api/Funcionario"),
      ]);

      const funcionariosMap = funcionariosResponse.data.reduce(
        (map, funcionario) => {
          map[funcionario.funcionario_id] = funcionario.nome_funcionario;
          return map;
        },
        {}
      );

      const vendasComNomeFuncionario = vendasResponse.data.map((venda) => ({
        ...venda,
        funcionario_nome:
          funcionariosMap[venda.funcionario_id] || "Desconhecido",
      }));

      setVendas(vendasComNomeFuncionario);
    } catch (error) {
      console.error("Erro ao buscar vendas ou funcionários:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchVendas();
    }, 5000);

    fetchData("/api/Produto", setProdutos, "Erro ao buscar produtos:");
    fetchData(
      "/api/Funcionario",
      setFuncionarios,
      "Erro ao buscar funcionários:"
    );

    return () => clearInterval(interval);
  }, []);

  const adicionarProduto = () => {
    if (!produtoSelecionado || quantidade <= 0) return;

    let preco;

    if (produtoSelecionado.unidade_prod === "kg") {
      // Para produtos em kg, calcula o preço proporcional
      preco = (parseFloat(produtoSelecionado.preco_prod) * quantidade) / 1000;
    } else {
      // Para produtos em unidade, usa o preço base sem divisão
      preco = parseFloat(produtoSelecionado.preco_prod) * quantidade;
    }

    const novoProduto = {
      produto_id: produtoSelecionado.produto_id,
      produto: produtoSelecionado.produto,
      preco,
      quantidade,
    };

    setNovaVenda((prev) => ({
      ...prev,
      total_venda: Math.max(parseFloat(prev.total_venda || 0) + preco, 0),
      produtos: [...prev.produtos, novoProduto],
    }));

    setProdutoSelecionado(null);
    setQuantidade(1);
  };

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => {
    setIsModalOpen(false);
    setNovaVenda({
      funcionario_id: "",
      data_venda: new Date().toISOString().split("T")[0],
      total_venda: 0,
      produtos: [],
    });
    setProdutoSelecionado(null);
    setQuantidade(1);
  };

  const salvarPedido = async () => {
    if (!novaVenda.funcionario_id || novaVenda.produtos.length === 0) {
      console.error("Campos obrigatórios não preenchidos.");
      return;
    }

    try {
      const response = await api.post("/api/Venda", novaVenda);
      const vendaId = response.data.venda_id;

      for (const produto of novaVenda.produtos) {
        const produtoComVenda = {
          ...produto,
          venda_id: vendaId,
        };
        await api.post("/api/VendasProdutos", produtoComVenda);
      }

      console.log("Pedido e produtos salvos com sucesso.");
      fetchData("/api/Venda", setVendas, "Erro ao buscar vendas:");
      handleModalClose();
    } catch (error) {
      console.error("Erro ao salvar pedido ou produtos:", error);
    }
  };

  const verVenda = async (vendaId) => {
    try {
      const response = await api.get(`/api/Venda/${vendaId}`);
      setDetalhesVenda(response.data);
      setIsVerVendaModalOpen(true);
      await produtosResponse(vendaId);
    } catch (error) {
      console.error("Erro ao buscar detalhes da venda:", error);
    }
  };

  const realizarPagamento = async (venda) => {
    try {
      await api.put(`/api/Venda/${venda.venda_id}`, {
        ...venda,
        status_venda: true,
      });
      fetchVendas()
    } catch (error) {
      console.error("Erro ao realizar pagamento:", error);
    }
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  const Dropdown = ({
    label,
    value,
    onChange,
    options,
    optionLabel,
    optionValue,
  }) => (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={onChange}>
        {options.map((option) => (
          <MenuItem key={option[optionValue]} value={option[optionValue]}>
            {option[optionLabel]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const colunasVendas = [
    { headerName: "ID", field: "venda_id" },
    { headerName: "Funcionário", field: "funcionario_nome" }, // Corrigido aqui
    { headerName: "Data", field: "data_venda" },
    { headerName: "Total", field: "total_venda" },
    { headerName: "Status", field: "status_venda" },
  ];

  const produtosResponse = async (vendaId) => {
    try {
      const response = await api.get(`api/VendasProdutos/byVenda/${vendaId}`);
      setProdutosVenda(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos da venda:", error);
    }
  };

  const colunasProdutos = [
    { headerName: "Produto", field: "produto" },
    { headerName: "Quantidade (g || un)", field: "quantidade" },
    {
      headerName: "Preço",
      field: "preco",
      valueFormatter: ({ value }) => formatCurrency(value),
    },
  ];

  const removerProduto = (produtoId) => {
    setNovaVenda((prev) => {
      const produtoRemovido = prev.produtos.find(
        (produto) => produto.produto_id === produtoId
      );

      if (!produtoRemovido) return prev;

      const totalAtualizado =
        parseFloat(prev.total_venda || 0) -
        parseFloat(produtoRemovido.preco || 0);

      return {
        ...prev,
        total_venda: totalAtualizado,
        produtos: prev.produtos.filter(
          (produto) => produto.produto_id !== produtoId
        ),
      };
    });
  };

  const vendasFiltradas = vendas.filter((venda) => {
    const filtroFuncionarioMatch = filtroFuncionario
      ? venda.funcionario_id === filtroFuncionario
      : true;
    const filtroStatusMatch =
      filtroStatus !== "" ? String(venda.status_venda) === filtroStatus : true;
    return filtroFuncionarioMatch && filtroStatusMatch;
  });

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={2}>
      <div className="estoque-title">
          <span>VENDAS</span>
        </div>
        <Box display="flex" gap={2} mb={2} alignItems="center" mr={5}>
          <Dropdown
            label="Filtrar por Funcionário"
            value={filtroFuncionario}
            onChange={(e) => setFiltroFuncionario(e.target.value)}
            options={funcionarios}
            optionLabel="nome_funcionario"
            optionValue="funcionario_id"
            sx={{ width: 400 }}
          />
          <FormControl fullWidth sx={{ width: 400 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="true">Pago</MenuItem>
              <MenuItem value="false">Pendente</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button variant="contained" sx={{backgroundColor: 'green', maxWidth: 400, height: 50}} onClick={handleModalOpen}>
          Novo Pedido
        </Button>
      </Box>
      <CustomTabela
        colunas={colunasVendas}
        dados={vendasFiltradas}
        hasActions={true}
        isVenda={true}
        onVerVenda={verVenda}
        onRealizarPagamento={realizarPagamento}
      />

      <CustomModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        fullScreen
        width={"90%"}
      >
        <h2>#Novo Pedido</h2>

        <Box display="flex" gap={2} mb={2} alignItems="center">
          <Dropdown
            label="Funcionário"
            value={novaVenda.funcionario_id || ""}
            onChange={(e) =>
              setNovaVenda((prev) => ({
                ...prev,
                funcionario_id: e.target.value,
              }))
            }
            options={funcionarios}
            optionLabel="nome_funcionario"
            optionValue="funcionario_id"
          />

          <Dropdown
            label="Produto"
            value={produtoSelecionado?.produto_id || ""}
            onChange={(e) =>
              setProdutoSelecionado(
                produtos.find((p) => p.produto_id === e.target.value)
              )
            }
            options={produtos}
            optionLabel="produto"
            optionValue="produto_id"
          />

          {produtoSelecionado?.unidade_prod === "kg" ? (
            <TextField
              label="Quantidade (g)"
              type="text"
              value={quantidade > 0 ? (quantidade / 1000).toFixed(3) : ""}
              onChange={(e) => {
                const somenteNumeros = e.target.value.replace(/[^0-9]/g, ""); // Apenas números
                setQuantidade(Number(somenteNumeros)); // Converte e armazena como número
              }}
              placeholder="Digite a quantidade em gramas"
            />
          ) : (
            <TextField
              label="Quantidade"
              type="number"
              value={quantidade}
              onChange={(e) => setQuantidade(Number(e.target.value))}
            />
          )}

          <Button
            variant="contained"
            onClick={adicionarProduto}
            sx={{
              backgroundColor: "green",
              "&:hover": { backgroundColor: "darkgreen" },
            }}
          >
            Adicionar Produto
          </Button>
        </Box>

        <CustomTabela
          colunas={colunasProdutos}
          dados={novaVenda.produtos}
          hasActions={true}
          isPedido={true}
          onDeleteProduct={removerProduto}
        />
        <Box mb={1} p={1} borderRadius={1}>
          <h3>Total: {formatCurrency(novaVenda.total_venda)}</h3>
        </Box>
        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleModalClose}
          >
            Cancelar
          </Button>
          <Button variant="contained" color="primary" onClick={salvarPedido}>
            Salvar Pedido
          </Button>
        </Box>
      </CustomModal>

      <CustomModal
        isOpen={isVerVendaModalOpen}
        onClose={() => setIsVerVendaModalOpen(false)}
        fullScreen
        width={"90%"}
      >
        {detalhesVenda ? (
          <div>
            <h2>Detalhes da Venda #{detalhesVenda.venda_id}</h2>
            <p>Funcionário: {detalhesVenda.funcionario_id}</p>
            <p>Data: {detalhesVenda.data_venda}</p>
            <p>Total: {formatCurrency(detalhesVenda.total_venda)}</p>
            <p>Status: {detalhesVenda.status_venda ? "Pago" : "Pendente"}</p>

            <Box mt={3}>
              <h3>Produtos</h3>
              <CustomTabela
                colunas={colunasProdutos}
                dados={produtosVenda}
                isLoading={produtosVenda.length === 0}
              />
            </Box>
          </div>
        ) : (
          <p>Carregando detalhes...</p>
        )}
      </CustomModal>
    </Box>
  );
}
