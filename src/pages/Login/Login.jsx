import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [aviso, setAviso] = useState("");
  const { login, loginComGoogle } = useAuth();

  const navigate = useNavigate();

  async function enviar(e) {
    e.preventDefault();
    try {
      await login(email, senha);
      navigate("/");
    } catch (erro) {
      setAviso(erro.message);
    }
  }

  async function aoEntrarComGoogle(resposta) {
    try {
      await loginComGoogle(resposta.credential);
      navigate("/");
    } catch (erro) {
      setAviso(
        erro.response?.data?.message ?? "Não foi possível entrar com o Google.",
      );
    }
  }

  return (
    <main className="container">
      <form className="formulario" onSubmit={enviar}>
        <h1>Entrar no Clarim</h1>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="senha">Senha</label>
        <input
          type="password"
          id="senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        {aviso && <p className="aviso">{aviso}</p>}

        <button type="submit">Entrar</button>

        <p className="rodape-form">
          Ainda não é assinante? <Link to="/cadastro"> Assine o Clarim</Link>
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <GoogleLogin
            onSuccess={aoEntrarComGoogle}
            onError={() => setAviso("Não foi possível entrar com o Google.")}
          />
        </div>
      </form>
    </main>
  );
}

export default Login;
