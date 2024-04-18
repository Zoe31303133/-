    function role() {  
    
    const [selected_role, setSelectedRole] = useState();
    const [permissions,setPermissions] = useState();


    function handleSelect(e) {
      
        axios.get('/role_permissions/'+e.target.value).then((response)=>{
          setPermissions(response.data);
        /* permissions 回傳格式如下，permission有null/4/3/2/1五個等級：
            {
                "App\\Models\\Order": null,
                "App\\Models\\Product": null,
                "App\\Models\\Role": 1,
                "App\\Models\\Stock_ingredient": 3,
                "App\\Models\\Stock_product": 2,
                "App\\Models\\User": 1,
            }
        */
        
        setSelectedRole(e.target.value);
        
        
        });
    }

return(
   <>
    <select defaultValue="職位名稱" onChange={handleSelect}></select>

    {selected_role &&
              
        <div>
          <table >
            <thead>
              <tr>
                <th >
                </th>
                <th>無權限</th>
                <th>檢視</th>
                <th>回報</th>
                <th>編輯</th>
                <th>新增/刪除</th>
              </tr>
            </thead>
            <tbody>

              {permissions &&
                Object.keys(permissions).map((resource)=>{
                  return (
                    <tr>
                      <td>{resource}</td>
                      <td>
                        <input  type="radio" name={resource}  {...(permissions[resource]==null?{defaultChecked:'true'}:{})}></input>
                      </td>
                      <td>
                        <input  type="radio" name={resource}  {...(permissions[resource]==4?{defaultChecked:'true'}:{})}></input>
                      </td>
                      <td>
                        <input  type="radio" name={resource}  {...(permissions[resource]==3?{defaultChecked:'true'}:{})}></input>
                      </td>
                      <td>
                        <input  type="radio" name={resource}  {...(permissions[resource]==2?{defaultChecked:'true'}:{})}></input>
                      </td>
                      <td>
                        <input  type="radio" name={resource}  {...(permissions[resource]==1?{defaultChecked:'true'}:{})}></input>
                      </td>
                    </tr>
                  );
                })
              }
              </tbody>

            </table>
        </div>
    }  
    </>
    )
}