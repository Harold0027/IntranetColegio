FrontendIntranetColegio/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── UI/
│   │   │   ├── ButtonDelete.jsx
│   │   │   ├── ButtonEdit.jsx
│   │   │   └── ButtonRegister.jsx
│   │   └── forms/(vistas editar)
│   │       ├── LoginForm.jsx
│   │       ├── UserForm.jsx
│   │       ├── DocenteForm.jsx
│   │       ├── AlumnoForm.jsx
│   │       ├── NotaForm.jsx
│   │       └── PagoForm.jsx
│   ├── features/
│   │   ├── users/
│   │   │   ├── components/
│   │   │   │   ├── UserList.jsx
│   │   │   │   └── UserCard.jsx
│   │   │   ├── services/
│   │   │   │   └── user.api.js
│   │   │   └── pages/
│   │   │       └── UsersPage.jsx
│   │   ├── docentes/
│   │   │   ├── components/
│   │   │   │   └── DocenteList.jsx
│   │   │   │   └── DocenteListContainer.jsx
│   │   │   ├── services/
│   │   │   │   └── docente.api.js
│   │   │   └── pages/
│   │   │       └── DocentesPage.jsx
│   │   ├── alumnos/
│   │   │   ├── components/
│   │   │   │   └── AlumnoList.jsx
│   │   │   │   └── AlumnoListContainer.jsx
│   │   │   ├── services/
│   │   │   │   └── alumno.api.js
│   │   │   └── pages/
│   │   │       └── AlumnosPage.jsx
│   │   ├── notas/
│   │   │   ├── components/
│   │   │   │   └── NotaList.jsx
│   │   │   │   └── NotaListContainer.jsx
│   │   │   ├── services/
│   │   │   │   └── nota.api.js
│   │   │   └── pages/
│   │   │       └── NotasPage.jsx
│   │   ├── pagos/
│   │   │   ├── components/
│   │   │   │   └── PagoList.jsx
│   │   │   │   └── PagoListContainer.jsx
│   │   │   ├── services/
│   │   │   │   └── pago.api.js
│   │   │   └── pages/
│   │   │       └── PagosPage.jsx
│   │   └── reportes/
│   │       ├── components/
│   │       │   └── ReporteCard.jsx
│   │       │   └── ReporteCardContainer.jsx
│   │       └── pages/
│   │           └── ReportesPage.jsx
│   ├── layouts/
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Footer.jsx
│   │   └── DashboardLayout.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   └── Error404.jsx
│   ├── services/
│   │   ├── api.js           # Config axios (baseURL, interceptors)
│   │   └── auth.api.js      # login/logout
│   ├── contexts/
│   │   └── AuthContext.jsx # Manejo de sesión y roles
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useFetch.js
│   │   └── useForm.js
│   ├── router/
│   │   └── AppRouter.jsx
│   ├── App.jsx
│   └── main.jsx 
├── index.html
├── .env
├── .gitignore
├── jsconfig.json
├── package.json
├── vite.config.js
└── README.md
