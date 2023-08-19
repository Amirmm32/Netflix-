import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

const UserProfile = () => {
    const [user, setUser] = useState({});
    const { userId } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                const requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    credentials: 'include',
                    redirect: 'follow',
                };
                const response = await fetch(`http://localhost:5000/api/users/own/${userId}`, requestOptions);
                const data = await response.json();
                if (!response.ok) throw new Error(`${data.message} (${response.status})`);
                setUser({...data.data});
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <section className="userprofile" id="userprofilecontainer">
            <div>
                <h2 className="heading f-s-40">Account</h2>
            </div>
            <div className="line"></div>
            <div className="membership d-flex flex-no-wrap space-between">
                <div className="left">
                    <h4 className="headline">MEMBERSHIP & BILLING</h4>
                    <button className="button">Cancel Membership</button>
                </div>
                <div className="right">
                    <div className="d-flex space-between">
                        <div className="heading f-s-40">
                            <strong>{user.firstName + " " + user.lastName}</strong>
                        </div>
                    </div>
                    <div className="d-flex space-between">
                        <div className="email">
                            <strong>{user.email}</strong>
                        </div>
                        <div className="link">
                            <a href="#" className="link-item">
                                Change account email
                            </a>
                        </div>
                    </div>

                    <div className="d-flex space-between">
                        <div className="password">
                            Password: *********
                        </div>
                        <div className="link">
                            <a href="#" className="link-item">
                                Change password
                            </a>
                        </div>
                    </div>

                    <div className="d-flex space-between">
                        <div className="email">
                            Phone: {user.phone}
                        </div>
                        <div className="link">
                            <a href="#" className="link-item">
                                Change phone number
                            </a>
                        </div>
                    </div>
                    <div className="line"></div>

                    <div className="carddetail d-flex space-between flex-middle">
                        <div className="card">
                            <h4><span className="icon-visa">VISA</span> •••• •••• •••• {user.visa ? user.visa.slice(-4) : <>••••</> }</h4>
                        </div>
                        <div className="link">
                            <a href="#" className="link-item">
                                Update payment info
                            </a>
                            <a href="#" className="link-item">
                                Billing details
                            </a>
                        </div>
                    </div>
                    <div className="line"></div>

                    <div className="gift-card d-flex direction-column">
                        <a href="#" className="link-item">
                            Redeem gift card or promo code
                        </a>
                        <a href="#" className="link-item">
                            Where to buy gift cards
                        </a>
                    </div>
                </div>
            </div>
            <div className="line"></div>

            {/* Plan Details */}
            <div className="plan-details d-flex flex-middle space-between">
                <div className="left">
                    <h4 className="headline">PLAN DETAILS</h4>
                </div>
                <div className="right d-flex space-between">
                    <p>{user.role}</p>
                    <a href="#" className="link-item">Change plan</a>
                </div>
            </div>
            <div className="line"></div>

            {/* Settings */}
            <div className="settings d-flex">
                <div className="left">
                    <h4 className="headline">SETTINGS</h4>
                </div>
                <div className="right d-flex direction-column">
                    <a href="#" className="link-item">Test participation</a>
                    <a href="#" className="link-item">Manage download devices</a>
                    <a href="#" className="link-item">Activate a device</a>
                    <a href="#" className="link-item">Recent device streaming activity</a>
                    <a href="#" className="link-item">Sign out of all devices</a>
                    <a href="#" className="link-item">Download your personal information</a>
                </div>
            </div>
            <div className="line"></div>
        </section>
    );
};

export default UserProfile;
