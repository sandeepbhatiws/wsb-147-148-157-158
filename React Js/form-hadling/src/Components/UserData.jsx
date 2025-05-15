import React from 'react'

export default function UserData({userInfo, setUserInfo}) {
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
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody id="fetch-data">
                {
                    userInfo.map((v,i) => {
                        return(
                            <tr>
                                <td>1</td>
                                <td>Test</td>
                                <td>Test</td>
                                <td>Test</td>
                                <td>Test</td>
                                <td>Test</td>
                                <td>
                                    <button>Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
                
            </tbody>
        </table>
    </div>
    </>
  )
}
