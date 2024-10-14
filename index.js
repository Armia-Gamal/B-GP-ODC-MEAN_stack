    const express = require("express");
    const app = express();  
    const contactroutes = require("./routes/contactroutes");
    const Bookroutes = require("./routes/Bookroutes");
    const categoriesroutes = require("./routes/categoriesroutes");
    const userRoutes = require("./routes/usersroutes");
    const adminRoutes = require("./routes/Adminroutes"); 
    const path = require('node:path');
    const mongoose = require("mongoose");
    const { cookie } = require("express/lib/response");
    const cors = require('cors');
    const cookieParser = require('cookie-parser'); 
    const dotenv = require('dotenv').config({ path: './.env' });
        app.listen(process.env.PORT,()=>{
        console.log('Server Started');
    })

    mongoose.connect(process.env.DB).then(()=>{
            console.log('MongoDB Connected')
        })

    app.use(cookieParser())
    app.use(express.json())

    app.use(cors({
        origin: process.env.localhost,    
        methods: 'GET,POST,PUT,DELETE', 
        credentials: true 
    }));
    app.use('/contact',contactroutes)
    app.use(express.static(path.join(__dirname, '')));

    app.use('/bookTable',Bookroutes)
    app.use('/users',userRoutes)
    app.use('/categories',categoriesroutes)     
    app.use('/admin', adminRoutes);
