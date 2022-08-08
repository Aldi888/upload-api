import "reflect-metadata";
import { resolve } from 'path'
import {createConnection} from "typeorm";
import * as express from "express";
import routes from "./routes";

var cors = require('cors')

const app = express();
console.log(resolve(__dirname,'..', 'uploads'))
app.use(cors())

app.use('/files', express.static(resolve(__dirname,'..', 'uploads')))
app.use(express.json());
app.use(routes);
app.listen(3333);
