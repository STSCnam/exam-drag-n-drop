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
    e.dataTransfer.setData('num', e.target.id);
}

function drop(e) {
    let dragged = document.querySelector('#' + e.dataTransfer.getData('num'));
    let droped = e.target;

    if (dragged.textContent % 2 === 0 && droped.textContent % 2 !== 0)
        return notification(`Vous devez déposer une value impaire.`);

    if (dragged.textContent % 2 !== 0 && droped.textContent % 2 === 0)
        return notification(`Vous devez déposer une valeur paire.`);

    droped.textContent = droped.textContent * dragged.textContent;
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