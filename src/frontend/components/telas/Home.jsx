import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import RestoreIcon from "@mui/icons-material/Restore";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
const HomePage = ({ userName = "Usuário", onNavigate }) => {
  const sections = [
    {
      name: "Estoque",
      icon: <InventoryIcon fontSize="large" />,
      action: () => onNavigate("estoque"),
    },
    {
      name: "Histórico de Estoque",
      icon: <RestoreIcon fontSize="large" />,
      action: () => onNavigate("historico"),
    },
    {
      name: "Etiquetagem",
      icon: <ConfirmationNumberIcon fontSize="large" />,
      action: () => onNavigate("etiquetagem"),
    },
    {
      name: "Vendas",
      icon: <LocalGroceryStoreIcon fontSize="large" />,
      action: () => onNavigate("vendas"),
    },
    {
      name: "Funcionários",
      icon: <PeopleAltIcon fontSize="large" />,
      action: () => onNavigate("funcionarios"),
    },
  ];

  return (
    <Box sx={{ padding: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "rgb(63, 42, 7)", fontFamily: "Poppins" }}
      >
        Olá, {userName}!
      </Typography>
      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{
          fontFamily: "Poppins",
          color: "rgb(63, 42, 7)",
          marginBottom: "20px",
        }}
      >
        Bem-vindo ao painel de administração. Escolha uma seção abaixo para
        acessar.
      </Typography>
      <Grid container spacing={3} sx={{ width: 900 }}>
        {sections.map((section, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
                boxShadow: 3,
                transition: "transform 0.2s ease-in-out",
                "&:hover": { transform: "scale(1.05)", boxShadow: 5 },
                backgroundColor: "#fcf0d1",
              }}
            >
              <CardActionArea
                onClick={section.action}
                sx={{ textAlign: "center", color: "rgb(63, 42, 7) " }}
              >
                <CardContent>
                  {section.icon}
                  <Typography
                    variant="h6"
                    sx={{ marginTop: 1, fontFamily: "Poppins" }}
                  >
                    {section.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;
