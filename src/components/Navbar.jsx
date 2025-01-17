import React from 'react'
import todologo from '../assets/to-do-list.png'
const Navbar = () => {
  return (
    <nav className="bg-[#81007696] p-3 sm:p-4 flex justify-between sm:justify-around">
      <div className="logo flex gap-2 sm:gap-4 items-center"><img className="w-10 h-10" src={todologo} alt="" /><span className="font-bold text-xl sm:text-2xl text-[#33032fe0">iScheduleia</span></div>
      <ul className="flex gap-3 sm:gap-8 items-center font-semibold      sm:text-lg text-md">
        <li className="cursor-pointer hover:text-[#ffff] transitiion-all ease duration-300 hover:underline decoration-black">Home</li>
        <li className="cursor-pointer hover:text-[#ffff] transitiion-all ease duration-300 hover:underline decoration-black">Your-Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
