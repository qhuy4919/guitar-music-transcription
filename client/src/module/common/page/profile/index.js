import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { EditOutlined } from '@ant-design/icons'
import auth from 'src/access/auth'
import './style.scss'

export const Profile = () => {

    const [user, setUser] = useState({})
    
    useEffect(() => {

        try {

            auth.getuser().then((response)=>{
                setUser(response.data)
            })

        } catch (error) {
        }
      },[])


    return (
        <div className="profile-content">
            <div className="title">
                <span>Profile</span>
                <Link
                    to={`/edit-profile`}
                    className="profile-content__button-edit"
                >
                    <EditOutlined />
                </Link>
            </div>

            <div className="profile-content__sub">

                <div className="profile-content__sub__info">
                    <div>
                        <span className="properties">Name</span>
                        <span>{user.name}</span>
                    </div>
                    <div>
                        <span className="properties">Username</span>
                        <span>{user.username}</span>
                    </div>
                    <div>
                    <span className="properties">Email</span>
                        <span>{user.email}</span>
                    </div>
                    <div>
                    <span className="properties">Password</span>
                        <span>*********</span>
                    </div>
                    <div>
                    <span className="properties"> </span>
                        <span>                        
                            <a className="create-account" href="/change-password">
                            Change password
                        </a></span>
                    </div>
                </div>
            </div>
        </div>
    )

}
