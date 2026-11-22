import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const AllAppointments = () => {
  const { aToken, appointments, cancelAppointment, getAllAppointments } = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
        {/* Table Header */}
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b bg-gray-50 text-gray-700 font-medium'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {/* Appointments List */}
        {appointments && appointments.length > 0 ? (
          appointments.map((item, index) => (
            <div
              key={item._id || index}
              className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50 transition-all'
            >
              <p className='max-sm:hidden'>{index + 1}</p>

              <div className='flex items-center gap-2'>
                <img className='w-8 h-8 rounded-full object-cover' src={item.userData.image} alt="" />
                <p className='font-medium text-gray-800'>{item.userData.name}</p>
              </div>

              <p className='max-sm:hidden'>{calculateAge ? calculateAge(item.userData.dob) : 'N/A'}</p>

              <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

              <div className='flex items-center gap-2'>
                <img className='w-8 h-8 rounded-full bg-gray-200 object-cover' src={item.docData.image} alt="" />
                <p>{item.docData.name}</p>
              </div>

              <p>{currency}{item.amount}</p>

              {item.cancelled ? (
                <p className='text-red-400 text-xs font-medium'>Cancelled</p>
              ) : <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />}
            </div>
          ))
        ) : (
          <div className='flex items-center justify-center h-48 text-gray-400'>
            <p>No appointments found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AllAppointments