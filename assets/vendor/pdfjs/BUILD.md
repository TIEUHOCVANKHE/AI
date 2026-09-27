# PDF.js distribution

- Source: `pdfjs-dist` 6.3.289 from https://registry.npmjs.org/pdfjs-dist/-/pdfjs-dist-6.3.289.tgz
- License: Apache-2.0, copied to `../pdfjs.LICENSE`.
- `legacy/build/pdf.mjs` bundled with esbuild (`--bundle --format=iife --global-name=pdfjsLib --minify`) as `../pdfjs.min.js`.
- `legacy/build/pdf.worker.min.mjs` copied as `../pdfjs.worker.min.mjs` for HTTP(S) module workers.
- `legacy/build/pdf.worker.mjs` bundled with esbuild (`--bundle --format=iife --global-name=pdfjsWorker --minify`) as `../pdfjs.worker-fallback.min.js` for local-file rendering.
- `cmaps/`, `standard_fonts/` and `wasm/` copied from the package with their license files.

The esbuild import.meta warnings apply to Node-specific loading paths and optional worker internals. Browser rendering was checked with HTTP workers and the bundled file:// fallback. No build step or package manager is required to run the published site.
