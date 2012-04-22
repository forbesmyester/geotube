(function() {
    var parse = function(csvAsString) {
        var rows = csvAsString.split("\n"),
            headings = rows.shift().split(','),
            count = rows.length,
            ret = [];
        for (var i=0;i<count;i++) {
            var _row = rows[i].split(',');
            var row = {};
            for (var j=0;j<_row.length;j++) {
                row[headings[j]] = _row[j];
            }
            ret.push(row);
        }
        return ret;
    };
    define([],{'parse':parse});
}).call(this);