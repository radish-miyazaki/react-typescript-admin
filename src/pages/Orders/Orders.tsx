import React, {useEffect, useState} from 'react';
import Wrapper from "../../components/Wrapper";
import Paginator from "../../components/Paginator";
import axios from "axios";
import {Order} from "../../models/order";
import {OrderItem} from "../../models/orderItem";

const hide = {
  maxHeight: 0,
  transition: '500ms ease-in'
}

const show = {
  maxHeight: '150px',
  transition: '500ms ease-out'
}

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    (
      async () => {
        const {data} = await axios.get('/orders')
        setOrders(data.data)
        setLastPage(data.meta.last_page)
      }
    )()
  },[page])

  const select = (id: number) => {
    setSelected(selected !== id ? id : 0)
  }

  const exportCSV = async () => {
    const {data} = await axios.post('/orders/export', {},{responseType: 'blob'});
    const blob = new Blob([data], {type: 'text/csv'})
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'orders.csv'
    link.click()
  }

  return (
    <>
      <Wrapper>
        <div className="pt-3 pb-2 mb-3 border-bottom">
          <button className="btn btn-sm btn-outline-success" onClick={exportCSV}>
            Export CSV
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {
              orders.map((order: Order) => {
                return (
                  <React.Fragment key={order.id}>
                    <tr>
                      <td>{order.id}</td>
                      <td>{order.name}</td>
                      <td>{order.email}</td>
                      <td>{order.total}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => select(order.id)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={5}>
                        <div className="overflow-hidden"
                             style={selected === order.id ? show : hide}
                        >
                          <table className="table table-sm">
                            <thead>
                            <tr>
                              <th>ID</th>
                              <th>Product Title</th>
                              <th>Quantity</th>
                              <th>Price</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                              order.order_items.map((item: OrderItem) => (
                                <tr key={item.id}>
                                  <td>{item.id}</td>
                                  <td>{item.product_title}</td>
                                  <td>{item.quantity}</td>
                                  <td>{item.price}</td>
                                </tr>
                                )
                              )
                            }
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
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

export default Orders;
