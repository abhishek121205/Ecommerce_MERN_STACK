import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common/commonApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UploadProduct = ({ onClose }) => {
  const [data, setData] = useState({ productImage: [] });
  const [activeImage, setActiveImage] = useState("")
  const [openFullScreen, setOpenFullScreen] = useState(false)
  const navigate = useNavigate()
  const handleOnChange = (e) => {
    let { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0]
    const uploadImageCloudinary = await uploadImage(file)
    setData({ ...data, productImage: [...data.productImage, uploadImageCloudinary.url] })
  }

  const handleDeleteProductImage = (index) => {
    const newProductImage = [...data.productImage]
    newProductImage.splice(index, 1)
    setData({ ...data, productImage: [...newProductImage] })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch(SummaryApi.uploadProduct.url, {
      method: SummaryApi.uploadProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify(data)
    })

    const addedData = await response.json();

    if (addedData.success) {
      toast.success(addedData.message)
      onClose()
    }
    if (addedData.error) {
      toast.error(addedData.message)
    }
  }

  return (
    <div className="bg-slate-200 bg-opacity-20 fixed w-full h-full top-0 bottom-0 left-0 right-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-y-scroll">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-lg">Upload Product</h2>
          <div
            className="w-fit text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <IoMdClose />
          </div>
        </div>

        <form className="grid p-4 gap-2" onSubmit={handleSubmit}>
          <label htmlFor="productName">Product Name :</label>
          <input
            type="text"
            id="productName"
            name="productName"
            placeholder="enter product name"
            value={data.productName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
          />

          <label htmlFor="brandName" className="mt-3">Brand Name :</label>
          <input
            type="text"
            id="brandName"
            name="brandName"
            placeholder="enter brand name"
            value={data.brandName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
          />

          <label htmlFor="category" className="mt-3">Category :</label>
          <select value={data.category} onChange={handleOnChange} name="category" id="category" className="p-2 bg-slate-100 border rounded">
            <option value="">--Select Category--</option>
            {
              productCategory.map((val, index) => (
                <option value={val.value} key={val.value + index} >{val.label}</option>
              ))
            }
          </select>

          <label htmlFor="productImage" className="mt-3">Product Image :</label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 cursor-pointer border rounded h-32 w-full flex justify-center items-center">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl"><FaCloudUploadAlt /></span>
                <p className="text-sm">Upload Product Image</p>
                <input type="file" id="uploadImageInput" className="hidden" onChange={handleUploadProduct} />
              </div>
            </div>
          </label>
          <div>
            {
              data.productImage[0] ?
                <div className="flex items-center gap-2">
                  {
                    data.productImage.map((val, index) => (
                      <div className="relative group">
                        <img src={val}
                          className="bg-slate-100 border cursor-pointer max-w-20 max-h-20" alt=""
                          onClick={() => {
                            setOpenFullScreen(true)
                            setActiveImage(val)
                          }} />

                        <div
                          className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer"
                          onClick={() => handleDeleteProductImage(index)}
                        >
                          <MdDelete />
                        </div>
                      </div>
                    ))
                  }
                </div> :
                <p className="text-red-600 text-xs">* Upload Image</p>
            }
          </div>

          <label htmlFor="price" className="mt-3">Price :</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="enter price"
            value={data.price}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
          />

          <label htmlFor="sellingPrice" className="mt-3">Selling Price :</label>
          <input
            type="number"
            id="sellingPrice"
            name="sellingPrice"
            placeholder="enter selling Price"
            value={data.sellingPrice}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
          />

          <label htmlFor="stock" className="mt-3">Stock :</label>
          <input
            type="number"
            id="stock"
            name="stock"
            placeholder="enter stock"
            value={data.stock}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
          />

          <label htmlFor='description' className='mt-3'>Description :</label>
          <textarea
            className='h-28 bg-slate-100 border resize-none p-1'
            placeholder='enter product description'
            rows={3}
            onChange={handleOnChange}
            name='description'
            value={data.description}
          >
          </textarea>

          <button className="px-3 py-2 bg-red-600 text-white hover:bg-red-700">Upload Product</button>
        </form>
      </div>

      {/* display image in full screen */}
      {
        openFullScreen ?
          <DisplayImage onClose={() => setOpenFullScreen(false)} imgUrl={activeImage} /> :
          null
      }
    </div>
  );
};

export default UploadProduct;
