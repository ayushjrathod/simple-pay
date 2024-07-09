import express from 'express';
const app = express();
import cors from 'cors';
import dbConnect from './db.js';

//configs and middlewares
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    Credentials:true
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//importing routes
import userRouter from './routes/user.routes.js';
import accountRouter from './routes/account.routes.js';

//Decalaring Routes
app.use('/api/v1/user',userRouter);
app.use('/api/v1/account',accountRouter);

dbConnect()
    .then(()=>{
        app.listen(3000,()=>{
            console.log("server started at port 3000");
        });
    })
    .catch((err)=>{
        console.err(err);
    });  


