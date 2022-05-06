import { gql, useQuery } from "@apollo/client";
import './VaccinationCard.module.css'


const FETCH_QUERY = gql`
query{
    administrators{
        name dob brand vaccine hospital
    }
}
`

const VaccinationCard = () => {
    const { data : patientNameData} = useQuery(FETCH_QUERY)
   // console.log({prps});
    return(
        <div className="container">
            <hr />
            <h2>Vaccination Card</h2>
            <table>
                <tr>
                    <th>Patient Name</th>
                    <th>DOB</th>
                    <th>Brand name</th>
                    <th>Vaccination</th>
                    <th>Hospital</th>
                </tr>

                <td className="td">
                    {patientNameData?.administrators.map((p : any) => (
                        <option key={p.name} value={p.name}>{p.name}</option>
                    ))}
                </td>

                <td className="td">
                    {patientNameData?.administrators.map((p : any) => (
                        <option key={p.dob} value={p.dob}>{p.dob}</option>
                    ))}
                </td>

                <td className="td">
                {patientNameData?.administrators.map((p : any) => (
                        <option key={p.brand} value={p.brand}>{p.brand}</option>
                    ))}
                </td>

                <td className="td">
                    {patientNameData?.administrators.map((p : any) => (
                        <option key={p.vaccine} value={p.vaccine}>{p.vaccine}</option>
                    ))}
                </td>

                <td className="td">
                    {patientNameData?.administrators.map((p : any) => (
                        <option key={p.hospital} value={p.hospital}>{p.hospital}</option>
                    ))}
                </td>
            </table>
        </div>
    )
}

export default VaccinationCard;