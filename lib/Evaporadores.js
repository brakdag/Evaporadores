const fs = require('fs');
/**
 * @constructor
 * @param  {boolean} debug {imprime información del proceso}
 */
var Evaporador = function(debug)
{
    this.debug=debug;
    this.url_data = '../data/tv.json'; 
    this.data = JSON.parse(fs.readFileSync(this.url_data));  
    this.getC = function(t){
        for(var i in this.data){
            if(this.data[i].t==t) return this.data[i].ev-this.data[i].el;
            if(this.data[i].t>t) return this.interpolate(t,this.data[i-1].t,this.data[i].t,this.data[i-1].ev-this.data[i-1].el,this.data[i].ev-this.data[i].el) ;
        }
    }
    this.getTemp=function(p){
        for(var i in this.data){
            if(this.data[i].p==p) {return this.data[i].t}
            else if(this.data[i].p>p){return this.interpolate(p,this.data[i-1].p,this.data[i].p,this.data[i-1].t,this.data[i].t) }
        }
    }
}

/**
 * @param  {Number} wf {Alimentación en kg/h}
 * @param  {Number} tf {temperatura de alimentación °C}
 * @param  {Number} xi {concentración inicial}
 * @param  {Number} xf {concentración final}
 * @param  {Number} c  {calor sensible de la solución}
 * @param  {Number} ps {presión de vapor de alimentación}
 * @param  {Number} t2 {temperatura del ultimo efecto}
 * @param  {Number} U1 {coeficiente de transmisión de calor primer efecto}
 * @param  {Number} U2 {coeficiente de transmisión de calor segundo efecto}
 * @return {Object} {Retorna el cálculo de áreas de un evaporador con flujo en contracorriente. Áreas de los dos efectos}
 */
Evaporador.prototype.contracorriente = function(wf,tf,xi,xf,c,ps,t2,U1,U2){
    return this.getAreas(this.steam_w(wf,tf,xi,xf,c,this.steam_table(ps,t2)),this.steam_table(ps,t2),U1,U2);    
}

/**
 * @param  {number} wf {peso de la alimentación en kg/h}
 * @param  {number} tf {temperatura de la alimentación °C}
 * @param  {number} xi {concentración inicial %}
 * @param  {number} xf {concentración final %}
 * @param  {number} c  {capacidad calorífica del líquido}
 * @param  {number} ps {Presión del vapor de calefacción primer efecto}
 * @param  {number} t2 {temperatura del último efecto}
 * @param  {number} U1 {coeficiente de transferencia de calor primer efecto}
 * @param  {number} U2 {coeficiente de transferencia de calor segundo efecto}
 * @return {Object} {Retorna las áreas calculadas de los efectos}
 */
Evaporador.prototype.corrienteparalela = function (wf,tf,xi,xf,c,ps,t2,U1,U2){
    return this.getAreas(this.steam_w2(wf,tf,xi,xf,c,this.steam_table(ps,t2)),this.steam_table(ps,t2),U1,U2);    
}
Evaporador.prototype.f2c = function(f){
    return (f-32)*5/9; // convierte de grados farenheit a °C
}
Evaporador.prototype.atm2kgcm2 = function(atm){
    return atm*1.03323; 
}
Evaporador.prototype.lb2kg = function(lb){
    return 0.453592 * lb;
}
Evaporador.prototype.psi2kgcm2 = function(psi){
    return this.lb2kg(psi)/2.54/2.54;
}

/**
 * @param  {Number} wf {peso de la alimentación kg/h}
 * @param  {Number} xi {concentración inicial}
 * @param  {Number} xf {concentración final}
 * @param  {Number} tf {temperatura alimentación °C}
 * @param  {Number} t1 {temperatura en el efecto °C}
 * @param  {Number} ts {temperatura del vapor °C}
 * @param  {Number} U  {Coeficiente de transmisión de calor del efecto}
 * @param  {Number} C  {Coeficiente de transmisión de calor sensible}
 * @return {Object.<number,number,number,number>} {Obtiene el área para un evaporador de simple efecto. Retorna un objeto, con w1 vapor a la salida
 * , ws vapor de alimentación, Q calor transimitdo, A area de transferencia de calor}
 */
Evaporador.prototype.simple= function(wf,xi,xf,tf,t1,ts,U,C){
    var w1 = wf*(1-xi/xf);
    var ws = (w1 * this.getC(t1) - wf*C*(tf-t1))/this.getC(ts)
    var Q = ws*this.getC(ts);
    var A = Q/(U*(ts-t1));
    return {'w1':w1,'ws':ws,'Q':Q, 'A':A};
}

Evaporador.prototype.steam_w2=function(wf,tf,xi,xf,c,st){
    var w12= wf*(1-xi/xf); //bien
    var w1=(w12*st.e2.c-wf*c*(st.e1.t-st.e2.t))/(st.e1.c +st.e2.c-c*(st.e1.t-st.e2.t));
    var w2=w12-w1;
    var ws=(w1*st.e1.c - wf*c*(tf-st.e1.t))/st.s.c;
    if(this.debug==true) console.log({"w1":w1,"w2":w2,"ws": ws, "w12":w12})
    return {"w1":w1,"w2":w2,"ws": ws}
}
Evaporador.prototype.steam_w=function(wf,tf,xi,xf,c,st){
    var w12= wf*(1-xi/xf);
    var w1=(w12*st.e2.c-wf*c*(tf-st.e2.t))/(st.e1.c +st.e2.c);
    var w2=w12-w1;
    var ws=(w1*st.e1.c - (wf-w2)*c*(st.e2.t-st.e1.t))/st.s.c;
    if(this.debug==true) console.log({"w1":w1,"w2":w2,"ws": ws, "w12":w12})
    return {"w1":w1,"w2":w2,"ws": ws}
}
Evaporador.prototype.getAreas= function(w,st,U1,U2){
    var sumqdu = w.ws*st.s.c/U1 + w.w1*st.e1.c/U2;
    var dt1 = (w.ws*st.s.c/U1)* (st.s.t-st.e2.t)/sumqdu;
    var nt = this.steam_table2(dt1,st);
    var a1= w.ws*nt.s.c /(U1*(nt.s.t-nt.e1.t));
    var a2= w.w1*nt.e1.c/(U2*(nt.e1.t-nt.e2.t));
    if(this.debug==true)console.log(st);
    return {"a1":a1,"a2":a2}
}
Evaporador.prototype.steam_table2 = function(dt1,st){
    st.e1.t = st.s.t - dt1;
    st.e1.p = this.getPress(st.e1.t);
    st.e1.c = this.getC(st.e1.t);
    return st; 
}
Evaporador.prototype.steam_table= function(Ps,t2){
    var m=[];
    var p2 = this.getPress(t2);
    var p1 = (Ps+p2)/2;
    return {"s":
    {"t": this.getTemp(Ps),"p":Ps,"c":this.getC(this.getTemp(Ps))},
    "e1":{"t" : this.getTemp(p1),"p" : p1, "c" : this.getC(this.getTemp(p1))} ,
    "e2": {"t":t2, "p":p2,"c":this.getC(t2)}}
}
/**
 * Interpola entre dos rangos.
 * @param {number} x - valor a interpolar.
 * @param {number} x1 - rango inicial.
 * @param {number} x2 - rango final.
 * @param {number} y1 - rango inicial variable a obtener.
 * @param {number} y2 - rango final variable a obtener.
 * 
 */
Evaporador.prototype.interpolate=function(x,x1,x2,y1,y2){
   // return y2;
    return (y1+((y2-y1)/(x2-x1))*(x-x1));
}
/**
 * @function {getPress}
 * @param  {Number} t {temperatura del agua °C}
 * @return {Number} {Obtiene la presión de vapor para el agua en función de la temperatura.Presión del vapor kg/cm^2}
 */
Evaporador.prototype.getPress=function(t){ 
    for(var i in this.data){
        if(this.data[i].t==t){ return this.data[i].p}
        else if (this.data[i].t>t ) {return this.interpolate(t,this.data[i-1].t,this.data[i].t,this.data[i-1].p,this.data[i].p) }
    }
}
module.exports = exports =Evaporador;