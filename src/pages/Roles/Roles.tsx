import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Role} from "../../models/role";
import Wrapper from "../../components/Wrapper";
import axios from "axios";

const Roles = () => {
  const [roles, setRoles] = useState([])

  useEffect(() => {
    (
      async () => {
        const { data } = await axios.get(`/roles`)
        setRoles(data)
      }
    )()
  },[])

  const deleteRole = async (id: number) => {
    if (window.confirm('Are you sure to want to delete this role?')) {
      await axios.delete(`/roles/${id}`)
      setRoles(roles.filter((role: Role) => role.id !== id))
    }
  }

  return (
    <Wrapper>
      <div className="pt-3 pb-2 mb-3 border-bottom">
        <Link to={'/roles/create'} className="btn btn-sm btn-outline-info">
          Add
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {
            roles.map((role: Role) => {
              return (
                <tr key={role.id}>
                  <td>{role.id}</td>
                  <td>{role.name}</td>
                  <td>
                    <div className="btn-group mr-2">
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteRole(role.id)}
                      >
                        Delete
                      </button>
                      <Link to={`/roles/${role.id}/edit`} className="btn btn-sm btn-outline-primary">
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
    </Wrapper>
  );
};

export default Roles;
