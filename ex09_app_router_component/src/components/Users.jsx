import React from 'react';
import {Link} from "react-router-dom"
const Users = () => {

    //데이터 - 객체 배열
    const users = [
        {id:1, name:"김씨"},
        {id:2, name:"이씨"},
        {id:3, name:"박씨"}
    ];

    return (
        <div>
            <h1>사용자 목록</h1>
            {
                users.map(user => (
                    <li key={user.id}>
                        <Link to={`/user/${user.id}`}>{user.name}</Link>
                    </li>
                ))
            }
        </div>
    );
};

export default Users;