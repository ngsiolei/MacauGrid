function MacauGrid() {
}

/*
    source:
    1. https://mosref.dscc.gov.mo/Help/ref/Macaucoord_2009_web_CT_v201702.pdf
*/
MacauGrid.prototype.toWgs84Cartesian = function (E, N) {
  var E0 = 21688.365; //origin of rotation
  var N0 = 14963.270; //origin of rotation
  var dE = 307.377; //shift along easting
  var dN = -133.374; //shift along northing
  var alpha = toRad((1 / 60) + (29.586 / 3600)); //rotation ammount
  var m = 6.513 / 1000000; //scale factor

  var E1 = dE + E0 + (1 + m) * ((E - E0) * cos(alpha) + (N - N0) * sin(alpha));
  var N1 = dN + N0 + (1 + m) * ((E - E0) * (-sin(alpha)) + (N - N0) * cos(alpha));
  return {'east': E1, 'north': N1};
}

/*
    sources:
    1. https://mosref.dscc.gov.mo/Help/ref/Macaucoord_2009_web_CT_v201702.pdf
    2. https://www.linz.govt.nz/regulatory/25703
*/
MacauGrid.prototype.toWgs84Geodetic = function (E, N) {
  var a = 6378137; //major semi-axis
  var f = 1 / 298.257222101; //flattening
  var E0 = 20000; //false easting
  var N0 = 20000; //false northing
  var phi0 = toRad(22 + (12 / 60) + (44.63 / 3600)); // latitude of origin
  var lamda0 =  toRad(113 + (32 / 60) + (11.29 / 3600)); //longitude of origin
  var k0 = 1; //scale factor

  var b = a * (1 - f);
  var e2 = 2 * f - f * f;
  var e4 = e2 * e2;
  var e6 = e2 * e2 * e2;
  var A0 = 1 - (e2 / 4) - (3 * e4 / 64) - (5 * e6 / 256);
  var A2 = (3 / 8) * (e2 + e4 / 4 + 15 * e6 / 128);
  var A4 = (15 / 256) * (e4 + 3 * e6 / 4);
  var A6 = 35 * e6 / 3072;
  var dE = E - E0;
  var dN = N - N0;

  var m0 = a * (A0 * phi0 - A2 * sin(2 * phi0) + A4 * sin(4 * phi0) - A6 * sin(6 * phi0));
  var m1 = m0 + dN / k0;
  var n = (a - b) / (a + b);
  var G = a * (1 - n) * (1 - n * n) * (1 + (9 * n * n / 4) + (225 * n * n * n * n / 64)) * (Math.PI / 180);
  var sigma  = m1 * Math.PI / (180 * G);
  var phi1 = sigma + ((3 * n / 2) - (27 * n * n * n / 32)) * sin(2 * sigma) +
             ((21 * n * n / 16) - (55 * n * n * n * n / 32)) * sin(4 * sigma) +
             (151 * n * n * n / 96) * sin(6 * sigma) +
             (1097 * n * n * n * n / 512) * sin(8 * sigma); 
  var rho1 = a * (1 - e2) / pow((1 - e2 * pow(sin(phi1), 2)), 3 / 2);
  var nu1 = a / pow((1 - e2 * pow(sin(phi1), 2)), 1 / 2);
  var psi1 = nu1 / rho1;
  var t1 = tan(phi1);
  var chi = dE / (k0 * nu1);
  var term1 = (t1 / (k0 * rho1)) * (dE * chi / 2);
  var term2 = (t1 / (k0 * rho1)) * (dE * pow(chi, 3) / 24) * 
              ((-4) * pow(psi1, 2) + 9 * psi1 * (1 - t1 * t1) + 12 * t1 * t1);
  var term3 = (t1 / (k0 * rho1)) * (dE * pow(chi, 5) / 720) *
              (8 * pow(psi1, 4) * (11 - 24 * t1 * t1) - 12 * pow(psi1, 3) * (21 - 71 * t1 * t1) +
              15 * pow(psi1, 2) * (15 - 98 * t1 * t1 + 15 * pow(t1, 4)) +
              180 * psi1 * (5 * t1 * t1 - 3 *  pow(t1, 4)) + 360 * pow(t1, 4));
  var term4 = (t1 / (k0 * rho1)) * (dE * pow(chi, 7) / 40320) *
              (1385 - 3633 * t1 * t1 + 4095 * pow(t1, 4) + 1575 * pow(t1, 6));
  var lat = phi1 - term1 + term2 - term3 + term4;

  var term1 = chi * sec(phi1);
  var term2 = (pow(chi, 3) * sec(phi1) / 6) * (psi1 + 2 * t1 * t1);
  var term3 = (pow(chi, 5) * sec(phi1) / 120) *
              ((-4) * pow(psi1, 3) * (1 - 6 * t1 * t1) + pow(psi1, 2) * (9 - 68 * t1 * t1) +
              72 * psi1 * t1 * t1 + 24 * pow(t1, 4));
  var term4 = (pow(chi, 7) * sec(phi1) / 5040) * (61 + 662 * t1 * t1 + 1320 * pow(t1, 4) + 720 * pow(t1, 6));
  var long = lamda0 + term1 - term2 + term3 - term4;
  lat = toDecDeg(lat);
  long = toDecDeg(long);
  return {'lat': lat, 'long': long};
}

function toRad(deg) {
  return deg * Math.PI / 180;
}

function toDecDeg(rad) {
  return rad * 180 / Math.PI;
}

function sin(rad) {
  return Math.sin(rad);
}

function cos(rad) {
  return Math.cos(rad);
}

function tan(rad) {
  return Math.tan(rad);
}

function sec(rad) {
  return 1 / (Math.cos(rad));
}

function pow(base, p) {
  return Math.pow(base, p);
}
