export default function createHeader() {
    const header = document.createElement("header");
    header.classList.add("header");

    const logo = document.createElement("img");
    logo.src = "https://www.freeiconspng.com/thumbs/checkmark-png/black-checkmark-png-4.png";
    logo.alt = "checkmark logo";
    header.appendChild(logo);

    const title = document.createElement("h1");
    title.setAttribute('id', 'title');
    title.textContent = "To Do List";
    header.appendChild(title);

    return header;
}
