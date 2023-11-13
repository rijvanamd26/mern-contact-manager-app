import React from 'react';
import "../App.css";
import { MdClose } from 'react-icons/md';

const FormTable = ({handleSubmit, handleOnChange, handleClose, rest}) => {
    return (
        <div className="addContainer">
            <form onSubmit={handleSubmit}>
                <div className="close-btn" onClick={handleClose}><MdClose/></div>
                <label htmlFor='name'>Name: </label>
                <input type="text" name="name" placeholder="Enter name" onChange={handleOnChange} value={rest.name} />
                <label htmlFor='email'>Email: </label>
                <input type="email" name="email" placeholder="Enter Email" onChange={handleOnChange} value={rest.email} />
                <label htmlFor='mobile'>Mobile: </label>
                <input type="number" name="mobile" placeholder="Enter mobile number" onChange={handleOnChange} value={rest.mobile} />
                <button className='btn'>Submit</button>
            </form>
        </div>
    )
}

export default FormTable;