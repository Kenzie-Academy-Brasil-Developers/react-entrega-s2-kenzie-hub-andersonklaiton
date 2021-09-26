import { Redirect } from "react-router-dom"

const FormLogout=({setAutenticated})=>{
    const handleLogout=()=>{
        localStorage.clear()
        setAutenticated(false)
         return <Redirect to="/"/>
      }
    return(
        <div className="logout"><button className="btn_logout" onClick={handleLogout}>Logout</button></div>
    )   
}
export default FormLogout