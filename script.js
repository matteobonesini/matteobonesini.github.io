const body = document.body;
const lightTheme = document.getElementById("light-theme");
const darkTheme = document.getElementById("dark-theme");
const deleteIcon = document.getElementById("delete-note");
const printIcon = document.getElementById("print-note");
const title = document.getElementById("title");
const note = document.getElementById("note");

// SETTAGGI AL CARICAMENTO DELLA PAGINA
window.onload = () => {
    if (localStorage.getItem("theme")) {
        const theme = localStorage.getItem("theme");
        setTheme(theme);
    } else {
        const theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
        setTheme(theme);
    }
    const titleStorage = localStorage.getItem("title") || "";
    title.value = window.atob(titleStorage);
    const noteStorage = localStorage.getItem("note") || "";
    note.value = window.atob(noteStorage);
}

// CAMBIO TEMA
darkTheme.addEventListener("click", () => {
    setTheme("dark");
})

lightTheme.addEventListener("click", () => {
    setTheme("light");
})

function setTheme(name) {
    if (name === "light") {
        lightTheme.setAttribute("style", "display: none");
        darkTheme.setAttribute("style", "display: inline");
        body.setAttribute("data-theme", name);
        localStorage.setItem("theme", name);
    }
    else {
        lightTheme.setAttribute("style", "display: inline");
        darkTheme.setAttribute("style", "display: none");
        body.setAttribute("data-theme", name);
        localStorage.setItem("theme", name);
    }
}

// SALVATAGGIO DELLA NOTA
title.addEventListener("keyup", () => {
    localStorage.setItem("title", window.btoa(title.value));
})

note.addEventListener("keyup", () => {
    localStorage.setItem("note", window.btoa(note.value));
})

// ELIMINAZIONE DELLA NOTA
deleteIcon.addEventListener("click", () => {
    title.value = "";
    localStorage.setItem("title", "");
    note.value = "";
    localStorage.setItem("note", "");
})

// STAMPA DELLA NOTA
printIcon.addEventListener("click", () => {
    window.print();
})

// ESPORTAZIONE DELLA NOTA
function download() {
    let a = document.createElement("a");
    const content = {
        theme: localStorage.getItem("theme"),
        title: localStorage.getItem("title"),
        note: localStorage.getItem("note")
    }
    let file = new Blob([JSON.stringify(content)], { type: 'text/plain' });
    a.href = URL.createObjectURL(file);
    a.download = 'database-' + Date.now() + '.json';
    a.click();
}

// IMPORTAZIONE DELLA NOTA
function onChange(event) {
    var reader = new FileReader();
    reader.readAsText(event.target.files[0]);
    reader.onload = (event) => {
        const obj = JSON.parse(event.target.result);
        setTheme(obj.theme);
        localStorage.setItem("title", obj.title);
        title.value = window.atob(localStorage.getItem("title"));
        localStorage.setItem("note", obj.note);
        note.value = window.atob(localStorage.getItem("note"));
    }
}

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
    })
}
