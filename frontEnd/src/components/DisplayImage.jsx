import React from 'react'
import { CgClose } from 'react-icons/cg'

const DisplayImage = ({
    imgUrl,
    onClose
}) => {
    return (
        <div className='fixed w-full h-full top-0 left-0 right-0 flex justify-center items-center'>
            <div className='bg-white shadow-lg rounded max-w-5xl mx-auto p-4 h-full max-h-[70%] overflow-hidden'>
                <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                    <CgClose />
                </div>
                <div className='h-full overflow-y-scroll scrollbar-none w-full'>
                    <div className='flex justify-center p-4 max-w-[80vh] max-h-[80vh]'>
                        <img src={imgUrl} className='w-full h-full' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DisplayImage           