"use strict";
const toto = {
    nome: "totó",
    patas: 4,
    raca: "vira lata",
};
function Imprimir(cachorro) {
    console.log(`Meu nome é ${cachorro.nome}, tenho ${cachorro.patas} e sou da raça ${cachorro.raca}`);
}
Imprimir(toto);
