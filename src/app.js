const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

// define paths for express config
const publicDirectoryPath = path.join(__dirname,"../public")
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')


// setup handlebars engine and views location
app.set('view engine','hbs') //view folder me hbs file dekhne ke liye
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// setup static directory to use
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{  //hbs me daalne ke liye render
        title:'Weather',  //use karte hain
        name:'Andrew'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About",
        name:"someone"
    })
})

app.get("/help",(req,res)=>{
    res.render('help',{
        title:"Help",
        name:'someone',
        exampleMessage:"this is a help page"
    })
})


// app.get('',(req,res)=>{
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help',(req,res)=>{
//     res.send([{
//         name:"shubham",
//         age:21
//     },{
//         name:"tanya"
//     }])
// })

// app.get("/about",(req,res)=>{
//     res.send("<h1>about page</h1>")
// })

app.get("/weather",(req,res)=>{
if(!req.query.address){
    return res.send({
        error:"please provide an address"
        })
    }

    // res.send({
    //     forecast:"35 degress",
    //     location:"raipur",
    //     address:req.query.address
    //     })
        geocode(req.query.address,(error,{latitude,longitude,location}={})=>{

            if(error){
                return res.send({error:error})
            }
              //forecast(data.latitude, data.longitude, (error, forecastData) => {
                forecast(latitude, longitude, (error, forecastData) => {
                    if(error){
                        return res.send({error:error})
                    }
                  //console.log(data.location)
                    res.send({
                        location:location,
                        forecast:forecastData,
                        address:req.query.address
                    })
                    
                })   
        })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: "you must provide a search term"
        })
    }


    console.log(req.query.search)

    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render("404",{
        title:"404 help page",
        name:"someone",
        errorPage:"help article not found"
    })
})

app.get('*',(req,res)=>{ //ye page humesha last me ayega
    res.render("404",{
        title:404,
        name:"ssomeone",
        errorPage:"page not found"
    })
})




app.listen(port,()=>{
    console.log("server is up on port port")
})