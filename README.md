# Hinata Garaje — versión independiente

Código local para GitHub, Vercel y un **nuevo proyecto Firebase**. Funciona sin ChatGPT. Proyecto Firebase configurado: `hinata-car`. Authentication y Firestore conectan; el acceso y el calendario se han probado en local. La publicación en Vercel está pendiente.

## Revisar en local

Requiere Node.js 22 o posterior.

```sh
npm install
cp .env.example .env.local
npm run dev
```

Abre http://localhost:5174. Sin configuración verás la pantalla de bienvenida con el aviso de conexión pendiente. Para probar reservas reales es necesario configurar Firebase.

```sh
npm test
npm run build
```

## Configurar Firebase en otra instalación

1. En https://console.firebase.google.com/ crea un proyecto nuevo, por ejemplo **Hinata Garaje**. Guarda su identificador; el nombre visible puede repetirse, el identificador debe ser único.
2. Registra una aplicación web. Copia sus cuatro valores públicos en las variables `NEXT_PUBLIC_FIREBASE_*` de `.env.local`.
3. En Authentication → Métodos de acceso habilita **Correo electrónico y contraseña**. Añade `localhost` a los dominios autorizados para pruebas y posteriormente el dominio de Vercel.
4. Crea Cloud Firestore en modo producción. Elige la región antes de crear la base de datos. Despliega las reglas incluidas en `firestore.rules`: el navegador no accede directamente a los datos; solo el servidor autenticado.
5. En Configuración del proyecto → Cuentas de servicio genera la credencial de administración. Copia `project_id`, `client_email` y `private_key` a las variables privadas del servidor. La clave se puede guardar entre comillas, con los saltos de línea representados por `\n`. No la subas a GitHub ni la compartas en el chat.
6. Pon tu correo en `FAMILY_ADMIN_EMAIL`, reinicia la app, crea tu cuenta y verifica el correo. Solo esa cuenta puede inicializar el garaje como administrador.
7. En Familia configura los otros tres nombres y correos. Cada familiar crea su cuenta y verifica su correo. Una cuenta no autorizada no puede leer ni modificar reservas.

`.env.local` está excluido de Git. Las variables públicas identifican el proyecto; las tres credenciales de administración y `FAMILY_ADMIN_EMAIL` se configuran exclusivamente en el servidor. En Vercel se añadirán desde la configuración del proyecto.

## Funciones y reglas

- Passat y Mazda, cuatro personas, horarios libres, máximo 10 horas, inicio hasta 168 horas por adelantado. Se permite cruzar medianoche y terminar fuera de las 168 horas.
- Una persona queda bloqueada aunque sea pasajera. Un coche no admite reservas solapadas. Reservas contiguas sí se permiten.
- Cada persona modifica o cancela lo que ha creado. El administrador puede aplicar excepciones con confirmación e historial.
- Cada escritura usa una transacción Firestore y actualiza un documento compartido para serializar conflictos entre coches y participantes. Las ediciones también verifican la versión de la reserva.
- Actualización cada 10 segundos mientras la app está abierta y al recuperar el foco.
- Diseño Hinata en negro y grises, logo conduciendo. Instalación como app web desde el navegador en Android/iPhone.
- Recordatorio descargable de calendario 30 minutos antes. Hay avisos de cambios mientras la app está abierta. **No hay notificaciones automáticas con la app cerrada**. Si cambia una reserva, hay que actualizar el evento del calendario.
- Copia JSON manual. Exporta reservas y familia, y los 200 eventos recientes disponibles en la pantalla. El historial completo permanece en Firestore. No hay restauración automática ni copias programadas.

## Estructura y publicación posterior

- `app/garage.tsx`: interfaz y reservas.
- `app/auth-gate.tsx`: acceso Firebase, verificación y recuperación.
- `app/api/`: rutas privadas de reservas, familia, calendario y exportación.
- `lib/store.ts`: autorización y transacciones del servidor.
- `lib/rules.ts`: reglas de reservas.
- `tests/`: pruebas de las reglas.

Repositorio: https://github.com/marferse/Hinata_car. El siguiente paso será conectar este repositorio a Vercel, configurar las variables y el dominio, y probar con los cuatro móviles. La comprobación de reservas simultáneas con dos cuentas está pendiente.

Las pruebas locales de reglas no sustituyen la comprobación del acceso y de transacciones contra Firebase real, con varias cuentas antes de dar la publicación por terminada. Referencias de implementación: [transacciones Firestore](https://firebase.google.com/docs/firestore/manage-data/transactions), [conflictos concurrentes](https://firebase.google.com/docs/firestore/transaction-data-contention), [verificación de tokens](https://firebase.google.com/docs/auth/admin/verify-id-tokens).
