const evap = require("../lib/Evaporadores")
var e = new evap();
/*
1)Se desea concentrar una disolución desde 10% a 45% de sólidos 
en un evaporador de doble efecto. El vapor de calefacción del primer efecto 
es vapor saturado de 2,5Kg/cm2 de presión absoluta y el vacío mantenido sobre 
el último efecto corresponde a una temperatura de ebullición de 45°C. 
La alimentación entra a 22°C en proporción de 9000 kg/h. 
Los dos efectos tendrán la misma superficie de calefacción.
Calcular el consumo de vapor de cada efecto para el caso de la alimentación 
en contracorriente. Se desprecia la elevación del punto de ebullición, se 
supone que el calor específico de la disolución es de 1kcal/kg °C para todas 
las concentraciones. Los coeficientes de transmisión de calor en el 1° efecto 
es de 1100 kcal/hm2 y 1600 cal/hm2  para el segundo ciclo.
rta:A1=A2=40m^2
*/
console.log(e.contracorriente(9000,22,10,45,1,2.5,45,1100,1600));
/*
{ a1: 42.15664299826665, a2: 43.70144439858753 }
*/