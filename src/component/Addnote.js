import React, { useState } from 'react'
import BorderColorIcon from '@mui/icons-material/BorderColor';
export default function Addnote() {
  const [inputData, setInputData] = useState("");
  const [data, setData] = useState([]);
  const [showDelete, setShowDelete] = useState([]);
  const [edit, setEdit] = useState(-1);

  // Get The User Input
  const handleChange = (e) => {
    setInputData(e.target.value);
    // console.log(e.target.value);
  }

  // Add the user data in the array and show the output
  const handleAdd = () => {

    if (edit === -1) {
      if (inputData === "")
        setData((prev) => [...prev]);
      else {
        setData((prev) => {
          return [...prev, inputData]
        })
      }

    } else {
      if (showDelete.includes(data[edit])) {
        showDelete[edit] = inputData;
      }
      data[edit] = inputData;

    }
    setInputData("");
    setEdit(-1);
  }

  // Delete the user recode
  const handleDelete = (id) => {
    let value = data[id];
    setShowDelete(showDelete.filter((ele) => ele !== value))
    setData(data.filter((_, index) => {
      return id !== index;
    }))

  }
  // Click check box
  const handelCheckBox = (e) => {

    const { value, checked } = e.target;
    if (checked) {
      setShowDelete((prev) => {
        return [...prev, value];
      })
    }
    else {
      setShowDelete(showDelete.filter((ele) => ele !== value))
    }
  }

  // Edit the existing data
  const handleEdit = (id) => {
    setInputData(data[id]);
    setEdit(id);

  }
   console.log(showDelete);
  return (
    <>
      <div className='container-lg p-3 mt-5'>
        <h3 className='heading_todo'>ToDo List</h3>
        <div>
          <div className="search__div">
            <input type="text" className='form-control' value={inputData} placeholder='enter the text' onChange={handleChange} />
            <button onClick={handleAdd}>Add</button>
          </div>
           {data.length>0 && <p className="note"><span>Note:-</span>&nbsp;If Delete the existing note then first of all click the check box after that delete button show in the screen then click the delete button.</p>}
          {
            data.length > 0 && data.map((ele, index) => {
              return (
                <div className="list__item" key={index}>
                  <div className='input_div'>
                  <input type="checkbox" value={ele} onChange={handelCheckBox} />
                  <p>{ele} </p>
                  </div>
                 
                  <div className='action_div'>
                    <span className='sm_btn' onClick={() => handleEdit(index)}><BorderColorIcon></BorderColorIcon></span>
                   {showDelete.includes(ele) && <button   onClick={() => handleDelete(index)}>Delete</button>}
                  </div>



                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}
