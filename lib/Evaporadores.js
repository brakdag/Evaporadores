const fs = require('fs');
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
Evaporador.prototype.contracorriente = function(wf,tf,xi,xf,c,ps,t2,U1,U2){
    return this.getAreas(this.steam_w(wf,tf,xi,xf,c,this.steam_table(ps,t2)),this.steam_table(ps,t2),U1,U2);    
}
Evaporador.prototype.corrienteparalela = function (){
    return 0; // TODO
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

Evaporador.prototype.interpolate=function(x,x1,x2,y1,y2){
    return (y1+((y2-y1)/(x2-x1))*(x-x1));
}
Evaporador.prototype.getPress=function(t){ 
    for(var i in this.data){
        if(this.data[i].t==t){ return this.data[i].p}
        else if (this.data[i].t>t ) {return this.interpolate(t,this.data[i-1].t,this.data[i].t,this.data[i-1].p,this.data[i].p) }
    }
}
module.exports = exports =Evaporador;