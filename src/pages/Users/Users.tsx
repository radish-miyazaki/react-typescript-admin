import React, { useEffect, useState } from 'react';
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import { User } from "../../models/user";
import { Link } from 'react-router-dom';
import Paginator from "../../components/Paginator";

const Users = () => {

  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)

  useEffect(() => {
    (
      async () => {
        const { data } = await axios.get(`/users?page=${page}`)
        setUsers(data.data)
        setLastPage(data.meta.last_page)
      }
    )()
  },[page])

  const deleteUser = async (id: number) => {
    if (window.confirm('Are you sure to delete this record?')) {
      // バックエンドで削除
      await axios.delete(`/users/${id}`)

      // TODO: deleteの戻り値でIDを受け取って、その値を用いてフロントで削除したほうがbetter
      setUsers(users.filter((user: User) => user.id !== id)) // フロントでも削除
    }
  }

  return (
    <>
      <Wrapper>
        <div className="pt-3 pb-2 mb-3 border-bottom">
          <Link to={'/users/create'} className="btn btn-sm btn-outline-info">
            Add
          </Link>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {
              users.map((user: User) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.first_name} {user.last_name}</td>
                    <td>{user.email}</td>
                    <td>{user.role.name}</td>
                    <td>
                      <div className="btn-group mr-2">
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteUser(user.id)}
                        >
                          Delete
                        </button>
                        <Link to={`/users/${user.id}/edit`} className="btn btn-sm btn-outline-primary">
                          Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                )}
              )
            }
            </tbody>
          </table>
        </div>
        <Paginator page={page} lastPage={lastPage} pageChange={setPage} />
      </Wrapper>
    </>
  );
};

export default Users;
