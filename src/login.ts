import { Usuario, UsuarioLogin } from './models/usuario';

import {
    obterValorPorId,
    formularioEhValido,
    exibirNotificacao,
    redirecionar,
    criarOuAtualizarSessao,
    obterUsuarios,
    salvarValor,
} from './utils';
// Tratando evento de submit do fomulario 

window.onload = function () {
    const formularioLogin = document.getElementById("formulario-login") as HTMLFormElement
    formularioLogin.addEventListener('submit', function (e) {
        e.preventDefault();
        login();
    });
}

// Esta função é responsavel por efetuar o login no sistema
export function login() {

    // Coletar informações do formulario 
    const email:string = obterValorPorId("email") || "";
    const senha:string = obterValorPorId("senha") || "";

    // Validar formulario
    if (formularioEhValido([email, senha])) {

        // Armazenar em cache a seção de usuário 
        let usuario: UsuarioLogin = {
            email: email,
            senha: senha
        }

        if (usuarioJaExistente(usuario.email)) {
            criarOuAtualizarSessao(usuario);

            // Redirecionar usuário para Recados
            redirecionar("../recados/index.html", 2500);
        } else {
            exibirNotificacao("Usuario não existente", "error")
        }

    } else {
        exibirNotificacao("Os campos email e senha sao obrigatorios!", "error");
    }

}

export const usuarioJaExistente = (email: string) => {
    let usuarios:Array<Usuario> = obterUsuarios();
    let usuarioExiste = usuarios.some((u) => u.email === email)
    return usuarioExiste;
}

export function salvarSessao(usuario:Usuario) {
    var usuarios = obterUsuarios();
    usuarios.push(usuario);

    salvarValor("usuarios",JSON.stringify(usuario));
}

export function cadastrar() {
    redirecionar("../cadastro/index.html", 2000);
}
