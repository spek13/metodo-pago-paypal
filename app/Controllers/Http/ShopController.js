//app/Controllers/Http/ShopController.js
'use strict'

// Recuerde referenciar el controlador PaypalController en la parte de arriba
const PaypalController = use('App/Controllers/Http/PaypalController')
const Paypal = new PaypalController()

// Recuerde referenciar la librería Helpers en la parte de arriba
const Helpers = use('Helpers')

// Definimos el objeto "book" como variable global
const book = {
  sku: 'D001',
  title: 'Banco de sangre donativo',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcREwenM7YTYF2nkbHgHwUQdCDUQiFZtoOS7Sg&usqp=CAU',
  description: 'Donativo para el desarrollo de la app',
  author: 'BloodBank',
  price: 5,
  currency: 'USD'
}

class ShopController {

  // Desplegará el producto principal
  async index ({ view, request }) {
    const paymentId = request.input('paymentId')
    return view.render('index', {book: book, paymentId: paymentId} )
  }

  // Método para realizar el pago en la API de PayPal.
  async tryPay({ response }) {
    const success_url = Paypal.getSuccessURL()
    const error_url = Paypal.getErrorURL()
    // Crear el objecto payment
    var payment = {
      "intent": "authorize",
      "payer": {
        "payment_method": "paypal"
      },
      "redirect_urls": {
        "return_url": success_url,
        "cancel_url": error_url
      },
      "transactions": [{
        "item_list": {
          "items": [{
            "name": book.title,
            "sku": book.sku,
            "price": book.price,
            "currency": book.currency,
            "quantity": 1
          }]
        },
        "amount": {
          "total": book.price,
          "currency": book.currency
        },
        "description": book.sku + ': ' + book.title
      }]
    }
    await Paypal.createPay( payment )
      // Indica que el pago fue exitoso
      .then( ( transaction ) => {
        var links = transaction.links;
        var counter = links.length;
        while( counter -- ) {
          if ( links[counter].method == 'REDIRECT') {
            // Redirige a PayPal donde el usuario aprueba la transacción
            return response.redirect( links[counter].href )
          }
        }
      })
      // Indica que el pago fue fallido
      .catch( ( err ) => {
        var details = err.response
        if(err.response.httpStatusCode == 401) {
          return response.redirect(error_url + '?name=' + details.error + '&message=' + details.error_description);
        }
        else {
          return response.redirect(error_url + '?name=' + details.name + '&message=' + details.message);
        }
      });
  }

  // Desplegará la notificación de un pago exitoso
  async paySuccess ({ request, response, session }) {
    const paymentId = request.input('paymentId')
    session.flash({
      paymentId: paymentId,
      notification_class: 'alert-success',
      notification_icon: 'fa-check',
      notification_message: 'Thanks for you purchase! ' + paymentId
    })
    response.redirect('/?paymentId=' + paymentId);
  }

  // Desplegará la notificación de un pago fallido o de otros errores
  async payError ({ request, response, session }) {
    const name = request.input('name')
    const message = request.input('message')
    session.flash({
      notification_class: 'alert-danger',
      notification_icon: 'fa-times-circle',
      notification_message: 'Payment error! ' + name + ': ' + message
    })
    response.redirect('/');
  }

  // Verificará el pago antes de iniciar la descarga
  async download ({ response, request }) {
    const paymentId = request.input('paymentId')
    await Paypal.getPay( paymentId )
      // Indica que el pago existe
      .then( ( payment ) => {
        const item = payment.transactions[0].item_list.items[0]
        //Descargar Libro
        const name = item.sku + ' - ' + item.name + '.pdf'
        const source = Helpers.resourcesPath('/files/Book-' + item.sku + '.pdf')
        response.attachment(source, name)
      })
      // Indica que el pago no existe
      .catch( ( err ) => {
        //Mostrar Error
        var details = err.response
        response.send('ERROR: ' + details.name + ' => ' + details.message)
      });
  }

}

module.exports = ShopController