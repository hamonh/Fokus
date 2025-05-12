// DeclaraÁıes
const curtoBt = document.querySelector('.app__card-button--curto')
const focoBt = document.querySelector('.app__card-button--foco')
const longoBt = document.querySelector('.app__card-button--longo')
const html = document.querySelector('html')
const banner = document.querySelector('.app__image')
const botoes = document.querySelectorAll('.app__card-button')
const startpausebt = document.querySelector('#start-pause')
const musicafocoinput = document.querySelector('#alternar-musica')
const titulo = document.querySelector('.app__title')
const iniciarOuPausarbt = document.querySelector('#start-pause span')
const iniciarOuPausarBtIcone = document.querySelector(".app__card-primary-butto-icon")
const tempoNaTela = document.querySelector('#timer')
// Audio
const musica = new Audio ('sons/luna-rise-part-one.mp3')
const musicaPause = new Audio ('sons/pause.mp3')
const musicaBeep = new Audio ('sons/beep.mp3')
const musicaPlay = new Audio ('sons/play.wav')
const iconePause = new Image('imagens/pause.png')
let tempodecorridoemsegundos = 1500
let intervaloId = null

// CÛdigo
musica.loop = true
musicafocoinput.addEventListener('change', () => {
    if (musica.paused) {
        musicaPlay.play()
        musica.play()
    } else{
        musicaPause.play()
        musica.pause()       
    }
 })

focoBt.addEventListener('click', () => {
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    alterarContexto('descanso-longo')
     longoBt.classList.add('active')
})

function alterarContexto(contexto) {

    // contexto.classList.add('active')
    botoes.forEach( function(contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src',`/imagens/${contexto}.png`)

      switch(contexto){
        case "foco":
            titulo.innerHTML = 
           `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
                `
            break;

        case "descanso-curto":
            titulo.innerHTML = 
               `Que tal dar uma respirada? <strong class="app__title-strong">Fa√ßa uma pausa curta.</strong>
                    `
            break;   
        case "descanso-longo":
            titulo.innerHTML = 
                   `Hora de voltar a superficie. <strong class="app__title-strong">Fa√ßa uma pausa longa.</strong>
                   `
            default:
            break;
      }
    }

const contagemregressiva = () => {
    
    if(tempodecorridoemsegundos <= 0){
      zerar()
      musicaBeep.play()
      alert('Tempo finalizado!')
      return
    }
    tempodecorridoemsegundos -= 1
    mostrarTempoNaTela() 
}

startpausebt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar(){
    
    if(intervaloId){
        musicaPause.play()
        zerar()             
        return
    }
    musicaPlay.play()
    intervaloId = setInterval(contagemregressiva, 1000)
    iniciarOuPausarbt.textContent = 'Pausar'
    iniciarOuPausarBtIcone.setAttribute('src', `imagens/pause.png`)
}

function zerar(){
    clearInterval(intervaloId)
    iniciarOuPausarbt.textContent = 'Come√ßar'
    intervaloId = null
    iniciarOuPausarBtIcone.setAttribute('src', `imagens/play_arrow.png`)
}

function mostrarTempoNaTela(){
    const tempo = new Date(tempodecorridoemsegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempoNaTela()