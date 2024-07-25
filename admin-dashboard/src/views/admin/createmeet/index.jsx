import { DateTimePickerV2 } from "@/components/Date-time-picker";
import React from "react";
import { useParams } from "react-router-dom";

const CreateMeet = () => {
  const { id } = useParams();

  return (
    <div>
      <div>Hello there</div>

      <DateTimePickerV2/>
    </div>
  );
};

export default CreateMeet;
