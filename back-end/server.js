import express, {json} from 'express'
import cliente from './config/db.js'

import { insProducts, delProducts } from './controllers/insProductsControllers.js'

const server = express()

server.use(express.json())

server.get('/', async (req, res) => {
    const resultado = await cliente.query('SELECT * FROM products')
    res.json(resultado.rows)
})

server.post('/products', async (req, res) => {
    const {product, price} = req.body

    try {
        await insProducts(product, price)
        res.json('inserido')
    }

    catch (ex) {
        res.status(500).send('Erro no server' +ex)
    }
})

server.delete('/products/:id', async (req, res) => {
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