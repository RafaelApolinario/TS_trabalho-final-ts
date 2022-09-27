"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cadastrar = exports.salvarSessao = exports.usuarioJaExistente = exports.login = void 0;
const utils_1 = require("./utils");
// Tratando evento de submit do fomulario 
window.onload = function () {
    const formularioLogin = document.getElementById("formulario-login");
    formularioLogin.addEventListener('submit', function (e) {
        e.preventDefault();
        login();
    });
};
// Esta função é responsavel por efetuar o login no sistema
function login() {
    // Coletar informações do formulario 
    const email = (0, utils_1.obterValorPorId)("email") || "";
    const senha = (0, utils_1.obterValorPorId)("senha") || "";
    // Validar formulario
    if ((0, utils_1.formularioEhValido)([email, senha])) {
        // Armazenar em cache a seção de usuário 
        let usuario = {
            email: email,
            senha: senha
        };
        if ((0, exports.usuarioJaExistente)(usuario.email)) {
            (0, utils_1.criarOuAtualizarSessao)(usuario);
            // Redirecionar usuário para Recados
            (0, utils_1.redirecionar)("../recados/index.html", 2500);
        }
        else {
            (0, utils_1.exibirNotificacao)("Usuario não existente", "error");
        }
    }
    else {
        (0, utils_1.exibirNotificacao)("Os campos email e senha sao obrigatorios!", "error");
    }
}
exports.login = login;
const usuarioJaExistente = (email) => {
    let usuarios = (0, utils_1.obterUsuarios)();
    let usuarioExiste = usuarios.some((u) => u.email === email);
    return usuarioExiste;
};
exports.usuarioJaExistente = usuarioJaExistente;
function salvarSessao(usuario) {
    var usuarios = (0, utils_1.obterUsuarios)();
    usuarios.push(usuario);
    (0, utils_1.salvarValor)("usuarios", JSON.stringify(usuario));
}
exports.salvarSessao = salvarSessao;
function cadastrar() {
    (0, utils_1.redirecionar)("../cadastro/index.html", 2000);
}
exports.cadastrar = cadastrar;
