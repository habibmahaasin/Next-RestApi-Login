import { getCookie,deleteCookie } from 'cookies-next';
import useSWR from 'swr'
const axios = require('axios');

const fetchApi = async ({res,req}) => {
    const cookie = getCookie('token',{ req, res });
    
    const resp = axios.get('http://localhost:8080/api/v1/user/',{
        headers: {
            'Content-Type': 'application/json',
            'access-token': cookie
        }
    })
    .then(response => response.data)
    .catch(function (error) {
        error
        window.location.href = "/";
    })
    
    return resp
}

export default function Dashboard(){
    const { data, error } = useSWR('dashboard',fetchApi)
    if(error) return 'Error'
    if(!data) return 'loading...'
    
    const logout = () => {
        deleteCookie('token');
        window.location.href = "/dashboard";
    }

    return (
        <div>
            <div className="overflow-x-auto mt-8">
                <h2><b>Daftar User</b></h2>
                <table className="table table-compact w-full mt-4">
                    <thead>
                    <tr>
                        <th>user id</th> 
                        <th>Name</th> 
                        <th>Email</th> 
                    </tr>
                    </thead> 
                    <tbody>
                    {data.data.map((d) => {
                        return(
                            <tr key={d.user_id}>
                                <th>{d.user_id}</th> 
                                <td>{d.name}</td> 
                                <td>{d.email}</td> 
                            </tr>
                    )})}
                    </tbody> 
                </table>

                <div className="mt-4">
                    <a href="#logout" className="btn">Logout</a>
                    <div className="modal" id="logout">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Confirmation</h3>
                            <p className="py-4">Are you sure you want to quit?</p>
                            <div className="modal-action">
                                <a href='#' onClick={logout} className="btn">Yes</a>
                                <a href='/dashboard' className="btn btn-outline">No</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}