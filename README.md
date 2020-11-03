<h1 align="center">
  <br>
  <a href="https://github.com/openbio-dev/openbio-components">Openbio Components</a>
  <br>
</h1>

<h4 align="center">Componentes do pacote openbio-view-components</h4>

## Instalação
Siga os passos a baixo para instalação da biblioteca em seu projeto.

### Via CDN

1. Em seu arquivo `index.html` adicione as seguintes entradas:
```html
<html>
  <head>
    <!-- HEAD Content -->
    <!-- Substitua VERSION com o valor desejado. Por exemplo 1.0 ou 1.x -->
    <link href="https://cdn.jsdelivr.net/gh/openbio-dev/openbio-components@<VERSION>/dist/openbio-components.css" rel="stylesheet" />
  </head>
  <body>
    <!-- BODY Content -->
    <!-- Substitua VERSION com o valor desejado. Por exemplo 1.0 ou 1.x -->
    <script src="https://cdn.jsdelivr.net/gh/openbio-dev/openbio-components@<VERSION>/dist/loader/index.js"></script>
  </body>
</html>
```

2. Em seu arquivo `main.js` importe a função `defineCustomElements` como no exemplo:

```js
import { defineCustomElements } from 'openbio-components/dist/loader';

defineCustomElements(window);
```

### Via NPM

```bash
npm install openbio-components
# or yarn add openbio-components
```

Em seu arquivo `main.js` importe a função `defineCustomElements` como no exemplo:

```js
import { defineCustomElements } from 'openbio-components/dist/loader';

defineCustomElements(window);
```