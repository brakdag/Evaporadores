const fs = require('fs');
const url_data = '../data/tv.json';
console.log(contracorriente(8500,35,8,45,1,2.5,59.7,1700,1100));

function contracorriente(wf,tf,xi,xf,c,ps,t2,U1,U2){
    return getAreas(steam_w(wf,tf,xi,xf,c,steam_table(ps,t2)),steam_table(ps,t2),U1,U2);
    
}

function corrienteparalela(){
    return 0;
}

function steam_w(wf,tf,xi,xf,c,st){
    var w12= wf*(1-xi/xf);
    var w1=(w12*st.e2.c-wf*c*(tf-st.e2.t))/(st.e1.c +st.e2.c);
    var w2=w12-w1;
    var ws=(w1*st.e1.c - (wf-w2)*c*(st.e2.t-st.e1.t))/st.s.c;
    return {"w1":w1,"w2":w2,"ws": ws}
}

function getAreas(w,st,U1,U2){
    var sumqdu = w.ws*st.s.c/U1 + w.w1*st.e1.c/U2;
    var dt1 = (w.ws*st.s.c/U1)* (st.s.t-st.e2.t)/sumqdu;
    var nt = steam_table2(dt1,st);
    var a1= w.ws*nt.s.c /(U1*(nt.s.t-nt.e1.t));
    var a2= w.w1*nt.e1.c/(U2*(nt.e1.t-nt.e2.t));
    return {"a1":a1,"a2":a2}
}

function steam_table2(dt1,st){
st.e1.t = st.s.t - dt1;
st.e1.p = getPress(st.e1.t);
st.e1.c = getC(st.e1.t);
    return st; 
}

function steam_table(Ps,t2){
    var m=[];
    var p2 = getPress(t2);
    var p1 = (Ps+p2)/2;
    return {"s":
    {"t": getTemp(Ps),"p":Ps,"c":getC(getTemp(Ps))},
    "e1":{"t" : getTemp(p1),"p" : p1, "c" : getC(getTemp(p1))} ,
    "e2": {"t":t2, "p":p2,"c":getC(t2)}}
}

function getC(t){
    var data = load();
    for(i in data){
        if(data[i].t==t) return data[i].ev-data[i].el;
        if(data[i].t>t) return interpolate(t,data[i-1].t,data[i].t,data[i-1].ev-data[i-1].el,data[i].ev-data[i].el) ;
    }
}
function interpolate(x,x1,x2,y1,y2){
    return (y1+((y2-y1)/(x2-x1))*(x-x1));
}
function getTemp(p){
    var data= load();
    for(var i in data){
        if(data[i].p==p) {return data[i].t}
        else if(data[i].p>p){return interpolate(p,data[i-1].p,data[i].p,data[i-1].t,data[i].t) }
    }
}
function getPress(t){
    var data = load();
    for(var i in data){
        if(data[i].t==t){ return data[i].p}
        else if (data[i].t>t ) {return interpolate(t,data[i-1].t,data[i].t,data[i-1].p,data[i].p) }
    }
}
function load()
{
    var datos = JSON.parse(fs.readFileSync(url_data));
    return datos;   
}