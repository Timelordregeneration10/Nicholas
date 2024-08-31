/*/Still need to add:
-form validation
-fix send button
-fix middle close
-open on one click?
-fix nudge after opening
-rework form color scheme
*/

// window.alert("sometext");
var C = $('#container'),
    A = $('#open'),
    L = $('#letter'),
    B = $('#openpic'),
    F = $('.front'),
    W = $('#wrapper'),
    P = $('#perspective'),
    closed = true;
$(function () {
    // Handler for .ready() called.
    $("textarea").text("");
});

F.click(function () {
    C.css({
        'transition': 'all 1s',
        'transform': 'rotateY(180deg)',
    });
    A.css({
        'transition': 'all 1s .5s',
        'transform': 'rotateX(180deg)',
        'z-index': '0'
    });
    W.css({
        'visibility': 'visible'
    });
});

// open/close and spin
W.click(function () {
    if (closed === false) {
        L.css({
            'transition': 'all .7s',
            'top': '0px',
            'height': '90vh'
        });
        P.css({
            'transform': 'translateY(0px)'
        });
        F.css({
            'transform': 'rotateZ(0deg)'
        });
        C.css({
            'transition': 'all 1.2s .95s'
        });
        A.css({
            'transition': 'all 1.2s .7s'
        });
        setTimeout(() => {
            document.getElementById("openpic").src = "./image/letter/openpic3.png";
        }, 700)
        closed = true;
    }
    else {
        C.css({
            'transition': 'all 1s .5s',
        });
        A.css({
            'transition': 'all .5s',
        });
        closed = false;
    }
    C.css({
        'transform': 'rotateY(0deg) rotate(3deg)'
    });
    A.css({
        'transform': 'rotateX(0deg)',
        'z-index': '10'
    });
    W.css({
        //'transition':'all .5s',
        'visibility': 'hidden'
    });
});
// Open letter
B.click(function () {
    document.getElementById("openpic").src = "./image/letter/openpic4.png";
    document.getElementById("container").style.boxShadow = "none";
    L.css({
        'transition': 'all .5s 1s',
        'top': '-95vh',
        'height': '105vh'
        // 'height': '290vh'
    });
    P.css({
        'transition': 'all 1s',
        'transform': 'translateY(85vh)'
    });
});
