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
    this.convFarenheit = function() {
      return ((valor * 9/5) + 32);
    };

    this.convKelvin = function() {
      return (valor + 273.15);
    };
  }

  Celsius.prototype = new Temperatura();
  Celsius.prototype.constructor = Celsius;

  function Farenheit(valor)
  {
    Temperatura.call(this,valor,"f");
    this.convCelsius = function() {
      return ((valor - 32) * 5/9);
    };
    this.convKelvin = function() {
      return((valor + 459.67) * 5/9);
    };
  }

  Farenheit.prototype = new Temperatura();
  Farenheit.prototype.constructor = Farenheit;

  function Kelvin(valor) {
    Temperatura.call(this, valor, "k");
    this.convCelsius = function() {
      return(valor - 273.15);
    };
    this.convFarenheit = function() {
      return(valor * 9/5 - 459.67);
    };
  }

  Kelvin.prototype = new Temperatura();
  Kelvin.prototype.constructor = Kelvin;

  exports.Temperatura = Temperatura;
  exports.Celsius = Celsius;
  exports.Farenheit = Farenheit;
  exports.Kelvin = Kelvin;
  exports.Metros = Metros;
  exports.Pulgadas = Pulgadas;

  exports.convertir = function() {
    var valor     = document.getElementById('convert').value,
        elemento  = document.getElementById('converted');
        /* Extienda la RegeExp a la especificación. use una XRegExp */
        //regexp    = /^\s*([-+]?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\s*(?:([kfcmp])\s*(?:to)\s*([kfcmp]))$/i,
        //valor     = valor.match(regexp);
    var regexp = XRegExp('^\\s*(?<number> ([-+]?\\d+(?:\\.\\d*)?))                        # NUMERO          \n\
                          \\s*(?<exp> (?:e([-+]?\\d+))?)                                  # EXPONENTE       \n\
                          \\s*(?<type> (                                                  # INICIO DEL TIPO \n\
                            (?:f(?:a(?:h(?:r(?:e(?:n(?:h(?:e(?:i(?:t)?)?)?)?)?)?)?)?)?)|   # fahrenheit     \n\
                            (?:c(?:e(?:l(?:s(?:i(?:u(?:s)?)?)?)?)?)?)|                     # celsius        \n\
                            (?:k(?:e(?:l(?:v(?:i(?:n)?)?)?)?)?)|                           # kelvin         \n\
                            (?:m(?:e(?:t(?:r(?:o(?:s)?)?)?)?)?)|                           # metros         \n\
                            (?:p(?:u(?:l(?:g(?:a(?:d(?:a(?:s)?)?)?)?)?)?)?)                # pulgadas       \n\
                          ))                                                             # FIN DE TIPO      \n\
                          ((?:\\s+to\\s+)(?<to> (                                        # TO                \n\
                            (?:f(?:a(?:h(?:r(?:e(?:n(?:h(?:e(?:i(?:t)?)?)?)?)?)?)?)?)?)|   # fahrenheit   \n\
                            (?:c(?:e(?:l(?:s(?:i(?:u(?:s)?)?)?)?)?)?)|                     # celsius      \n\
                            (?:k(?:e(?:l(?:v(?:i(?:n)?)?)?)?)?)|                           # kelvin       \n\
                            (?:m(?:e(?:t(?:r(?:o(?:s)?)?)?)?)?)|                           # metros       \n\
                            (?:p(?:u(?:l(?:g(?:a(?:d(?:a(?:s)?)?)?)?)?)?)?)                # pulgadas     \n\
                          )))?\\s*$', 'nxi');
    var valor = XRegExp.exec(valor, regexp);
    
    if (valor) {
      var numero = valor[1],
          tipo1   = valor[2].toLowerCase(),
          tipo2 = valor[3].toLowerCase();

      numero = parseFloat(numero);
      console.log("Valor: " + numero + ", Tipo: " + tipo1);

      switch (tipo1) {
        case 'c':
          var celsius = new Celsius(numero);
          if (tipo2 == 'f')
            elemento.innerHTML = celsius.convFarenheit().toFixed(2) + " Farenheit";
          if (tipo2 == 'k')
            elemento.innerHTML = celsius.convKelvin().toFixed(2) + " Kelvin";
          break;
        case 'f':
          var farenheit = new Farenheit(numero);
          if (tipo2 == 'c')
            elemento.innerHTML = farenheit.convCelsius().toFixed(2) + " Celsius";
          if (tipo2 == 'k')
            elemento.innerHTML = farenheit.convKelvin().toFixed(2) + " Kelvin";
          break;
        case 'k':
          var kelvin = new Kelvin(numero);
          if (tipo2 == 'c')
            elemento.innerHTML = kelvin.convCelsius().toFixed(2) + " Celsius";
          if (tipo2 == 'f')
            elemento.innerHTML = kelvin.convFarenheit().toFixed(2) + " Farenheit";
          break;
        case 'm':
          var metro = new Metros(numero);
          if (tipo2 == 'p')
            elemento.innerHTML = metro.convPulgadas().toFixed(2) + " Pulgadas";
          break;
        case 'p':
          var pulgada = new Pulgadas(numero);
          if (tipo2 == 'm')
            elemento.innerHTML = pulgada.convMetros().toFixed(2) + " Metros";
          break;
        default:
          /* rellene este código */
          elemento.innerHTML = "Error! El uso corecto es por ejemplo: -3.7C.";
      }
    }
    else
      elemento.innerHTML = "";
  }

})(this);
