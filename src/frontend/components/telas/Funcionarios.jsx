import React, { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import CustomTabela from "../tabela";
import CustomModal from "../modals/CustomModal";
import api from "@/pages/api/api";

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [filteredFuncionarios, setFilteredFuncionarios] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFuncionario, setNewFuncionario] = useState({
    nome_funcionario: "",
    cpf_funcionario: "",
    senha_funcionario: "",
    salario: "",
  });
  const [searchNome, setSearchNome] = useState("");
  const [searchCPF, setSearchCPF] = useState("");

  const fetchFuncionarios = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/api/Funcionario");
      setFuncionarios(response.data);
      setFilteredFuncionarios(response.data);
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFuncionarios();
  }, []);

  // Atualiza os resultados ao digitar nos campos de busca
  useEffect(() => {
    let filtered = funcionarios;
    if (searchNome) {
      filtered = filtered.filter((f) =>
        f.nome_funcionario.toLowerCase().includes(searchNome.toLowerCase())
      );
    }
    if (searchCPF) {
      filtered = filtered.filter((f) =>
        f.cpf_funcionario.includes(searchCPF)
      );
    }
    setFilteredFuncionarios(filtered);
  }, [searchNome, searchCPF, funcionarios]);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => {
    setIsModalOpen(false);
    setNewFuncionario({
      nome_funcionario: "",
      cpf_funcionario: "",
      senha_funcionario: "",
      salario: "",
    });
  };

  const handleCreateFuncionario = async () => {
    try {
      await api.post("/api/Funcionario", newFuncionario);
      fetchFuncionarios();
      handleModalClose();
    } catch (error) {
      console.error("Erro ao criar funcionário:", error);
    }
  };

  const colunas = [
    { headerName: "ID", field: "funcionario_id" },
    { headerName: "Nome", field: "nome_funcionario" },
    { headerName: "CPF", field: "cpf_funcionario" },
    { headerName: "Salário", field: "salario" },
  ];

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={2}>
      <div className="estoque-title">
          <span>FUNCIONÁRIOS</span>
        </div>
        <Box display="flex" gap={2} mr={5}>
          <TextField
            label="Buscar por Nome"
            value={searchNome}
            onChange={(e) => setSearchNome(e.target.value)}
            sx={{width: 200}}
          />
          <TextField
            label="Buscar por CPF"
            value={searchCPF}
            onChange={(e) => setSearchCPF(e.target.value)}
            sx={{width: 200}}
          />
        </Box>
        <Button variant="contained" sx={{backgroundColor: 'green', maxWidth: 400, height: 50}} onClick={handleModalOpen}>
          Novo Funcionário
        </Button>
      </Box>

      <CustomTabela
        colunas={colunas}
        dados={filteredFuncionarios}
        isLoading={isLoading}
        hasActions={false}
      />

      <CustomModal isOpen={isModalOpen} onClose={handleModalClose}>
        <h2>Criar Funcionário</h2>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Nome"
            value={newFuncionario.nome_funcionario}
            onChange={(e) =>
              setNewFuncionario({
                ...newFuncionario,
                nome_funcionario: e.target.value,
              })
            }
          />
          <TextField
            label="CPF"
            value={newFuncionario.cpf_funcionario}
            onChange={(e) =>
              setNewFuncionario({
                ...newFuncionario,
                cpf_funcionario: e.target.value,
              })
            }
          />
          <TextField
            label="Senha"
            type="password"
            value={newFuncionario.senha_funcionario}
            onChange={(e) =>
              setNewFuncionario({
                ...newFuncionario,
                senha_funcionario: e.target.value,
              })
            }
          />
          <TextField
            label="Salário"
            type="number"
            value={newFuncionario.salario}
            onChange={(e) =>
              setNewFuncionario({
                ...newFuncionario,
                salario: e.target.value,
              })
            }
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateFuncionario}
          >
            Criar
          </Button>
        </Box>
      </CustomModal>
    </Box>
  );
}

