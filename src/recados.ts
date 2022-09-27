import {
    obterValorPorId,
    formularioEhValido,
    exibirNotificacao,
    redirecionar,
    encerrarSessao,
    obterSessao,
    obterUsuarioCompleto,
    atualizarUsuario
} from './utils';

import { Usuario,UsuarioLogin } from './models/usuario';

window.onload = function () {
    //se o usuario não está logado
    if (!localStorage.getItem('usuarioLogado')) redirecionar("../login/index.html", 1500);

    // Adicionando Listener para tratar click do botao de criar recado
    // document.getElementById("btn-enviar").addEventListener('onclick', function (e) {
    //     e.preventDefault();
    //     criarRecado();
    // });

    iniciar()
}

window.onloadeddata = function () {
    console.log("AU")
}

function logout() {
    encerrarSessao()
    redirecionar("../login/index.html", 1500)
}

function criarRecado() {
    // Obter valores do formulario
    const titulo = obterValorPorId('input-titulo') || "";
    const descricao = obterValorPorId('input-descricao') || "";

    // Validar o formulario
    if (!formularioEhValido([titulo, descricao])) {
        exibirNotificacao("Preencha todos os campos", "error")
        return;
    }

    // Obter Usuario Logado
    let usuarioLogado = obterSessao()
    let usuarioCompleto = obterUsuarioCompleto(usuarioLogado.email) 

    if (usuarioCompleto != undefined) {
        
        // Criar Recado Novo
        let recado = {
            id: usuarioCompleto.recados.length + 1,
            descricao,
            titulo
        }

        // Associar o Recado criado ao Usuario Logado
        usuarioCompleto.recados.push(recado)

        // Salvar Usuario na Base de Dados (LocalStorage)
        atualizarUsuario(usuarioCompleto)

        // Resetar os campos do formulario
        // limparCampos(){
        // }
        listarRecados(usuarioCompleto)
    }

}

function iniciar() {
    let usuario:Usuario = obterSessao()
    listarRecados(usuario)
}

// Atualizar Tabela de Recados do Usuario
function listarRecados(usuario:Usuario) {
    let tableHTML: HTMLElement = document.getElementById('recados') || new HTMLElement();

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
    `
    tableHTML.innerHTML = recadosHtml 

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
      `
    }

    tableHTML.innerHTML = recadosHtml

}

export function editarRecado(id: number) {

}

export function apagarRecado(id: number) {

}
