var elsound = null;

function playaudio(obj) {

    cual = `${obj.elaudio}`;
    elsound = document.getElementById(cual);
    elsound.play();

}

function sobre(obj) {

    // console.log(obj);
    //var x = document.getElementById('imguno').style.backgroundImage = url('imgs/unox.png');

    var cual = `${obj.eldiv}`;
    var elfile = `imgs/${obj.filex}.png`;

    // elfile = "imgs/" + obj.filex + ".png";

    document.getElementById(cual).style.backgroundImage = "url(" + elfile + ")";
    document.getElementById(cual).disabled = true;
    cual = `${obj.numletra}`;
    numletra = `${obj.numeroletra}`;
    document.getElementById(cual).innerHTML = numletra;

    //document.body.style.backgroundColor = "#f3f3f3";
    //document.body.style.backgroundImage = "url('img_tree.png')";

}

function normal(obj) {

    // console.log(obj);

    var cual = `${obj.eldiv}`;
    var elfile = `imgs/${obj.file}.png`;

    document.getElementById(cual).style.backgroundImage = "url(" + elfile + ")";
    document.getElementById(cual).disabled = false;
    cual = `${obj.numletra}`;
    document.getElementById(cual).innerHTML = "";

}