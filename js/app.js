'use strict'

window.onload = () => {
    let dropbox = document.querySelector('#dropable'); 
    let items = document.querySelectorAll('.item');

    dropbox.ondragover = allowdrop;
    dropbox.ondrop = drop;

    for (let i = 0; i < items.length; ++i) {
        if (i < 9) {
            items[i].draggable = true;
            items[i].ondragstart = drag;
        } else items[i].draggable = false;
    }
}

function allowdrop(e) {
    e.preventDefault();
}

function drag(e) {
    e.dataTransfer.setData('img', e.target.id);
}

function drop(e) {
    let dragged = document.querySelector('#' + e.dataTransfer.getData('img'));
    let droped = e.target;

    if (droped.classList.contains('ok'))
        return notification(`Cette ${droped.alt} a déjà été mangée. Ca serait dommage ` + 
                            `d'imposer une gamelle vide à ce pauvre ${dragged.alt} ...`);

    if (dragged.getAttribute('meta-type') !== droped.getAttribute('meta-type'))
        return notification(`Le ${dragged.alt} trouve que la ${droped.alt} a un goût bizare. ` + 
                            `Il décide de ne pas la manger.`);

    droped.classList.add('ok');
    dragged.classList.add('disabled');
    dragged.draggable = false;
}

function notification(message) {
    var notif = document.createElement('div');
    let content = document.createElement('div');
    let p = document.createElement('p');

    notif.classList.add('notification');
    content.classList.add('notification-content');
    p.textContent = message;

    notif.appendChild(content);
    content.appendChild(p);
    document.body.appendChild(notif);

    setTimeout(() => document.body.removeChild(notif), 4000);
}