import { Building, Star, User } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Step, Stepper, useStepper } from "@/components/stepper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import axios from "axios";
import { FancyMultiSelect } from "@/components/multiselect/FancyMultiSelect";
import { FancySelect } from "@/components/multiselect/FancySelect";
import { useDispatch } from "react-redux";
import { setUserDetails } from "@/state/userSlice";
import { toast } from "sonner";
import useApiHandler from "@/utils/useApiHandler";
import { Textarea } from "@/components/ui/textarea";
import { clearUserDetails, selectUserDetails } from "@/state/userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const languages = [
  { value: "Assamese", label: "Assamese" },
  { value: "English", label: "English" },
  { value: "Hindi", label: "Hindi" },
  { value: "Bengali", label: "Bengali" },
];
export const specialisations = [
  { value: "Technical", label: "Technical" },
  { value: "Marketing", label: "Marketing" },
  { value: "Sales", label: "Sales" },
  { value: "Design", label: "Design" },
  { value: "Content", label: "Content" },
];
export const skills = [
  { value: "Web Development", label: "Web Development" },
  { value: "App Development", label: "App Development" },
  { value: "Digital Marketing", label: "Digital Marketing" },
  { value: "Social Media Marketing", label: "Social Media Marketing" },
  { value: "Content writing", label: "Content writing" },
  { value: "Content curator", label: "Content curator" },
  { value: "Graphics Designing", label: "Graphics Designing" },
  { value: "3D designing", label: "3D designing" },
  { value: "Sales executive", label: "Sales executive" },
  { value: "Backend Development", label: "Backend Development" },
  { value: "DevOps Engineer", label: "DevOps Engineer" },
  { value: "Physical marketing", label: "Physical marketing" },
];

const steps = [
  { label: "Basic Details", icon: User },
  { label: "Education", icon: Building },
  { label: "Professional Details", icon: Star },
  { label: "Personal Info", icon: User },
];

const basicDetailsSchema = z.object({
  gender: z.string().min(1, "Gender is required"),
  specialisation: z
    .array(z.string())
    .nonempty("At least one specialization is required"),
  languages: z.array(z.string()).nonempty("At least one language is required"),
  dob: z.string().min(1, "Date of Birth is required"),
  description: z.string().optional(),
});

const educationSchema = z.object({
  education: z.object({
    classX: z.object({
      school: z.string().min(1, "School is required"),
      boards: z.string().min(1, "Boards are required"),
      percentage: z.string().min(1, "Percentage/CGPA is required"),
      // total: z.string().min(1, "Total is required"),
    }),
    classXII: z.object({
      school: z.string().min(1, "School is required"),
      boards: z.string().min(1, "Boards are required"),
      percentage: z.string().min(1, "Percentage/CGPA is required"),
      // total: z.string().min(1, "Total is required"),
    }),
    graduation: z
      .object({
        college: z.string().optional(),
        university: z.string().optional(),
        percentage: z.string().optional(),
        // total: z.string().optional(),
      })
      .optional(),
    extraCertifications: z.string().optional(),
  }),
});

const skillsSchema = z
  .object({
    skills: z.array(z.string()).optional(),
    achievements: z.array(z.string()).optional(),
    experience: z.array(z.string()).optional(),
  })
  .optional();

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
    <div className="flex justify-center items-center w-full flex-col">
      <div className="w-full p-2 md:w-4/5 h-full my-12">
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
  const [addGraduation, setAddGraduation] = useState();
  const dispatch = useDispatch();
  const { handleApiCall } = useApiHandler();

  const handleProfilePicChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  const toggleGraduation = () => {
    setAddGraduation(!addGraduation);
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



  const userDetails = useSelector(selectUserDetails);

  useEffect(() => {
    if (userDetails) {
      // Prepopulate form fields based on step index
      switch (stepIndex) {
        case 0:
          setValue("gender", userDetails?.gender || "");
          setValue("specialisation", userDetails?.specialisation || []);
          setValue("languages", userDetails?.languages || []);
          setValue("dob", userDetails?.dob || "");
          setValue("description", userDetails?.description || "");
          break;
        case 1:
          setValue("education.classX.school", userDetails.education?.classX?.school || "");
          setValue("education.classX.boards", userDetails.education?.classX?.boards || "");
          setValue("education.classX.percentage", userDetails.education?.classX?.percentage || "");
          setValue("education.classXII.school", userDetails.education?.classXII?.school || "");
          setValue("education.classXII.boards", userDetails.education?.classXII?.boards || "");
          setValue("education.classXII.percentage", userDetails.education?.classXII?.percentage || "");
          setValue("education.graduation.college", userDetails.education?.graduation?.college || "");
          setValue("education.graduation.university", userDetails.education?.graduation?.university || "");
          setValue("education.graduation.percentage", userDetails.education?.graduation?.percentage || "");
          break;
        case 2:
          setValue("skills", userDetails?.skills || []);
          setValue("achievements", userDetails?.achievements || []);
          setValue("experience", userDetails?.experience || []);
          break;
        case 3:
          // For file inputs, you cannot set value directly
          // For profilePic and resume, handle file input separately
          break;
        default:
          break;
      }
    }
  }, [stepIndex, userDetails, setValue]);


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
        key === "education" ||
        key === "skills" ||
        key === "achievements" ||
        key === "experience"
      ) {
        formData.append(key, JSON.stringify(data[key])); // Convert array to JSON string
      } else if (
        key !== "profilePic" &&
        key !== "resume" &&
        key !== "applications" &&
        data[key] !== "" &&
        key !== "specialisation" &&
        key !== "languages" &&
        key !== "skills" &&
        key !== "achievements" &&
        key !== "experience" &&
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
        // dispatch(setUserDetails(data));
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
      <div className="flex flex-col my-2 border bg-secondary text-primary rounded-md p-8">
        {stepIndex === 0 && (
          <>
            <label
              htmlFor="gender"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Gender
            </label>
            <Input
              {...register("gender")}
              name="gender"
              id="gender"
              placeholder="Your gender"
              className="input"
            />
            <p className="text-red-500">{errors.gender?.message}</p>
            <label
              htmlFor="specialisation"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Specialisation
            </label>
            <Controller
              name="specialisation"
              id="specialisation"
              control={control}
              render={({ field }) => (
                <FancySelect
                  {...field}
                  options={specialisations}
                  placeholder="Select Specialisations"
                  onChange={(value) => setValue("specialisation", value)}
                />
              )}
            />
            <label
              htmlFor="languages"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Languages
            </label>
            <Controller
              id="languages"
              name="languages"
              control={control}
              render={({ field }) => (
                <FancyMultiSelect
                  {...field}
                  options={languages}
                  placeholder="Select Languages"
                  onChange={(value) => setValue("languages", value)}
                />
              )}
            />
            <label
              htmlFor="dob"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Date of Birth
            </label>
            <Input
              {...register("dob")}
              placeholder="Date of Birth"
              className="input"
            />
            <p className="text-red-500">{errors.dob?.message}</p>
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description (optional)
            </label>
            <Textarea
              {...register("description")}
              name="description"
              id="description"
              placeholder="Write about yourself"
            />
            <p className="text-red-500">{errors.description?.message}</p>
          </>
        )}
        {stepIndex === 1 && (
          <>
            <h3 className="my-2 dark:text-gray-100">Class X</h3>
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

            {/* <Controller
              name="education.classX.total"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Total" />}
            />
            {errors.education?.classX?.total && (
              <p className="text-red-500">
                {errors.education.classX.total.message}
              </p>
            )} */}

            <h3 className="my-2 dark:text-gray-100">Class XII</h3>
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

            {/*<Controller
              name="education.classXII.total"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Total" />}
            />
            {errors.education?.classXII?.total && (
              <p className="text-red-500">
                {errors.education.classXII.total.message}
              </p>
            )} */}
            <div
              className="border border-gray-500 border-dashed py-2 rounded-xl cursor-pointer w-[200px] flex items-center justify-center dark:text-gray-100"
              onClick={toggleGraduation}
            >
              {addGraduation ? "- Remove Graduation" : "+ Add Graduation"}
            </div>

            {addGraduation && (
              <>
                <h3 className="my-2 dark:text-gray-100">Graduation</h3>

                <Controller
                  name="education.graduation.college"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="College" />
                  )}
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
                    <Input
                      {...field}
                      placeholder="Percentage/CGPA (Till now)"
                    />
                  )}
                />
                {errors.education?.graduation?.percentage && (
                  <p className="text-red-500">
                    {errors.education.graduation.percentage.message}
                  </p>
                )}
              </>
            )}
          </>
        )}
        {stepIndex === 2 && (
          <>
            <label
              htmlFor="skills"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Skills
            </label>
            {/* <Input
              {...register("skills")}
              placeholder="minimum 3 skills"
              className="input"
              id="skills"
              name="skills"
            /> */}
            <Controller
              id="skills"
              name="skills"
              control={control}
              render={({ field }) => (
                <FancyMultiSelect
                  {...field}
                  options={skills}
                  placeholder="Minimum 3 Skils Required"
                  onChange={(value) => setValue("skills", value)}
                />
              )}
            />
            <p className="text-red-500">{errors.skills?.message}</p>
            <label
              htmlFor="achievements"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Achievements (optional)
            </label>
            {/* <Input
              {...register("achievements")}
              placeholder="Achievements (optional)"
              className="input"
            /> */}
            <Controller
              id="achievements"
              name="achievements"
              control={control}
              render={({ field }) => (
                <FancyMultiSelect
                  {...field}
                  // options={achievements}
                  placeholder="Add memoriable achievements"
                  onChange={(value) => setValue("achievements", value)}
                />
              )}
            />
            <p className="text-red-500">{errors.achievements?.message}</p>
            <label
              htmlFor="experience"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Experience (optional)
            </label>
            <Controller
              id="experience"
              name="experience"
              control={control}
              render={({ field }) => (
                <FancyMultiSelect
                  {...field}
                  // options={experience}
                  placeholder="If any experinence"
                  onChange={(value) => setValue("experience", value)}
                />
              )}
            />
            {/* <Input
              {...register("experience")}
              placeholder="Experience (optional)"
              className="input"
            /> */}
            <p className="text-red-500">{errors.experience?.message}</p>
          </>
        )}
        {stepIndex === 3 && (
          <>
            <label
              className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="profilePic"
            >
              Profile Pic
            </label>
            <input
              className="block px-1 w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="user_avatar_help"
              id="profilePic"
              name="profilePic"
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
            />
            <label
              className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="resume"
            >
              Resume
            </label>
            <input
              className="block px-1 w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="user_avatar_help"
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
                ? "bg-[#0361FD] text-white"
                : "bg-gray-300"
              : "bg-[#0361FD] text-white"
          }
          size="sm"
          // disabled={isLastStep ? !(resume && profilePic) : !isValid}
        >
          {isLastStep ? "Finish" : "Next"}
        </Button>
      </div>
    </form>
  );
};

const FinalStep = () => {
  const navigate = useNavigate();
  const { hasCompletedAllSteps, resetSteps } = useStepper();

  if (!hasCompletedAllSteps) {
    return null;
  }

  else {
    navigate("/admin/default");
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
