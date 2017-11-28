/*--------------------------------------------------
W E B S O L U T E
Website by Websolute
--------------------------------------------------*/


/*--------------------------------------------------
Splitted Text
--------------------------------------------------*/
function splittedText(el) {
    $(el).each(function () {
        var $t = $(this),
            nodes = $t[0].childNodes;

        nodes = Array.prototype.slice.call(nodes, 0);

        $t.html('').addClass('active');

        var rows = [
            []
        ];
        nodes.filter(function (node) {
            return node.nodeType === 3 || node.nodeType === 1;
        }).map(function (node) {
            if (node.nodeType === 3) {
                node = { text: $.trim(node.textContent), element: 'span' };
            } else {
                if (node.nodeName.toLowerCase() === 'br') {
                    rows.push([]);
                    return;
                }
                node = { text: $.trim(node.innerHTML), element: node.nodeName };
            }
            if (node.text !== '') {
                rows[rows.length - 1].push(node);
            }
        });

        for (var r = 0; r < rows.length; r++) {
            /* Riga */
            // console.log('riga ' + r, rows[r]);
            var row = rows[r];
            $('<div class="splitted-row"></div>').appendTo($t);

            /* Elemento */
            for (var e = 0; e < row.length; e++) {
                var el = row[e];
                var type = el.element.toLowerCase();
                var text = el.text;

                // console.log('\telemento ' + e, type, text);

                /* Parola */
                var words = text.split(' ');
                for (var w = 0; w < words.length; w++) {
                    // console.log('\t\tword ' + w, words[w]);
                    $('<' + type + ' class="splitted-word"></' + type + '>').appendTo($('.splitted-row:last'), $t);

                    /* Lettera */
                    var word = words[w];
                    var letters = word.split('');
                    for (var l = 0; l < letters.length; l++) {
                        // console.log('\t\t\tlettera' + l, letters[l]);
                        var letter = letters[l];
                        $('<span class="splitted-letter" data-content="' + letter + '">' + letter + '</span>').appendTo($('.splitted-word:last'), $t);
                    }

                    $('<span class="splitted-space">&nbsp;</span>').appendTo($('.splitted-word:last'), $t);
                }

            }
        }
    });
}


/*--------------------------------------------------
Show Letters
--------------------------------------------------*/
function showLetters() {
    var letters = $('.splitted-letter');
    TweenMax.staggerTo(letters, 1, {
        delay: 0.2,
        y: 0,
        x: 0,
        ease: Power3.easeInOut,
        className: '+=viewed'
    }, 0.009);
}


/*--------------------------------------------------
Hide Letters
--------------------------------------------------*/
function hideLetters() {
    var letters = $('.splitted-letter');
    TweenMax.staggerTo(letters, 1, {
        delay: 0,
        y: 100,
        x: 50,
        ease: Power3.easeInOut,
        className: '-=viewed'
    }, 0.009);
}


/*--------------------------------------------------
DOC READY
--------------------------------------------------*/
$(function () {
    splittedText('.splitted-text');

    setTimeout(function(){
        showLetters();
    }, 1000);
});


/*--------------------------------------------------
WIN LOAD
--------------------------------------------------*/
$(window).on('load', function () {
});


/*--------------------------------------------------
WIN RESIZE
--------------------------------------------------*/
$(window).on('resize', function () {
});