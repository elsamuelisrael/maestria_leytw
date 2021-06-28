var elColaps = document.getElementById('collapseOne');

elColaps.addEventListener('show.bs.collapse', function () {

    //console.log(this.dataset)

    var e = `#${this.dataset.tabla}`;
    var t = document.querySelector(e);
    var tb = document.querySelector(".contenidouno");
    var clon = document.importNode(t.content, true);

    tb.innerHTML = '';
    tb.appendChild(clon);

})

var elColapsD = document.getElementById('collapseTwo');

elColapsD.addEventListener('show.bs.collapse', function () {

    var elv = document.getElementById("elvideo");

    if (elv.paused) elv.play();
    else elv.pause();

})

elColapsD.addEventListener('hide.bs.collapse', function () {

    var elv = document.getElementById("elvideo");

    if (elv.paused) elv.play();
    else elv.pause();

})

var elColapsT = document.getElementById('collapseThree');

elColapsT.addEventListener('show.bs.collapse', function () {

    var lacadena = `
        <div class="spinner-grow spinner-grow-sm" role="status">
            <span class="visually-hidden">cargando...</span>
        </div>
    `;

    var e = document.getElementById("elcargador");
    e.innerHTML = '';
    e.innerHTML = lacadena;

    cargadatosJSON();

})

var elColapsCuatro = document.getElementById('collapseCuatro');

elColapsCuatro.addEventListener('show.bs.collapse', function () {

    var lacadena = `
        <div class="spinner-grow spinner-grow-sm" role="status">
            <span class="visually-hidden">cargando...</span>
        </div>
    `;

    var e = document.getElementById("elcargadorb");
    e.innerHTML = '';
    e.innerHTML = lacadena;

    cargaXML();

})

var elColapCinco = document.getElementById('collapseCinco');

elColapCinco.addEventListener('show.bs.collapse', function () {

    //console.log(this.dataset)

    var e = `#${this.dataset.forma}`;
    var t = document.querySelector(e);
    var tb = document.querySelector(".contenidocinco");
    var clon = document.importNode(t.content, true);

    tb.innerHTML = '';
    tb.appendChild(clon);

})

function cargadatosJSON() {

    var requestURL = 'misdatos.json';
    var request = new XMLHttpRequest();

    request.open('GET', requestURL);
    request.responseType = 'text';
    request.send();

    request.onload = function () {

        //console.log(JSON.parse(request.response))
        //console.log(objs.datos.navegadores)

        var objs = JSON.parse(request.response);

        var lacadena = '';

        for (var i = 0; i < objs.datos.navegadores.length; i++) {

            // console.log(objs.datos.navegadores[i]);

            var activo = objs.datos.navegadores[i].activo;
            var onoff = '';

            if (activo == "false") {
                onoff = 'disabled';
            }

            lacadena += `

                <li class="list-group-item list-group-item-action d-flex justify-content-between align-items-start ${onoff}">
                    <div class="ms-2 me-auto">
                        <div>${objs.datos.navegadores[i].nombre}, ${objs.datos.navegadores[i].fecha}</div>
                    </div>
                    <img src="imgs/${objs.datos.navegadores[i].img}" width="32" height="32" class="img-fluid" alt="${objs.datos.navegadores[i].nombre}">
                </li>

            `;

            //console.log(i + ' - ' + (objs.datos.navegadores.length-1));

            if (i == (objs.datos.navegadores.length - 1)) {

                var e = document.getElementById("lalista");

                //console.log(e);

                e.innerHTML = '';
                e.innerHTML = lacadena;

                e = document.getElementById("elcargador");
                e.innerHTML = '';

            }

        }
    }
}

function cargaXML() {

    var xmlhttp, xmlDoc;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "datos.xml", false);
    xmlhttp.send();
    xmlDoc = xmlhttp.responseXML;

    // console.log(xmlDoc.firstChild.children.length);

    var lacadena = '';

    for (var i = 0; i < xmlDoc.firstChild.children.length; i++) {

        // console.log(xmlDoc.firstChild.children[i].childNodes);

        var nodos = xmlDoc.getElementsByTagName("navegador")[i].childNodes;

        var n, f, act, img = '';

        for (var j = 0; j < nodos.length; j++) {

            if (nodos[j].nodeType == 1) {

                // console.log(nodos[j]);

                switch (nodos[j].nodeName) {

                    case "nombre": {
                        n = nodos[j].childNodes[0].nodeValue;
                        break;
                    }

                    case "fecha": {
                        f = nodos[j].childNodes[0].nodeValue;
                        break;
                    }

                    case "activo": {
                        act = nodos[j].childNodes[0].nodeValue;
                        break;
                    }

                    case "imagen": {
                        img = nodos[j].childNodes[0].nodeValue;
                        break;
                    }

                }

            }
        }

        var onoff = '';

        if (act == "false") {
            onoff = 'disabled';
        }

        lacadena += `

            <li class="list-group-item list-group-item-action d-flex justify-content-between align-items-start ${onoff}">
                <div class="ms-2 me-auto">
                    <div>${n}, ${f}</div>
                </div>
                <img src="imgs/${img}" width="32" height="32" class="img-fluid" alt="${n}">
            </li>

        `;


        if (i == (xmlDoc.firstChild.children.length - 1)) {

            var e = document.getElementById("lalistab");

            e.innerHTML = '';
            e.innerHTML = lacadena;

            e = document.getElementById("elcargadorb");
            e.innerHTML = '';
        }

    }

    /* for (var i = 0; i < xmlDoc.firstChild.children.length; i++) {
        for (var j = 0; j < xmlDoc.firstChild.children[i].children.length; j++) {
            console.log(xmlDoc.firstChild.children[i].children[j].innerHTML)
        }
    } */

}

function validaforma(campoa, campob) {

    var e = document.getElementById(campoa);
    var ea = document.getElementById(campob);

    var todoOK = true;

    /* console.log(
        {
            "mail": validateEmail(e.value),
            "pass": validatePass(ea.value)
        }
    ) */

    if (!validateEmail(e.value)) {

        avisa('campomail', '#ea4f4f');
        todoOK = false;

        return false;
    }

    if (!validatePass(ea.value)) {

        avisa('campopass', '#ea4f4f');
        todoOK = false;

        return false;
    }

    if(todoOK){
        alert('Todo OK!');

        return true;
    }

}

function avisa(el, clr){

    var elem = document.getElementById(el);
	elem.style.transition = "background 1.0s linear 0s";
    elem.style.color = "#fff";
	elem.style.background = clr;

    elem.focus();

    //console.log(elem.id)

    switch(elem.id){

        case "campomail" : {
            document.getElementById("mailayuda").innerHTML = "La dirección de correo electrónico no es válida";
            break;
        }

        case "campopass" : {
            document.getElementById("passayuda").innerHTML = "La contraseña no es válida";
            break;
        }
    }

    document.getElementById(el).addEventListener("transitionend", finfuncion);
}

function finfuncion(){

    console.log(this.id)

    this.style.transition = "background 2.0s linear 0s";
	this.style.background = "#fff";
    this.style.color = "#000";

    switch(this.id){

        case "campomail" : {
            document.getElementById("mailayuda").innerHTML = "";
            break;
        }

        case "campopass" : {
            document.getElementById("passayuda").innerHTML = "";
            alert("Mínimo 8 caracteres\nMáximo 15 Al menos una letra mayúscula\nAl menos una letra minúscula\nAl menos un dígito\nNo espacios en blanco\nAl menos 1 caracter especial");
            break;
        }
    }

}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


function validatePass(pass) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    return regex.test(String(pass));
}

function muestraOcultapass(e){

    var elem = document.getElementById("campopass");
    var eltipo = elem.getAttribute('type') === 'password' ? 'text' : 'password';

    elem.setAttribute('type', eltipo); 

    // console.log(elem.type)

    switch(elem.type){

        case 'password' : {

            e.classList.remove("bi-eye");
            e.classList.add("bi-eye-slash");

            break;
        }

        case 'text' : {

            e.classList.remove("bi-eye-slash");
            e.classList.add("bi-eye");

            break;
        }

    }

}
