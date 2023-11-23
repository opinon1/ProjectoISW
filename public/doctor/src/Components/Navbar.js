import React from 'react'

export const Navbar = () => {
    return (
        <div class="sidebar">
            <div class="dots">
                <h3> Kokua| Modo Doctor </h3>
            </div>
            <div class="profile">
                <ion-icon name="person-outline"/>
            </div>
            <ul>
                <span>Principal</span>
                <li>
                    <a href="#homeContent">
                        <ion-icon name="home-outline"/>
                        <p>Inicio</p>
                    </a>
                </li>
                <li>
                    <a href="#notifications">
                        <ion-icon name="notifications-outline"/>
                        <p>Avisos</p>
                    </a>
                </li>
            </ul>
            <ul>
                <span>Contenido</span>
                <li>
                    <a href="#patients">
                        <ion-icon name="accessibility-outline"/>
                        <p>Pacientes</p>
                    </a>
                </li>
                <li class="likes">
                    <a href="#update">
                        <ion-icon name="chatbubble-outline"/>
                        <p>Progreso medico</p>
                    </a>
                </li>
                <li>
                    <a href="#profile">
                        <ion-icon name="person-circle-outline"/>
                        <p>Perfil</p>
                    </a>
                </li>
            </ul>
            <ul>
                <span>Sesion</span>
                <li>
                    <a href="#log-out">
                        <ion-icon name="log-out-outline"/>
                        <p>Cerrar sesion</p>
                    </a>
                </li>
            </ul>
        </div>
    )
}
