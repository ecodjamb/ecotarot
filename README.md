# EcoTarot

EcoTarot combina numerología, astrología solar y tarot en una sola experiencia diaria, semanal y mensual.

## Estado v1

- Registro e inicio de sesión simple por correo y clave, con hash SHA-256 y sesión persistente en el dispositivo.
- Perfil de nacimiento: nombre, fecha, hora y ciudad.
- Numerología determinista: camino de vida, número de nacimiento, año, mes y día personal.
- Signo solar calculado desde la fecha de nacimiento.
- Tarot mayor de 22 cartas con orientación derecha/invertida.
- Carta diaria estable por usuario y fecha.
- Tiradas de 1 y 3 cartas con historial persistente.
- Pronóstico de hoy, semana actual, próxima semana, mes actual y próximo mes.
- PWA instalable con manifest e icono EcoTarot.
- Diseño responsive para iPhone y escritorio.

## Importante

La versión v1 no inventa ascendente, casas ni posiciones planetarias. La hora de nacimiento queda almacenada para integrar posteriormente un motor astronómico completo. Las lecturas son simbólicas y reflexivas, no predicciones científicamente validadas ni consejo médico, financiero o legal.

## Desarrollo

```bash
npm install
npm run dev
```

## Producción

```bash
npm run build
npm start
```

## Versionado

- `main`: producción estable.
- `develop`: siguiente versión integrada.
- `version/v2`: desarrollo de la carta astral completa, backend multi-dispositivo y mejoras mayores.

El proyecto está preparado para Vercel con Next.js App Router.
