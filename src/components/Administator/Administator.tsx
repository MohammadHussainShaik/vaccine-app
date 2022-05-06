import {gql, useLazyQuery, useQuery, useMutation} from "@apollo/client"
import React, { useEffect, useState } from "react"


const GET_PATIENT_NAME = gql`
query{
    patients{
        name, dob
    }
  }
`


const CREATE_ADMINISTRATOR_MUTATION = gql`
    mutation onCreateAdministratorMutation($name : String!, $dob : String!, $vaccine : String!,
        $dateAdministrated : String, $brand : String!, $hospital: String!, $complete : String){
            
            createAdministrator(data:{
                name : $name
                dob : $dob
                vaccine : $vaccine
                brand : $brand
                hospital : $hospital
                dateAdministrated : $dateAdministrated
                complete : $complete
            })
            {
                name, dob, vaccine,  dateAdministrated, brand, hospital
            }
        }`
function Administrator() {
    const { loading: getPatientNameLoading, error: getPatientNameError, data: patientNameData }= useQuery(GET_PATIENT_NAME)
    let [createAdministratorCbk, {loading : adminLoading, error : adminError, data : adminData}] = useMutation(CREATE_ADMINISTRATOR_MUTATION)

   const [enteredName, setEnteredName] = useState<string>('')
   const [enteredVaccine, setEnteredVaccine] = useState<string>('')
   const [enteredDOB, setEnteredDOB] = useState<string>('')
   const [enteredBrand, setEnteredBrand] = useState<string>('')
   const [enteredHospital, setEnteredHospital] = useState<string>('')
   const [enteredDueDate, setEnteredDueDate] = useState<string>('')
   const [enteredComplete, setenteredcomplete] = useState<string>('')

    const nameBlurHandler: React.FocusEventHandler<HTMLSelectElement> = (event) => {
        event.preventDefault()
       // fetchPatientData({ variables: { name: administratorState.name } })
      }
    const saveClickHandler = (event : React.FormEvent) => {
        event.preventDefault();
        createAdministratorCbk({
            variables : {
                name : enteredName,
                dob : enteredDOB,
                vaccine : enteredVaccine,
                brand : enteredBrand,
                hospital : enteredHospital,
                complete : enteredDueDate
            }
        }).then(response => console.log("RESPONSE -> ",response))
    }
const nameChangeHandler : React.ChangeEventHandler<HTMLSelectElement> = (event) => setEnteredName(event.target.value);
const vaccineChangeHandler : React.ChangeEventHandler<HTMLSelectElement> = (event) => setEnteredVaccine(event.target.value);
const dateAdminChangeHandler : React.ChangeEventHandler<HTMLInputElement> = (event) => setEnteredDueDate(event.target.value);
const brandChangeHandler : React.ChangeEventHandler<HTMLSelectElement> = (event) => setEnteredBrand(event.target.value);
const givenAtChangeHandler : React.ChangeEventHandler<HTMLInputElement> = (event) => setEnteredHospital(event.target.value);

    return(
       <div className="row">
           <div className="col-6 offset-3">
               <div className="card">
                   <div className="card-header">
                       <h3 className="text-center">Administrator Vaccination </h3>
                   </div>
                   <div className="card-body">
                       <div className="form-body">
                           <form>
                           <div className="form-group">
                                    <label htmlFor="name">Name Of Patient :</label>
                                    <select id="name" name="name" className="form-control"
                                    onChange={nameChangeHandler}
                                    onBlur={nameBlurHandler} >
                                    <option value="">Select patient name</option>
                                    {patientNameData?.patients.map((patient: any) => (
                                        <option key={patient.name} value={patient.name}>{patient.name}</option>
                                        ))}
                                    </select>
                                </div>
                           </form>
                           <br />
                           <div className="form-group">
                               <label htmlFor="dob">Date Of Birth : </label>
                               <input type="date" name="dob" 
                                className="form-control" />
                           </div>
                           <br />
                           <div className="form-group">
                               <label htmlFor="vaccination">Vaccination : </label>
                               <select name="vaccination" id="vaccination" onChange={vaccineChangeHandler}>
                                   <option value="">Drop down</option>
                                   <option value="">First Dose</option>
                                   <option value="">Second Dose</option>
                               </select>
                           </div>
                           <br />
                           <div className="form-group">
                               <label htmlFor="admindate">Date administrated : </label>
                               <input type="date" max={Date.now()} name="admindate" className="form-control" onChange={dateAdminChangeHandler}/>
                           </div>
                           <br/>
                           <div className="form-group">
                               <label htmlFor="brand">Brand name : </label>
                               <select name="vaccination" id="vaccination" className="form-control" onChange={brandChangeHandler}>
                                   <option value="" disabled>Select Vaccine </option>
                                   <option value="covaxin">Covaxin</option>
                                   <option value="covid">Covi-Shield</option>
                               </select>
                           </div>
                           <br/>
                           <div className="form-group">
                               <label htmlFor="givenat">Given At : </label>
                               <input type="text" 
                               name="givenat" placeholder=" Hospital Name " onChange={givenAtChangeHandler}
                               className="form-control"/>                                   
                           </div>
                           <br></br>
                           <div className="form-group">
                                <div className="row">
                                    <div className="col-6">
                                        <button className="btn btn-primary btn-block" 
                                            type="button" onClick={saveClickHandler} >save</button>
                                    </div>
                                    <div className="col-6">
                                        <button className="btn btn-warning btn-block"
                                            type="button" onClick={()=> window.location.href='/home'} >Cancel</button>
                                    </div>
                                </div>
                            </div>
                       </div>
                   </div>
               </div>
           </div>
       </div>
    )
}
export default Administrator;