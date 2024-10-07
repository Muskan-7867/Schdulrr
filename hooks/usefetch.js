import { useState } from "react"

const useFetch = (cb) =>{
    const[data, setdata] = useState(undefined)
    const[loading, setloading] = useState(null)
    const[error, seterror] = useState(null)

    const fn = async(...args) => {
        setloading(true)
        seterror(null)
        

        try {
            const response = await cb(...args)
            setdata(response);
            seterror(null)
        } catch (error) {
            seterror(error)
            
        }finally{
            setloading(false)
        }
    }

    return{data, loading, error,fn}
}
export default useFetch