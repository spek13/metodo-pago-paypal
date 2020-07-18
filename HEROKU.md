# Pagos Online con PayPal y AdonisJS

Resultado del tutorial: [#005 - Pagos Online con PayPal y AdonisJS](http://www.victorvr.com/tutorial/pagos-online-con-paypal-y-adonisjs)

Demo: [https://adonisjs-paypall.herokuapp.com](https://adonisjs-paypal.herokuapp.com)

![App](http://www.victorvr.com/img/posts/Post-05.png)

# Instalación de la aplicación en Heroku

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

## Instalación de Heroku CLI

1.- Primero necesitamos instalar `Heroku CLI`.

```bash
npm install -g heroku
```

2.- Verificamos la instalación `heroku >= 7.0` o mayor.

```bash
heroku --version
```

## Instalación de la aplicación en Heroku

1.- Ingresar al directorio de la aplicación `adonisjs-paypal`.

```bash
cd adonisjs-paypal
```

2.- Iniciar sesión en Heroku con los datos de nuestra cuenta.

```bash
heroku login -i
```

3.- Crea la aplicación `adonisjs-paypal` en Heroku.

```bash
heroku create adonisjs-paypall
```

4.- Agregar el repositorio remoto de Heroku a nuestro repositorio local.

```bash
heroku git:remote -a adonisjs-paypall
```

5.- Agregar las siguientes variables de configuración.

```bash
heroku config:set HOST=::
heroku config:set APP_URL=https://adonisjs-paypall.herokuapp.com
heroku config:set PAYPAL_MODE=sandbox
heroku config:set PAYPAL_CLIENT_ID=AUEMSueuQOqo6U1TDaMhgWrvZE6nQLTI39jFEtZpXOM-jepDXtQafa7ieyXAkkKXZXlYWylDoWDyL-E4
heroku config:set PAYPAL_CLIENT_SECRET=EJDIpWdzS5jj3BMyhLE4d1lBfSZH2DAMAonCq9SIWdQqzHpqaaSYe8WdPyBICQHuZZDD5Uidqce0N17G
```

6.- Visualizar las variables de configuración.
```bash
heroku config
```

7.- Implementar nuestra aplicación en Heroku.

```bash
git push heroku master
```

8.- Abrir la aplicación en el navegador.
```bash
heroku open
```