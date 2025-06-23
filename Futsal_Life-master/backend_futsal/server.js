const express = require('express');
const cors = require('cors'); 
const dotenv = require('dotenv');
const path = require('path');

const authRoutes = require('./routes/auth.routes');
const rutaProtegida = require('./routes/protegida.routes');
const perfilRoutes = require('./routes/perfil.routes');
const equipoRoutes = require('./routes/equipo.routes');
const jugadorRoutes = require('./routes/jugador.routes');
const asistenciaRoutes = require('./routes/asistencia.routes');
const usuarioRoutes = require('./routes/usuario.routes');

// Cargar variables de entorno
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Middleware para interpretar JSON

// --- Rutas API ---
app.use('/api/auth', authRoutes);         // Autenticación
app.use('/api/protegida', rutaProtegida); // Rutas protegidas
app.use('/api/perfil', perfilRoutes);     // Perfil de usuario
app.use('/api/equipos', equipoRoutes);    // Equipos
app.use('/api/jugadores', jugadorRoutes); // Jugadores
app.use('/api/asistencia', asistenciaRoutes);
app.use('/api/usuarios', usuarioRoutes);


// ✅ Ruta para servir el HTML de recuperación
app.get('/reset-password/:token', (req, res) => {
  const filePath = path.join(__dirname, '..', 'frontend_Futsal', 'views', 'reset-password.html');
  res.sendFile(filePath);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});