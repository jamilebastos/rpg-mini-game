//objeto principal
const jogador = {
    nome:"cavaleiro",
    vida: 20,
    vidaMaxima:20,
    ataque:3,
    defesa:1,
    equipamentos:{
        espada:1,
        armadura:1,
        escudo:1,
    }
}
//fases
const fases = [{
    nome:"Goblin",
    vida:15,
    vidaMaxima:15,
    ataque:5,
    defesa:3
},
{
    nome:"Lobo das sombras",
    vida:23,
    vidaMaxima:23,
    ataque:9,
    defesa:5,
},
{
    nome: "Org Raivoso",
    vida:33,
    vidaMaxima:33,
    ataque:12,
    defesa:8
},
{
    nome:"Grifo",
    vida:44,
    vidaMaxima:44,
    ataque:16,
    defesa: 11
},
{
    nome:"Bruxa",
    vida:60,
    vidaMaxima:60,
    ataque:20,
    defesa:15
}
]
//funções
function introducao() {
    alert(`INTRODUÇÂO:
        Um jovem cavaleiro estava prestes a se casar com a princesa de seu reino,
        quando uma bruxa invadiu a cerimônia de casamento e sequestrou sua amada.
        Determinado a resgata-lá, o cavaleiro parte em uma jornada perigosa.
        Para chegar no castelo da bruxa, ele enfrentará desafios em seu caminho.
        
        Sua missão é derrotar todos os monstros que aparecem em seu caminho,
        fortalecer seus equipamentos e resgatar a princesa!
        
        Sua aventura começa agora!
        Boa sorte.`)    
}
function verEquipamento(){
    alert(
        `--------Equipamentos---------
        Espada:Nível ${jogador.equipamentos.espada}
        Armadura:Nível ${jogador.equipamentos.armadura}
        Escudo:Nível ${jogador.equipamentos.escudo}

        STATUS:
        Ataque: ${jogador.ataque}
        Defesa: ${jogador.defesa}
        Vida: ${jogador.vida} / ${jogador.vidaMaxima}

        dica: (Ao melhorar os itens, fique ligado que:
        Espada: aumenta o ataque
        Escudo: aumenta defesa
        Armadura: aumenta vida maxima)`
    )
}
function melhorar(){
    const escolher = prompt (`
        qual equipamento deseja melhorar?
        
        1- Espada
        2- Escudo
        3- Armadura`)

        if(escolher === "1"){
            jogador.equipamentos.espada++
            jogador.ataque+= 4
            alert(`Você melhorou a espada!
            ela está no nivel ${jogador.equipamentos.espada} e seu ataque agora é ${jogador.ataque}`)
        }
        else if(escolher === "2"){
            jogador.equipamentos.escudo++
            jogador.defesa+= 3
            alert(`você melhorou o escudo! 
            Agora ele está no nivel ${jogador.equipamentos.escudo} sua defesa é ${jogador.defesa}.`)
        }
        else if(escolher ==="3"){
            jogador.equipamentos.armadura++
            jogador.vidaMaxima+= 6
            jogador.vida+=6
            alert(`você melhorou a armadura!
            Agora ela está no nivel ${jogador.equipamentos.armadura}.
            sua vida maxima agora é ${jogador.vidaMaxima}`)
        }
        else{
            alert("opção invalida")
        }
}
function calcularDano(atacante,defensor){
    let dano = atacante.ataque - defensor.defesa
    if(dano <= 0){
        dano = 0
    }
    return dano
}

function iniciarbatalha(inimigoOriginal){
    const inimigo = {...inimigoOriginal}
    alert(`${inimigo.nome} apareceu, se prepare!`)
    while (jogador.vida > 0 && inimigo.vida > 0){
        let danoMonstro = calcularDano(inimigo,jogador)
        jogador.vida -= danoMonstro
        if(jogador.vida < 0){
            jogador.vida = 0
        }
        alert(`${inimigo.nome} atacou!
           você recebeu  ${danoMonstro} de dano
           sua vida: ${jogador.vida}/${jogador.vidaMaxima}
            `)
        if(jogador.vida <= 0){
            break }  
        //ataque do jogador
        let danoJogador = calcularDano(jogador, inimigo)

        inimigo.vida -= danoJogador

        if (inimigo.vida < 0) {
            inimigo.vida = 0
        }

        alert(`Você atacou ${inimigo.nome}!
        Causou ${danoJogador} de dano.
        Vida do inimigo: ${inimigo.vida}/${inimigo.vidaMaxima}`)
    }

    if (inimigo.vida <= 0) {
        alert(`Você derrotou ${inimigo.nome}!`)
        return "vitoria"
    }
    else {
        alert("Você foi derrotado!")
        return "derrota"
    }
}
    
function menuPreparacao (inimigo){
     while (true) {

        const opcao = prompt(`
        Fase ${fases.indexOf(inimigo)+1}
        PRÓXIMA BATALHA: ${inimigo.nome}

        -----Status do inimigo ----
        vida:${inimigo.vida}/${inimigo.vidaMaxima}
        ataque:${inimigo.ataque}
        defesa:${inimigo.defesa}
        ---------------------------
        1 - Lutar
        2 - Melhorar equipamentos
        3 - Ver equipamentos
        `)

        if (opcao === "1") {
            return true
        }

        else if (opcao === "2") {
            melhorar()
        }

        else if (opcao === "3") {
            verEquipamento()
        }

        else if (opcao === null) {
            return false
        }

        else {
            alert("Opção inválida!")
        }
    }
}
function iniciarJogo() {
    introducao()

    let faseAtual = 0

    while (faseAtual < fases.length) {

        const inimigo = fases[faseAtual]

        // Menu de preparação
        const pronto = menuPreparacao(inimigo)

        if (pronto === false) {
            alert("Você encerrou sua aventura!")
            return
        }

        // Iniciar batalha
        const resultado = iniciarbatalha(inimigo)

        if (resultado === "vitoria") {
            jogador.vida = jogador.vidaMaxima
            faseAtual++

            if (faseAtual < fases.length) {
                alert("Você se recuperou e está pronto para o próximo desafio!")
            }
        }

        else if (resultado === "derrota") {
            jogador.vida = jogador.vidaMaxima

            alert("Você recuperou sua vida! Prepare-se para tentar novamente.")
        }
    }

    alert("PARABÉNS! Você conseguiu derrotara Bruxa e resgatou a princesa!")
}

iniciarJogo()