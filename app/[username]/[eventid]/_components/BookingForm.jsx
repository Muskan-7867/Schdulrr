"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { bookingSchema } from '../../../lib/validators'
import { zodResolver} from '@hookform/resolvers/zod'
import { DayPicker } from 'react-day-picker';  // used for render calender
import 'react-day-picker/style.css';
import { format } from 'date-fns';
import { Button } from '../../../../components/ui/button'
const BookingForm = ({event, availability}) => {
 
  const {register, handleSubmit, formState:{error}} = useForm({
    resolver: zodResolver(bookingSchema),
  });
  const[selectedDate, setselectedDate] = useState(null)
  const[selectedTime, setselectedTime] = useState(null)

const availableDays = availability.map((day) => new Date(day.date));
const timeslots = selectedDate? availability.find((day) => day.date === format(selectedDate, "yyyy-MM-dd"))?.slots|| [] :  [];

  
  return (
  <div className='flex flex-col gap-8 bg-white p-10 border'>
    <div className='flex md:flex-row flex-col gap-5 md:h-96'>
      <div>
        <DayPicker mode='single' selected={selectedDate} onSelect={(date) => {
          setselectedDate(date)
          setselectedTime(null)
        }} disabled={[{before: new Date()}]} 
        modifiers={{
          available: availableDays,
        }}
        modifiersStyles={{
          available:{
            background: "lightblue",
            borderRadius: 100,
          }
        }}
        />
      </div>
      <div className='w-full h-full md:overflow-scroll no-scrollbar'>
        {selectedDate && (
          <div className='mb-4'>
            <h3 className='mb-2 font-semibold text-lg'>Available Time slots</h3>
            <div className='gap-2 grid grid-cols-2 lg:grid-cols-3'>{timeslots.map((slot) => {
             return ( <Button key={slot} onClick={() => setselectedTime(slot)}
              variant={selectedTime === slot ? "default" : "outline"}
              >{slot}</Button>
            )})}</div>
          </div>
        )}
      </div>
    </div>
  </div>
 
)}

export default BookingForm
