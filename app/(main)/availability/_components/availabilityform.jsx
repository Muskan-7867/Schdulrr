"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { availabilitySchema } from "../../../lib/validators";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select";
import { timeSlots } from "../data";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";

// Custom Checkbox Component (Fallback)
const CustomCheckbox = ({ checked, onCheckedChange }) => (
  <input
    type="checkbox"
    checked={checked}
    onChange={(e) => onCheckedChange(e.target.checked)}
    className="h-4 w-4 border-gray-300 rounded"
  />
);

const AvailabilityForm = ({ initialData, minutes = 15 }) => {  // Set default minutes value or pass as prop
  const { control, handleSubmit, setValue, watch, register, formState: { errors } } = useForm({
    resolver: zodResolver(availabilitySchema),
    defaultValues: { ...initialData },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {[
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ].map((day) => {
        const isAvailable = watch(`${day}.isAvailable`);
        return (
          <div key={day} className="flex items-center space-x-4 mb-4">
            <Controller
              name={`${day}.isAvailable`}
              control={control}
              render={({ field }) => (
                <CustomCheckbox
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);

                    // Reset time when unchecked
                    if (!checked) {
                      setValue(`${day}.startTime`, "09:00");
                      setValue(`${day}.endTime`, "17:00");
                    }
                  }}
                />
              )}
            />
            <span className="w-24">{day.charAt(0).toUpperCase() + day.slice(1)}</span>

            {isAvailable && (
              <>
                <Controller
                  name={`${day}.startTime`}
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={(value) => field.onChange(value)} value={field.value}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Start Time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <span>to</span>
                <Controller
                  name={`${day}.endTime`}
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={(value) => field.onChange(value)} value={field.value}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="End Time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors[day]?.endTime && (
                  <span className="text-red-500 text-sm ml-2">
                    {errors[day].endTime.message}
                  </span>
                )}
              </>
            )}
          </div>
        );
      })}
      <div className="flex items-center space-x-4">
        <span className="w-48">Minimum gap before booking ({minutes} minutes):</span> 
        <Input
          type="number"
          {...register("timeGap", {
            valueAsNumber: true,
          })}
          className="w-32"
        />
        {errors?.timeGap && (
          <span className="text-red-500 text-sm ml-2">
            {errors.timeGap.message}
          </span>
        )}
      </div>
      <Button type='submit' className='mt-5'>Update Availability</Button>
    </form>
  );
};

export default AvailabilityForm;
