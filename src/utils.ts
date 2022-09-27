import Swal, { SweetAlertIcon } from  'sweetalert2';
import { Usuario,UsuarioLogin } from './models/usuario';

// Funções de formulario  

export const obterValorPorId = (id:string) => {
    
    if (ehValorValido(id)) {
        const emailSenhaUsuario = document.getElementById(id) as HTMLInputElement;
        return emailSenhaUsuario.value
    } else {
        exibirNotificacao("Valor Invalido", "error")
        return 
    }
}

// Funções de notificação


export const exibirNotificacao = (titulo: string, icone: SweetAlertIcon) => {
    Swal.fire({ 
        title: titulo, 
        icon: icone
    });
}

// Funções de navegação

export const redirecionar = (destino:string, delay:number) => {
    setTimeout(() => {
        window.location.href = destino;
    }, delay)
}

const ehValorValido = (valor:string) => Boolean(valor)

export const obterValorPorChave = (chave:string) => {
    if (ehValorValido(chave)) {
        return localStorage.getItem(chave);
    } else {
        exibirNotificacao("Valor Invalido", 'error');
    }
}

export const salvarValor = (chave:string, valor:string) => {
    if (ehValorValido(chave)) {
        return localStorage.setItem(chave, JSON.stringify(valor));
    } else {
        exibirNotificacao("Valor Invalido", "error");
    }
}

export const excluirValor = (chave:string) => {
    if (ehValorValido(chave)) {
        return localStorage.removeItem(chave);
    } else {
        exibirNotificacao("Valor Invalido", "error");
    }
}

export const usuarioEstaLogado = (email:string) => Boolean(obterValorPorChave(email));

export const obterUsuarios = () => {
    let usuarios: Usuario[] = JSON.parse(localStorage.getItem('usuarios') || '[]');

    return usuarios
}

export const obterProximoId = () => JSON.parse(localStorage.getItem('usuarios') || '[]').length + 1;


// FORMULARIO

// Esta função checa se todos os campos estão preenchidos corretamente
// function formularioEhValido(campo1, campo2) {
//     return ehValorValido(campo1) && ehValorValido(campo2);
// }

// Esta função checa se todos os campos estão preenchidos corretamente
export function formularioEhValido(campos:string[]) {

    for (let index = 0; index < campos.length; index++) {
        if (!ehValorValido(campos[index])) return false;
    }

    return true;
}

// Essa funcao salva usuario na lista de usuarios que ja foram cadastrados no app (Banco de Dados)
export function salvarUsuario(usuario:Usuario) {
    var usuarios = obterUsuarios();
    usuarios.push(usuario);

    salvarValor("usuarios", JSON.stringify(usuarios));
}

export function atualizarUsuario(usuarioAtualizado:Usuario) {
    var usuarios = obterUsuarios();

    usuarios.forEach(usuario => {
        if (usuario.id == usuarioAtualizado.id) {
            usuario.recados = usuarioAtualizado.recados.slice(0)
        }
    })

    salvarValor("usuarios", JSON.stringify(usuarios))
}

// Essa func cria uma sessao para indicar qual é o usuario logado no momento
export function criarOuAtualizarSessao(usuario:Usuario | UsuarioLogin) {
    salvarValor("usuarioLogado", JSON.stringify(usuario));
}

// Essa func retorna o usuario logado no momento
export function obterSessao() {
    let sessao = JSON.parse(("usuarioLogado"));

    return sessao as Usuario;
}

// Essa func encerra a sessao do usuario deletando do localStorage
export function encerrarSessao() {
    excluirValor("usuarioLogado");
}

export function obterUsuarioCompleto(email:string) {
    let listaUsuarios = obterUsuarios();
    let usuarioFiltro = listaUsuarios.find(usuario => usuario.email == email);

    return usuarioFiltro;
}