import React, {SyntheticEvent, useEffect, useState} from 'react';
import axios from "axios";
import {Redirect} from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import ImageUpload from "../../components/ImageUpload";

const ProductEdit: React.FC<any> = (props) => {

  const id = props.match.params.id
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [price, setPrice] = useState(0)
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    (
      async () => {
        const {data} = await axios.get(`/products/${id}`)
        setTitle(data.title)
        setDescription(data.description)
        setImage(data.image)
        setPrice(data.price)
      }
    )()
  }, [id])

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault()

    await axios.put(`/products/${id}`, {
      title,
      description,
      image,
      price
    })

    setRedirect(true)
  }

  if (redirect) {
    return <Redirect to={'/products'} />
  }

  return (
    <>
      <Wrapper>
        <form onSubmit={submit}>
          <div className="mb-3">
            <label>Title</label>
            <input onChange={(e) => setTitle(e.target.value)}
                   className="form-control"
                   value={title}
            />
          </div>
          <div className="mb-3">
            <label>Description</label>
            <textarea onChange={(e) => setDescription(e.target.value)}
                      className="form-control"
                      value={description}
            />
          </div>
          <div className="mb-3">
            <label>Image</label>
            <div className="input-group">
              <input onChange={(e) => setImage(e.target.value)}
                     className="form-control"
                     value={image}
              />
              <ImageUpload uploaded={setImage} />
            </div>
          </div>
          <div className="mb-3">
            <label>Price</label>
            <input onChange={(e) => setPrice(parseInt(e.target.value))}
                   type="number"
                   className="form-control"
                   value={price}
            />
          </div>
          <button className="btn btn-outline-info">Save</button>
        </form>
      </Wrapper>
    </>
  );
};

export default ProductEdit;
