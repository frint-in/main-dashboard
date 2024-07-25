import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DateTimePickerV2 } from "../Date-time-picker";
import { handleApiError, handleApiResponse } from "@/utils/apiResponseHandler";
import axiosInstance from "@/utils/axiosIntance";
import axios from 'axios'
import { useParams } from "react-router-dom";

const formSchema = z.object({
  summary: z.string().min(2, "Summary is required"),
  description: z.string().min(5, "Description is required"),
  location: z.string().min(2, "Location is required"),
  startDateTime: z.string().min(1, "Start Date & Time is required"),
  endDateTime: z.string().min(1, "End Date & Time is required"),
});

const Meeting = () => {
  const {id} = useParams()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      summary: "",
      description: "",
      location: "",
      startDateTime: "",
      endDateTime: "",
    },
  });

  const handleFormSubmit = async (data) => {
    try {
    console.log('handle form submit>>>>>>>>', data);

      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_API_URL
        }api/user/create-meeting`,
        {...data, id},
        { withCredentials: true }
      );

      handleApiResponse(response);
    } catch (err) {
      console.log('err in meeting>>>', err);
      handleApiError(err);

    }
    
    // form.reset();
  };

  return (
    <div className="flex min-h-screen flex-col ">
      <div className="  p-6 flex-1 flex flex-col items-center justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="p-4 border mt-4 bg-zinc-100 shadow-md rounded-lg"
          >
            <h3 className="text-lg font-semibold mb-2">Add a new meeting</h3>
            <div className="flex flex-col gap-4 md:flex-row md:gap-5">
              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Summary</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
               <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            {/* <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <div className="flex flex-col gap-4 md:flex-row md:gap-5">
              <FormField
                control={form.control}
                name="startDateTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date & Time</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDateTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date & Time</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-between items-center">
              <Button
                type="submit"
                className="bg-blue-500 text-white py-3 w-full my-3 md:w-48 font-semibold hover:bg-blue-600"
              >
                Add Meeting
              </Button>
              <Button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                onClick={() => form.reset()}
                type="button"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Meeting;
