const evap = require("../lib/Evaporadores")
var e = new evap(true);
/*
 Se desea concetrar una disolución de 10% hasta un 45% 
 de sólidos en un evaorador de doble efecto. El vapor de
 calefacción del primer efecto es vapor saturado a 2,5kg/cm^2
 de presión absoluta y el vacío mantenido sobre el último efecto 
 corresponde a una temperatura de ebullición de 45°C.
  La alimentación entra a 22°C en proporción de 9000kg/h. Los dos
  efectos tendrán la misma superficie de calefacción.
  calcular el consumo de vapor de cada efecto para el caso 
  de la alimentación en paralelo.
*/
//function (wf,tf,xi,xf,c,ps,t2,U1,U2)
console.log(e.corrienteparalela(9000,22,10,45,1,2.5,45,1600,1100));
/*               
{ a1: 42.19142144354451, a2: 42.81884697531971 }
*/