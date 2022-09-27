"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obterUsuarioCompleto = exports.encerrarSessao = exports.obterSessao = exports.criarOuAtualizarSessao = exports.atualizarUsuario = exports.salvarUsuario = exports.formularioEhValido = exports.obterProximoId = exports.obterUsuarios = exports.usuarioEstaLogado = exports.excluirValor = exports.salvarValor = exports.obterValorPorChave = exports.redirecionar = exports.exibirNotificacao = exports.obterValorPorId = void 0;
const sweetalert2_1 = __importDefault(require("sweetalert2"));
// Funções de formulario  
const obterValorPorId = (id) => {
    if (ehValorValido(id)) {
        const emailSenhaUsuario = document.getElementById(id);
        return emailSenhaUsuario.value;
    }
    else {
        (0, exports.exibirNotificacao)("Valor Invalido", "error");
        return;
    }
};
exports.obterValorPorId = obterValorPorId;
// Funções de notificação
const exibirNotificacao = (titulo, icone) => {
    sweetalert2_1.default.fire({
        title: titulo,
        icon: icone
    });
};
exports.exibirNotificacao = exibirNotificacao;
// Funções de navegação
const redirecionar = (destino, delay) => {
    setTimeout(() => {
        window.location.href = destino;
    }, delay);
};
exports.redirecionar = redirecionar;
const ehValorValido = (valor) => Boolean(valor);
const obterValorPorChave = (chave) => {
    if (ehValorValido(chave)) {
        return localStorage.getItem(chave);
    }
    else {
        (0, exports.exibirNotificacao)("Valor Invalido", 'error');
    }
};
exports.obterValorPorChave = obterValorPorChave;
const salvarValor = (chave, valor) => {
    if (ehValorValido(chave)) {
        return localStorage.setItem(chave, JSON.stringify(valor));
    }
    else {
        (0, exports.exibirNotificacao)("Valor Invalido", "error");
    }
};
exports.salvarValor = salvarValor;
const excluirValor = (chave) => {
    if (ehValorValido(chave)) {
        return localStorage.removeItem(chave);
    }
    else {
        (0, exports.exibirNotificacao)("Valor Invalido", "error");
    }
};
exports.excluirValor = excluirValor;
const usuarioEstaLogado = (email) => Boolean((0, exports.obterValorPorChave)(email));
exports.usuarioEstaLogado = usuarioEstaLogado;
const obterUsuarios = () => {
    let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    return usuarios;
};
exports.obterUsuarios = obterUsuarios;
const obterProximoId = () => JSON.parse(localStorage.getItem('usuarios') || '[]').length + 1;
exports.obterProximoId = obterProximoId;
// FORMULARIO
// Esta função checa se todos os campos estão preenchidos corretamente
// function formularioEhValido(campo1, campo2) {
//     return ehValorValido(campo1) && ehValorValido(campo2);
// }
// Esta função checa se todos os campos estão preenchidos corretamente
function formularioEhValido(campos) {
    for (let index = 0; index < campos.length; index++) {
        if (!ehValorValido(campos[index]))
            return false;
    }
    return true;
}
exports.formularioEhValido = formularioEhValido;
// Essa funcao salva usuario na lista de usuarios que ja foram cadastrados no app (Banco de Dados)
function salvarUsuario(usuario) {
    var usuarios = (0, exports.obterUsuarios)();
    usuarios.push(usuario);
    (0, exports.salvarValor)("usuarios", JSON.stringify(usuarios));
}
exports.salvarUsuario = salvarUsuario;
function atualizarUsuario(usuarioAtualizado) {
    var usuarios = (0, exports.obterUsuarios)();
    usuarios.forEach(usuario => {
        if (usuario.id == usuarioAtualizado.id) {
            usuario.recados = usuarioAtualizado.recados.slice(0);
        }
    });
    (0, exports.salvarValor)("usuarios", JSON.stringify(usuarios));
}
exports.atualizarUsuario = atualizarUsuario;
// Essa func cria uma sessao para indicar qual é o usuario logado no momento
function criarOuAtualizarSessao(usuario) {
    (0, exports.salvarValor)("usuarioLogado", JSON.stringify(usuario));
}
exports.criarOuAtualizarSessao = criarOuAtualizarSessao;
// Essa func retorna o usuario logado no momento
function obterSessao() {
    let sessao = JSON.parse(("usuarioLogado"));
    return sessao;
}
exports.obterSessao = obterSessao;
// Essa func encerra a sessao do usuario deletando do localStorage
function encerrarSessao() {
    (0, exports.excluirValor)("usuarioLogado");
}
exports.encerrarSessao = encerrarSessao;
function obterUsuarioCompleto(email) {
    let listaUsuarios = (0, exports.obterUsuarios)();
    let usuarioFiltro = listaUsuarios.find(usuario => usuario.email == email);
    return usuarioFiltro;
}
exports.obterUsuarioCompleto = obterUsuarioCompleto;
