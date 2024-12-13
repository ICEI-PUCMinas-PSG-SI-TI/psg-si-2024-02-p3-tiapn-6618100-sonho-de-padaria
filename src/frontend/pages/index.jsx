import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import LogoPadaria from "@/public/logo.svg";
import Header from "@/components/Header";
import HomePage from "@/components/telas/Home";
import Estoque from "@/components/telas/Estoque";
import Funcionarios from "@/components/telas/Funcionarios";
import Etiquetagem from "@/components/telas/Etiquetagem";
import HistoricoAjuste from "@/components/telas/HistoricoAjuste";
import Vendas from "@/components/telas/Vendas";

import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import RestoreIcon from "@mui/icons-material/Restore";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";

export default function Home() {
  const [selectedComponent, setSelectedComponent] = useState("home");
  const [menuAberto, setMenuAberto] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogged(true);
    }
  }, []);

  const handleValidateLogin = async () => {
    if (usuario === "admin" && password === "12345") {
      try {
        const token = "fake-token";
        const isLoggedAdmin = true;
  
        localStorage.setItem("token", token);
        localStorage.setItem("usuario", usuario);
        localStorage.setItem("isLoggedAdmin", isLoggedAdmin.toString());
  
        setIsLogged(true);
      } catch (error) {
        alert("Erro ao realizar login. Tente novamente.");
      }
    } else {
      alert("Usuário ou senha incorretos. Tente novamente.");
    }
  };
  

  const handleLogout = () => {
    localStorage.clear();
    setIsLogged(false);
    setUsuario("");
    setPassword("");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case "home":
        return <HomePage userName={usuario} onNavigate={setSelectedComponent} />;
      case "estoque":
        return <Estoque onNavigate={setSelectedComponent} />;
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
      {!isLogged ? (
        <div className="login-page">
          <div className="login-container">
            <Image
              className="login-image"
              src={LogoPadaria}
              alt="Logo"
              onClick={() => router.push("/")}
            />
            <span className="login-text">REALIZE SEU LOGIN DE ADMINISTRADOR</span>
            <div className="login-inputs">
              <input
                className="login-input"
                placeholder="Insira seu usuário"
                type="text"
                value={usuario}
                onChange={handleInputChange(setUsuario)}
              />
              <div className="password-container">
                <input
                  className="login-input"
                  placeholder="Insira sua senha"
                  type={passwordVisible ? "text" : "password"}
                  value={password}
                  onChange={handleInputChange(setPassword)}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="eye-button"
                >
                  {passwordVisible ? "🙈" : "👁️"}
                </button>
              </div>
              <button onClick={handleValidateLogin} className="login-button">
                LOGIN
              </button>
            </div>
          </div>
        </div>
      ) : (
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
                <li onClick={handleLogout}>
                  <LogoutIcon />
                  {menuAberto && <span>Sair</span>}
                </li>
              </ul>
            </aside>
            <main className="painel-conteudo">{renderComponent()}</main>
          </div>
        </>
      )}
    </>
  );
}
