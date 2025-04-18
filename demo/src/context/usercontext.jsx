

import { Children, createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { IoReload } from "react-icons/io5";
export const UserContext = createContext()

export const AdminProvider = ({ children }) => {

    const [profile,setprofile]=useState()
    const [apply,setapply]=useState()

    const [token, settoken] = useState(localStorage.getItem("token"))

    const [userdata, setuserdata] = useState("")

    const [getjobs, setgetjobs] = useState("")

    const [getcompany, setgetcompany] = useState("")

    const [userrole, setuserrole] = useState("")

    const [alljobs,setalljobs]=useState("")
    const [alluser,setalluser]=useState([])
    console.log(userrole);
    

    console.log(userdata);

    let logout=!!token
    
    
    const authtoken=`Bearer ${token}`
    console.log(authtoken);

    const getauthuser=async()=>{
        const data= await fetch("http://localhost:8000/user/getuser",{
            method:"GET",
            headers: {
                auth: authtoken
            },
            
        })
        const resdata=await data.json()
        console.log(resdata);
        setuserdata(resdata.name)
        setuserrole(resdata.role)

        setuserdata(resdata)
        console.log(userdata);
        
        

        if(data.ok){
            console.log("user login details");
            
        }
        else{
            console.log("error");
            
        }
    }

    const fetchJobs = async () => {
        if (!userdata || !userdata.email) {
          return;
        }
      
        const response = await fetch(`http://localhost:8000/recruiter/jobs/${userdata.email}`,{
            method:"GET",
            headers: {
                "Content-Type":"Application/json"
            },
        });
        const data = await response.json();
        console.log(data);
        setgetjobs(data);
        
      
        if (response.ok) {
            console.log("job get");
            
          
        } else {
            setgetjobs([]);
        }
    };
    console.log(getjobs);


    const fetchallJobs = async () => {
        
      
        const response = await fetch(`http://localhost:8000/recruiter/alljobs`,{
            method:"GET",
            headers: {
                "Content-Type":"Application/json"
            },
        });
        const data = await response.json();
        console.log(data);
        setalljobs(data);
        
      
        if (response.ok) {
            console.log("job get");
            
          
        } else {
            setalljobs([]);
        }
    };

    const fetchprofile = async () => {
        
      
        const response = await fetch(`http://localhost:8000/user/getprofile`,{
            method:"GET",
            headers: {
                "Content-Type":"Application/json"
            },
        });
        const data = await response.json();
        console.log(data);
        setprofile(data);
        
      
        if (response.ok) {
            console.log("profile get");
            
          
        } else {
            console.log("profile not get");
            
        }
    };
    console.log(alljobs);
    

    const getapply = async () => {
        
      
        const response = await fetch(`http://localhost:8000/user/getapply/${userdata.email}`,{
            method:"GET",
            headers: {
                "Content-Type":"Application/json"
            },
        });
        const data = await response.json();
        console.log(data);
        setapply(data);
        
      
        if (response.ok) {
            console.log("profile get");
            
          
        } else {
            console.log("profile not get");
            
        }
    };

    console.log(profile);
    console.log(apply);


    const getallusers = async () => {
        
      
        const response = await fetch(`http://localhost:8000/user/getalluser`,{
            method:"GET",
            headers: {
                "Content-Type":"Application/json"
            },
        });
        const data = await response.json();
        console.log(data);
        setalluser(data);
        
      
        if (response.ok) {
            console.log("users get");
            
          
        } else {
            console.log("users not get");
            
        }
    };



    
    
      
    
      


    


    const userlogout=()=>{
        localStorage.removeItem("token")
        window.location.reload()
    }
      
     useEffect(() => {
        if (userdata.email) {
          fetch(`http://localhost:8000/recruiter/getcompany/${userdata.email}`)
            .then(response => response.json())
            .then(companyData => {
              if (companyData.name) {
                setgetcompany(companyData);
              }
            })
            .catch(err => console.error("Company fetch error:", err));
        }

      }, [userdata.email]);

      console.log(getcompany);

      useEffect(() => {
        if (userdata && userdata.email) {
            fetchprofile();
            getapply();
          }
      
        
      }, [userdata])
      
      

    useEffect(() => {
      getauthuser()
      fetchallJobs()
      getallusers()
    }, [])
    useEffect(() => {
      fetchJobs()
    }, [userdata.email])
    console.log(alluser);
    

    
    
    
    return (
        <UserContext.Provider value={{alluser,profile,apply,userdata,setuserdata,logout,userlogout,userrole,setuserrole,getcompany,getjobs,alljobs  }}>
            {children}
        </UserContext.Provider>

        
    )
}




export const useadmin = () => {
    return useContext(UserContext)
}