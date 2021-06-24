import React, {useEffect, useState} from 'react';
import Wrapper from "../../components/Wrapper";
import {Link} from "react-router-dom";
import axios from "axios";
import {Product} from "../../models/product";
import Paginator from "../../components/Paginator";

const Products = () => {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)

  useEffect(() => {
    (
      async () => {
        const {data} = await axios.get(`/products?page=${page}`)
        setProducts(data.data)
        setLastPage(data.meta.last_page)
      }
    )()
  },[page])

  const deleteProduct = async (id: number) => {
    if (window.confirm('Are you sure to want to delete this product?')) {
      await axios.delete(`/products/${id}`)
      setProducts(products.filter((product: Product) => product.id !== id))
    }
  }

  return (
    <>
      <Wrapper>
        <div className="pt-3 pb-2 mb-3 border-bottom">
          <Link to={'/products/create'} className="btn btn-sm btn-outline-info">
            Add
          </Link>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {
              products.map((product: Product) => {
                return (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>
                      <img src={product.image} width="50" alt={`product_image_${product.id}`} />
                    </td>
                    <td>{product.title}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>
                      <div className="btn-group mr-2">
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteProduct(product.id)}
                        >
                          Delete
                        </button>
                        <Link to={`/products/${product.id}/edit`} className="btn btn-sm btn-outline-primary">
                          Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                )
              })
            }
            </tbody>
          </table>
        </div>
        <Paginator page={page} lastPage={lastPage} pageChange={setPage} />
      </Wrapper>
    </>
  );
};

export default Products;
