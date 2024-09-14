import { AiOutlineClose } from "react-icons/ai"
import { PiBookOpenTextLight } from "react-icons/pi"
import { BiUserCircle } from "react-icons/bi"

const BookModal = ({book,onClose}:any) => {
  return (
    <div onClick={(event) => event.stopPropagation()}
    className="w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative">
      <AiOutlineClose onClick={onClose} className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"/>
      <h2 className='w-fit px-4 py-1 bg-red-300 rounded-lg'>
            {book.publishYear}
          </h2>
          <h4 className='my-2 text-gray-500'>{book._id}</h4>
          <div className='flex justify-start items-center gap-x-2'>
            <PiBookOpenTextLight className='text-red-300 text-2xl'/>
            <h2 className='my-1'>{book.title}</h2>
          </div>
          <div className='flex justify-start items-center gap-x-2'>
            <BiUserCircle className='text-red-300 text-2xl'/>
            <h2 className='my-1'>{book.author}</h2>
          </div>
          <p className="mt-4">Anything You want to show</p>
          <p className="my-2">
          A paraphrase or rephrase is the rendering of the same text in different words without losing the meaning of the text itself. More often than not, a paraphrased text can convey its meaning better than the original words. In other words, it is a copy of the text in meaning, but which is different from the original.
          </p>
    </div>
  )
}

export default BookModal
