const request=require('request')

const geocode=(address,callback)=>{
    const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2h1YmhhbWtoYW5kZWthciIsImEiOiJja2F3bzQ0Z3YzeDZlMnRwNjZqdW8wYnl3In0.paObXzNaun_EOG_0CSNmbg&limit`

    request({url,json:true},(error,{body}={})=>{

        if(error){
            callback("unable to connect to location services",undefined)
        }else if(body.features.length===0){
            callback('unable to find location, try another search',undefined)
        }else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
    
            })
        }

    })
}
/*
//geocoding service
//Address -> lat/long -> weather
const geocodeUrl="https://api.mapbox.com/geocoding/v5/mapbox.places/12what.json?access_token=pk.eyJ1Ijoic2h1YmhhbWtoYW5kZWthciIsImEiOiJja2F3bzQ0Z3YzeDZlMnRwNjZqdW8wYnl3In0.paObXzNaun_EOG_0CSNmbg&limit"

request({url: geocodeUrl,json:true},(error,response)=>{
    if(error){
        console.log("unable to connect")
    }else if(response.body.features.length===0){
        console.log("unable to find the location")
    }else{
        const latitude=response.body.features[0].center[1]
        const longitude=response.body.features[0].center[0]
    
        console.log(latitude,longitude)
    }

})
*/
module.exports=geocode