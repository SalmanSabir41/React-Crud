import './App.css';
import { CrudData } from './CrudData';
import { useEffect, useState } from 'react';
      

function App() {

  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState('')
  const [isId, setId] = useState('')
  const [isUpdate, setIsUpdate] = useState(false)

  useEffect(() => {
    setData(CrudData)
  }, []);

  const handleEdit = (id) => {
    const dt = data.filter(item => item.id === id);
    setId(dt[0].id)
    if(dt !== undefined){
      setIsUpdate(true)
      setFirstName(dt[0].firstName);
      setLastName(dt[0].lastName);
      setAge(dt[0].age);
    }
  }

  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("are you sure to delete this item?")) {
        const dt = data.filter(item => item.id !== id);
        setData(dt)
      }
    }
  }

  const handleAdd = (e) => {
   e.preventDefault();
   const dt = [...data];
   const newObject = {
    id: dt.length + 1,
    firstName: firstName,
    lastName: lastName,
    age: age
   }
   dt.push(newObject);
   setData(dt);
   handleClear();
  }

  const handleUpdate = () => {
    
    const index = data.findIndex(item => item.id === isId);
    
    
    if (index !== -1) {
      const updatedData = [...data]; 
      updatedData[index] = {   
        id: isId,
        firstName: firstName,
        lastName: lastName,
        age: age
      };
      setData(updatedData); 
      handleClear(); 
    }
  }
  

  const handleClear = () => {
    setFirstName('');
    setLastName('');
    setAge('');
   setIsUpdate(false)
  }


  return (
    <div className="App">
      <div className='row'>
      
        <div>
          <label>First Name:
            <input type='text' placeholder='First Name' onChange={(e)=> setFirstName(e.target.value)} value={firstName} />
          </label>
        </div>

        <div>
          <label>Last Name:
            <input type='text' placeholder='Last Name' onChange={(e)=> setLastName(e.target.value)} value={lastName}/>
          </label>
        </div>
        <div>
          <label> Age:
            <input type='number' placeholder='Age' onChange={(e)=> setAge(e.target.value)} value={age}/>
          </label>
        </div>
        <div style={{padding:"0 10px 0 10px"}} className='btns'>
          {
            !isUpdate  ?
            <button  className='btn btn-primary' onClick={(e) => handleAdd(e)}>Add</button>
            :
            <button className='btn btn-primary' onClick={() => handleUpdate()}>Update</button>
          }
          <button className='btn btn-danger' onClick={() => handleClear()}>Clear</button>
        </div>
      </div>
      <table className='table table-hover'>
        <thead>
        
          <tr>
            <td>Id</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Age</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item, index) => {
              return (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.age}</td>
                  <td>
                    <button className='btn btn-primary' onClick={() => handleEdit(item.id)}>Edit</button>&nbsp;
                    <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
        
      </table>


    </div>
  );
}

export default App;



