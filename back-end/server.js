import express, {json} from 'express'
import {celebrate, Segments, Joi} from 'celebrate'
import cliente from './config/db.js'
import cors from 'cors'

import { insProducts, delProducts } from './controllers/insProductsControllers.js'

const server = express()

const produtos = []

server.use(express.json())
server.use(cors())

server.get('/', async (req, res) => {
    const resultado = await cliente.query('SELECT * FROM products')
    res.json(resultado.rows)
})

server.post('/products', async (req, res) => {
    const {'product-type': productType, price} = req.body

    try {
        await insProducts(productType, price);
        res.status(201).json('Inserido');

        const newProduct = { 'product-type': productType, price }
        produtos.push(newProduct)
    }

    catch (ex) {
        res.status(500).send('Erro no server' +ex)
    }
})

// Método de Segurança contra SQL INJECTION, para aceitar somente numeros como parametros
server.delete('/products/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.number().required()
    }
}), async (req, res) => {
    const {id} = req.params

    try {
        await delProducts(id) //converter em inteiro para db aceitar no tipo integer
        res.status(200).json({message: 'Delete Sucessfully'})
    }

    catch(ex) {
        console.log('Erro servidor' +ex)
    }
})

process.on('SIGTERM', async() => {
    console.log('Fechando servidor...')

    await cliente.end()
    console.log('Desconectado')

    process.exit(0)
})

server.listen({
    port: 3000
})