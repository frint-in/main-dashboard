
import { Building, Star, User } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Step, Stepper, useStepper } from "@/components/stepper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import { FancyMultiSelect } from "@/components/multiselect/FancyMultiSelect";
import { FancySelect } from "@/components/multiselect/FancySelect";
import { useDispatch } from "react-redux";
import { setUserDetails } from "@/state/userSlice";
import { toast } from "sonner";
import useApiHandler from "@/utils/useApiHandler";

export const fansOptions = [
  { value: "fan1", label: "Alice Johnson" },
  { value: "fan2", label: "Bob Smith" },
  { value: "fan3", label: "Charlie Brown" },
  { value: "fan4", label: "Diana Prince" },
  { value: "fan5", label: "Edward Davis" },
  { value: "fan6", label: "Fiona Lee" },
];

const steps = [
  { label: "Basic Details", icon: User },
  { label: "Education", icon: Building },
  { label: "Skills and Experience", icon: Star },
  { label: "Personal Info", icon: User },
];

const basicDetailsSchema = z.object({
  description: z.string().optional(),
  gender: z.string().min(1, "Gender is required"),
  specialisation: z
    .array(z.string())
    .nonempty("At least one specialization is required"),
  languages: z.array(z.string()).nonempty("At least one language is required"),
  dob: z.string().min(1, "Date of Birth is required"),
});

const educationSchema = z.object({
  education: z.object({
    classX: z.object({
      school: z.string().min(1, "School is required"),
      boards: z.string().min(1, "Boards are required"),
      percentage: z.string().min(1, "Percentage/CGPA is required"),
      total: z.string().min(1, "Total is required"),
    }),
    classXII: z.object({
      school: z.string().min(1, "School is required"),
      boards: z.string().min(1, "Boards are required"),
      percentage: z.string().min(1, "Percentage/CGPA is required"),
      total: z.string().min(1, "Total is required"),
    }),
    graduation: z.object({
      college: z.string().min(1, "College is required"),
      university: z.string().min(1, "University is required"),
      percentage: z.string().min(1, "Percentage/CGPA is required"),
      total: z.string().min(1, "Total is required"),
    }),
    extraCertifications: z.string().optional(),
  }),
});

const skillsSchema = z.object({
  skills: z.string().min(1, "Skills are required"),
  achievements: z.string().optional(),
  experience: z.string().optional(),
});

// const fileValidation = (file) => {
//   if (file && file instanceof File) {
//     console.log('yes');
//     return true;
//   }
//   console.log('no');
//   return false;
// };

const personalInfoSchema = z.object({
  profilePic: z.any(),
  resume: z.any(),
});

// const personalInfoSchema = z.object({
//   profilePic: z.unknown().refine((file) => file instanceof File, {
//     message: "Profile picture is required and must be a valid file.",
//   }),
//   resume: z.unknown().refine((file) => file instanceof File, {
//     message: "Resume is required and must be a valid file.",
//   }),
// });

export default function StepperCustomIcons() {
  return (
    <div className="flex min-h-screen justify-center items-center w-full flex-col">
      <div className="w-[500px]">
        <StepperContainer steps={steps} />
      </div>
    </div>
  );
}

const StepperContainer = ({ steps }) => {
  const [stepState, setStepState] = useState("");

  return (
    <Stepper state={stepState} initialStep={0} steps={steps}>
      {steps.map((stepProps, index) => (
        <Step key={stepProps.label} {...stepProps}>
          <StepContent stepIndex={index} setStepState={setStepState} />
        </Step>
      ))}
      <FinalStep />
    </Stepper>
  );
};

const StepContent = ({ stepIndex, setStepState }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [resume, setResume] = useState(null);
  const dispatch = useDispatch();
  const { handleApiCall } = useApiHandler();
  const handleProfilePicChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };
  // const [image, setImage] = useState(null);
  // const [resume, setResume] = useState(null);
  const schema =
    stepIndex === 0
      ? basicDetailsSchema
      : stepIndex === 1
      ? educationSchema
      : stepIndex === 2
      ? skillsSchema
      : personalInfoSchema;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const { prevStep, isLastStep, isOptionalStep, nextStep, isDisabledStep } =
    useStepper();

  const onSubmit = async (data) => {
    setStepState("loading");

    console.log("Form data before submission:", data);

    // console.log("data profilePic", data.profilePic);

    const formData = new FormData();

    // for (const key in data) {
    //   if (
    //     key !== "image" &&
    //     key !== "resume" &&
    //     key !== "applications" &&
    //     data[key] !== "" &&
    //     key !== "_id"
    //   ) {
    //     formData.append(key, data[key]);
    //   }
    // }

    for (const key in data) {
      if (
        key === "specialisation" ||
        key === "languages" ||
        key === "education"
      ) {
        formData.append(key, JSON.stringify(data[key])); // Convert array to JSON string
      } else if (
        key !== "profilePic" &&
        key !== "resume" &&
        key !== "applications" &&
        data[key] !== "" &&
        key !== "specialisation" &&
        key !== "languages" &&
        key !== "_id"
      ) {
        formData.append(key, data[key]);
      }
    }

    if (isLastStep) {
      formData.append("finalStep", "true");
    }

    if (profilePic) formData.append("profileImg", profilePic);
    if (resume) formData.append("resume", resume);

    try {
      // Replace with your API endpoint
      const response = await (isLastStep
        ? handleApiCall(() =>
            axios.put(
              `${import.meta.env.VITE_REACT_API_URL}api/user/onboarding`,
              formData,
              {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
              }
            )
          )
        : axios.put(
            `${import.meta.env.VITE_REACT_API_URL}api/user/onboarding`,
            formData,
            {
              withCredentials: true,
              headers: { "Content-Type": "multipart/form-data" },
            }
          ));

      // Handle response or errors
      if (response.status === 200) {
        setStepState("");
        dispatch(setUserDetails(response.data.user));
        nextStep();
      } else {
        setStepState("error");
      }

      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      // setStepState("");
      // nextStep();
    } catch (error) {
      setStepState("error");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="min-h-40 flex flex-col items-center justify-center my-2 border bg-secondary text-primary rounded-md">
        {stepIndex === 0 && (
          <>
            <Input
              {...register("description")}
              placeholder="Description (optional)"
              className="input"
            />
            <p className="text-red-500">{errors.description?.message}</p>
            <Input
              {...register("gender")}
              placeholder="Gender"
              className="input"
            />
            <p className="text-red-500">{errors.gender?.message}</p>
            {/* Replace FancyMultiSelect and FancySelect with appropriate components */}
            <Controller
              name="specialisation"
              control={control}
              render={({ field }) => (
                <FancyMultiSelect
                  {...field}
                  options={fansOptions}
                  placeholder="Select Specialisations"
                  onChange={(value) => setValue("specialisation", value)}
                />
              )}
            />
            <Controller
              name="languages"
              control={control}
              render={({ field }) => (
                <FancySelect
                  {...field}
                  options={fansOptions}
                  placeholder="Select Languages"
                  onChange={(value) => setValue("languages", value)}
                />
              )}
            />
            <Input
              {...register("dob")}
              placeholder="Date of Birth"
              className="input"
            />
            <p className="text-red-500">{errors.dob?.message}</p>
          </>
        )}
        {stepIndex === 1 && (
          <>
            <h3>Class X</h3>
            <Controller
              name="education.classX.school"
              control={control}
              render={({ field }) => <Input {...field} placeholder="School" />}
            />
            {errors.education?.classX?.school && (
              <p className="text-red-500">
                {errors.education.classX.school.message}
              </p>
            )}

            <Controller
              name="education.classX.boards"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Boards" />}
            />
            {errors.education?.classX?.boards && (
              <p className="text-red-500">
                {errors.education.classX.boards.message}
              </p>
            )}

            <Controller
              name="education.classX.percentage"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Percentage/CGPA" />
              )}
            />
            {errors.education?.classX?.percentage && (
              <p className="text-red-500">
                {errors.education.classX.percentage.message}
              </p>
            )}

            <Controller
              name="education.classX.total"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Total" />}
            />
            {errors.education?.classX?.total && (
              <p className="text-red-500">
                {errors.education.classX.total.message}
              </p>
            )}

            <h3>Class XII</h3>
            <Controller
              name="education.classXII.school"
              control={control}
              render={({ field }) => <Input {...field} placeholder="School" />}
            />
            {errors.education?.classXII?.school && (
              <p className="text-red-500">
                {errors.education.classXII.school.message}
              </p>
            )}

            <Controller
              name="education.classXII.boards"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Boards" />}
            />
            {errors.education?.classXII?.boards && (
              <p className="text-red-500">
                {errors.education.classXII.boards.message}
              </p>
            )}

            <Controller
              name="education.classXII.percentage"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Percentage/CGPA" />
              )}
            />
            {errors.education?.classXII?.percentage && (
              <p className="text-red-500">
                {errors.education.classXII.percentage.message}
              </p>
            )}

            <Controller
              name="education.classXII.total"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Total" />}
            />
            {errors.education?.classXII?.total && (
              <p className="text-red-500">
                {errors.education.classXII.total.message}
              </p>
            )}

            <h3>Graduation</h3>
            <Controller
              name="education.graduation.college"
              control={control}
              render={({ field }) => <Input {...field} placeholder="College" />}
            />
            {errors.education?.graduation?.college && (
              <p className="text-red-500">
                {errors.education.graduation.college.message}
              </p>
            )}

            <Controller
              name="education.graduation.university"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="University" />
              )}
            />
            {errors.education?.graduation?.university && (
              <p className="text-red-500">
                {errors.education.graduation.university.message}
              </p>
            )}

            <Controller
              name="education.graduation.percentage"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Percentage/CGPA" />
              )}
            />
            {errors.education?.graduation?.percentage && (
              <p className="text-red-500">
                {errors.education.graduation.percentage.message}
              </p>
            )}

            <Controller
              name="education.graduation.total"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Total" />}
            />
            {errors.education?.graduation?.total && (
              <p className="text-red-500">
                {errors.education.graduation.total.message}
              </p>
            )}

            <Controller
              name="education.extraCertifications"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Extra Certifications (optional)"
                />
              )}
            />
            {errors.education?.extraCertifications && (
              <p className="text-red-500">
                {errors.education.extraCertifications.message}
              </p>
            )}
          </>
        )}
        {stepIndex === 2 && (
          <>
            <Input
              {...register("skills")}
              placeholder="Skills"
              className="input"
            />
            <p className="text-red-500">{errors.skills?.message}</p>
            <Input
              {...register("achievements")}
              placeholder="Achievements (optional)"
              className="input"
            />
            <p className="text-red-500">{errors.achievements?.message}</p>
            <Input
              {...register("experience")}
              placeholder="Experience (optional)"
              className="input"
            />
            <p className="text-red-500">{errors.experience?.message}</p>
          </>
        )}
        {stepIndex === 3 && (
          <>
            <input
              id="profilePic"
              name="profilePic"
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
            />

            <input
              id="resume"
              name="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeChange}
            />
          </>
        )}
      </div>

      <div className="w-full my-3 flex gap-2 mb-4">
        <Button
          disabled={isDisabledStep}
          className={
            isDisabledStep ? "bg-gray-300" : "text-blueSecondary bg-gray-50"
          }
          onClick={prevStep}
          size="sm"
          variant="default"
        >
          Prev
        </Button>
        {/* <Button
          type="submit"
          className={isValid ? "bg-blueSecondary text-white" : "bg-gray-300"}
          size="sm"
          disabled={!isValid}
        >
          {isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"}
        </Button> */}
        <Button
          type="submit"
          className={
            isLastStep
              ? resume && profilePic
                ? "bg-blueSecondary text-white"
                : "bg-gray-300"
              : "bg-blueSecondary text-white"
          }
          size="sm"
          disabled={isLastStep ? !(resume && profilePic) : !isValid}
        >
          {isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"}
        </Button>
      </div>
    </form>
  );
};

const FinalStep = () => {
  const { hasCompletedAllSteps, resetSteps } = useStepper();

  if (!hasCompletedAllSteps) {
    return null;
  }

  return (
    <>
      <div className="h-40 my-6 flex items-center justify-center border bg-secondary text-primary rounded-md">
        <div>All steps completed!</div>
      </div>
      <div className="w-full flex gap-2 mb-4">
        <Button onClick={resetSteps} size="sm" variant="default">
          Restart
        </Button>
      </div>
    </>
  );
};
