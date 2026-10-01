# Legacy changelog (v3 – v6)

Header of the original single-file CSS, kept for history. Later patches
(v6.1 – v6.44) are documented in the comments of each `src/` file.

```text
BRANIA BEDROCK → CSS personalizado de la plataforma
Target: Agency Settings → Company → White Label → Custom CSS
        (aplica a TODAS las sub-cuentas de la agencia Brania)
Reference design: brania-bedrock.html (neumorphic soft UI)

DOM sources mapped:
  - dashboard-dom.html     → Dashboard (#location-dashboard)
  - contacts-dom.html      → Contacts (#crm-contacts-view)
  - opportunities-dom.html → Opportunities (.crm-opportunities-page)

v6 — cambios sobre la versión anterior:
  Se agrega la sección CONVERSATIONS (nivel de sub-cuenta), confirmada con
  el HTML real de #conversations-new-app: fondo del módulo, riel de iconos
  (My Inbox/Team Inbox/Internal Chat), columna de lista con pestañas
  Unread/All/Recent/Starred, estados vacíos (central y panel de contacto),
  y el riel vertical de iconos del panel derecho (Contact, Activities,
  Opportunities, Payments, etc.). El foco a partir de aquí es sub-cuenta,
  no agencia.
v5 — cambios sobre la versión anterior:
  FIX 5: se saca .hl_wrapper del fondo forzado (confirmado inspeccionando
         que <main class="hl_wrapper"> es el padre real detrás de la caja
         gris que sobraba debajo/alrededor del header flotante). Se quita
         también el intento provisional anterior (nombres adivinados de
         un supuesto wrapper de header) porque ya no aplica.
v4 — cambios sobre la versión anterior:
  FIX 1 (corregido): el HTML de "Go Back" confirmó <i class="fas fa-arrow-left">
         todavía roto con `revert` — revert salta hasta el default del
         navegador, no hasta la fuente de Font Awesome que la plataforma ya declaró.
         Ahora se fija el font-family real de Font Awesome por nombre.
v3 — cambios sobre la versión anterior:
  FIX 1: seguro para iconos ampliado a TODO elemento <i> (no solo clases
         fa-/fas/material-icons que adivinamos antes) — eso es lo que
         faltaba para arreglar los iconos de megáfono/campana del header.
  FIX 2: padding-top generalizado a nivel de .hl_wrapper para que todas las
         vistas (no solo Dashboard/Opportunities) compensen el header más alto.
  FIX 3: se agrega .hl_nav-header-without-footer a las reglas de nav items —
         es el contenedor real del submenú de Settings (Company, Team,
         Billing...), confirmado inspeccionando el DOM. Antes ese menú se
         quedaba con el estilo default de la plataforma.
  FIX 4: el color de texto ya no se fuerza vía .font-sans/body de forma
         amplia — esa clase de Tailwind es tan común que también pintaba de
         gris oscuro el texto de banners con fondo oscuro (ej. la barra de
         arriba en Setup Guide), dejándolo invisible. Ahora el color de
         marca solo se aplica donde controlamos el fondo.
/
```
