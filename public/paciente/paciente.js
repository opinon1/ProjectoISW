
// Variable global para almacenar el contacto actualmente seleccionado

document.addEventListener('DOMContentLoaded', function() {
    
        const notifications = 
        [
            {
                id: 1, 
                notification: "Hola", 
                description: "Alguien te ha dicho hola", 
                time: "1hr ago"
            }, 
            {
                id: 2, 
                notification: "Hola", 
                description: "Alguien te ha dicho hola", 
                time: "1hr ago"
            },
            {
                id: 3, 
                notification: "Hola", 
                description: "Alguien te ha dicho hola", 
                time: "1hr ago"
            },
            {
                id: 4, 
                notification: "Hola", 
                description: "Alguien te ha dicho hola", 
                time: "1hr ago"
            }
        ]
    
    
        //-------------------------------Sidebar----------------------------------------------------------------
    
        // Encuentra todos los enlaces en el sidebar
        const sidebarLinks = document.querySelectorAll('.sidebar a');
    
        // Agrega un event listener a cada enlace
        sidebarLinks.forEach(function(link) {
            link.addEventListener('click', function(event) {
                event.preventDefault(); // Previene la acción por defecto del enlace
    
                const contentId = this.getAttribute('href').substring(1);
                const contentToDisplay = document.getElementById(contentId);
    
                // Oculta todo el contenido
                document.querySelectorAll('.content').forEach(function(content) {
                    content.style.display = 'none';
                });
    
                // Muestra el contenido correspondiente
                if (contentToDisplay) {
                    contentToDisplay.style.display = 'block';
                }
            });
        });
    
        
    
         //---------------------------Notifications----------------------------------------------------------------
         const notificationArea = document.getElementById('notifications'); 
         notifications.forEach(el =>{
            const line = document.createElement('hr');
            line.className = "lineaNot";
            const divTituloMensaje  = document.createElement('div'); 
            divTituloMensaje.className = "notificacionTituloDescripcion"; 
            const divHora = document.createElement('div'); 
            divHora.className = "divHoraNotificacion"; 
            const divNotification = document.createElement('div'); 
            divNotification.className = "divNotificacion"; 
            const point = document.createElement('div');
            point.className = "ponitNotificacion";
    
            const notification = document.createElement('p');
            notification.innerText = el.notification; 
            notification.className = "titleNotification"; 
            const time = document.createElement('p');
            time.innerText = el.time;  
            time.className = "timeNotification"; 
            const description = document.createElement('p');
            description.innerText = el.description; 
            description.className = "descriptionNotification"; 
    
            divTituloMensaje.appendChild(point); 
            divTituloMensaje.appendChild(notification);
            divTituloMensaje.appendChild(description); 
            divHora.appendChild(time); 
            divNotification.appendChild(divTituloMensaje); 
            divNotification.appendChild(divHora); 
            notificationArea.appendChild(line);
            notificationArea.appendChild(divNotification); 
            notificationArea.appendChild(line);
         }); 
    
    });
    
    
    
    
    