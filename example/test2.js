const evap = require("../lib/Evaporadores")
var e = new evap(true);
/*
2) Se desea concentrar una disolución desde 10% a 45% de sólidos en un evaporador
de doble efecto. El vapor de calefacción del primer efecto es vapor saturado a
2,5g/cm2 de presión absoluta y el vacío mantenido sobre el último efecto
corresponde a una temperatura de ebullición de 45°C. La alimentación entra 
a 22°C, en proporción de 9000kg/h. Los dos efectos tendrán la misma superficie
de calefacción.
Calcúlese el consumo de vapor de cada efecto para el caso de alimentación 
en contracorriente.Se despreciará la elevación del punto de ebullición.
Se supondrá que el calor específico de la disolución es de 1Kcal/kg°C 
para todas las concentraciones. Coeficiente de transmisión de calor 
en el 1° efecto: 1100 kcal/hm2°C y 1600 Kcal/hm2°C, para el 2° efecto.
Solución (42m^2)
*/
console.log(e.contracorriente(9000,22,10,45,1,2.5,45,1100,1600));

//{42.15664299826665, a2: 43.70144439858753 }