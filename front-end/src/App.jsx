import React from "react";
import axios from 'axios'

import './App.css'
import { useEffect, useState } from "react";

const api = axios.create({
  baseURL: 'http://localhost:3000'
})

function App() {
  const [products, setProducts] = useState([])
  const [inputProduct, setInputProduct] = useState('')
  const [inputPrice, setInputPrice] = useState('')

  useEffect(() => {
    api.get('/')
      .then(response => {
        setProducts(response.data)
      })
      .catch(error => console.log(error))
  }, [])

  const handleInputProduct = (event) => {
    setInputProduct(event.target.value)
  }

  const handleInputPrice = (event) => {
    setInputPrice(event.target.value)
  }

  const newProduct = () => {
    const userId = Math.floor(1000 + Math.random() * 9000)

    api.post('/products', {
      id: userId,
      'product-type': inputProduct,
      price: inputPrice
    })
      .then(response => {
        console.log(response)
      })

      .catch(error => {
        console.log(error)
      })

      window.location.reload()
  }

  const totalPrice = products.reduce((total, product) => {
    const  priceString = product.price ? product.price.replace('R$', '').replace('.', '').replace(',', '.').trim() : '0'
    const price = parseFloat(priceString) || 0

    return total + price
  }, 0).toFixed(2)

  const formattedTotalPrice = parseFloat(totalPrice).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})

  return (
    <>
      <div className="container">
        <h1>Inserir Produtos</h1>
        <input type="text" className="inputProduct" placeholder="Product" value={inputProduct} onChange={handleInputProduct} />
        <input type="text" className="inputPrice" placeholder="Price" value={inputPrice} onChange={handleInputPrice} />
        <button onClick={newProduct} className="button">Enviar</button>
      </div>

      <div className="listProducts">
        {products.map(product => (
          <div key={product.id}>
            <i className="product-type">{product['product-type']}</i>
            <i className="price">{product.price}</i>
          </div>
        ))}
      </div>

      <div className="totalPrice">
        <h3>Total a pagar: R$ {formattedTotalPrice}</h3>
      </div>
    </>
  )
}


export default App