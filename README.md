Simple script to convert Macau Grid cooridinate into Latitude/Longitude

###Example

    <script src="./MacauGrid.js"></script>
    <script>
    var mg = new MacauGrid();
    var pt = {'E': 20800.08, 'N': 18145.04};
    var cartesian = mg.toWgs84Cartesian(pt.E, pt.N);
    var geo = mg.toWgs84Geodetic(cartesian.east, cartesian.north);
    console.log(geo); // {'lat': 22.194444429765454, 'long': 113.54722220609713}
    </script>  

###References

1. http://mosref.dscc.gov.mo/Help/Macaucoord_2009_web_CT.pdf
2. http://www.linz.govt.nz/sites/default/files/document/25002-LINZS25002%20Standard%20for%20New%20Zealand%20Geodetic%20Datum%202000%20Projections-%20version%202_4.pdf
