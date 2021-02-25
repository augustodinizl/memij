/**
 * Controle para retorno automático ao início/screensaver
 */
var idleTimer;

/**
 * Websockets
 */
var socketUri = "ws://" + (ip_servidor || window.location.hostname) + ':' + (porta_sockets || 3000);
var ws = new WebSocket(socketUri);


/**
 * Websockets: notifica server sobre seleção de ponto de interesse
 * http://stackoverflow.com/questions/23051416/
 */
var send = function (message, callback) {
    waitForConnection(function () {
        ws.send(message);
        if (typeof callback !== 'undefined') {
          callback();
        }
    }, 1000);
};

/**
 * Websockets: listen
 */
var waitForConnection = function (callback, interval) {
    if (ws.readyState === 1) {
        callback();
    } else {
        setTimeout(function () {
            waitForConnection(callback);
        }, interval);
    }
};

/**
 * Websockets: receive
 */
/*
ws.onmessage = function(e) {
    if(e && e.data === 'reset') {
        $('#intro').fadeOut();
        $('header').fadeIn();
        $('#lista, #detalhes').fadeIn();
        resetIdleTimer();
    }
}
*/

/**
 * Cria item do menu de pontos de interesse
 */
function criaItemLista(item, idx) {
    var li = $($('#tpl-item-lista').html());
    //li.find('.numero').html(idx+1);
    li.find('.nome').html((idx+1) + '. ' + item.nome);
    li.attr('data-idx', idx);
    
    var base = "/img/fotos/t_";
    var url = base + item.imagens[0];
    var img = new Image();
    img.src = url;
        img.onload = function() {
            if(this.width/this.height < 1) {
                this.width = 150;
            } else {
                this.height = 150;
            }
            li.find('.imagem').append(this);
        };
    
    return li;
}

/**
 * Mostra conteúdo detalhado do item
 */
function detalhes(chave) {
    $('#lista').removeClass('in').addClass('out').hide();
    var conteudo = $('#detalhe').removeClass('out').addClass('in').show();
    conteudo.find('h1').empty().html(pontos[chave].nome);
    conteudo.find('.texto').empty().html(pontos[chave].texto);
    conteudo.find('img').attr('src', '').attr('src', "img/fotos/p_" + pontos[chave].imagens[0]);
}

/**
 * Coloca aplicação no estado inicial
 */
function inicio() {
    // Esconde lista e detalhes
    $('#lista, #detalhes').fadeOut();
    $('header').fadeOut();
    $('#intro').fadeIn();
    
    $('#lista li').removeClass('selecionado');
    $('header').removeClass('detalhe').addClass('lista');
    $('#lista')[0].scrollTop = 0;
    
    $('#lista').removeClass('out').addClass('in').hide();
    $('#detalhe').removeClass('in').addClass('out').hide();
    
    clearTimeout(idleTimer);
}

/**
 * Define/redefine timer para retorno ao início
 */
function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(function() {
        inicio();
        send('inicio')
    }, idle_timeout * 60 * 1000);
}

/**
 * Inicializa aplicação
 */
function init() {
    
    // Clique no botão de iniciar
    $('#iniciar').click(function() {
        $('#intro').fadeOut();
        $('header').fadeIn();
        $('#lista, #detalhes').fadeIn();
        
        // Manda app principal rodar a introdução
        send('intro');
        
        // Inicia timer de retorno
        resetIdleTimer();
    })
    
    // Monta lista de pontos de interesse
    var ul = $('#lista ul');
    for(var i=0; i<window.pontos.length; i++) {
        ul.append(criaItemLista(pontos[i], i));
    }

    // Clique em item da lista de pontos
    ul.on('click', 'li', function(){
        resetIdleTimer();
        var chave = $(this).addClass('selecionado').attr('data-idx');
        send(chave);
        detalhes(chave);
        $('header').removeClass('lista').addClass('detalhe');
        
    });
    
    // Clique no cabeçalho da tela de detalhes do ponto escolhido
    $('header').hide().click(function() {
        resetIdleTimer();
        $('#lista li').removeClass('selecionado');
        if($(this).hasClass('detalhe')) {
            $(this).removeClass('detalhe').addClass('lista');
            $('#lista').removeClass('out').addClass('in').show();
            $('#detalhe').removeClass('in').addClass('out').hide();
            send('mapa');
        } else {
            send('inicio');
            inicio();
        }
    });
    
    // Esconde lista e detalhes
    $('#lista, #detalhes').hide().on('scroll', resetIdleTimer);
    $('header').fadeOut();
    
    // Inicia timer para retorno ao início
    resetIdleTimer();

    var hammer = new Hammer($('#intro')[0], {});
    hammer.on('doubletap', function(ev) {
        alert('Reiniciando');
        window.location.reload()
    });
    
    send('inicio');
    
    setInterval(function(){
        send('noop');
    }, 15000);
}

init();