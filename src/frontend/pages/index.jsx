import Estoque from "@/components/telas/Estoque";
import Funcionarios from "@/components/telas/Funcionarios";
import Header from "@/components/Header";
import HomePage from "@/components/telas/Home";
import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import Etiquetagem from "@/components/telas/Etiquetagem";
import RestoreIcon from "@mui/icons-material/Restore";
import HistoricoAjuste from "@/components/telas/HistoricoAjuste";
import Vendas from "@/components/telas/Vendas";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";

export default function Home() {
  const [selectedComponent, setSelectedComponent] = useState("home");
  const [menuAberto, setMenuAberto] = useState(false);

  const renderComponent = () => {
    switch (selectedComponent) {
      case "home":
        return (
          <HomePage userName="usuário" onNavigate={setSelectedComponent} />
        );
      case "estoque":
        return <Estoque onNavigate={setSelectedComponent}/>;
      case "historico":
        return <HistoricoAjuste />;
      case "etiquetagem":
        return <Etiquetagem />;
      case "vendas":
        return <Vendas />;
      case "funcionarios":
        return <Funcionarios />;
      default:
        return <div>Bem-vindo ao painel de administração!</div>;
    }
  };

  return (
    <>
      <Header />
      <div className="painel-container">
        <aside
          className={`menu-lateral ${menuAberto ? "aberto" : "fechado"}`}
          onMouseEnter={() => setMenuAberto(true)}
          onMouseLeave={() => setMenuAberto(false)}
        >
          <ul>
            <li onClick={() => setSelectedComponent("home")}>
              <HomeIcon />
              {menuAberto && <span>Home</span>}
            </li>
            <li onClick={() => setSelectedComponent("estoque")}>
              <InventoryIcon />
              {menuAberto && <span>Estoque</span>}
            </li>
            <li onClick={() => setSelectedComponent("historico")}>
              <RestoreIcon />
              {menuAberto && <span>Histórico de Estoque</span>}
            </li>
            <li onClick={() => setSelectedComponent("etiquetagem")}>
              <ConfirmationNumberIcon />
              {menuAberto && <span>Etiquetagem</span>}
            </li>
            <li onClick={() => setSelectedComponent("vendas")}>
              <LocalGroceryStoreIcon />
              {menuAberto && <span>Vendas</span>}
            </li>
            <li onClick={() => setSelectedComponent("funcionarios")}>
              <PeopleAltIcon />
              {menuAberto && <span>Funcionários</span>}
            </li>
            <li onClick={() => alert("Logout")}>
              <LogoutIcon />
              {menuAberto && <span>Sair</span>}
            </li>
          </ul>
        </aside>
        <main className="painel-conteudo">{renderComponent()}</main>
      </div>
    </>
  );
}
