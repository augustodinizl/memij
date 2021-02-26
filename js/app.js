var fs = require('fs');
var gui = require('nw.gui'); 
var win = gui.Window.get();
var pontos = require('./js/pontos.js');
var server = require('./js/server.js');

if(gui) {
    //win.x = -1080;
    win.x = 0;
    win.y = 0;
    //win.y = 30;
} else {
}

var imagem = {
    w: 4301, //7965,
    h: 4481
};

var centroInicial = {
    x: 108,
    y: 976
}

var posicao;
var escala = 0.75;
var balao = $($('#tpl-balao').html()).appendTo('body').hide();;
var imagem = 0; // índice da imagem atual do slideshow
var slideshow;  // timer do slideshow
var animacoes = []; // pilha de callbacks de animações (Deferreds)

/**
 * Servidor de Websockets para comunicação com iPad
 * http://einaros.github.io/ws/
 */
var WebSocketServer = require('ws').Server
var wss = new WebSocketServer({port: window.porta_sockets || 3003});

wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        
        console.log('recebido: ' + message)
        
        // Volta ao mapa
        if(message === "mapa") {
            resetMapa();
       
        // Volta ao início / screensaver
        } else if(message === "inicio") {
            resetApp();
        
        // Executa apresentação introdutória
        } else if(message === "intro") {
            intro();
        
        // Centraliza no ponto passado
        } else if(!isNaN(message) && pontos[message]) {
            console.log('abrindo ' + pontos[message].nome)
            centraliza(pontos[message]).done(pontoSelecionado);
            
        } else {
            console.log('COMANDO INVÁLIDO')
        }

    });
});

/**
 * Controle do marcador do ponto atualmente escolhido
 */
var marcador = (function(){
    var marcador = $('<div id="marcador"></div>').appendTo('body');
    marcador.css({
        top: (win.height/2) - (marcador.height()/2),
        left: (win.width/2) - (marcador.width()/2)
    }).hide();
    
    return marcador;
}());


/**
 * Marcadores de todos os pontos disponíveis
 */
function posicionaMarcadores() {
    for(var i=0; i<pontos.length; i++) {
        var el = $('<div class="marcador" data-idx="' + i + '">' + (i+1) + '</div>');
        var destX = 1 * ((escala * pontos[i].x));
        var destY = 1 * ((escala * pontos[i].y));
        el.css({
            top: destY,
            left: destX
        });
        $('#marcadores').hide().append(el);
    }
}


/**
 * Coloca o mapa na posição inicial
 */
function resetMapa() {
    imagem = 0;
    clearTimeout(slideshow);
    centraliza(centroInicial, 0.75).done(function() {
        $('#marcadores').fadeIn(200);
    });
}

/**
 * Selecionado um ponto de interesse
 */
function pontoSelecionado() {
    console.log('abrindo detalhes');
    marcador.fadeIn();
    $('#area-imagens').fadeIn(500);
    $('#mapa-overlay').fadeIn(500);
    mostraInfo(posicao.nome, posicao.texto);
    clearTimeout(slideshow);
    if(posicao.imagens && posicao.imagens.length) {
        mostraImagem(posicao.imagens[0]);
    }
}

/**
 * Centraliza mapa no ponto passado (requer X, Y), 
 * na escala passada (ou 1).
 *
 * Retorma promise resolvida ao fim da transição.
 */
function centraliza(ponto, escala) {
    
    // Limpa a tela para animação do mapa
    $('#marcadores').fadeOut();
    $('#txt-intro').fadeOut();
    marcador.fadeOut();
    $('#mapa-overlay').fadeOut();
    balao.fadeOut();
    $('#area-imagens').empty().fadeOut();
    
    // Acerta escala
    window.escala = escala = escala || 1.25;
    
    // Calcula posição de destino
    var destX = -1 * ((escala * ponto.x) - win.width/2);
    var destY = -1 * ((escala * ponto.y) - win.height/2);
    
    // Promessa: executa algo após a centralização
    var dfd = $.Deferred();
    animacoes.push(dfd);
    
    // Verifica se houve mudança de posição do mapa.
    // Caso contrário, resolve promessa sem animar
    if(!posicao || (ponto.x !== posicao.x) || (ponto.y !== posicao.y) || (escala !== window.escala)) {
        console.log('animando mapa');
        $('#mapa').off('transitionend');
        $('#mapa').on('transitionend', function fimAnimacao() {
            // Resolve a última animação da pilha e descarta as outras
            animacoes.pop().resolve();
            while(animacoes.length) {
                animacoes.pop().reject();
            }
        });
        
        $('#mapa').css('transform', 'translate(' + destX + 'px, ' + destY + 'px) scale(' + escala + ')');
        $('#marcadores').css('transform', 'translate(' + destX + 'px, ' + destY + 'px) scale(1)');

    } else {
        console.log('resolvendo sem animação');
        dfd.resolve();
    }
    
    // Atualiza demais globais
    window.posicao = ponto;
    window.escala = escala;

    return dfd.promise();
}

function centralizap(i, escala) {
    return centraliza(pontos[i], escala);
}

/**
 * Mostra texto em balão
 */
function mostraInfo(titulo, texto) {
    balao.find('.balao-titulo').html(titulo);
    balao.find('.balao-texto').html(texto);
    balao.fadeIn(500);
}

/**
 * Mostra imagem do local escolhido e controla slideshow
 */
function mostraImagem(arq) {
    // Imagem
    var base = "img/fotos/";
    var url = base + arq;
    var img = '<img src="' + url + '">';
    $('#area-imagens').hide().empty().append(img).fadeIn(200);
    clearTimeout(slideshow);
    
    // Slideshow
    clearTimeout(slideshow);
    if(posicao && posicao.imagens && posicao.imagens.length > 1) {
        if(++imagem == posicao.imagens.length) {
            imagem = 0;
        } 
        var proxima = posicao.imagens[imagem];;
        slideshow = setTimeout(function() {
            $('#area-imagens').fadeOut(200, function() {
                mostraImagem(proxima);
            });
        }, window.intervalo_slideshow * 1000);
    }
}

/**
 * Volta ao início do aplicativo e aguarda interação via iPad
 */
function resetApp() {
    balao.hide(500);
    $('#area-imagens').hide();
    clearTimeout(slideshow);
    
    centraliza(centroInicial, 0.75).done(function() {
        console.log('inicio')
        $('#marcadores').hide();
        $('#txt-intro').show(500);
        marcador.hide(500);
        $('#area-imagens').hide(500);
        $('#mapa-overlay').hide(500);
    });
}

/**
 * Dispara animação introdutória
 */
function intro() {
    // STUB
    setTimeout(function() {
        centraliza(centroInicial, 0.75).done(function() {
            $('#marcadores').fadeIn(200);
        });
    }, 400);
}

/**
 * INICIALIZAÇÃO
 * Aguarda o carregamento do mapa
 */
$('#mapa').on('load', function(){
    
    $('#mapa-overlay').hide();
    posicionaMarcadores();
    setTimeout(function(){
        resetApp();
    }, 100);

});