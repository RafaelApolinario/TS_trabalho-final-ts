"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
// Tratando evento de submit do fomulario 
window.onload = function () {
    const cadastroFormulario = document.getElementById("formulario-cadastro");
    cadastroFormulario.addEventListener('submit', function (e) {
        e.preventDefault();
        cadastrar();
    });
};
// Esta função é responsavel por efetuar o login no sistema
function cadastrar() {
    // Coletar informações do formulario 
    const email = (0, utils_1.obterValorPorId)("email") || "";
    const senha = (0, utils_1.obterValorPorId)("senha") || "";
    const confirmarSenha = (0, utils_1.obterValorPorId)("confirmar-senha") || "";
    // Validar formulario
    if ((0, utils_1.formularioEhValido)([email, senha, confirmarSenha])) {
        // Obter lista de usuarios ja cadastrados para saber qual será o proximo id a ser criado
        // let usuarios = obterUsuarios();
        // Criar usuario
        let usuarioNovo = {
            id: (0, utils_1.obterProximoId)(),
            email: email,
            senha: senha,
            recados: []
        };
        (0, utils_1.salvarUsuario)(usuarioNovo);
        (0, utils_1.exibirNotificacao)("Conta Criada com Sucesso", "success");
        (0, utils_1.redirecionar)("../login/index.html", 2000);
    }
    else {
        (0, utils_1.exibirNotificacao)("Os campos email, senha e confirmar senha são obrigatórios!", "error");
    }
}
