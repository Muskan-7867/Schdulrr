"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { bookingSchema } from "../../../lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { DayPicker } from "react-day-picker"; // used for rendering the calendar
import "react-day-picker/style.css";
import { format } from "date-fns";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import useFetch from "../../../../hooks/usefetch";
import { createBooking } from "../../../../actions/bookings";

const BookingForm = ({ event, availability }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(bookingSchema),
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const { loading, data, error, fn: fnCreateBooking } = useFetch(createBooking);

  const availableDays = availability.map((day) => new Date(day.date));
  const timeSlots = selectedDate ? availability.find((day) => day.date === format(selectedDate, "yyyy-MM-dd"))?.slots || [] : [];

  useEffect(() => {
    if (selectedDate) {
      setValue("date", format(selectedDate, "yyyy-MM-dd"));
    }
  }, [selectedDate, setValue]);

  useEffect(() => {
    if (selectedTime) {
      setValue("time", selectedTime);
    }
  }, [selectedTime, setValue]);

  const onSubmit = async (data) => {
    console.log("Form submit", data);

    if (!selectedDate || !selectedTime) {
      console.error("Date or Time not selected");
      return;
    }

    const startTime = new Date(`${format(selectedDate, "yyyy-MM-dd")}T${selectedTime}`);
    const endTime = new Date(startTime.getTime() + event.duration * 60000);

    const bookingData = {
      eventId: event.id, // Ensure event.id is valid
      name: data.name,
      email: data.email,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      additionalInfo: data.additionalInfo,
    };

    // Log booking data for debugging
    console.log("Booking Data:", bookingData);

    try {
      const bookingResponse = await fnCreateBooking(bookingData);
      console.log("Booking Response:", bookingResponse); // Log the full response

      if (bookingResponse && bookingResponse.meetLink) {
        console.log("Booking Successful, Meet Link:", bookingResponse.meetLink);
      } else {
        console.error("Booking failed: No meet link returned", bookingResponse);
        alert("Booking was successful, but no meet link was returned. Please contact support."); // Inform the user
      }
    } catch (err) {
      console.error("Error creating booking:", err);
      alert("An error occurred while creating your booking. Please try again later."); // Inform the user of the error
    }
  };

  // Display success message and Google Meet link after booking is created
  if (data) {
    return (
      <div className="bg-white p-10 border text-center">
        <h2 className="mb-4 font-bold text-2xl">Booking successful!</h2>
        {data.meetLink ? (
          <p>
            Join the meeting:{" "}
            <a
              href={data.meetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {data.meetLink}
            </a>
          </p>
        ) : (
          <p>No meeting link available. Please check your email for details.</p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 bg-white p-10 border">
      <div className="flex md:flex-row flex-col gap-5 md:h-96">
        <div className="w-full">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              setSelectedDate(date);
              setSelectedTime(null);
            }}
            disabled={[{ before: new Date() }]}
            modifiers={{
              available: availableDays,
            }}
            modifiersStyles={{
              available: {
                background: "lightblue",
                borderRadius: 100,
              },
            }}
          />
        </div>
        <div className="w-full h-full md:overflow-scroll no-scrollbar">
          {selectedDate && (
            <div className="mb-4">
              <h3 className="mb-2 font-semibold text-lg">Available Time slots</h3>
              <div className="gap-2 grid grid-cols-2 lg:grid-cols-3">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                    variant={selectedTime === slot ? "default" : "outline"}
                  >
                    {slot}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedTime && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input {...register("name")} placeholder="Your Name" />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Input {...register("email")} placeholder="Your Email" />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Textarea {...register("additionalInfo")} placeholder="Additional Information" />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Scheduling..." : "Schedule Event"}
          </Button>
        </form>
      )}
    </div>
  );
};

export default BookingForm;
