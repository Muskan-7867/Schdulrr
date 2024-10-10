"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { availabilitySchema } from "../../../lib/validators";
import { Checkbox } from "../../../../components/ui/checkbox";

const AvailabilityForm = ({ initialData }) => {
  const { control, handleSubmit, setValue } = useForm({
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
        const isAvailable = watch(`${day}.isAvailable`)
        return (
        <div key={day} className="flex items-center space-x-4 mb-4">
          <Controller
            name={`${day}.isAvailable`}
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setValue(`${day}.isAvailable`, checked);

                  // Reset start and end times if not available
                  if (!checked) {
                    setValue(`${day}.startTime`, "09:00");
                    setValue(`${day}.endTime`, "17:00");
                  }
                }}
              />
            )}
          />
          <span className="w-24">
            {day.charAt(0).toUpperCase() + day.slice(1)}
          </span>
        </div>
      )})}
    </form>
    );
};

export default AvailabilityForm;
