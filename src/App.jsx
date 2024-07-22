import { useState } from 'react';
import "./App.css";

function App() {
  const [fullName, setFullName] = useState("");
  const [companyDomain,setCompanyDomain] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [resError, setResError] = useState("");

  const fetchData = async(fullName,companyDomain) => {  
    try{
      const res = await fetch("http://localhost:8080/api/v1/email-guesser",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({fullName,companyDomain}),
      });
      if(!res.ok){
        const errorData = await res.json();
        setResError(errorData.message);
        return;
      }
      const data = await res.json();
      setEmail(data.email);
    }
    catch(err){
      console.log(err)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail("");
    setError("");
    setResError("");
    if (!fullName || !companyDomain || !fullName.includes(" ") || !companyDomain.includes(".")) {
      setError("Please enter a valid full name with first name,last name and company domain");
      return;
  }
    fetchData(fullName,companyDomain);
}

  return (
    <>
      
      <div className="Container">
        <h1 className="Heading">Email Guesser</h1>
        <form onSubmit={handleSubmit}>
          <label> 
            <span>Full Name</span>
            <input type="text" 
                  value={fullName} 
                  placeholder="Jane Doe"
                  onChange={(e) => setFullName(e.target.value)}
                  />
          </label>
          <label> 
            <span>Company Domain</span>
            <input type="text" 
                  value={companyDomain} 
                  placeholder="babbel.com" 
                  onChange={(e) => setCompanyDomain(e.target.value)}
                  />
          </label>
          {error && <p className="Error">{error}</p>}
          <button className="Button" type="submit">Submit</button>
        </form>
      </div>

      <div className="Result">
        {email && <p>The final guessed Email is : {email}</p>}
        {resError && <p className="Error">{resError}</p>}
      </div>
    </>
  )
}

export default App
