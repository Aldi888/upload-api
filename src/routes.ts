import { Router, Request, Response, RouterOptions } from 'express';
import { multerConfig } from './config/multer'
import { resolve } from 'path'
import * as multer from 'multer'

var cors = require('cors')
const routes = Router();
const fs = require('fs')
const contentPage = 10;
const nReadlines = require('n-readlines');

routes.use(cors())
routes.get('/', (request: Request, response: Response) => {
    return response.json({ message: 'Hello from Avalie' })
})

routes.post('/upload', multer(multerConfig).single('file'), (request: Request, response: Response) => {
    
    console.log(request.file.filename)
    fs.appendFile(resolve(__dirname, '..', 'files.csv'), request.file.filename + '\r\n', (err) => {console.log(err)})
    return response.json({ filename: request.file.filename })
})

routes.get('/listFiles/:page?', (req: Request, res: Response) => {
    
    const broadbandLines = new nReadlines(resolve(__dirname, '..', 'files.csv'));
    let line
    const files = []
    while(line = broadbandLines.next())
        files.push(line.toString())
    res.send(files)
})


export default routes;