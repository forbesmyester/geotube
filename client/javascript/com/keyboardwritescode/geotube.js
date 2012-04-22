(function() {    
define(['com/keyboardwritescode/utils/csv'], function(csv) {

    // StationObj: {'lat':n,'lng':n,'name':s}
    // OffsetAndScale: {'offsetx':n,'scalex':n,'offsety':n,'scaley':n} Transformations to get to a position in canvas
    // CanvasPosition: {'x':n,'y':n}
    // CanvasDimensions: {'h':n,'w':n}
    // 
    
    // Return OffsetAndScale
    var findOffsetAndScaleForStations = function(stations,canvasDimensions) {
        var maxY = -1,
            minY = -1,
            maxX = -1,
            minX = -1;
        var cmpY = function(station) {
            var pos = 0 - station.lat;
            if ((maxY === -1) || (pos > maxY))
            {
                maxY = pos;
            }
            if ((minY === -1) || (pos < minY))
            {
                minY = pos;
            }
        }
        var cmpX = function(station) {
            if ((maxX === -1) || (station.lng > maxX))
            {
                maxX = station.lng;
            }
            if ((minX === -1) || (station.lng < minX))
            {
                minX = station.lng;
            }
        }
        var offsetScale = function(min,max,length) {
            // get min to 0
            var offset = (0 - min);
            max = max + offset;
            return [offset,(length / max)];
        }
        for (var i=0;i<stations.length;i++) {
            cmpX(stations[i]);
            cmpY(stations[i]);
        }
        var xos = offsetScale(minX,maxX,canvasDimensions.w);
        var yos = offsetScale(minY,maxY,canvasDimensions.h);
        return {'offsetx':xos[0],'scalex':xos[1],'offsety':yos[0],'scaley':yos[1]};
    };
    
    var stationCoordinates = function(stations,canvasDimensions) {
        var offsetAndScale = findOffsetAndScaleForStations(stations,canvasDimensions)
        // Return CanvasPosition
        var findCanvasPositionOfStation = function(stationObj) {
            x = (stationObj.lng+offsetAndScale.offsetx)*offsetAndScale.scalex;
            y = ((0-stationObj.lat)+offsetAndScale.offsety)*offsetAndScale.scaley;
            return {'x':x,'y':y};
        }
        var stationLength = stations.length;
        var r = [];
        for (var i=0;i<stationLength;i++) {
            r.push(findCanvasPositionOfStation(stations[i]));
        }
        return r;
    };
    
    var buildStationFromCsv = function(stationCsv) {
        var rows = csv.parse(stationCsv),
            rowCount = rows.length,
            r = [];
        for (var i=0;i<rowCount;i++) {
            var row = rows[i];
            r.push({'lat':parseFloat(row['Latitude']),'lng':parseFloat(row['Longitude']),'name':row['Station']});
        }
        return r;
    }
    
    return {
        'stationCoordinates':stationCoordinates,
        'buildStationsFromCsv':buildStationFromCsv
    };
    
});
}).call(this);