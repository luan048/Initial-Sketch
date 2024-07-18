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
        setProducts([...products, {id: userId, 'product-type': inputProduct, price: inputPrice}])
      })
      .catch(error => {
        console.log(error)
      })
  }

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
    </>
  )
}


export default App