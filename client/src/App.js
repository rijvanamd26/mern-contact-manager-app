import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import FormTable from './components/FormTable';

axios.defaults.baseURL = 'http://localhost:8000/'

function App() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  })
  const [editformData, setEditFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    _id: "",
  })

  const [dataList,setDataList] = useState([])

  const handleOnChange = (e)=>{
    const {value,name} = e.target
    setFormData((preve)=>{
      return{
        ...preve,
        [name] : value
    }
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const data = await axios.post("/create",formData)
    console.log(data)
    if(data.data.success){
      setAddSection(false)
      alert(data.data.message)
      getFetchData()
    }
  }

  const getFetchData = async()=>{
    const data = await axios.get("/")
    console.log(data)
    if(data.data.success){
      setDataList(data.data.data)
    }
  }

  useEffect(()=>{
    getFetchData();
  },[]);

  const handleDelete = async(id)=>{
    const data = await axios.delete("/delete/"+id)
    if(data.data.success){
      alert(data.data.message)
      getFetchData()
    }

  }
  const handleUpdate = async(e)=>{
    e.preventDefault()
    const data = await axios.put("/update",editformData)
    if(data.data.success){
      alert(data.data.message)
      getFetchData()
    }
    
  }

  const handleEditOnChange = async(e)=>{
    const {value,name} = e.target
    setEditFormData((preve)=>{
      return{
        ...preve,
        [name] : value
    }
    })
  }

  const handleEdit = (el)=>{
    setEditFormData(el)
    setEditSection(true)
  }
return(
  <>
      <div className="container">
        <button className="btn btn-add" onClick={()=>setAddSection(true)}>Add</button>
        {
          addSection && (
            <FormTable
            handleSubmit={handleSubmit}
            handleOnChange={handleOnChange}
            handleClose={()=>setAddSection(false)}
            rest={formData}
            />
          )
        }
        {
          editSection && (
            <FormTable
            handleSubmit={handleUpdate}
            handleOnChange={handleEditOnChange}
            handleClose={()=>setEditSection(false)}
            rest={editformData}
            />
          )
        }

          <div className="tableContainer">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  dataList[0] ? (
                  dataList.map((el)=>{
                    return(
                      <tr>
                        <td>{el.name}</td>
                        <td>{el.email}</td>
                        <td>{el.mobile}</td>
                        <td>
                          <button className='btn btn-edit' onClick={()=>handleEdit(el)}>Edit</button>
                          <button className='btn btn-delete' onClick={()=>handleDelete(el._id)}>Delete</button>
                        </td>
                      </tr>
                    )
                  }))
                  : (
                    <p style={{textAlign: 'center'}}>No data</p>
                  )
                }
              </tbody>
            </table>
          </div>
      </div>
      </>
)
}

export default App;
