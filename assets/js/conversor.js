(function(exports) {
  "use strict";

  function Medida(valor,tipo)
  {
   this.tipo = tipo;
   this.valor = valor;
  }

  function Longitud(valor, tipo)
  {
    Medida.call(this, valor, tipo);
  }
  Longitud.prototype = new Medida();
  Longitud.prototype.constructor = Temperatura;

  function Metros(valor)
  {
    Longitud.call(this, valor, 'm');
    this.convPulgadas = function() {
      return (valor/0.0254);
    }
  }

  Metros.prototype = new Longitud();
  Metros.prototype.constructor = Metros;

  function Pulgadas(valor)
  {
    Longitud.call(this, valor, 'p');
    this.convMetros = function() {
      return (valor * 0.0254);
    }
  }

  Pulgadas.prototype = new Longitud();
  Pulgadas.prototype.constructor = Pulgadas;

  function Temperatura(valor,tipo)
  {
    Medida.call(this, valor, tipo);
    /* tipo es opcional. Debería admitir new Medida("45.2 F") */
  }

  Temperatura.prototype = new Medida();
  Temperatura.prototype.constructor = Temperatura;
/*https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Function/call*/

/*Las conversiones de temperatura se han sacado de: https://es.wikipedia.org/wiki/Temperatura*/
  function Celsius(valor)
  {
    Temperatura.call(this,valor,"c");
    /*celsius hereda de temperatura y llama al constructor ponindo por defecto la c en tipo*/
    this.convFahrenheit = function() {
      return ((valor * 9/5) + 32);
    };

    this.convKelvin = function() {
      return (valor + 273.15);
    };
  }

  Celsius.prototype = new Temperatura();
  Celsius.prototype.constructor = Celsius;

  function Fahrenheit(valor)
  {
    Temperatura.call(this,valor,"f");
    this.convCelsius = function() {
      return ((valor - 32) * 5/9);
    };
    this.convKelvin = function() {
      return((valor + 459.67) * 5/9);
    };
  }

  Fahrenheit.prototype = new Temperatura();
  Fahrenheit.prototype.constructor = Fahrenheit;

  function Kelvin(valor) {
    Temperatura.call(this, valor, "k");
    this.convCelsius = function() {
      return(valor - 273.15);
    };
    this.convFahrenheit = function() {
      return(valor * 9/5 - 459.67);
    };
  }

  Kelvin.prototype = new Temperatura();
  Kelvin.prototype.constructor = Kelvin;

  exports.Temperatura = Temperatura;
  exports.Celsius = Celsius;
  exports.Farenheit = Fahrenheit;
  exports.Kelvin = Kelvin;
  exports.Metros = Metros;
  exports.Pulgadas = Pulgadas;
  
  exports.convertir = function() {
    var valor     = document.getElementById('convert').value,
        elemento  = document.getElementById('converted');
    var regexp = XRegExp('^\\s*(?<number> [-+]?\\d+(?:.\\d*)?)                            # NUMERO            \n' +
                          '\\s*(?:e(?<exp> [-+]?\\d+))?                                   # EXPONENTE         \n' +
                          '\\s*(?<type> (                                                 # INICIO DEL TIPO   \n' +
                          '(?:f(?:a(?:h(?:r(?:e(?:n(?:h(?:e(?:i(?:t)?)?)?)?)?)?)?)?)?)|     # fahrenheit      \n' +
                            '(?:c(?:e(?:l(?:s(?:i(?:u(?:s)?)?)?)?)?)?)|                     # celsius         \n' +
                            '(?:k(?:e(?:l(?:v(?:i(?:n)?)?)?)?)?)|                           # kelvin          \n' +
                            '(?:m(?:e(?:t(?:r(?:o(?:s)?)?)?)?)?)|                           # metros          \n' +
                            '(?:p(?:u(?:l(?:g(?:a(?:d(?:a(?:s)?)?)?)?)?)?)?)                # pulgadas        \n' +
                          '))                                                             # FIN DEL TIPO      \n' +
                          '((?:\\s+to)?\\s+(?<to> (                                       # TO                \n' +
                            '(?:f(?:a(?:h(?:r(?:e(?:n(?:h(?:e(?:i(?:t)?)?)?)?)?)?)?)?)?)|   # fahrenheit      \n' +
                            '(?:c(?:e(?:l(?:s(?:i(?:u(?:s)?)?)?)?)?)?)|                     # celsius         \n' +
                            '(?:k(?:e(?:l(?:v(?:i(?:n)?)?)?)?)?)|                           # kelvin          \n' +
                            '(?:m(?:e(?:t(?:r(?:o(?:s)?)?)?)?)?)|                           # metros          \n' +
                            '(?:p(?:u(?:l(?:g(?:a(?:d(?:a(?:s)?)?)?)?)?)?)?)                # pulgadas        \n' +
                          ')))?\\s*$', 'xi');
    var valor = XRegExp.exec(valor, regexp);
    
    if (valor) {
      var numero = parseFloat(valor.number),
          tipo  = valor.type[0].toLowerCase(),
          to = valor.to;

      to && (to = to[0].toLowerCase());

      // Calculamos exponente si lo hay
      if (valor.exp) {
        var exp = parseInt(valor.exp);
        numero = numero * Math.pow(10, exp);
      }

      console.log("Valor: " + numero + ", Tipo: " + tipo);

      switch (tipo) {
        case 'c':
          var celsius = new Celsius(numero);
          if (!to || to == 'f') {
            elemento.innerHTML = celsius.convFahrenheit().toFixed(2) + " Farenheit";
          } else if (to == 'k') {
            elemento.innerHTML = celsius.convKelvin().toFixed(2) + " Kelvin";
          } else {
            elemento.innerHTML = "Error! Conversión no permitida";
          }
          break;
        case 'f':
          var fahrenheit = new Fahrenheit(numero);
          if (!to || to == 'c') {
            elemento.innerHTML = fahrenheit.convCelsius().toFixed(2) + " Celsius";
          } else if (to == 'k') {
            elemento.innerHTML = fahrenheit.convKelvin().toFixed(2) + " Kelvin";
          } else {
            elemento.innerHTML = "Error! Conversión no permitida";
          }
          break;
        case 'k':
          var kelvin = new Kelvin(numero);
          if (!to || to == 'c') {
            elemento.innerHTML = kelvin.convCelsius().toFixed(2) + " Celsius";
          } else if (to == 'f') {
            elemento.innerHTML = kelvin.convFahrenheit().toFixed(2) + " Farenheit";
          } else {
            elemento.innerHTML = "Error! Conversión no permitida";
          }
          break;
        case 'm':
          var metro = new Metros(numero);
          if (!to || to == 'p') {
            elemento.innerHTML = metro.convPulgadas().toFixed(2) + " Pulgadas";
          } else {
            elemento.innerHTML = "Error! Conversión no permitida";
          }
          break;
        case 'p':
          var pulgada = new Pulgadas(numero);
          if (!to || to == 'm') {
            elemento.innerHTML = pulgada.convMetros().toFixed(2) + " Metros";
          } else {
            elemento.innerHTML = "Error! Conversión no permitida";
          }
          break;
        default:
          /* rellene este código */
          elemento.innerHTML = "Error! El uso corecto es por ejemplo: -3.7C.";
      }
    }
    else
      elemento.innerHTML = "Error! El uso corecto es por ejemplo: -3.7C.";
  }

})(this);
