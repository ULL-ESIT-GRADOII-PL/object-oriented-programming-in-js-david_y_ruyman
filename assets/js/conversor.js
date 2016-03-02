(function(exports) {
  "use strict";

  function Medida(valor,tipo)
  {
   this.tipo = tipo;
   this.valor = valor;
  }

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

  exports.convertir = function() {
    var valor     = document.getElementById('convert').value,
        elemento  = document.getElementById('converted'),
        /* Extienda la RegeExp a la especificación. use una XRegExp */
        regexp    = /^\s*([-+]?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\s*([kfc])\s*(?:to)\s*([kfc])$/i,
        valor     = valor.match(regexp);

    if (valor) {
      var numero = valor[1],
          tipo1   = valor[2].toLowerCase();
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
        default:
          /* rellene este código */
          elemento.innerHTML = "Error! El uso corecto es por ejemplo: -3.7C.";
      }
    }
    else
      elemento.innerHTML = "";
  }

})(this);
