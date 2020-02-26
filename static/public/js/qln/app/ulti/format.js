
     chuyentien = function(tien){

            tien = (tien+'').replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            return tien
    
    }
