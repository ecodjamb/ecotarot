# Estrategia de versiones EcoTarot

## Producción
`main` contiene la versión estable publicada.

## Desarrollo continuo
`develop` recibe mejoras ya integradas antes de pasar a producción.

## Versiones mayores
- `version/v2`: próxima gran evolución.
- Futuras: `version/v3`, `version/v4`, etc.

## Funciones aisladas
Usar ramas `feature/nombre-funcion` y luego integrarlas a `develop`.

Cada rama distinta de `main` debe utilizar Vercel Preview Deployments para probar cambios sin afectar producción.
