# Pagos Online con PayPal y AdonisJS

Resultado del tutorial: [#005 - Pagos Online con PayPal y AdonisJS]

Demo: [https://adonisjs-paypall.herokuapp.com](https://adonisjs-paypall.herokuapp.com)

![App](/public/app.gif)

## Requerimientos

Esta aplicación asume que tienes lo siguiente instalado en tu computadora:

`node >= 8.0` o mayor.

```bash
node --version
```

`npm >= 5.0` o mayor.

```bash
npm --version
```

Credenciales de la [API de PayPal](https://developer.paypal.com/) `CLIENT_ID` y `CLIENT_SECRET`.

## Instalación de Adonis CLI

Primero necesitamos instalar `Adonis CLI`:

```bash
npm i -g adonisjs-cli
```

## Instalación de Dependencias via NPM

Ahora instalaremos las dependencias de nuestra aplicación:

```bash
npm install
```

## Configurar variables de entorno

Configuramos las siguientes variables de entorno en el archivo `.env`:

```bash
PAYPAL_MODE=sandbox
PAYPAL_CLIENT_ID={YOUR_CLIENT_ID}
PAYPAL_CLIENT_SECRET={YOUR_CLIENT_SECRET}
```

## Iniciar el servidor
Ejecutamos la aplicación:

```bash
adonis serve --dev
```

## Abrir la aplicación
Y por último, abrimos [http://localhost:3333](http://localhost:3333) en el navegador.