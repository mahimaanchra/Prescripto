import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets_admin/assets'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return dashData && (
    <div className='m-5 w-full max-w-6xl'>
      {/* Top Stat Cards */}
      <div className='flex flex-wrap gap-5'>
        {/* Doctors Count */}
        <div className='flex items-center gap-4 bg-white p-4 min-w-52 rounded-xl border border-gray-100 shadow-sm hover:scale-105 transition-all cursor-pointer'>
          <img className='w-14' src={assets.doctor_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.doctors}</p>
            <p className='text-gray-400 text-sm'>Doctors</p>
          </div>
        </div>

        {/* Appointments Count */}
        <div className='flex items-center gap-4 bg-white p-4 min-w-52 rounded-xl border border-gray-100 shadow-sm hover:scale-105 transition-all cursor-pointer'>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
            <p className='text-gray-400 text-sm'>Appointments</p>
          </div>
        </div>

        {/* Patients Count */}
        <div className='flex items-center gap-4 bg-white p-4 min-w-52 rounded-xl border border-gray-100 shadow-sm hover:scale-105 transition-all cursor-pointer'>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
            <p className='text-gray-400 text-sm'>Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Bookings Container */}
      <div className='bg-white rounded-xl border border-gray-200 mt-10 shadow-sm'>
        <div className='flex items-center gap-2.5 px-6 py-4 rounded-t-xl border-b bg-gray-50'>
          <img className='w-5' src={assets.list_icon} alt="" />
          <p className='font-semibold text-gray-700'>Latest Bookings</p>
        </div>

        {/* Bookings List */}
        <div className='pt-2 divide-y divide-gray-100'>
          {dashData.latestAppointments && dashData.latestAppointments.length > 0 ? (
            dashData.latestAppointments.map((item, index) => (
              <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-50 transition-all' key={item._id || index}>
                <img className='w-10 h-10 rounded-full object-cover bg-gray-100' src={item.docData?.image} alt="" />
                
                <div className='flex-1 text-sm'>
                  <p className='text-gray-800 font-medium'>{item.docData?.name}</p>
                  <p className='text-gray-500 text-xs'>
                    Booking on {slotDateFormat ? slotDateFormat(item.slotDate) : item.slotDate}
                  </p>
                </div>

                {item.cancelled ? (
                  <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                ) : item.isCompleted ? (
                  <p className='text-green-500 text-xs font-medium'>Completed</p>
                ) : (
                  <button
                    onClick={() => cancelAppointment && cancelAppointment(item._id)}
                    className='text-xs text-red-500 border border-red-500 px-2 py-1 rounded cursor-pointer hover:bg-red-50 transition-all'
                  >
                    Cancel
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className='px-6 py-4 text-gray-400 text-sm text-center'>No recent bookings</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard