# YOYO Landing Page - Pre-registro

## Cambios Realizados

### 1. React Router Instalado
- Se instaló `react-router-dom` para manejar las rutas de la aplicación

### 2. Nueva Ruta: /pregister
- Se creó una nueva ruta accesible en: `http://localhost:3000/pregister`
- Mantiene el mismo fondo de video y diseño que la página principal

### 3. Componentes Creados

#### Home.js
- Componente que contiene el contenido original de la landing page
- Ruta: `/`

#### PreRegister.js
- Formulario de pre-registro con dos campos:
  - **Nombre completo**
  - **Correo electrónico**
- Validación de campos:
  - Verifica que ambos campos estén completos
  - Valida formato de email
- **Debounce implementado**: Previene spam deshabilitando el botón de envío durante 3 segundos después de un envío exitoso, y 2 segundos después de un error
- Endpoint configurado: `http://64.227.105.243/api/v1/pre-registration`

### 4. Características del Formulario

#### Sistema de Mensajes
- Mensajes de éxito en verde
- Mensajes de error en rojo
- Feedback visual inmediato

#### Estados del Botón
- **Normal**: "Registrarse"
- **Enviando**: "Enviando..." (deshabilitado)
- **Después del envío**: Deshabilitado temporalmente para prevenir spam

#### Diseño
- Inputs con fondo semi-transparente
- Bordes que cambian a rojo (#E05361) al hacer focus
- Botón con efecto hover y animación
- Responsive para móviles

### 5. Estructura de Archivos

```
src/
  ├── App.js (actualizado con React Router)
  ├── App.css
  ├── components/
  │   ├── Home.js (página principal)
  │   ├── PreRegister.js (formulario de pre-registro)
  │   └── PreRegister.css (estilos del formulario)
  └── assets/ (sin cambios)
```

### 6. Rutas Disponibles

- `/` - Página principal (You've Seen The Rabbit)
- `/pregister` - Formulario de pre-registro

## Cómo Usar

1. Navega a `http://localhost:3000/` para ver la página principal
2. Navega a `http://localhost:3000/pregister` para acceder al formulario
3. Completa los campos de nombre y correo
4. Haz clic en "Registrarse"
5. El sistema enviará los datos al endpoint configurado

## Prevención de Spam (Debounce)

El sistema implementa las siguientes medidas:
- El botón se deshabilita inmediatamente al hacer clic
- Después de un envío exitoso: espera 3 segundos antes de permitir otro envío
- Después de un error: espera 2 segundos antes de permitir otro envío
- Validación de campos antes de permitir el envío
- Visual feedback con el texto "Enviando..."

## Formato de Datos Enviados

```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```
