# Zapping Player | Front-end Test

Este es un desafío técnico de Zapping para el cargo de desarrollador Front-end.

Puedes ver la [aplicación en vivo](https://zapping-player-test.vercel.app/) en la url de Vercel.

## Acerca del proyecto

Este proyecto es un reproductor de video, inspirado en la aplicación de Zapping.
Está desarrollado con las siguientes tecnologías:

### Caracteristicas principales

- Reproductor de video.
- Control de volumen mediante interfaz visual.
- Soporte multilenguaje (español/portugués).
- Cambio de canales mediante el teclado.
- Controles de reproducción (play/pause).
- Visualización de información del contenido actual.

### Tecnologías utilizadas

- [Vue 3 (Composition API)](https://vuejs.org/): Framework de JavaScript para construir interfaces reactivas usando una API más flexible y organizada.
- [Vite](https://vite.dev/): Empaquetador rápido para desarrollo y build de proyectos modernos.
- [Vitest](https://vitest.dev/): Framework de pruebas unitarias rápido y compatible con Vite.
- [Pinia](https://pinia.vuejs.org): Intuitivo manejador de estados en aplicaciones Vue.
- [TypeScript](https://www.typescriptlang.org/): Superset de JavaScript que añade tipado estático para mayor seguridad y escalabilidad.
- [SASS](https://sass-lang.com/): Preprocesador CSS que permite usar variables, funciones, anidamiento y otras utilidades para escribir estilos más mantenibles.
- [TailwindCSS](https://tailwindcss.com): Una librería de utilidades para CSS, incluye helpers y componentes reutilizables.
- [Style Dictionary](https://styledictionary.com/): Herramienta para gestionar y exportar tokens de diseño en distintos formatos.
- [Vue Router](https://router.vuejs.org/): Sistema de rutas oficial para Vue, permite navegación entre vistas o páginas.
- [Prettier](https://prettier.io/): Formateador de código automático que asegura un estilo consistente.

### Comandos disponibles

- `build-only`: Compila el proyecto usando únicamente Vite (sin validación de tipos ni generación de tokens).
- `build:tokens`: Genera los tokens de diseño usando **Style Dictionary** y el archivo `tokens.config.json`.
- `build`: Ejecuta la validación de tipos y compila el proyecto con Vite.
- `cleanup`: Elimina `node_modules` y `package-lock.json`, luego reinstala todas las dependencias desde cero.
- `dev`: Inicia el servidor de desarrollo con Vite.
- `format`: Da formato a todos los archivos dentro de `src/` usando Prettier.
- `lint`: Ejecuta ESLint en todo el proyecto y corrige los errores automáticamente cuando es posible.
- `preview`: Habilita localmente la versión de producción usando `vite preview`.
- `test:unit`: Ejecuta pruebas unitarias con Vitest.
- `type-check`: Realiza validación estática de tipos usando `vue-tsc`.

### Estructura del Proyecto

El proyecto está basado en la metodología Atomic Design para modularizar los componentes

> Atomic Design es una metodología para la creación de interfaces de usuario (UI), inspirada en conceptos de la química. Busca organizar los componentes de una forma modular y escalable.

```bash
src
  ├── assets        <-- Archivos complementarios (imágenes, estilos, tokens).
  ├── component     <-- Carpeta de componentes (Atomic Design).
  ├── composables   <-- Funciones reutilizables de Vue.
  ├── i18n          <-- Archivos de internacionalización.
  ├── interfaces    <-- Definiciones de tipos en TypeScript.
  ├── lib           <-- Constantes, helpers y utilidades.
  ├── router        <-- Sistema de rutas de la app.
  ├── stores        <-- Stores de la aplicación.
  └── tokens        <-- Definición de tokens en formato JSON.
```

## Notas de desarrollo

Algunos desafíos y decisiones tomadas durante el desarrollo de este proyecto:

### Accesibilidad

La accesibilidad se ha vuelto un aspecto clave tanto en la web como en mis procesos de desarrollo. Estoy en constante aprendizaje sobre cómo mejorarla, y en esta oportunidad implementé algunas etiquetas ARIA (adaptadas al idioma seleccionado) para mejorar la usabilidad. Aún queda mucho por mejorar, pero es un paso en la dirección correcta.

### Reproducción de video

Aunque el reproductor es totalmente funcional, tuve algunos problemas relacionados con la reproducción automática, ya que ciertos navegadores la bloquean (especialmente el sonido) dependiendo de la configuración del usuario. Actualmente, la mayoría de los videos demo agregados no contienen audio. Si encuentras algún inconveniente, no dudes en avisarme.

### TailwindCSS

Implementé Tailwind principalmente para evitar la creación manual de clases utilitarias (helpers, widths, colors, text, etc.). Una de sus ventajas es que genera las clases bajo demanda, por lo que solo incluye en el bundle aquellas que realmente se utilizan. Además, permite extender su configuración base, lo cual, combinado con los tokens generados, facilita una personalización eficiente sin esfuerzo adicional.

### Test unitarios

Me habría gustado implementar más pruebas unitarias. Actualmente, solo dejé algunas listas, pero lo ideal sería cubrir todos los componentes.

### Atomic Design

Llevo bastante tiempo aplicando Atomic Design en sistemas de diseño, y considero que es una forma muy modular y escalable de construir interfaces. Es cierto que, para quienes no están familiarizados con la metodología, la estructura de componentes puede resultar confusa al principio.

### Page transition

Una de las decisiones más complejas fue cómo manejar la transición del reproductor al detalle del contenido. No quedé del todo satisfecho con el resultado final; me habría gustado implementar algo similar a las [Transition Directives](https://docs.astro.build/en/guides/view-transitions/#transition-directives) de Astro, pero opté por no complejizar más el desarrollo.

### Uso de composable en vez de librería i18n

Como desafío adicional, decidí implementar un composable personalizado para manejar la traducción de textos según el idioma. Si bien esto podría haberse resuelto fácilmente con una librería como [Vue I18n](https://vue-i18n.intlify.dev/), preferí simplificar el desarrollo con una solución reutilizable hecha a medida.
