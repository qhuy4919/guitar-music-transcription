import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { EditOutlined } from '@ant-design/icons'
import auth from 'src/access/auth'
import './style.scss'

export const Profile = () => {

    // const { id } = useParams()
    // const [user, setUser] = useState({})
    
    // useEffect(async() => {

    //     try {
    //         // console.log(values)
    //         const response = await auth.getuser() 
    //         console.log("abc",response)
    //         if (response.request.status === 200) {
                
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }

    //     // settab({'bpm':bpm,'notes':str})
        
    //   })


    const handleGetImageError = (e) => {
        // e.target.src = defaultImageUrl.USER_AVATAR
    }

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
                <div className="profile-content__sub__avatar">
                    <img
                        // src={
                        //     process.env.REACT_APP_API_URL +
                        //     user.UserInfo?.avatar
                        // }
                        alt="avatar"
                        onError={handleGetImageError}
                    />
                </div>

                <div className="profile-content__sub__info">
                    <div>
                        <span className="properties">Tên</span>
                        {/* <span>{user.name}</span> */}
                        <span>nguyen pham nhat hao</span>
                    </div>
                    <div>
                        <span className="properties">Email</span>
                        {/* <span>{user.email}</span> */}
                        <span>gmail@gmail.com</span>
                    </div>
                    <div>
                        <span className="properties">Giới tính</span>
                        {/* <span>{user.UserInfo?.gender ? 'Nam' : 'Nữ'}</span> */}
                        <span>Nam</span>
                    </div>
                    <div>
                        <span className="properties">Ngày sinh</span>
                        {/* <span>
                            {new Date(
                                user.UserInfo?.birthday,
                            ).toLocaleDateString('en-GB')}
                        </span> */}
                        <span>1/1/2001</span>
                    </div>
                    <div>
                        <span className="properties">Địa chỉ</span>
                        {/* <span>{user.UserInfo?.address}</span> */}
                        <span>da nang city</span>
                    </div>
                    <div>
                        <span className="properties">Số điện thoại</span>
                        {/* <span>{user.UserInfo?.phone_number}</span> */}
                        <span>0123456789</span>
                    </div>
                </div>
            </div>
        </div>
    )

}
