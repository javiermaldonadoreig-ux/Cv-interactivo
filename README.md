# CV interactivo — Javier Maldonado Reig

CV en formato hipertexto al estilo Twine: cada pasaje termina en una decisión, hay mapa de la historia, rastro de navegación y versión ES/EN. HTML, CSS y JS sin dependencias ni build.

## Estructura

```
index.html      estructura de la página
styles.css      estilo (vidrio esmerilado, tonos tierra)
story.js        TODO el contenido del CV — edita aquí
app.js          motor de navegación
assets/
  foto.jpg      ← tu foto (añádela tú)
  Javier_Maldonado_Reig_CV.pdf
vercel.json
```

## 1. Añade tu foto

Guarda tu foto como `assets/foto.jpg` (vertical, ~800×1000 px, < 300 KB).
Si no está, se muestran las iniciales "JM".

## 2. Súbelo a GitHub

```bash
cd cv-interactivo
git init
git add .
git commit -m "CV interactivo"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/cv-interactivo.git
git push -u origin main
```

## 3. Publícalo en Vercel

1. vercel.com → **Add New… → Project** → importa el repositorio.
2. Framework Preset: **Other**. Sin build command. Output directory: raíz (`./`).
3. **Deploy**. Cada `git push` a `main` vuelve a publicar.

## Editar contenido

En `story.js`:
- `[[texto->id]]` crea un enlace dentro del párrafo.
- `**texto**` = negrita.
- `choices` son las opciones al pie del pasaje.
- Para añadir un pasaje: créalo en `en` y en `es` con el mismo id y dale posición en `MAP_POS`.

## Probar en local

```bash
python3 -m http.server 8000
# abre http://localhost:8000
```

Atajos: teclas 1–9 eligen opción, M abre el mapa. Cada pasaje tiene URL propia (`/#/tressis`), así que puedes enlazar directamente a una sección.
