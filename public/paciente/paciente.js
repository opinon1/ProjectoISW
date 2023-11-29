//------------------------------Jsons------------------------------------------------------------------

const contactsURL = '/api/paciente/contactos:id';
const idToReplace = 38; // El ID que quieres usar
const updatedContactsURL = contactsURL.replace(':id', idToReplace);

const userURL = '/api/paciente/user:id';
const updateduserURL = userURL.replace(':id', idToReplace);

const serviciosURL = '/api/paciente/ServiciosExtra';

const SeguimientoURL = '/api/paciente/Seguimiento:id';
const updateseguimientoURL = SeguimientoURL.replace(':id', idToReplace);

const urlPacientes = '/api/data';

const url = '/api/persona-apoyo/chat/:id';
const URLchatsJSON = url.replace(':id', idToReplace);

const urlSend = '/api/persona-apoyo/chat/newMensaje';
const urlSendNew = urlSend.replace(':id', idToReplace);

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
    const resp = await loadJSON(URLchatsJSON);
    const jsonChats = resp.data;
    await loadChatUser();
    const card = document.getElementsByClassName('contact')[0];
    const response = await loadJSON(updatedContactsURL);
    const jsonContacts = response.data;
    console.log(jsonContacts);

    // Decide si mostrar nombre de doctor o de persona de apoyo
    let nombreCompletoApoyo = nombreCompleto = `${jsonContacts[0].PersonaApoyoNombre} ${jsonContacts[0].PersonaApoyoApellido}`;
    let ultimoMensajeTexto2 = "No hay mensajes";
    const conversaciones2 = jsonChats.filter(m => m.id_recpetor === jsonContacts[0].IDPersonaApoyo);

    if (conversaciones2.length > 0) {
      const ultimoMensaje = conversaciones2.map(c => c.mensaje[c.mensaje.length - 1])
        .reduce((a, b) => (a.fecha > b.fecha ? a : b));
      ultimoMensajeTexto2 = ultimoMensaje.mensaje;
    }

    let hora = new Date().toLocaleTimeString();
    const div1 = document.createElement("button");
    const divNombre1 = document.createElement("div");
    const nombrePersonaApoyo = document.createElement("h6");
    const fecha1 = document.createElement("p");
    const mensaje1 = document.createElement("p"); 2
    const salto1 = document.createElement("br");

    mensaje1.innerText = ultimoMensajeTexto2;
    mensaje1.className = "ultimoMensaje";
    mensaje1.appendChild(salto1);
    nombrePersonaApoyo.innerText = nombreCompletoApoyo;
    fecha1.innerText = hora;
    div1.className = 'contactArea';
    nombrePersonaApoyo.className = 'nombreContacto';
    fecha1.className = 'fechaContacto';
    div1.setAttribute('data-id', jsonContacts[0].IDPersonaApoyo);
    div1.setAttribute('data-type', 'doctor');

    divNombre1.appendChild(nombrePersonaApoyo);
    divNombre1.appendChild(mensaje1);
    div1.appendChild(divNombre1);
    div1.appendChild(fecha1);
    card.appendChild(div1);

  } catch (error) {
    console.log(error);
  }
};


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

        // Crear y agregar el nombre en el área del chat
        const nombreElement = document.createElement('h3');
        nombreElement.innerText = name;
        nombreElement.className = "NombreChat";
        areaNombreChat.appendChild(nombreElement);
        areaNombreChat.appendChild(document.createElement('hr'));

        // Filtrar y mostrar solo los mensajes para este paciente
        jsonChats.forEach(conversacion => {
          const mensajeElement = document.createElement("p");
          mensajeElement.innerText = conversacion.Mensaje;
          console.log(conversacion.Mensaje);
          if (conversacion.tipo_emisor === 'PersonaApoyo') {
            mensajeElement.className = 'MensajeReceptor';
          }
          else {
            mensajeElement.className = 'MensajeEmisor';
          }
          areaChat.appendChild(mensajeElement);
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


//-----------------------------------------------Servicios Extra----------------------------------------------
const serviciosExtraLoad = async () => {
  const response = await loadJSON(serviciosURL);
  const jsonServicios = response.data;
  console.log(jsonServicios)
  const area = document.getElementById('serviciosExtra');
  console.log(area)
  let cont = 0;
  jsonServicios.map(element => {
    const div = document.createElement('div');
    div.innerHTML = `<div class="col-lg-3 mb-4">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${element.Nombre}</h5>
          <p class="card-text">
            ${element.Descripcion}
          </p>
          <p class="card-text">
            <small class="text-muted">Costo: ${element.Costo}</small>
          </p>
        </div>
      </div>
    </div>`
    area.appendChild(div);
    cont++;
  });
}

//---------------------------------------Seguimiento------------------------------------------------------------------------
const seguimientoLoad = async () => {
  const response = await loadJSON(updateseguimientoURL);
  const jsonSeguimiento = response.data;
  const area = document.getElementById('DashBoard');
  const div = document.createElement('div');
  div.innerHTML = `
    <h4> ¡Hola de nuevo, ${jsonSeguimiento[0].NombrePaciente}!</h4>
    <div class = 'row'>
      <div class="col-lg-4">
        <div id="patientInfo" class="info-container">
        <ion-icon name="medkit" class="icono-grande"></ion-icon>
          
          <div class="texto-info">
            <p>Doctor:</p>
            <h6>${jsonSeguimiento[0].NombreDoctor}</h6>
          </div>
        </div>
    </div>
    
    <div class="col-lg-4">
      <div id="patientInfo" class="info-container">
        
        <ion-icon name="people" class="icono-grande"></ion-icon>
        <div class="texto-info">
          <p>Persona de Apoyo:</p>
          <h6>${jsonSeguimiento[0].NombrePersonaApoyo}</h6>  
        </div>
      </div>
    </div>

    
    <div class="col-lg-4">
      <div id="patientInfo" class="info-container">
      <ion-icon name="medical" class="icono-grande"></ion-icon>
        <div class="texto-info">
          <p>Aseguradora:</p>
          <h6>${jsonSeguimiento[0].NombreAseguradora}</h6> 
        </div>
      </div>
    </div>

    </div>
      <br>
      <h2>Mis citas</h2>
      <div id = 'CitasArea'></div>
      <br>
      <h2>Mis medicamentos</h2>
      <div id='MedicamentosArea'></div>
      <br>
    `
  area.appendChild(div);
  const medicinasArea = document.getElementById('MedicamentosArea');
  const citasArea = document.getElementById('CitasArea');
  // Crear contenedor para la línea de tiempo
  // Crear contenedor para la línea de tiempo
  // Crear contenedor para la línea de tiempo
  const lineaTiempoContainer = document.createElement('div');
  lineaTiempoContainer.className = 'linea-tiempo-container';

  const fechasUnicas = new Set();
  jsonSeguimiento.forEach(el => {
    // Formatea la fecha para mostrar solo aaaa-mm-dd
    const fechaFormateada = el.FechaCita.split('T')[0];

    if (!fechasUnicas.has(fechaFormateada)) {
      fechasUnicas.add(fechaFormateada);

      const puntoLineaTiempo = document.createElement('div');
      puntoLineaTiempo.className = 'punto-linea-tiempo';

      const labelFecha = document.createElement('div');
      labelFecha.className = 'label-fecha';
      labelFecha.innerText = fechaFormateada;
      puntoLineaTiempo.appendChild(labelFecha);
      lineaTiempoContainer.appendChild(puntoLineaTiempo);
    }
  });


  const titLinea = document.createElement('h3');
  titLinea.innerText = "Linea del tiempo citas: "
  citasArea.appendChild(titLinea);
  citasArea.appendChild(lineaTiempoContainer);



  const tablaCitas = document.createElement('table');
  const citasUnicas = new Set();
  tablaCitas.className = 'tabla-citas'; // Añade una clase para estilos CSS si es necesario

  // Añadir cabecera de la tabla
  const cabeceraTabla = document.createElement('thead');
  cabeceraTabla.innerHTML = `
      <tr>
        <th>Fecha de la Cita</th>
        <th>Tipo de Cita</th>
        <th>Estatus de la Cita</th>
      </tr>`;
  tablaCitas.appendChild(cabeceraTabla);

  // Añadir cuerpo de la tabla
  const cuerpoTabla = document.createElement('tbody');
  jsonSeguimiento.forEach(el => {
    // Formatea la fecha para mostrar solo aaaa-mm-dd
    const fechaFormateada = el.FechaCita.split('T')[0];

    const citaKey = `${fechaFormateada}-${el.TipoCita}-${el.EstatusCita}`;

    if (!citasUnicas.has(citaKey)) {
      citasUnicas.add(citaKey);

      const filaTabla = document.createElement('tr');
      filaTabla.innerHTML = `
          <td>${fechaFormateada}</td>
          <td>${el.TipoCita}</td>
          <td>${el.EstatusCita}</td>
        `;
      cuerpoTabla.appendChild(filaTabla);
    }
  });
  tablaCitas.appendChild(cuerpoTabla);
  const titTabla = document.createElement('h3');
  titTabla.innerText = "Tabla de citas: "
  citasArea.appendChild(titTabla);
  citasArea.appendChild(tablaCitas);
  console.log(jsonSeguimiento);

  const medicinasUnicas = new Set();
  jsonSeguimiento.forEach(el => {
    if (!medicinasUnicas.has(el.NombreMedicina)) {
      medicinasUnicas.add(el.NombreMedicina);

      const tarjetaMedicina = document.createElement('div');
      tarjetaMedicina.className = 'tarjeta-medicina';

      const nombreMedicina = document.createElement('h5');
      nombreMedicina.innerText = `Nombre: ${el.NombreMedicina}`;

      const descripcionMedicina = document.createElement('p');
      descripcionMedicina.innerText = `Descripción: ${el.Indicaciones}`;

      tarjetaMedicina.appendChild(nombreMedicina);
      tarjetaMedicina.appendChild(descripcionMedicina);

      medicinasArea.appendChild(tarjetaMedicina);
    }
  });






}
//-------------------------------DOM---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  loadMessages();
  searchBar();
  serviciosExtraLoad();
  seguimientoLoad();

});




