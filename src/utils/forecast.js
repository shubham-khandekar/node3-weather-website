const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=0115f0bc96a966632df5fbec05edb1bd&query=${latitude},${longitude}&units=m`

//  request({url,json:true},(error,response)=>{
    request({url,json:true},(error,{body}={})=>{ //ye body property response ke ander ka hai
        if(error){
            callback("unable to connect",undefined)
    //  }else if(response.body.error){
        }else if(body.error){
            callback("unable to find location",undefined)
        }else{
            // callback(undefined,`${response.body.current.weather_descriptions[0]} it is currently ${response.body.current.temperature} degrees out. it feels like ${response.body.current.feelslike} degrees out`)
            callback(undefined,`${body.current.weather_descriptions[0]} it is currently ${body.current.temperature} degrees out. it feels like ${body.current.feelslike} degrees out and it has wind speed ${body.current.wind_speed}`)
        }
})
}

module.exports=forecast