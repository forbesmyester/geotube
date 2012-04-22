<?php
passthru('wget http://download.dojotoolkit.org/release-1.7.2/dojo-release-1.7.2.tar.gz');
passthru('tar -zxf dojo-release-1.7.2.tar.gz');
passthru('mv dojo-release-1.7.2/d* client/javascript/');
passthru('rm -rf dojo-release-1.7.2*');
passthru('wget http://www.doogal.co.uk/LondonStationsCSV.php -O client/data.csv');
