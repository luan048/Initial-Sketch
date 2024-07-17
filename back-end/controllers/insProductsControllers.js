import cliente from '../config/db.js'

export async function insProducts(product, price) {
    try {
        const productId = Math.floor(1000 + Math.random() * 9000)

        await cliente.query('INSERT INTO products("id", "product-type", "price") VALUES ($1, $2, $3)', [productId, product, price])
        console.log('inserido')
    }

    catch(ex) {
        console.log(ex)
    }
}

export async function delProducts(id) {
    try {
        await cliente.query('DELETE FROM products WHERE id = $1', [id])
        console.log('deletado')
    }

    catch(ex) {
        console.log(ex)
    }
}