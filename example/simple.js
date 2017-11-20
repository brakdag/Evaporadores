const evap = require("../lib/Evaporadores")
var e = new evap(true);
/*
Un evaporador es alimentado con 10000kg/h de una solución que contiene
1% de sólidos en peso, a una temperatura de 37,8°C. Se quiere concentrar
la solución hasta que contenga 1,5% de sólidos en peso, efectuando la
operación de forma que la presión en el espacio de vapor del evaporador
sea de 1 atm, y el vapor de agua de calentamiento empleado esté a
108°C ¿Cuál es el peso del vapor producido de líquido concentrado 
y del líquido concentrado y  la cantidad de calor transmitida 
a traves de la superficie de calefación? Si el coeficiente de transmisión
(U) del evaporador es de 1220 kcal/hm°C ¿Cuál es la superficie necesaria?
*/
//simple(wf,xi,xf,tf,t1,ts,U)


console.log(e.simple(10000,1,1.5,37.8,100,108,1220,1));
/*
{ a1: 60.280284505473844, a2: 61.45909900200645 }
*/