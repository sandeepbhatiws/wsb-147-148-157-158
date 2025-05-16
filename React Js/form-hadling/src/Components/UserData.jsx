import React from 'react'

export default function UserData({userInfo, setUserInfo,singleUser, setSingleUser}) {

    const deleteUser = (index) => {
        if(confirm('Are you sure you want to delete ?')){
            userInfo.splice(index,1);
            localStorage.setItem('user_info',JSON.stringify(userInfo));

            const getData = localStorage.getItem('user_info');
            const users = JSON.parse(getData);
            setUserInfo(users);
        }
        
    }

    const editUser = (index) => {
        var getUser = userInfo.filter((v,i) => {
            if(index == i){
                return v;
            }
        })

        // console.log(getUser);

        var data = {
            id: index,
            name : getUser[0].name,
            email : getUser[0].email,
            mobile_number : getUser[0].mobile_number,
            country_name : getUser[0].country_name,
            state_name : getUser[0].state_name
        }

        setSingleUser(data);
    }

  return (
    <>
      <div class="table-container">
        <h2>User Data</h2>
        <table id="data-table" border="1">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Country</th>
                    <th>State</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody id="fetch-data">

                {
                    userInfo.length > 0
                    ?
                    userInfo.map((v,i) => {
                        return(
                            <tr>
                                <td>{ i+1 }</td>
                                <td>{ v.name }</td>
                                <td>{v.email}</td>
                                <td>{v.mobile_number}</td>
                                <td>{v.country_name}</td>
                                <td>{v.state_name}</td>
                                <td>
                                    <button onClick={ () => editUser(i) } >Edit</button>
                                    <button onClick={ () => deleteUser(i) } >Delete</button>
                                </td>
                            </tr>
                        )
                    })
                    :
                    <tr>
                        <td colSpan={7}>No Record Found !!</td>
                    </tr>
                }
                
            </tbody>
        </table>
    </div>
    </>
  )
}
