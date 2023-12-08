config();
import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser"
import{config} from 'dotenv';
import morgan from 'morgan';
import userRoutes from './routes/user.routes.js'
import errorMiddleware from './middleware/error.middleware.js';
import courseRoutes from './routes/course.routes.js';
import miscRoutes from "./routes/miscelleneous.routes.js"
import paymentRoutes from "./routes/payment.routes.js"

config();

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors({
origin:[process.env.FRONTEND_URL],
credential:true
}))

app.use(cookieParser());

app.use(morgan('dev'));

app.get('/ping',(_req,res) => {
    res.send('/pong');
});

app.use('/api/v1/user',userRoutes);
app.use('/api/v1/courses',courseRoutes);
app.use('/api/v1/payments',paymentRoutes);
app.use('/api/v1/payments',miscRoutes);



app.all('*',(_req,res)=>{
res.status(404).send('opps!! 404 page is not found')
})
app.use(errorMiddleware);

export default app;