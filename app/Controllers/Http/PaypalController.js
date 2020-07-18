//app/Controllers/Http/PaypalController.js
'use strict'

const Config = use('Config')
const Paypal = use('paypal-rest-sdk')
// Configuramos el SDK de PayPal con nuestra configuración
Paypal.configure(Config.get('paypal.configure'));

class PaypalController {

  // Returna la URL para procesar un pago exitoso
  getSuccessURL () {
    return Config.get('paypal.url_success')
  }

  // Returna la URL para procesar un pago fallido u otros errores
  getErrorURL () {
    return Config.get('paypal.url_error')
  }

  // Función "Promise" para crear pagos en la API de PayPal.
  createPay ( payment ) {
    return new Promise( ( resolve, reject ) => {
      Paypal.payment.create( payment, function( err, payment ) {
        if ( err ) {
          reject(err);
        }
        else {
          resolve(payment);
        }
      });
    });
  }

  // Función "Promise" para obtener un pago en la API de PayPal.
  getPay ( paymentId ) {
    return new Promise( ( resolve, reject ) => {
      Paypal.payment.get( paymentId, function( err, payment ) {
        if ( err ) {
          reject(err);
        }
        else {
          resolve(payment);
        }
      });
    });
  }

}

module.exports = PaypalController