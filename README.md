# Evaporadores
see [Multiple Effect Evaporator](https://en.wikipedia.org/wiki/Multiple-effect_evaporator)

## Backward feed two effect evaporator.

## Forward feed two effect evaporator.

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

## Single effect evaporator
