let reader = document.querySelector("#bar-and-reader");
let button = document.querySelector("#fullscreen");

// put reader in full screen
button.addEventListener("click", () => {
    if (!document.fullscreenElement) {
        reader?.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

reader.addEventListener('fullscreenchange', event => {
    if (!document.fullscreenElement) {
        $("#fullscreen").addClass("fa-expand");
        $("#fullscreen").removeClass("fa-compress");
    } else {
        $("#fullscreen").addClass("fa-compress");
        $("#fullscreen").removeClass("fa-expand");
    }
});


const doc = document.getElementById('document');
const zoomLabel = document.getElementById('percent');

// zoom in/out of reader
$("#zoom-in").click(function () {
    zoomInOrOut("in");
});
$("#zoom-out").click(function () {
    zoomInOrOut("out");
});
$("#reset").click(function () {
    resetZoom();
});

function resetZoom() {
    updateZoomLabel(1.0);
    $("#document-box").removeClass("small");
}

function zoomInOrOut(key) {
    var curZoom = percent.innerHTML / 100.0;
    var changed = false;
    if (curZoom < 2 && key == "in") {
        curZoom += .25;
        changed = true;
    } else if (curZoom > 0.25 && key == "out") {
        changed = true;
        curZoom -= .25;
    }

    if (changed) {
        if (curZoom < 1) {
            $("#document-box").addClass("small");
        } else {
            $("#document-box").removeClass("small");
        }
        updateZoomLabel(curZoom);
    }
}

function updateZoomLabel(scale) {
    $("#document-box").css("transform", "scale(" + scale + ")");
    var new_lab = Math.round(scale * 100);
    percent.innerHTML = new_lab;
}

// make top bar sticky on scroll
window.addEventListener("scroll", function () {
    updateOnScroll();
})

const header = document.querySelector("#top-bar");
function updateOnScroll() {
    header.classList.toggle("sticky", window.scrollY > header.offsetTop);
}

// show pop-up menu on selection
$('#document').mouseup(function (e) {
    if ($('#unit-popup').css("display") == "none" || e.target != document.getElementById('#unit-popup')) {
        getSelectionText();
    }
});

function getSelectionText() {
    text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }

    if (text == "" || $(".plugin .fa-toggle-on").length == 0) {
        $('#all-popups').fadeOut(200);
        $('#popup-menu').fadeOut(200);
        $('#unit-popup').fadeOut(200);

        $('#popup-menu i').removeClass("active");
        return;
    }
    // unit conversions
    if (!parseFloat(text)) {
        $("#unit-button").addClass("hide");
        if ($("#popup-menu i:not(.hide)").length == 0) {
            $('#popup-menu').fadeOut(200);
            return;
        }
    } else {
        $("#unit-button").removeClass("hide");
        var quant = parseFloat(text);
        $("#quant1").val(quant);
    }
    $('#all-popups').css({
        'left': pageX + 5,
        'top': pageY - 55
    }).fadeIn(200);
    $('#popup-menu').fadeIn(200);
}

$(document).on("mousedown", function (e) {
    pageX = e.pageX;
    pageY = e.pageY;
});

// toggle plugins
const toggle = document.getElementById("toggle-button");
const toggle2 = document.getElementById("toggle-small");
toggle.addEventListener("click", () => {
    $("#plugins").toggleClass("hide");
});
toggle2.addEventListener("click", () => {
    $("#plugins").toggleClass("hide");
});

$(".plugin i").click(function () {
    $(this).toggleClass("fa-toggle-on");
    $(this).toggleClass("fa-toggle-off");

    var id = $(this).parent().attr("id");
    var plugin = id.substring(0, id.indexOf("-") + 1);
    var button_id = plugin + "button";

    if ($(this).hasClass("fa-toggle-on")) {
        $(button_id).addClass("hide");
    } else {
        $(button_id).removeClass("hide");
    }
})

