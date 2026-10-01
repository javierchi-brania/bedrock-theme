# bedrock-theme

Neumorphic theme "BRANIA BEDROCK". The platform loads `dist/bedrock-theme.css`
from jsDelivr via an `@import` in its custom CSS field (see `embed/editor.css`).

## Layout

```
src/NNN-<section>.css   source, split from the legacy CSS keeping the ORIGINAL rule order
dist/bedrock-theme.css  concatenation of src/*.css in prefix order (what the platform loads)
embed/editor.css        exact content for the custom CSS field (@import + inline tokens)
backup/                 v1.0.0 split map (raw backups stay local, not in the repo)
build.sh                regenerates dist/
```

### Why the 3-digit prefixes (v1.0.0)

The legacy CSS is a stack of patches (v6.1 … v6.44) where later rules win.
Reordering changes the result, so v1.0.0 keeps every segment in its original
position; a view appears in several files (e.g. Conversaciones in 030, 100,
320, 340, 380, 470). `dist/` has exactly the same 1188 top-level rules as the legacy CSS (only
comments changed; checked with postcss).

The target sections for the Step 4 refactor are in the "Target" column. Each
refactor release merges one target's segments into a single file.

| Segment | Target |
|---|---|
| 000-tokens | 00-tokens |
| 010-busqueda-global, 050-shell, 110-componentes-base, 180-animacion, 210-espaciado-marco-v6.4, 230-botones-primarios-v6.6, 240-tablas-highrise-v6.7, 250-modales-menus-v6.8, 260-pestanas-verticales-v6.9-v6.10, 270-radios-mi-perfil-v6.11-v6.12, 390-tooltips-v6.27, 430-capa-global-v6.32, 520-tablas-highrise-v6.43 | 10-base |
| 060-sidebar, 160-selector-subcuentas, 190-sidebar-colapsado-v6.2, 290-sidebar-subcuenta-v6.14, 410-sidebar-angosto-v6.29 | 20-sidebar |
| 070-header, 310-header-nombre-vista-v6.16, 330-header-pestanas-v6.18, 500-header-v6.41 | 30-header |
| 440-launchpad-v6.33 | 40-launchpad |
| 020-tablero, 460-tablero-v6.35 | 41-tablero |
| 030-conversaciones-v2, 100-conversaciones-highrise, 320-conversaciones-v6.17, 340-conversaciones-v6.19-v6.22, 380-conversaciones-v6.26, 470-conversaciones-v6.36-v6.37 | 42-conversaciones |
| 040-calendarios-v2, 130-calendarios, 400-calendarios-v6.28, 490-calendarios-v6.40 | 43-calendarios |
| 080-contactos, 510-contactos-v6.42 | 44-contactos |
| 090-oportunidades, 140-oportunidades-kanban | 45-oportunidades |
| 350-pagos-v6.23, 360-pagos-v6.24, 370-pagos-v6.25 | 46-pagos |
| 200-menu-configuracion-v6.3, 280-configuracion-contenedores-v6.13, 450-configuracion-sidebar-v6.34, 480-configuracion-calendarios-v6.38-v6.39, 530-configuracion-objetos-v6.44 | 47-configuracion |
| 150-marketing, 170-email-marketing | 48-marketing |
| 220-ask-ai-v6.5, 300-ask-ai-peligro-v6.15, 420-ask-ai-cuenta-v6.30-v6.31 | 49-ask-ai |
| 120-configuracion-agencia | 90-agencia |

## Publishing a change

1. Edit the file in `src/`, run `./build.sh`.
2. Preview without publishing: inject the new CSS in a temporary `<style>` in the
   sub-account tab, or use the commit-hash URL
   `https://cdn.jsdelivr.net/gh/javierchi-brania/bedrock-theme@<commitSHA>/dist/bedrock-theme.css`.
3. Commit + new Release (semver: patch = tweaks, minor = new views).
4. In the custom CSS field change only the version in the `@import`; save.
5. Revert = put the previous version back.

Never use `@main` in production: jsDelivr caches branches for up to 12 h; tags
are immediate and permanent.
