function zero(x) {
  if (x == Infinity || isNaN(x)) {
        return null;
  }
  else {
        return x;
  }
}

function tanDeg(deg) {
  var rad = deg * Math.PI/180;
  return Math.tan(rad);
}

function sinDeg(deg) {
  var rad = deg * Math.PI/180;
  return Math.sin(rad);
}

function cosDeg(deg) {
  var rad = deg * Math.PI/180;
  return Math.sin(rad);
}



function solve(obj){
  
var m1 = obj.m1 || 0,
    m2 = obj.m2 || 0,
    theta = obj.theta || 0,
    muk = obj.muk || 0,
    mus = obj.mus || 0,
    g = obj.g || 0,
    Fnet = obj.Fnet || 0,
    Vf = obj.Vf || 0,
    V0 = obj.V0 || 0,
    d = obj.d || 0,
    a = obj.a || 0;
      
      
var mT=       m1+m2,
    cos=      cosDeg(theta),
    sin=      sinDeg(theta),
    tan=      tanDeg(theta),
    Ffr=      m1*g*cos*muk,
    asin =    Math.asin,
    atan =    Math.atan,
    sqrt =    Math.sqrt,
    power =   Math.pow,
    p_a=      zero((m1*g*sin-m2*g-Ffr)/mT)+zero(Fnet/mT)+g*(sin-cos*muk),
    n_a=      zero((m2*g-m1*g*sin-Ffr)/mT)+zero(Fnet/mT)-g*(sin+cos*muk),
    p_Fnet=    m1*g*sin-m2*g-Ffr+mT*a,
    n_Fnet=    m2*g-m1*g*sin-Ffr+mT*a,
    p_theta = zero(asin(a/g))*(180/Math.PI)+zero(asin(Fnet/(m1*g)))*(180/Math.PI)+zero(asin((power(Vf,2)-power(V0,2))/(2*g*d)))*(180/Math.PI),
    n_theta = zero(asin(a/g))*(180/Math.PI)+zero(asin(Fnet/(-m1*g)))*(180/Math.PI)+zero(asin((power(V0,2)-power(Vf,2))/(2*g*d)))*(180/Math.PI),
    s_theta = zero(atan(mus)),
    p_m1 =    zero(m2*(1+g/a))/zero((g/a)*(sin+cos*muk)-1)+zero(Fnet/a),
    n_m1 =    zero(m2*(g/a-1))/zero((1+(g/a)*(sin+cos*muk)))+zero(Fnet/a),
    s_m1 =    zero(m2/(sin-cos*mus)),
    p_m2 =    zero(1/a)*(m1*g*sin-m1*g*Ffr)/zero(1+g/a),
    n_m2 =    zero(-m1-1/a)*(m1*g-m1*g*sin*Ffr)/zero(1-g/a),
    s_m2 =    (m1*(sin-cos*mus)),
    p_muk =   (Vf == 0) ? zero((m1*g*sin-Fnet)/(m1*g*cos)) : zero((power(Vf,2)-power(V0,2))/(2*g*d*cos))-tan,
    n_muk =   (Vf == 0) ? zero((-m1*g*sin-Fnet)/(m1*g*cos)) : zero((power(V0,2)-power(Vf,2))/(2*g*d*cos))-tan,
    p_Vf =    (a == 0) ? (sqrt(power(V0,2)+2*p_a*d)) : (sqrt(power(V0,2)+2*a*d)),
    n_Vf =    (a == 0) ? (sqrt(power(V0,2)+2*n_a*d)) : (sqrt(power(V0,2)+2*a*d)),
    p_V0 =    (a == 0) ? (sqrt(power(V0,2)-2*p_a*d)) : (sqrt(power(V0,2)+2*a*d)),
    n_V0 =    (a == 0) ? (sqrt(power(V0,2)-2*n_a*d)) : (sqrt(power(V0,2)+2*a*d)),
    p_d =     (a == 0) ? zero((power(Vf,2)-power(V0,2))/(2*p_a)) : zero((power(Vf,2)-power(V0,2))/(2*a)),
    n_d =     (a == 0) ? (sqrt(power(V0,2)+2*n_a*d)) : (sqrt(power(V0,2)+2*a*d));
    
var solve_library = {
  
'+as': p_a,
'-as': n_a,
'sas': 0,
'+Fnets': p_Fnet,
'-Fnets': n_Fnet,
'sFnets': 0,
'+thetas': p_theta,
'-thetas': n_theta,
'sthetas': s_theta,
'+m1s': p_m1,
'-m1s': n_m1,
'sm1s': s_m1,
'+m2s': p_m2,
'-m2s': n_m2,
'sm2s': s_m2,
'+Vfs': p_Vf,
'-Vfs': n_Vf,
'sVfs': 0,
'+V0s': p_V0,
'-V0s': n_V0,
'sV0s': 0,
'+ds': p_d,
'-ds': n_d,
'sds': 0,
'+muks': p_muk,
'-muks': n_muk
  
}  

return solve_library;
  
  
}


            
module.exports = solve;