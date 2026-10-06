/* eslint-disable no-undef */
import { api } from "./api";

export async function login(email, senha) {
  try {
    const { data } = await api.post("/api/auth/login", { email, senha });
    return data;
  } catch (e) {
    throw new Error(e, { cause: e });
  }
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
  setUsuario(null);
}

export async function loginGoogle(credential) {
  const { data } = await api.post("/api/auth/login/google", { credential });
  return data;
}

export async function cadastrar(nome, email, senha) {
  await api.post("/api/usuarios", { nome, email, senha });
}
