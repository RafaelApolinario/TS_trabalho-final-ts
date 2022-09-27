interface Animal {
    nome: string;
    patas: number;
  }
  
  interface Cachorro extends Animal {
    raca: string;
  }

  const toto = {
    nome: "totó",
    patas: 4,
    raca:"vira lata",
  }


  function Imprimir(cachorro: Cachorro): void {
    console.log(`Meu nome é ${cachorro.nome}, tenho ${cachorro.patas} e sou da raça ${cachorro.raca}`);
  }
  
  Imprimir (toto);