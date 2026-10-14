# 🌸 Gacha Mod

Un juego **tipo Gacha Club / Gacha Life** hecho desde cero: crea personajes chibi, vístelos, tira del gacha para desbloquear ropa y personajes, monta escenas con diálogos y saca fotos. Funciona en el navegador **y como app Android (APK)**.

## 🎮 Jugar ahora (sin instalar nada)
Abre `index.html` en un servidor web (o el enlace de vista previa del repo) y a jugar:

| Pestaña | Qué puedes hacer |
|---|---|
| 🏠 **Personajes** | Tus 10 espacios de personaje (como las units de Gacha Club). Toca para editar o crear. |
| 🎨 **Crear** | Vestidor completo: peinados, colores, piel, ojos (estrella/corazón/guiño…), bocas, ropa, accesorios, alas, colas, poses, fondos. Nombre, aleatorio, **exportar/importar por código** (como en Gacha Club) y descargar el personaje en PNG. |
| 🎰 **Gacha** | Tiradas ×1 (💎200) y ×10 (💎2000): personajes precargados nuevos para tus espacios y **desbloqueables especiales** 🔒 (corona, cuernos, alas, traje de gala, ídolo, trenza…). Repetidos = +100 💎. 🎁 Diario = +300 💎. |
| 🎬 **Escena** | Modo estudio: 8 fondos (parque, playa, escuela, cafetería, escenario, espacio, nieve, atardecer), hasta 4 personajes, globos de diálogo y 📸 foto en PNG. |

💾 La partida se guarda sola en el dispositivo (`localStorage`). Sin cuentas, sin internet, sin anuncios.

## 📱 Descargar el APK (Android)

### Opción A — APK automático desde GitHub (recomendada)
Este repo incluye un robot (`.github/workflows/build-apk.yml`) que compila el APK solo:

1. Sube este código a GitHub (`git push`) o pulsa **«Run workflow»** en la pestaña **Actions → 📱 Compilar APK**.
2. Cuando termine (~3 min), entra en la ejecución y descarga el artefacto **`Gacha-Mod-APK`** → dentro está `app-debug.apk`.
3. Pasa el APK a tu móvil, ábrelo y pulsa **Instalar** (Android pedirá permitir «apps desconocidas» para tu navegador/archivos; es normal en APKs fuera de Play Store).

**Versión con enlace permanente:** crea un tag y se publica sola una Release con el APK:
```bash
git tag v1.0 && git push origin v1.0
```
El APK quedará en **Releases** del repo, listo para compartir el enlace.

### Opción B — Compilar tú mismo con Android Studio
1. Abre la carpeta [`android/`](android/) con Android Studio.
2. Espera a que Gradle sincronice y pulsa ▶ **Run** (o *Build → Build APK(s)*).
3. El APK sale en `android/app/build/outputs/apk/debug/app-debug.apk`.

El proyecto Android es un WebView fino: al compilar copia automáticamente la web de la raíz (`index.html`, `css/`, `js/`) dentro del APK, así **el APK siempre lleva la última versión del juego**. Las fotos se guardan en *Descargas* y la partida persiste offline.

> ⚠️ Es un APK *debug* (firmado con la clave de depuración): perfecto para jugar y compartir con amigos. Para subirlo a Google Play habría que generar una clave de firma release.

### Opción C — Instalar la web como app (PWA, Android e iPhone)
Abre el juego en Chrome/Safari → menú **⋮ → «Instalar app» / «Añadir a pantalla de inicio»**. Se instala con su icono 🌸 y funciona sin conexión, sin pasar por el APK.

## 🛠️ Estructura
```
index.html · css/ · js/     ← el juego (web / vista previa)
├─ js/avatar.js             ← motor de avatares chibi SVG + catálogos
├─ js/app.js                ← lógica: slots, editor, gacha, escenas, guardado
├─ manifest.webmanifest, sw.js, icon.svg  ← PWA instalable y offline
android/                    ← proyecto Android (WebView) que empaqueta la web
.github/workflows/build-apk.yml ← compila y publica el APK automáticamente
```

## ✨ Ideas para seguir creciendo
Añadir personajes/ropa editando los catálogos de `js/avatar.js`, más fondos en `SCENES`, minijuegos para ganar gemas, o batalla por turnos con tus personajes.
