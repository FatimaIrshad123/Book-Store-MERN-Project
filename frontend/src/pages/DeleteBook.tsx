import axios from "axios"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import BackButton from "../components/BackButton"
import Spinner from "../components/Spinner"

const DeleteBook = () => {
  const [loading,setLoading] = useState(false)
  const {id} = useParams();
  const navigate = useNavigate()

  const handleDeleteBook = () => {
    setLoading(true);
    axios.delete(`http://localhost:5555/books/${id}`)
    .then(() => {
      setLoading(false)
      navigate('/')
    })
    .catch((error) => {
      setLoading(false);
      alert('An error happened. Please Check console')
      console.log(error)
    })
  }
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner/> : ''}
      <div className="text-left flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are You Sure You eant to delete this book?</h3>
        <button className="p-4 bg-red-600 text-white m-8 w-full" onClick={handleDeleteBook}>
          Yes, delete it
        </button>
      </div>
      
    </div>
  )
}

export default DeleteBook
