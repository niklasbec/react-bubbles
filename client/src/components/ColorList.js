import React, { useState } from "react";
import { axiosWithAuth } from './axiosWithAuth'

const initialColor = {
  color: "",
  code: { hex: "" }
};

export const ColorList = ({ colors, updateColors }, props) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState({
    color: '',
    code: {
      hex: ''
    }
  })
  const [newColorId, setNewColorId] = useState({
    id: colors.length,
    color: '',
    code: {
      hex: ''
    }
  })
  
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth().put(`http://localhost:5000/api/colors/${colorToEdit.id}`, {
      color: colorToEdit.color,
      code: colorToEdit.code,
      id: colorToEdit.id
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
  };

  const deleteColor = color => {
    axiosWithAuth().delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(response => {
        console.log(`${color.color} deleted successfully!`)
        let newColorArray = colors.filter((curr) => {
          return curr.id != color.id
        })
        updateColors(newColorArray)
      })
      .catch(error => {
        console.log(`Error couldnt delete ${color.color} error: ${error}`)
      })
  }

  const newColorChange = e => {
    setNewColor({
      ...newColor,
      [e.target.name]: e.target.value
      })
    setNewColorId({
      ...newColor,
      [e.target.name]: e.target.value
      })
  }

  const newColorChangeCode = e => {
    setNewColor({
      ...newColor,
      code: {
        [e.target.name]: e.target.value
      }
      })
    setNewColorId({
      ...newColor,
      code: {
        [e.target.name]: e.target.value
      }
      })
      
  }

  const newColorSubmit = e => {
    e.preventDefault()
    axiosWithAuth().post('http://localhost:5000/api/colors', newColor)
    .then(response => {
      updateColors([...colors, newColorId])
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    })
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      <div className='form'>
        <h3>Add new color </h3>
        <form onSubmit={newColorSubmit}>
          <input onChange={newColorChange} type='text' name='color' placeholder='new color name'/>
          <input onChange={newColorChangeCode} type='text' name='hex' placeholder='new color hex'/>

          <input type='submit' />
        </form>
      </div>
    </div>
  );
};

export default ColorList
