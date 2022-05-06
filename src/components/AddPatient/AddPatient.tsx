import { gql, useMutation } from "@apollo/client"
import { render } from "@testing-library/react";
import React, { useState } from 'react';
import Home from "../Home/home";


const CREATE_PATIENT_MUTATION = gql`
mutation onCreatePatientMutation($name : String!, $dob : String!, $place : String!, $bloodGroup : String,$gender : String!, $height : String, $weight : String){
    createPatient(data : {
        name : $name,
        dob : $dob,
        place : $place,
        gender : $gender,
        bloodGroup : $bloodGroup,
        height : $height,
        weight : $weight,
    }){
        name, dob, place, gender, bloodGroup, height, weight
    }
}
`

const AddPatient = () => {
    
    const [patientState, setPatientState] = useState<{name : string, dob: string, place : string, gender : string, bloodGroup : string, height : string, weight : string}>({
        name : '',
        dob : '',
        place: '',
        gender : '',
        bloodGroup : '',
        height : '',
        weight : ''

    })

    let [createPatientCallback, {error, loading, data}] = useMutation(CREATE_PATIENT_MUTATION)

    const saveClickHandler = (event : React.SyntheticEvent<any>) => {
        event.preventDefault();
        createPatientCallback({
            variables : {
                name : patientState.name,
                dob : patientState.dob,
                place : patientState.place,
                gender : patientState.gender,
                bloodGroup : patientState.bloodGroup,
                height : patientState.height,
                weight : patientState.weight
            }
        }).then(response => console.log("RESPONSE -> ", response))
    }

    const cancelClickHandler = () => {
        
        
       
    }
    
    const nameChangeHadler : React.ChangeEventHandler<HTMLInputElement> = (event) =>  setPatientState({...patientState, name : event.target.value});
    const DOBChangeHadler : React.ChangeEventHandler<HTMLInputElement> = (event) => setPatientState({...patientState, dob : event.target.value});
    const genderSeletHandler : React.ChangeEventHandler<HTMLSelectElement> = (event) => setPatientState({...patientState, gender : event.target.value});
    const placeChangeHandler : React.ChangeEventHandler<HTMLInputElement> = (event) => setPatientState({...patientState, place : event.target.value});
    const bloodGroupChangeHandler : React.ChangeEventHandler<HTMLSelectElement> = (event) => setPatientState({...patientState, bloodGroup : event.target.value});
    const heightChangeHandler : React.ChangeEventHandler<HTMLInputElement> = (event) => setPatientState({...patientState, height :event.target.value});
    const wieghtChangeHandler : React.ChangeEventHandler<HTMLInputElement> = (event) => setPatientState({...patientState, weight :event.target.value});

    
    const submitHandler : React.FormEventHandler = (event) => {
        event.preventDefault();
    <Home></Home>   
    }
    return(
        <div className="row">
            <div className="col-8 offset-2">
                <div className="card">
                    <div className="card-header">
                        <h3 className="text-center">Patient Form</h3>
                    </div>
                    <div className="card-body">
                        <div className="form-body">
                            <form onSubmit={submitHandler}>
                                <label htmlFor="name">Name of the Patient : </label>
                                <input type="text" 
                                name='name'
                                id='name'
                                value={patientState.name}
                                onChange={nameChangeHadler}
                                className='form-control' />
                            </form>
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="dob">Date Of Birth : </label>
                            <input type='date' 
                            name='dob'
                            id='dob'
                            className='form-control'
                            value={patientState.dob}
                            onChange={DOBChangeHadler} />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="gender">Gender : </label>
                            <select name="gender" value={patientState.gender} onChange={genderSeletHandler}>
                                <option>Select an option </option>
                                <option value="male">male</option>
                                <option value="female">female</option>
                                <option value="others">others</option>
                            </select>
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="place">Place Of Birth : </label>
                            <input type="text" 
                            name='place'
                            id='place' 
                            value={patientState.place}
                            onChange={placeChangeHandler}/>
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="blood-group">Blood Group</label>
                            <select name="blood-group" value={patientState.bloodGroup} onChange={bloodGroupChangeHandler}>
                                <option>Select an option </option>
                                <option value="O+">O+ve</option>
                                <option value="O-">O-ve</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B-">B-</option>
                                <option value="B+">B+</option>
                            </select>
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="height">Height</label>
                            <input type="number" 
                            name='height' 
                            id='height'
                            min='0.0'
                            value={patientState.height}
                            onChange={heightChangeHandler}/>
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="weight">Weight</label>
                            <input type="number" 
                            name='weight'
                            id='weight'
                            min='5' 
                            value={patientState.weight}
                            onChange={wieghtChangeHandler}/>
                        </div><br /> <br />
                         <div className="form-group">
                                <div className="row">
                                    <div className="col-6">
                                        <button className="btn btn-primary btn-block" 
                                            type="button" onClick={saveClickHandler}>save</button>
                                    </div>
                                    <div className="col-6">
                                        <button className="btn btn-warning btn-block"
                                            type="button" onClick={()=> window.location.href='/home'}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddPatient;