import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PlusCircleOutlined } from '@ant-design/icons'
import useAuth from 'src/hook/useAuth'
import './style.scss'

export const Listsong = () => {
    const { user } = useAuth()
    // const [vehicleList, setVehicleList] = useState([])

    const handleGetImageError = (e) => {
        
    }
    const vehicleList = [
       	{
            avatar : '123',
            license_plate: '1238281'
        },
        {
            avatar : '123',
            license_plate: '123'
        },

    ]

    const navigate = useNavigate()


    return (
        <div className="vehicles-list-container">
            <div className="vehicles-list-container__button-add">
                <Link to="/addsong">
                    <button>
                        <PlusCircleOutlined className="icon" />
                        Add song
                    </button>
                </Link>
            </div>
            <div className="vehicles-list-container__content">
                {vehicleList?.map((vehicle) => (
                    <div
                        className="vehicles-list-container__content__sub"
                        // onClick={() => onClickHandler(vehicle.id)}
                    >
                        <div className="vehicles-list-container__content__item">
                            <img
                                className="vehicles-list-container__content__item__image"
                                src={
                                    process.env.REACT_APP_API_URL +
                                    vehicle.avatar
                                }
                                alt=""
                                onError={handleGetImageError}
                            />
                            <div className="vehicles-list-container__content__item__info">
                                <div>
                                    <span className="span1">Biển số</span>
                                    <span className="span2">
                                        {vehicle.license_plate}
                                    </span>
                                </div>
                                <div>
                                    <span className="span1">Hãng xe</span>
                                    <span className="span2">
                                        {vehicle.brand}
                                    </span>
                                </div>
                                <div>
                                    <span className="span1">Màu</span>
                                    <span className="span2">
                                        {vehicle.color}
                                    </span>
                                </div>
                                <div>
                                    <span className="span1">Ngày đăng ký</span>
                                    <span className="span2">
                                        {vehicle.createdAt}
                                    </span>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
