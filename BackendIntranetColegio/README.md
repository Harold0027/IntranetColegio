BACKENDINTRANETCOLEGIO/
│── node_modules/
│── app/
│   ├── controllers/
│   │   └── session.controller.js
│   │   └── users.controller.js
│   │   └── docentes.controller.js
│   │   └── alumnos.controller.js
│   │   └── notas.controller.js
│   │   └── pagos.controller.js
│   ├── dao/
│   │   └── //base.dao.js
│   │   └── //user.sql.dao.js
│   │   └── //docente.sql.dao.js  
│   │   └── //alumno.sql.dao.js  
│   │   └── //nota.sql.dao.js  
│   │   └── //pago.sql.dao.js  
│   └── dtos/
│       └── //user.dto.js
│       └── //docente.dto.js
│       └── //alumno.dto.js
│       └── //nota.dto.js
│       └── //pago.dto.js
│   └── services/
│   │   └── user.service.js
│   │   └── docente.service.js
│   │   └── alumno.service.js
│   │   └── nota.service.js
│   │   └── pago.service.js
│   └── server/
│       └── server.js
│   └── routes/
│       ├── sessions.router.js (/login, /logout, /register, crud)
│       └── users.router.js (/users, /users/id, crud)
│       └── docentes.router.js
│       └── alumnos.router.js 
│       └── notas.router.js 
│       └── pagos.router.js 
│── config/
│   ├── auth/
│   │   └── passport.config.js
│   ├── db/
│   │   └── connection.js
│   └── models/
│       └── user.model.js
│       └── docente.model.js
│       └── alumno.model.js
│       └── nota.model.js
│       └── pago.model.js
│   └── env.config.js
│── middleware/
│   └── auth.middleware.js(para dar acceso al usuario segun su rol)
│   └── error.middleware.js(para devolver errores uniformemente)
│── tests/
│       └── testConnection.js
│── docs/
│   └── Postman.json
│── .env
│── .env.example
│── .gitignore
│── app.js
│── package.json