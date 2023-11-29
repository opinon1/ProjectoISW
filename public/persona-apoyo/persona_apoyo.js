//------------------------------Jsons------------------------------------------------------------------

const contactsURL = '/api/persona-apoyo/contactos:id';
const idToReplace = 7; // El ID que quieres usar
const updatedContactsURL = contactsURL.replace(':id', idToReplace);

const userURL = '/api/persona-apoyo/user:id';
const idToReplaceURL = 7; // El ID que quieres usar
const updateduserURL = userURL.replace(':id', idToReplaceURL);

const url = '/api/persona-apoyo/chat/:id';
const URLchatsJSON = url.replace(':id', idToReplaceURL);

const urlSend = '/api/persona-apoyo/chat/newMensaje';
const urlSendNew = urlSend.replace(':id', idToReplaceURL);

console.log(URLchatsJSON);

console.log(updateduserURL);

const urlPacientes = '/api/data';

// Función para cargar un archivo JSON usando fetch
function loadJSON(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error de red: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error(`Error al cargar JSON desde ${url}:`, error);
      throw error; // Relanzar el error para manejo posterior si es necesario
    });
}




//----------------------------------functions--------------------------------------------------------------

//-----------------------------------Side bar-------------------------------------------------------------- 
const loadSideBar = async () => {
  try {
    // Encuentra todos los enlaces en el sidebar
    const sidebarLinks = document.querySelectorAll('.sidebar a');

    // Agrega un event listener a cada enlace
    sidebarLinks.forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault(); // Previene la acción por defecto del enlace

        const contentId = this.getAttribute('href').substring(1);
        const contentToDisplay = document.getElementById(contentId);

        // Oculta todo el contenido
        document.querySelectorAll('.content').forEach(function (content) {
          content.style.display = 'none';
        });

        // Muestra el contenido correspondiente
        if (contentToDisplay) {
          contentToDisplay.style.display = 'block';
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
}

//-------------------------------User--------------------------------------------------------------------
const loadChatUser = async () => {
  try {
    const response = await loadJSON(updateduserURL);
    const jsonUser = response.data;
    console.log("Aqui va el usuario");
    const user = document.getElementsByClassName('usuario');
    jsonUser.forEach(element => {
      const nombreUsuario = document.createElement("p");
      const divImg = document.createElement('div');
      divImg.className = 'imgHelp';
      divImg.innerHTML = '<ion-icon name="person-outline" class = "iconoGrandeNegrita"></ion-icon>'
      nombreUsuario.innerText = element.Nombre;
      user[0].appendChild(divImg);
      user[0].appendChild(nombreUsuario);
    });
  } catch (error) {
    console.log(error);
  }
}

//---------------------------chatContacts------------------------------------------------------------------
const loadChatContacts = async () => {
  try {
    await loadChatUser();
    const resp = await loadJSON(URLchatsJSON);
    const jsonChats = resp.data;
    const card = document.getElementsByClassName('contact');
    console.log(card);
    const response = await loadJSON(updatedContactsURL);

    // Obtener el primer elemento del array 'data', que contiene tus objetos
    const jsonContacts = response.data;
    console.log(jsonContacts);
    jsonContacts.forEach(element => {
      const conversaciones = jsonChats.filter(m => m.id_receptor === element.IDPaciente);
      let ultimoMensajeTexto = "No hay mensajes";
      if (conversaciones.length > 0) {
        const ultimoMensaje = conversaciones[conversaciones.length - 1].Mensaje;
        ultimoMensajeTexto = ultimoMensaje;
      }
      let hora = new Date().toLocaleTimeString();
      const div = document.createElement("button");
      const divNombre = document.createElement("div");
      const nombre = document.createElement("h6");
      const fecha = document.createElement("p");
      const mensaje = document.createElement("p");
      const salto = document.createElement("br");
      mensaje.innerText = ultimoMensajeTexto;
      mensaje.className = "ulimoMensaje";
      mensaje.appendChild(salto);
      nombre.innerText = element.Nombre;
      fecha.innerText = hora;
      div.className = 'contactArea';
      nombre.className = 'nombreContacto';
      fecha.className = 'fechaContacto';
      divNombre.appendChild(nombre);
      divNombre.appendChild((mensaje));
      div.appendChild(divNombre);
      div.appendChild(fecha);
      card[0].appendChild(div);
    });
  } catch (error) {
    console.log(error);
  }
}

//--------------------load messages---------------------------------------------------------------------
const loadMessages = async () => {
  try {
    await loadChatContacts();
    const response = await loadJSON(updatedContactsURL);
    const resp = await loadJSON(URLchatsJSON);
    const jsonChats = resp.data;
    console.log(jsonChats);
    // Obtener el primer elemento del array 'data', que contiene tus objetos
    const jsonContacts = response.data;
    const areaChat = document.getElementsByClassName("chats")[0];
    const areaNombreChat = document.getElementsByClassName("nombreChat")[0];
    let contactos = document.querySelectorAll('.contactArea');

    contactos.forEach(contacto => {
      contacto.addEventListener('click', function (event) {
        // Limpiar áreas de chat y nombre del chat
        areaChat.innerHTML = '';
        areaNombreChat.innerHTML = '';

        // Obtener el nombre del contacto clickeado
        const name = contacto.querySelector('h6').textContent;

        // Encontrar el paciente correspondiente en jsonContacts
        const paciente = jsonContacts.find(p => p.Nombre === name);
        if (!paciente) {
          console.log('Paciente no encontrado:', name);
          return;
        }

        // Establecer el atributo data-idpaciente en areaChat con el ID del paciente
        areaChat.setAttribute('data-idpaciente', paciente.IDPaciente);

        // Crear y agregar el nombre en el área del chat
        const nombreElement = document.createElement('h3');
        nombreElement.innerText = name;
        nombreElement.className = "NombreChat";
        areaNombreChat.appendChild(nombreElement);
        areaNombreChat.appendChild(document.createElement('hr'));

        // Filtrar y mostrar solo los mensajes para este paciente
        jsonChats.forEach(conversacion => {
          if (conversacion.id_receptor === paciente.IDPaciente || conversacion.id_emisor === paciente.IDPaciente) {
            const mensajeElement = document.createElement("p");
            mensajeElement.innerText = conversacion.Mensaje;
            if (!(conversacion.tipo_emisor === 'PersonaApoyo')) {
              mensajeElement.className = 'MensajeReceptor';
            }
            else {
              mensajeElement.className = 'MensajeEmisor';
            }
            areaChat.appendChild(mensajeElement);
          }
        });
      });
    });

  } catch (error) {
    console.log(error);
  }
};





const searchBar = async () => {
  try {
    const searchBar = document.querySelector('.searchBar');
    searchBar.addEventListener('input', (e) => {
      const searchText = e.target.value.toLowerCase();
      const contactAreas = document.querySelectorAll('.contactArea');

      contactAreas.forEach(contact => {
        const name = contact.querySelector('.nombreContacto').textContent.toLowerCase();
        if (name.includes(searchText)) {
          contact.style.display = '';
        } else {
          contact.style.display = 'none';
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
}

//---------------------------clients----------------------------------------------------------------------
const loadClients = async () => {
  try {
    const clientsArea = document.getElementById('clients');
    let div;
    const response = await loadJSON(updatedContactsURL);

    // Obtener el primer elemento del array 'data', que contiene tus objetos
    const jsonContacts = response.data;
    console.log(jsonContacts);
    jsonContacts.forEach((el, index) => {
      if (index % 7 === 0) {
        // Crea un nuevo contenedor después de cada 7 clientes
        div = document.createElement('div');
        div.id = 'clientes';
        clientsArea.appendChild(div);
      }

      const div1 = document.createElement('div');
      const name = document.createElement('p');
      name.innerText = el.Nombre;
      name.className = 'clientName';
      const divImg = document.createElement('div');
      divImg.className = 'imgHelp1';
      divImg.innerHTML = '<ion-icon name="person-outline" class = "iconoGrandeNegrita"></ion-icon>'
      divImg.addEventListener('click', function () {
        const clienteWindow = window.open('', '_blank', 'width=400,height=400,scrollbars=yes,resizable=yes');
        clienteWindow.document.write(`
            <html>
              <head>
                <title>${el.Nombre}</title>
                <link rel="stylesheet" href="style.css" />
              </head>
              <body>
                <div class="blockClient">
                  <h1>${el.Nombre}</h1>
                  <p><h3>Padecimiento: </h3> ${el.Padecimento}</p>
                  <p><h3>Estatus: </h3> ${el.EstatusPaciente}</p>
                  <!-- Puedes agregar más elementos para mostrar otros detalles del cliente si es necesario -->
                </div>
              </body>
            </html>
          `);
      });

      div1.appendChild(divImg);
      div1.appendChild(name);
      div1.className = 'BloqueCliente';
      div.appendChild(div1);
    });
  } catch (error) {
    console.log(error);
  }

}

async function agregarMensaje(datosCita) {
  try {
    const response = await fetch('/api/persona-apoyo/chat/newMensaje', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosCita),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Cita agregada con éxito, ID:", data.insertedId);
    return data.insertedId; // Devolver el ID de la cita insertada
  } catch (error) {
    console.error("Error al agregar la cita:", error);
  }
}

const sendMessage = async () => {
  const areaChat = document.getElementsByClassName("chats")[0];

  // Obtener el valor de data-idpaciente
  const idPaciente = areaChat.getAttribute('data-idpaciente');
  const mensajeElement = document.createElement("p");
  mensajeElement.innerText = mensaje;
  mensajeElement.className = 'MensajeEmisor';
  areaChat.appendChild(mensajeElement);
  document.getElementById('textFieldM').value = '';
  if (idPaciente) {
    console.log("ID del Paciente:", idPaciente);

    const message = document.getElementById('textFieldM');
    const mensaje = message.value;
    const JSONMensaje = {
      id_receptor: idPaciente,
      id_emisor: 7,
      Mensaje: mensaje,
      tipo_emisor: "PersonaApoyo",
      tipo_receptor: "Paciente"
    }
    await agregarMensaje(JSONMensaje);



  } else {
    console.log("No se seleccionó ningún paciente.");
    // Manejar el caso en el que no se haya seleccionado ningún paciente
  }
}






//-------------------------------DOM---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  loadSideBar();
  loadMessages();
  searchBar();
  loadClients();

  /*
   Promise.all([
   loadJSON(contactsURL),
   loadJSON(userURL),
   loadJSON(mensajesURL)
 ])
   .then(([jsonContacts, jsonUser, mensajes]) => {
     // Aquí puedes trabajar con los tres JSON cargados
     loadMessages(jsonContacts, jsonUser, mensajes);
     loadClients(jsonContacts);
 
     // Puedes realizar operaciones adicionales con los JSON según tus necesidades
   })
   .catch(error => {
     // Manejar errores en la carga de JSON
     console.error('Error al cargar JSON:', error);
   });
 
  */


  /*
    //notifications
    fetch(url)
    .then(response =>{
      if(!response.ok){
        throw new Error('Error de red ${responde.status}');
      }
      return responde.json;

    })
    .then(data =>{
      var notifications = data; 
      notif(notifications);
    })
  */

});




