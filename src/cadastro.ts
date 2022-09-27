import { Usuario } from './models/usuario';
import {
    salvarUsuario,
    obterValorPorId,
    formularioEhValido,
    obterProximoId,
    exibirNotificacao,
    redirecionar
} from './utils';

// Tratando evento de submit do fomulario 

window.onload = function () {
    const cadastroFormulario = document.getElementById("formulario-cadastro") as HTMLAnchorElement
    cadastroFormulario.addEventListener('submit', function (e) {
        e.preventDefault();
        cadastrar();
    });
}

// Esta função é responsavel por efetuar o login no sistema
function cadastrar() {

    // Coletar informações do formulario 
    const email = obterValorPorId("email") || "";
    const senha = obterValorPorId("senha") || "";
    const confirmarSenha = obterValorPorId("confirmar-senha") || "";

    // Validar formulario
    if (formularioEhValido([email, senha, confirmarSenha])) {
        // Obter lista de usuarios ja cadastrados para saber qual será o proximo id a ser criado
        // let usuarios = obterUsuarios();

        // Criar usuario
        let usuarioNovo: Usuario = {
            id: obterProximoId(),
            email: email,
            senha: senha,
            recados: []
        }

        salvarUsuario(usuarioNovo)
        exibirNotificacao("Conta Criada com Sucesso", "success");
        redirecionar("../login/index.html", 2000)
    } else {
        exibirNotificacao("Os campos email, senha e confirmar senha são obrigatórios!", "error");
    }

}