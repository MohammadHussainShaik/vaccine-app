import {gql, useLazyQuery, useQuery, useMutation} from "@apollo/client"
import React, { useEffect, useState } from "react"
import VaccinationCard from "./VaccinationCard"
import { useHistory } from "react-router-dom"


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
                name, dob, vaccine,dateAdministrated, brand, hospital
            }
        }`

function Administrator() {

    const history = useHistory()

    const { loading: getPatientNameLoading, error: getPatientNameError, data: patientNameData }= useQuery(GET_PATIENT_NAME)
    let [createAdministratorCbk, {loading : adminLoading, error : adminError, data : adminData}] = useMutation(CREATE_ADMINISTRATOR_MUTATION)

   const [enteredName, setEnteredName] = useState<string>('')
   const [enteredVaccine, setEnteredVaccine] = useState<string>('')
   const [enteredDOB, setEnteredDOB] = useState<string>('')
   const [enteredBrand, setEnteredBrand] = useState<string>('')
   const [enteredHospital, setEnteredHospital] = useState<string>('')
   const [enteredAdminsteredDate, setEnteredAdminsteredDate] = useState<string>('')
 //  const [enteredComplete, setenteredcomplete] = useState<string>('')

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
                dateAdministered : enteredAdminsteredDate
            }
        }).then(response => alert("Data Save Successfully"))
    }
const nameChangeHandler : React.ChangeEventHandler<HTMLSelectElement> = (event) => setEnteredName(event.target.value);
const dobChangeHander : React.ChangeEventHandler<HTMLInputElement> = (event) => setEnteredDOB(event.target.value)
const vaccineChangeHandler : React.ChangeEventHandler<HTMLSelectElement> = (event) => setEnteredVaccine(event.target.value);
const dateAdminChangeHandler : React.ChangeEventHandler<HTMLInputElement> = (event) => setEnteredAdminsteredDate(event.target.value);
const brandChangeHandler : React.ChangeEventHandler<HTMLSelectElement> = (event) => setEnteredBrand(event.target.value);
const givenAtChangeHandler : React.ChangeEventHandler<HTMLInputElement> = (event) => setEnteredHospital(event.target.value);


const clickHandler = () => {
    history.replace('/home')
}


    return(
       <div className="row">
           <div className="col-8 offset-2">
               <div className="card">
                   <div className="card-header">
                       <h3 className="text-center">Administrator Vaccination of Patient</h3>
                   </div>
                   <div className="card-body">
                       <div className="form-body">
                           <form>
                               {/* fetching patient name form patient db collection */}
                               <div className="form-group">
                                    <label htmlFor="name">Name Of Patient :</label>
                                    <select id="name" name="name" value={enteredName} className="form-control"
                                    onChange={nameChangeHandler}
                                    onBlur={nameBlurHandler} >
                                    <option value="" disabled>Select patient name</option>
                                    {patientNameData?.patients.map((p: any) => (
                                        <option key={p.name} value={p.name}>{p.name}</option>
                                        ))}
                                    </select>
                                </div>
                           </form>
                           <br />
                           {/* DOB */}
                           <div className="form-group">
                               <label htmlFor="dob">Date Of Birth : </label>
                               <input type="date" name="dob" value={enteredDOB} onChange={dobChangeHander}
                                className="form-control" />
                           </div>
                           <br />
                           {/* Vaccine */}
                           <div className="form-group">
                               <label htmlFor="vaccine">Vaccination : </label>
                               <select name="vaccine" id="vaccine" value={enteredVaccine} className="form-control" onChange={vaccineChangeHandler}>
                                   <option value="" disabled>Select Doses</option>
                                    <option value="first">First Dose</option>
                                    <option value="second">Second Dose</option>
                                </select>
                           </div>
                           {/* Date Adminstered */}
                           {/* <div className="form-group">
                               <label htmlFor="admindate">Date administrated : </label>
                               <input type="date" max={Date.now()} name="admindate" className="form-control" value={enteredAdminsteredDate} onChange={dateAdminChangeHandler}/>
                           </div> */}
                           {/* Brand */}
                           <div className="form-group">
                               <label htmlFor="brand">Brand name : </label>
                               <select name="vaccination" id="vaccination" value={enteredBrand} className="form-control" onChange={brandChangeHandler}>
                                   <option value="" disabled>Select Vaccine </option>
                                   <option value="covaxin">Covaxin</option>
                                   <option value="covid">covi-shield</option>
                               </select>
                           </div>
                           {/* givenAt :  */}
                           <div className="form-group">
                               <label htmlFor="givenat">Given At : </label>
                               <input type="text" 
                               name="givenat" placeholder="Enter Hospital Name here" value={enteredHospital} onChange={givenAtChangeHandler}
                               className="form-control"/>
                           </div>
                           <br />
                           {/* buttons */}
                           <div className="form-group">
                                <div className="row">
                                    <div className="col-6">
                                        <button className="btn btn-primary btn-block" 
                                            type="button" onClick={saveClickHandler} >save</button>
                                    </div>
                                    <div className="col-6">
                                        <button className="btn btn-warning btn-block"
                                            type="button" onClick={clickHandler} >Cancel</button>
                                    </div>
                                </div>
                            </div>
                            {/* vaccination card */}
                            <div className="row">
                                <div className="container">
                                        
                                            {<VaccinationCard />}
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