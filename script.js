const html = document.querySelector('html')
const focoBt = document.querySelector('#focoBt')
const curtoBt = document.querySelector('#curtoBt')
const longoBt = document.querySelector('#longoBt')
const mainImg = document.querySelector('.app__image')
const mainTitle = document.querySelector('.app__title')
const allButtons = document.querySelectorAll('.app__card-button')
const musicMainInput = document.querySelector('#alternar-musica')
const mainSong = new Audio ('sons/luna-rise-part-one.mp3')
mainSong.loop = true
const startPauseBt = document.querySelector('#start-pause')
const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3')
let tempoDecorridoEmSegundos = 1500
let intervaloId = null
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const iniciarOuPausarBtIcon = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer')



musicMainInput.addEventListener('change', ()=> {
    if (mainSong.paused) {
        mainSong.play()
    } else {
        mainSong.pause()
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alteraAtributo('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alteraAtributo('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alteraAtributo('descanso-longo')
    longoBt.classList.add('active')
})

function alteraAtributo (contexto) {
    mostrarTempo()
    allButtons.forEach( (contexto) => {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    mainImg.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case 'foco':
            mainTitle.innerHTML = `
            Boost your productivity,<br>
                <strong class="app__title-strong">
                    immerse yourself in what matters.</strong>
            `
            break;

            case 'descanso-curto':
                mainTitle.innerHTML = `
                
            How about taking a breather?? <strong class="app__title-strong">Take a short break.</strong>
                `
                break;
            
            case 'descanso-longo':
                mainTitle.innerHTML = `
                Time to return to the surface.<strong class="app__title-strong"> Take a long break.</strong>
                `
                break;
    
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        audioTempoFinalizado.play()
        alert('Tempo finalizado!')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloId){
        audioPausa.play()
        zerar()
        return
    }

    audioPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent ="Pausar"
    iniciarOuPausarBtIcon.setAttribute('src', `/imagens/pause.png`)
}

function zerar() {
    iniciarOuPausarBt.textContent ="Começar"
    iniciarOuPausarBtIcon.setAttribute('src', `/imagens/play_arrow.png`)
    clearInterval(intervaloId) 
    intervaloId = null
}

function mostrarTempo () {
    const tempo = new Date (tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'}) 
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo ()