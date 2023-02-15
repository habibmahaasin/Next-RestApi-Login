import { getCookie,deleteCookie } from 'cookies-next';

export default function Dashboard({userData}){
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
                    {userData.map((data) => {
                        return(
                            <tr key={data.user_id}>
                                <th>{data.user_id}</th> 
                                <td>{data.name}n</td> 
                                <td>{data.email}</td> 
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

export async function getServerSideProps({req,res}){
    const cookie = getCookie('token',{ req, res });

    if (cookie === undefined || cookie === null || cookie === "") {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    const resp = await fetch('http://localhost:8080/api/v1/user',{
        method : 'GET',
        headers : {
            'Content-Type': 'application/json',
            'access-token': cookie
        }
    })
    const data = await resp.json();

    if (data.status_code === 200) {
        return {
            props:{
                userData : data.data,
            }
        }
    } else{
        deleteCookie('token',{req, res});
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
}