function changeColor() {
    if (document.body.classList.contains("blue")) {
      document.body.classList.remove("blue");
      document.body.classList.add("red");
    } else if (document.body.classList.contains("red")) {
      document.body.classList.remove("red");
      document.body.classList.add("green");
    } else if (document.body.classList.contains("green")) {
      document.body.classList.remove("green");
      document.body.classList.add("--color-crema-claro");
    } else if (document.body.classList.contains("--color-crema-claro")) {
        document.body.classList.remove("--color-crema-claro");
        document.body.classList.add("beige");
    } else {
        document.body.classList.remove("beige");
        document.body.classList.add("blue");
      }

  }
  


  function scrollAppear() {
    const images = document.querySelectorAll('.scroll');
    images.forEach((image) => {
      const imagePosition = image.getBoundingClientRect().top;
      const screenHeight = window.innerHeight;
      if (imagePosition < screenHeight) {
        image.classList.add('visible');
      }
    });
  }
  
  window.addEventListener('scroll', scrollAppear);

 
  //Redireccionamientos

  function redireccionIndex() {
    location.href = 'index.html';
  }

  function redireccionSesion() {
    location.href = 'login.html';
  }

  function redireccionRegister() {
    location.href = 'register.html';
  }

  function redireccionForgetPassword() {
    location.href = 'forgetPassword.html';
  }



// Registro

function submitForm(event) {
  // Prevenir el comportamiento predeterminado del formulario de enviar una solicitud HTTP
  event.preventDefault();

  // Obtener el formulario del DOM por su ID
  var form = document.getElementById('register');
  
  // Crear un objeto FormData que representa los datos del formulario
  var formData = new FormData(form);

  // Verificar si el correo electrónico ya está en uso
  var email = formData.get('email');
  if (isEmailAlreadyInUse(email)) {
      alert('El correo electrónico ya está en uso. Por favor, elija otro.');
      return;
  }

  // Verificar si el nombre de usuario ya está en uso
  var username = formData.get('username');
  if (isUsernameAlreadyInUse(username)) {
      alert('El nombre de usuario ya está en uso. Por favor, elija otro.');
      return;
  }


  // Realizar una solicitud fetch al endpoint '/user' con el método POST
  fetch('/user/register', {
      method: 'POST', // Método HTTP
      headers: {
          'Accept': 'application/json', // Indicar que aceptamos JSON como respuesta
          'Content-Type': 'application/json' // Indicar que el cuerpo de la solicitud es JSON
      },
      // Convertir los datos del formulario a un objeto JSON y enviarlo como cuerpo de la solicitud
      body: JSON.stringify({
          firstName: formData.get('firstName'), // Obtener el valor del campo 'firstName' del formulario
          lastName: formData.get('lastName'), // Obtener el valor del campo 'lastName' del formulario
          email: formData.get('email'), // Obtener el valor del campo 'email' del formulario
          username: formData.get('username'),
          password: formData.get('password')
          
      })
      
  })
  .then(response => response.json()) // Analizar la respuesta JSON del servidor
  .then(data => {
      // Manejar la respuesta del servidor
      console.log('Usuario registrado:', data); // Imprimir en la consola la respuesta del servidor
      alert('Usuario registrado correctamente.'); // Mostrar una alerta al usuario indicando que se registró correctamente
      // Aquí puedes agregar más código para redirigir al usuario a otra página si lo deseas
  })
  .catch(error => {
      // Manejar errores en caso de que la solicitud falle
      console.error('Error al registrar usuario:', error); // Imprimir en la consola el error
      alert('Error al registrar usuario. Por favor, intenta de nuevo.'); // Mostrar una alerta al usuario indicando que ocurrió un error
  });
}





function isEmailAlreadyInUse(email) {
  return fetch('/user/checkEmail', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email })
  })
  .then(response => response.json())
  .then(data => data.exists)
  .catch(error => {
      console.error('Error al verificar el correo electrónico:', error);
      return true; // Devolver true en caso de error
  });
}

function isUsernameAlreadyInUse(username) {
  return fetch('/user/checkUsername', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username })
  })
  .then(response => response.json()) 
  .then(data => data.exists)
  .catch(error => {
      console.error('Error al verificar el nombre de usuario:', error);
      return true; // Devolver true en caso de error
  });
}


function checkUsernameAvailability() {
  var username = document.getElementById('username').value;
  if (username.trim() === '') return; // Evitar la verificación si el campo está vacío

  fetch('/user/checkUsername', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username })
  })
  .then(response => response.json())
  .then(data => {
    var errorMessage = document.getElementById('username-error-message');
    if (data.exists) {
        // El nombre de usuario ya está en uso
        errorMessage.innerText = 'El nombre de usuario ya está en uso.';
        errorMessage.style.display = 'block';
        errorMessage.style.color = '#ff00008e';
        errorMessage.style.fontSize = '12px';
    } else {
        errorMessage.innerText = '';
        errorMessage.style.display = 'none';
    }
  })
  .catch(error => {
      console.error('Error al verificar el nombre de usuario:', error);
      // Manejar el error
  });
}

function checkEmailAvailability() {
  var email = document.getElementById('email').value;
  if (email.trim() === '') return; // Evitar la verificación si el campo está vacío

  fetch('/user/checkEmail', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email })
  })
  .then(response => response.json())
  .then(data => {
    var errorMessage = document.getElementById('email-error-message');
    if (data.exists) {
        // El correo electrónico ya está en uso
        errorMessage.innerText = 'El correo electrónico ya está en uso.';
        errorMessage.style.display = 'block';
        errorMessage.style.color = '#ff00008e';
        errorMessage.style.fontSize = '12px';
    } else {
        errorMessage.innerText = '';
        errorMessage.style.display = 'none';
    }
  })
  .catch(error => {
      console.error('Error al verificar el correo electrónico:', error);
      // Manejar el error
  });
}



// Login 
function login(event) {

  // Prevenir el comportamiento predeterminado del formulario de enviar una solicitud HTTP
  event.preventDefault();

  var username = document.getElementById('username-input').value;
  var password = document.getElementById('password-input').value;

  // Enviar la solicitud al backend para verificar las credenciales
  fetch('/user/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          username: username,
          password: password
      })
  })
  .then(response => {
      console.log('Estado de la respuesta:', response.status); // Imprimir estado de la respuesta
      
      if (response.ok) {
          // Si la respuesta es satisfactoria, redirige a la página de inicio
          window.location.href = '/index.html';
      } else if (response.status === 401) {
          // Si las credenciales son incorrectas
          alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      } else {
          // Si hay otro tipo de error
          alert('Ocurrió un error al iniciar sesión. Por favor, inténtalo más tarde.');
      }
  })
  .catch(error => {
      console.error('Error al iniciar sesión:', error);
      // Manejar el error
      alert('Ocurrió un error al iniciar sesión. Por favor, inténtalo más tarde.');
  });
}



