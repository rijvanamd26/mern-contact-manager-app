import React from 'react';
import "../App.css";
import { MdClose } from 'react-icons/md';

const FormTable = ({handleSubmit, handleOnChange, handleClose}) => {
    return (
        <div className="addContainer">
            <form onSubmit={handleSubmit}>
                <div className="close-btn" onClick={handleClose}><MdClose/></div>
                <label htmlFor='name'>Name: </label>
                <input type="text" name="name" placeholder="Enter name" onChange={handleOnChange} />
                <label htmlFor='email'>Email: </label>
                <input type="email" name="email" placeholder="Enter Email" onChange={handleOnChange} />
                <label htmlFor='mobile'>Mobile: </label>
                <input type="number" name="mobile" placeholder="Enter mobile number" onChange={handleOnChange} />
                <button className='btn'>Submit</button>
            </form>
        </div>
    )
}

export default FormTable;