const evap = require("../lib/Evaporadores")
var e = new evap(true);
/*
 Se desea concentrar una disolución desde 8% hasta 45% de sólidos en un evaporador de doble efecto.
  El vapor de calefacción del primer efecto es vapor saturado de 2.5kg/cm^2 de presión absoluta y 
  el vacío mantenido sobre el último efecto corresponde a una temperatura de ebullición de 59,7°C.
   La alimentación entra a 35°C en proporción de 8500 kg/h. Los dos efectos tendrán la misma superficie 
   de calefacción.
Calcular el consumo de vapor de cada efecto para el caso de la alimentación en corrientes paralelas.
 Se desprecia la elevación del punto de ebullición, se supone que el calor específico de la disolución
  es de 1kcal/kg°C para todas las concentraciones. Los coeficientes de transmisión de calor en el 1° efecto 
  es de 1700 kcal/(hm^2) y 1100 cal/(hm^2) para el 2 efecto.

*/
//function (wf,tf,xi,xf,c,ps,t2,U1,U2)
console.log(e.corrienteparalela(8500,32,8,45,1,2.5,50,1700,1100));
/*
{ a1: 42.19142144354451, a2: 42.81884697531971 }
*/