import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import PrintIcon from "@mui/icons-material/Print";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip, CircularProgress, Box } from "@mui/material";

const CustomTabela = ({
  colunas,
  dados,
  isLoading,
  onEdit,
  isAjuste,
  onAdjust,
  isEtiquetagem,
  onPrint,
  onDelete,
  hasActions,
  rowClassName,
  onDeleteProduct,
}) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        overflowY: "auto",
        maxHeight: "60vh",
      }}
    >
      <Table
        sx={{
          minWidth: 650,
        }}
        aria-label="Tabela Genérica"
      >
        <TableHead>
          <TableRow sx={{ backgroundColor: "#FFB900" }}>
            {colunas.map((coluna, index) => (
              <TableCell
                key={index}
                sx={{
                  color: "white",
                  fontWeight: 600,
                  textAlign: "center",
                  padding: "4px 16px",
                  fontSize: "12px",
                }}
              >
                {coluna.headerName}
              </TableCell>
            ))}
            {hasActions && (
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: 600,
                  padding: "4px 16px",
                  fontSize: "12px",
                  textAlign: "center",
                }}
              >
                AÇÕES
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={colunas.length + (hasActions ? 1 : 0)}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100px"
                >
                  <CircularProgress color="black" />
                </Box>
              </TableCell>
            </TableRow>
          ) : dados.length > 0 ? (
            dados.map((row, index) => (
              <TableRow
                key={index}
                className={rowClassName ? rowClassName(row) : ""}
                sx={{
                  backgroundColor: "#FFFFFF",
                  "&:hover": { backgroundColor: "#FFF5CC" },
                  transition: "background-color 0.3s ease",
                }}
              >
                {colunas.map((coluna, colIndex) => (
                  <TableCell
                    key={colIndex}
                    sx={{ padding: "6px 16px", textAlign: "center" }}
                  >
                    {row[coluna.field]}
                  </TableCell>
                ))}
                {hasActions && (
                  <TableCell sx={{ padding: "6px 16px", textAlign: "center" }}>
                    {isAjuste && (
                      <>
                        <Tooltip title="Editar">
                          <IconButton
                            color="primary"
                            aria-label="Editar"
                            onClick={() => onEdit(row)}
                            sx={{ color: "#FFB900" }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Ajuste de Estoque">
                          <IconButton
                            color="primary"
                            aria-label="Ajuste de Estoque"
                            onClick={() => onAdjust(row)}
                            sx={{ color: "rgb(87, 59, 10)" }}
                          >
                            <Inventory2Icon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Deletar">
                          <IconButton
                            color="primary"
                            aria-label="Deletar"
                            onClick={() => onDeleteProduct(row)}
                            sx={{ color: "#bd1c00" }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                    {isEtiquetagem && (
                      <>
                        <Tooltip title="Imprimir">
                          <IconButton
                            color="primary"
                            aria-label="imprimir"
                            onClick={() => onPrint(row)}
                            sx={{ color: "#FFB900" }}
                          >
                            <PrintIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Deletar">
                          <IconButton
                            color="primary"
                            aria-label="deletar"
                            onClick={() => onDelete(row)}
                            sx={{ color: "#bd1c00" }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={colunas.length + (hasActions ? 1 : 0)}
                sx={{ textAlign: "center", padding: "16px" }}
              >
                Nenhum dado disponível.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTabela;
