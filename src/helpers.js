export function generateData(city, count){
    let data = [];
    let timestamps = 0;
    for (let i = 0; i < count; i++){
        timestamps+=5;
        for (let i = 0; i < Math.random()*10; i++){
            data.push({
                "value": randn_bm(0, 10000, 4.5),
                "path": [
                    coordGen(city),
                    coordGen(city),
                ],
                "timestamps": [
                    timestamps, timestamps+5
                ]
            });
        }
    }
    console.log(data);
}

function coordGen(city){
    let longMin,longMax,latMin,latMax, long, lat;
    if (city === "toronto"){
        longMin = 79.617;
        longMax = 79.157;
        latMin = 43.893;
        latMax = 43.613;
        long = (Math.random() * (longMax-longMin) + longMin).toFixed(3)*-1;
        lat = (Math.random() * (latMax-latMin) + latMin).toFixed(3) * 1;
    }
    else if (city === "vancouver"){
        longMin = 122.742;
        longMax = 123.245;
        latMin = 49.011;
        latMax = 49.392;
        long = (Math.random() * (longMax-longMin) + longMin).toFixed(3) * -1;
        lat = (Math.random() * (latMax-latMin) + latMin).toFixed(3) * 1;
    }
    return [long,lat];
}
//
function randn_bm(min, max, skew) {
    let u = 0, v = 0;
    while(u === 0) u = Math.random() //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random()
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v )
    
    num = num / 10.0 + 0.5 // Translate to 0 -> 1
    if (num > 1 || num < 0) 
        num = randn_bm(min, max, skew) // resample between 0 and 1 if out of range
    
    else{
        num = Math.pow(num, skew) // Skew
        num *= max - min // Stretch to fill range
        num += min // offset to min
    }
    return num
}