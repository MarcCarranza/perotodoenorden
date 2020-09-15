// Si es que soy un puto genio con lo del scroll
// En realidad esto podria estar mucho mejor pero si funciona pa qué tocarlo
var Module = (function () {
    let articulo = 0;
    let wWidth = $(window).width();
    let wHeight = $(window).height();
    let height = wHeight * 0.3;
    let arts;

    let refresh = () => {
        $(window).on('load', function () {
            $('.poemas__slider').stop().animate({
                'scrollTop': 0
            }, 0, 'swing');
        });
    }

    let detectResize = () => {
        $(window).resize(function () {
            let ratio;
            let altura;
            wWidth =  $(window).width();
            wHeight = $(window).height();
            if (wWidth <= 375) {
                ratio = 0.6;
            } else if (wWidth <= 800) {
                ratio = 0.55;
            } else {
                ratio = 0.3;
            }
            height = wHeight * ratio;
            altura = height * articulo;
            altura = altura + 'px';
            $('.poemas__slider').stop().animate({
                'scrollTop': altura
            }, 10, 'swing');
        });
    }

    // Función para leer el archivo de poemas y ya veré qué hago
    // He visto qué hacer y es hacer todos los articulos de golpe 
    var readFiles = function () {
        $.get('txts/poemas.txt', function (poemas) {
            let lines = poemas.split("</p>");
            arts = lines.length - 1;
            for (let i = 0; i < lines.length - 1; i++) {
                let article = "<article class='poemas__articulo articulo'> " + lines[i] + "</article>"
                $(".poemas__slider").append(article);
            }
        }, 'html');
    }

    /* Función de scroll de Portada y activa los links*/
    var startScroll = function () {
        if (wWidth > 375 && wWidth <= 800) {
            height = $(window).height() * 0.55;
        } else if (wWidth <= 375){
            height = $(window).height() * 0.6;
        }
        $('.poemas__slider').stop().animate({
            'scrollTop': height + 'px'
        }, 700, 'swing');
        //Animación fadeinto siguiente y anterior
        $('.link').css('display', 'block');
        $('.link').stop().animate({
            opacity: 1
        }, 900, 'swing');
        articulo++;

    }

    /* Función de scroll de los articulos
     * Ni lo he pensado pero detectará el articulo (onFocus? variable? variable.)
     */
    var scrollDown = function () {
        height = $('.poemas__slider').height();
        //if para que no se pase del articulo (abajo)
        if (articulo < arts) {
            articulo++;
            let altura = height * articulo;
            altura = altura + 'px';
            $('.poemas__slider').stop().animate({
                'scrollTop': altura
            }, 700, 'swing');
        }
        if (articulo == arts) {
            $('.slink').stop().animate({
                opacity: 0
            }, 900, 'swing');
            $('.slink').css('cursor', 'default');

        }
        if (articulo > 0) {
            $('.alink').stop().animate({
                opacity: 1
            }, 900, 'swing');
            $('.alink').css('cursor', 'pointer');
        }
    };

    var scrollTop = function () {

        //if para que no se pase del articulo (arriba)
        if (articulo > 0) {
            articulo--;
            let altura = height * articulo;
            altura = altura + 'px';
            $('.poemas__slider').stop().animate({
                'scrollTop': altura
            }, 700, 'swing');
        }
        if (articulo == 0) {
            $('.alink').stop().animate({
                opacity: 0
            }, 900, 'swing');
            $('.alink').css('cursor', 'default');
        }
        if (articulo < arts) {
            $('.slink').stop().animate({
                opacity: 1
            }, 900, 'swing');
            $('.slink').css('cursor', 'pointer');
        }
    };

    return {
        detectResize: detectResize,
        detectRefresh: refresh,
        scrollPortada: startScroll,
        scrollDown: scrollDown,
        scrollTop: scrollTop,
        files: readFiles
    };
}());