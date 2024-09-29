import createHeader from './header';
import createSidebar from './sidebar';
import createMain from './main';

export default function homePage() {
    const container = document.querySelector(".container");
    
    container.appendChild(createHeader());
    container.appendChild(createSidebar());
    container.appendChild(createMain());
}