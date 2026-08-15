# EcoTarot

Aplicación web que integra numerología, astrología y tarot en una sola experiencia personal.

## Flujo de versiones

- `main`: versión estable / producción.
- `develop`: siguiente versión en pruebas.
- `feature/*`: mejoras específicas.
- `version/v2`, `version/v3`, etc.: iteraciones mayores.

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Vercel

Conectar este repositorio a un proyecto Vercel llamado `ecotarot`. Usar `main` como Production Branch. Las ramas `develop`, `feature/*` y `version/*` deben generar Preview Deployments.

## Estado actual

MVP frontend funcional con login local, onboarding, perfil, numerología básica, tarot diario persistente por fecha, predicción diaria, semana, mes, consultas de tarot e historial local. Próximas etapas: autenticación y base de datos reales, cálculo astronómico real, OpenAI para interpretación integrada y perfiles múltiples.
