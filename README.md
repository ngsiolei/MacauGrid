Simple script to convert Macau Grid coordinate into Latitude/Longitude

### Example

    <script src="./MacauGrid.js"></script>
    <script>
    var mg = new MacauGrid();
    var pt = {'E': 20800.08, 'N': 18145.04};
    var cartesian = mg.toWgs84Cartesian(pt.E, pt.N);
    var geo = mg.toWgs84Geodetic(cartesian.east, cartesian.north);
    console.log(geo); // {'lat': 22.194444429765454, 'long': 113.54722220609713}
    </script>

### References

1. https://mosref.dscc.gov.mo/Help/ref/Macaucoord_2009_web_CT_v201702.pdf
2. https://www.linz.govt.nz/regulatory/25703
