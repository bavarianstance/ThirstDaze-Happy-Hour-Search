function createCenter(coords) {

   var center = {};
   var latTotal = 0;
   var longTotal= 0;
   var latAvg;
   var longAvg;

   for (var i = 0; i < coords.length; i++) {
       latTotal += coords[i].lat;
       longTotal += coords[i].long;

   }

   latAvg = latTotal/coords.length;
   longAvg = longTotal/coords.length;

   center.lat = latAvg;
   center.lng = longtAvg;


   return center;
}