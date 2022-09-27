"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apagarRecado = exports.editarRecado = void 0;
const utils_1 = require("./utils");
window.onload = function () {
    //se o usuario não está logado
    if (!localStorage.getItem('usuarioLogado'))
        (0, utils_1.redirecionar)("../login/index.html", 1500);
    // Adicionando Listener para tratar click do botao de criar recado
    // document.getElementById("btn-enviar").addEventListener('onclick', function (e) {
    //     e.preventDefault();
    //     criarRecado();
    // });
    iniciar();
};
window.onloadeddata = function () {
    console.log("AU");
};
function logout() {
    (0, utils_1.encerrarSessao)();
    (0, utils_1.redirecionar)("../login/index.html", 1500);
}
function criarRecado() {
    // Obter valores do formulario
    const titulo = (0, utils_1.obterValorPorId)('input-titulo') || "";
    const descricao = (0, utils_1.obterValorPorId)('input-descricao') || "";
    // Validar o formulario
    if (!(0, utils_1.formularioEhValido)([titulo, descricao])) {
        (0, utils_1.exibirNotificacao)("Preencha todos os campos", "error");
        return;
    }
    // Obter Usuario Logado
    let usuarioLogado = (0, utils_1.obterSessao)();
    let usuarioCompleto = (0, utils_1.obterUsuarioCompleto)(usuarioLogado.email);
    if (usuarioCompleto != undefined) {
        // Criar Recado Novo
        let recado = {
            id: usuarioCompleto.recados.length + 1,
            descricao,
            titulo
        };
        // Associar o Recado criado ao Usuario Logado
        usuarioCompleto.recados.push(recado);
        // Salvar Usuario na Base de Dados (LocalStorage)
        (0, utils_1.atualizarUsuario)(usuarioCompleto);
        // Resetar os campos do formulario
        // limparCampos(){
        // }
        listarRecados(usuarioCompleto);
    }
}
function iniciar() {
    let usuario = (0, utils_1.obterSessao)();
    listarRecados(usuario);
}
// Atualizar Tabela de Recados do Usuario
function listarRecados(usuario) {
    let tableHTML = document.getElementById('recados') || new HTMLElement();
    let recadosHtml = `
        <thead>
            <tr class="table-row">
                <th class="table-cell">ID</th>
                <th class="table-cell">Recados</th>
                <th class="table-cell">Detalhes</th>
                <th class="table-cell">Ações</th>
            </tr>
        </thead>
        <tbody>
        </tbody>    
    `;
    tableHTML.innerHTML = recadosHtml;
    for (const index in usuario.recados) {
        recadosHtml += `
              <tr>
                <td>${usuario.recados[index].id}</td>
                <td>${usuario.recados[index].titulo}</td>
                <td>${usuario.recados[index].descricao}</td>
                <td>
                <button id="btnEditar" onclick = "editarRecado(${usuario.recados[index].id})">Editar</button>
                <button id="btnApagar" onclick = "apagarRecado(${usuario.recados[index].id})">Excluir</button>
                </td>
              </tr>
      `;
    }
    tableHTML.innerHTML = recadosHtml;
}
function editarRecado(id) {
}
exports.editarRecado = editarRecado;
function apagarRecado(id) {
}
exports.apagarRecado = apagarRecado;
