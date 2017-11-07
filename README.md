# Evaporadores
Calculo de evaporación de 2 efectos

## contracorriente($w_f,t_f,x_i,x_f,c,p_s,t_2,U_1,U_2$))

## Energy balance 'contracorriente'.

## $w_1 \lambda_1=w_s \lambda_s+(w_f-w_2)c(t_2-t_1)$ 
## $w_2 \lambda_2=w_1 \lambda_1 + w_fc(t_f-t_1)$
## Energy balance 'Paralelos'.

## $w_1 \lambda_1=w_s \lambda_s+w_fc(t_f-t_1)$ 
## $w_2 \lambda_2=w_1 \lambda_1 + (w_f-w_1)c(t_1-t_2)$
## Mass balance
## $w_{12} =w_1+w_2$
## $w_{12} = wf(1+x_i/x_f)$

## How to Use
```javascript
const evap = require("../lib/Evaporadores")
var e = new evap();
console.log(e.contracorriente(8500,35,8,45,1,2.5,59.7,1700,1100));
```
## Output
```powershell
{ a1: 47.31158521048767, a2: 47.83154512795593 }
```