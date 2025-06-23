document.addEventListener('DOMContentLoaded', () => {
    obtenerPerfil();

    const form = document.getElementById('edit-profile-form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      await actualizarPerfil();
    });

    document.getElementById('edit-profile-button').addEventListener('click', () => {
      document.getElementById('profile-container').style.display = 'none';
      document.getElementById('edit-profile-container').style.display = 'block';
    });
  });

  async function obtenerPerfil() {
    try {
      const token = localStorage.getItem('token'); // ⚠️ Asegúrate que el token esté almacenado
      const res = await fetch('http://localhost:3000/api/perfil', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.mensaje || 'No se pudo obtener el perfil');
        return;
      }

      // Mostrar datos
      document.getElementById('profile-name').textContent = data.Nombre;
      document.getElementById('profile-email').textContent = data.correo;
      document.getElementById('profile-phone').textContent = data.Telefono || '';
      document.getElementById('profile-address').textContent = data.Direccion || '';

      // Llenar el formulario de edición
      document.getElementById('name').value = data.Nombre;
      document.getElementById('email').value = data.correo;
      document.getElementById('phone').value = data.Telefono || '';
      document.getElementById('address').value = data.Direccion || '';

    } catch (error) {
      console.error('Error al obtener perfil:', error);
      alert('Error al cargar los datos del perfil');
    }
  }

  async function actualizarPerfil() {
    const token = localStorage.getItem('token');
    const Nombre = document.getElementById('name').value;
    const Correo = document.getElementById('email').value;
    const Telefono = document.getElementById('phone').value;
    const Direccion = document.getElementById('address').value;

    try {
      const res = await fetch('http://localhost:3000/api/perfil', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ Nombre, Correo, Telefono, Direccion })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.mensaje || 'Error al actualizar el perfil');
        return;
      }

      alert(data.mensaje);
      // Volver al perfil después de editar
      document.getElementById('edit-profile-container').style.display = 'none';
      document.getElementById('profile-container').style.display = 'block';
      obtenerPerfil(); // Volver a cargar los datos
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      alert('Error al enviar la actualización');
    }
  }