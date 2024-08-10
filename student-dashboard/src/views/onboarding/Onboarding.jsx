// import { Building, Star, User } from "lucide-react";

// import { Step, Stepper, useStepper } from "@/components/stepper";
// import { Button } from "@/components/ui/button";

// const steps = [
// 	{ label: "Basic Details", icon: User },
// 	{ label: "Education", icon: Building },
// 	{ label: "Skills", icon: Star },
// ] 

// const data = ''

// export default function StepperCustomIcons() {
// 	return (
// 		<div className="flex min-h-screen justify-center items-center w-full items flex-col">
//             <div className="w-[500px] ">
//             <Stepper state={data} initialStep={0} steps={steps}>
// 				{steps.map((stepProps, index) => {
// 					return (
// 						<Step key={stepProps.label} {...stepProps}>
// 							<div className="h-40 flex items-center justify-center my-2 border bg-secondary text-primary rounded-md">
// 								<h1 className="text-xl">Step {index + 1}</h1>
// 							</div>
//                             <StepButtons />
// 						</Step>
// 					);
// 				})}
// 				{/* <Footer /> */}
//                 <FinalStep />
// 			</Stepper>
//             </div>
//             <StepperCustomIcons1/>
            
//             {/* 
//             <div className="w-[500px]">
//             </div> */}

// 		</div>
        
        
// 	);
// }

// const Footer = () => {
// 	const {
// 		nextStep,
// 		prevStep,
// 		resetSteps,
// 		isDisabledStep,
// 		hasCompletedAllSteps,
// 		isLastStep,
// 		isOptionalStep,
// 	} = useStepper();
// 	return (
// 		<>
// 			{hasCompletedAllSteps && (
// 				<div className="h-40 flex items-center justify-center my-2 border bg-secondary text-primary rounded-md">
// 					<h1 className="text-xl">Woohoo! All steps completed! 🎉</h1>
// 				</div>
// 			)}
// 			<div className="w-full flex justify-end gap-2">
// 				{hasCompletedAllSteps ? (
// 					<Button size="sm" onClick={resetSteps}>
// 						Reset
// 					</Button>
// 				) : (
// 					<>
// 						<Button
// 							disabled={isDisabledStep}
// 							onClick={prevStep}
// 							size="sm"
// 							variant="secondary"
// 						>
// 							Prev
// 						</Button>
// 						<Button size="sm" onClick={nextStep}>
// 							{isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"}
// 						</Button>
// 					</>
// 				)}
// 			</div>
// 		</>
// 	);
// };


// const StepButtons = () => {
//     const { nextStep, prevStep, isLastStep, isOptionalStep, isDisabledStep } = useStepper();
//     return (
//       <div className="w-full my-3 flex gap-2 mb-4">
//         <Button disabled={isDisabledStep} onClick={prevStep} size="sm" variant="default">
//           Prev
//         </Button>
//         <Button size="sm" onClick={nextStep}>
//           {isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"}
//         </Button>
//       </div>
//     );
//   };
  
//   const FinalStep = () => {
//     const { hasCompletedAllSteps, resetSteps, steps } = useStepper();
//     if (!hasCompletedAllSteps) {
//       return null;
//     }
//     return (
//       <>
//         <div className="h-40 my-6 flex items-center justify-center border bg-secondary text-primary rounded-md">
//           <h1 className="text-xl">Woohoo! All steps completed! 🎉</h1>
//         </div>
//         <div className="w-full flex justify-end gap-2">
//           <Button size="sm" onClick={resetSteps}>
//             Reset
//           </Button>
//         </div>
//       </>
//     );
//   };


// // import { Building, Star, User } from "lucide-react";
// import { useForm } from "react-hook-form";
// // import { Step, Stepper, useStepper } from "@/components/stepper";
// // import { Button } from "@/components/ui/button";
// import axios from "axios";
// import { useState } from "react";
// // import { useState } from "react";

// // const steps = [
// //   { label: "Basic Details", icon: User },
// //   { label: "Education", icon: Building },
// //   { label: "Skills", icon: Star },
// // ];

// export  function StepperCustomIcons1() {
//   const [stepState, setStepState] = useState('');
//   const { prevStep, isLastStep, isOptionalStep, nextStep } = useStepper();
//   const onSubmit = async (data) => {
//     // // setStepState('loading');
//     // // try {
//     // //   await axios.post('/api/submit', data);
//     // //   setStepState('');
//     // //   nextStep();
//     // // } catch (error) {
//     // //   setStepState('error');
//     // // }
//     // setStepState('loading');
//     // // Simulate an API call with setTimeout
//     // setTimeout(() => {
//     //   // Simulate success or error
//     //   const isSuccess = Math.random() > 0.5;
//     //   if (isSuccess) {
//     //     setStepState('');
//     //     nextStep();
//     //   } else {
//     //     setStepState('error');
//     //   }
//     // }, 3000); // Simulate a 2-second API call delay
//     nextStep();

//   };

//   return (
//     <div className="">
//       <div className="w-[500px] ">
//         <Stepper state={stepState} initialStep={0} steps={steps}>
//           {steps.map((stepProps, index) => {
//             return (
//               <Step key={stepProps.label} {...stepProps}>
//                 <StepForm stepIndex={index} onSubmit={onSubmit} />
//               </Step>
//             );
//           })}
//           <FinalStep />
//         </Stepper>
//       </div>
//     </div>
//   );
// }

// const StepForm = ({ stepIndex, onSubmit }) => {
//   const { register, handleSubmit } = useForm();
//   const { prevStep, isLastStep, isOptionalStep } = useStepper();

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div className="h-40 flex items-center justify-center my-2 border bg-secondary text-primary rounded-md">
//         <h1 className="text-xl">Step {stepIndex + 1}</h1>
//       </div>
//       <div className="w-full flex flex-col gap-2">
//         <input {...register('field1')} placeholder="Field 1" className="input" />
//         <input {...register('field2')} placeholder="Field 2" className="input" />
//       </div>
//       <div className="w-full my-3 flex gap-2 mb-4">
//         <Button onClick={prevStep} size="sm" variant="default">
//           Prev
//         </Button>
//         <Button type="submit" size="sm">
//           {isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"}
//         </Button>
//       </div>
//     </form>
//   );
// };

// // const FinalStep = () => {
// //   const { hasCompletedAllSteps, resetSteps } = useStepper();

// //   if (!hasCompletedAllSteps) {
// //     return null;
// //   }

// //   return (
// //     <>
// //       <div className="h-40 my-6 flex items-center justify-center border bg-secondary text-primary rounded-md">
// //         <h1 className="text-xl">Woohoo! All steps completed! 🎉</h1>
// //       </div>
// //       <div className="w-full flex justify-end gap-2">
// //         <Button size="sm" onClick={resetSteps}>
// //           Reset
// //         </Button>
// //       </div>
// //     </>
// //   );
// // };


//3


// import { Building, Star, User } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { Step, Stepper, useStepper } from "@/components/stepper";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";

// const steps = [
//   { label: "Basic Details", icon: User },
//   { label: "Education", icon: Building },
//   { label: "Skills", icon: Star },
// ];

// export default function StepperCustomIcons() {
//   return (
//     <div className="flex min-h-screen justify-center items-center w-full flex-col">
//       <div className="w-[500px]">
//         <StepperContainer steps={steps} />
//       </div>
//     </div>
//   );
// }

// const StepperContainer = ({ steps }) => {
//   const [stepState, setStepState] = useState('');

//   return (
//     <Stepper state={stepState} initialStep={0} steps={steps}>
//       {steps.map((stepProps, index) => (
//         <Step key={stepProps.label} {...stepProps}>
//           <StepContent stepIndex={index} setStepState={setStepState} />
//         </Step>
//       ))}
//       <FinalStep />
//     </Stepper>
//   );
// };


// const StepContent = ({ stepIndex, setStepState }) => {
//   const { register, handleSubmit } = useForm();
//   const { prevStep, isLastStep, isOptionalStep, nextStep, isDisabledStep } = useStepper();

//   const onSubmit = (data) => {
//     setStepState('loading');
//     setTimeout(() => {
//       const isSuccess = Math.random() > 0.5;
//       if (isSuccess) {
//         setStepState('');
//         nextStep();
//       } else {
//         setStepState('error');
//       }
//     }, 2000);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div className="h-40 flex items-center justify-center my-2 border bg-secondary text-primary rounded-md">
//         <input {...register('field1')} placeholder="Field 1" className="input" />
//         <input {...register('field2')} placeholder="Field 2" className="input" />
//       </div>

//       <div className="w-full my-3 flex gap-2 mb-4">
//         <Button disabled={isDisabledStep} onClick={prevStep} size="sm" variant="default">
//           Prev
//         </Button>
//         <Button type="submit" size="sm">
//           {isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"}
//         </Button>
//       </div>
//     </form>
//   );
// };

// const FinalStep = () => {
//   const { hasCompletedAllSteps, resetSteps } = useStepper();

//   if (!hasCompletedAllSteps) {
//     return null;
//   }

//   return (
//     <>
//       <div className="h-40 my-6 flex items-center justify-center border bg-secondary text-primary rounded-md">
//         <h1 className="text-xl">Woohoo! All steps completed! 🎉</h1>
//       </div>
//       <div className="w-full flex justify-end gap-2">
//         <Button size="sm" onClick={resetSteps}>
//           Reset
//         </Button>
//       </div>
//     </>
//   );
// };








//4

// import { Building, Star, User } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Step, Stepper, useStepper } from "@/components/stepper";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";

// const steps = [
//   { label: "Basic Details", icon: User },
//   { label: "Education", icon: Building },
//   { label: "Skills", icon: Star },
// ];

// const schema = z.object({
//   field1: z.string("Field 1 is required").nonempty("Field 1 is required"),
//   field2: z.string().nonempty("Field 2 is required"),
// });

// export default function StepperCustomIcons() {
//   return (
//     <div className="flex min-h-screen justify-center items-center w-full flex-col">
//       <div className="w-[500px]">
//         <StepperContainer steps={steps} />
//       </div>
//     </div>
//   );
// }

// const StepperContainer = ({ steps }) => {
//   const [stepState, setStepState] = useState('');

//   return (
//     <Stepper state={stepState} initialStep={0} steps={steps}>
//       {steps.map((stepProps, index) => (
//         <Step key={stepProps.label} {...stepProps}>
//           <StepContent stepIndex={index} setStepState={setStepState} />
//         </Step>
//       ))}
//       <FinalStep />
//     </Stepper>
//   );
// };

// const StepContent = ({ stepIndex, setStepState }) => {
//   const { register, handleSubmit, formState: { errors, isValid } } = useForm({
//     resolver: zodResolver(schema),
//   });
//   const { prevStep, isLastStep, isOptionalStep, nextStep, isDisabledStep } = useStepper();

//   const onSubmit = (data) => {
//     setStepState('loading');
//     setTimeout(() => {
//       const isSuccess = Math.random() > 0.5;
//       if (isSuccess) {
//         setStepState('');
//         nextStep();
//       } else {
//         setStepState('error');
//       }
//     }, 2000);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div className="h-40 flex flex-col items-center justify-center my-2 border bg-secondary text-primary rounded-md">
//         <input {...register('field1')} placeholder="Field 1" className="input" />
//         {errors.field1 && <p className="text-red-500">{errors.field1.message}</p>}
//         <input {...register('field2')} placeholder="Field 2" className="input" />
//         {errors.field2 && <p className="text-red-500">{errors.field2.message}</p>}
//       </div>

//       <div className="w-full my-3 flex gap-2 mb-4">
//         <Button disabled={isDisabledStep} className={`${isDisabledStep ? 'bg-gray-300' : 'text-blueSecondary bg-gray-50'}`} onClick={prevStep} size="sm" variant="default">
//           Prev
//         </Button>
//         <Button type="submit" className='bg-blueSecondary text-white' size="sm">
//           {isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"}
//         </Button>
//       </div>
//     </form>
//   );
// };

// const FinalStep = () => {
//   const { hasCompletedAllSteps, resetSteps } = useStepper();

//   if (!hasCompletedAllSteps) {
//     return null;
//   }

//   return (
//     <>
//       <div className="h-40 my-6 flex items-center justify-center border bg-secondary text-primary rounded-md">
//         <h1 className="text-xl">Woohoo! All steps completed! 🎉</h1>
//       </div>
//       <div className="w-full flex justify-end gap-2">
//         <Button size="sm" onClick={resetSteps}>
//           Reset
//         </Button>
//       </div>
//     </>
//   );
// };






//5
import { Building, Star, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Step, Stepper, useStepper } from "@/components/stepper";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const steps = [
  { label: "Basic Details", icon: User },
  { label: "Education", icon: Building },
  { label: "Skills", icon: Star },
];

const basicDetailsSchema = z.object({
  name: z.string().nonempty("Name is required"),
  phno: z.string().nonempty("Phone number is required"),
  occupation: z.string().nonempty("Occupation is required"),
  email: z.string().nonempty("Email is required").email("Invalid email"),
  description: z.string().nonempty("Description is required"),
});

const educationSchema = z.object({
    education: z.object({
      classX: z.object({
        school: z.string().nonempty("School is required"),
        boards: z.string().nonempty("Boards are required"),
        percentage: z.string().nonempty("Percentage/CGPA is required"),
        total: z.string().nonempty("Total is required"),
      }),
      classXII: z.object({
        school: z.string().nonempty("School is required"),
        boards: z.string().nonempty("Boards are required"),
        percentage: z.string().nonempty("Percentage/CGPA is required"),
        total: z.string().nonempty("Total is required"),
      }),
      graduation: z.object({
        college: z.string().nonempty("College is required"),
        university: z.string().nonempty("University is required"),
        percentage: z.string().nonempty("Percentage/CGPA is required"),
        total: z.string().nonempty("Total is required"),
      }),
      extraCertifications: z.string().optional(),
    }),
  });
const skillsSchema = z.object({
  skills: z.string().nonempty("Skills are required"),
});

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
  const [stepState, setStepState] = useState('');

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
  const schema = stepIndex === 0 ? basicDetailsSchema : stepIndex === 1 ? educationSchema : skillsSchema;
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });
  const { prevStep, isLastStep, isOptionalStep, nextStep, isDisabledStep } = useStepper();

  const onSubmit = (data) => {
    console.log('data>>>>>>>', data)
    setStepState('loading');
    setTimeout(() => {
    //   const isSuccess = Math.random() > 0.5;
    //   if (isSuccess) {
        setStepState('');
        nextStep();
    //   } else {
    //     setStepState('error');
    //   }
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="min-h-40 flex flex-col items-center justify-center my-2 border bg-secondary text-primary rounded-md">
        {stepIndex === 0 && (
          <>
            <input {...register('name')} placeholder="Name" className="input" />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            <input {...register('phno')} placeholder="Phone Number" className="input" />
            {errors.phno && <p className="text-red-500">{errors.phno.message}</p>}
            <input {...register('occupation')} placeholder="Occupation" className="input" />
            {errors.occupation && <p className="text-red-500">{errors.occupation.message}</p>}
            <input {...register('email')} placeholder="Email" className="input" />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            <input {...register('description')} placeholder="Description" className="input" />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
          </>
        )}
         {stepIndex === 1 && (
          <>
            <h3>Class X</h3>
            <input {...register('education.classX.school')} placeholder="School" className="input" />
            {errors.education?.classX?.school && <p className="text-red-500">{errors.education.classX.school.message}</p>}
            <input {...register('education.classX.boards')} placeholder="Boards" className="input" />
            {errors.education?.classX?.boards && <p className="text-red-500">{errors.education.classX.boards.message}</p>}
            <input {...register('education.classX.percentage')} placeholder="Percentage/CGPA" className="input" />
            {errors.education?.classX?.percentage && <p className="text-red-500">{errors.education.classX.percentage.message}</p>}
            <input {...register('education.classX.total')} placeholder="Total" className="input" />
            {errors.education?.classX?.total && <p className="text-red-500">{errors.education.classX.total.message}</p>}

            <h3>Class XII</h3>
            <input {...register('education.classXII.school')} placeholder="School" className="input" />
            {errors.education?.classXII?.school && <p className="text-red-500">{errors.education.classXII.school.message}</p>}
            <input {...register('education.classXII.boards')} placeholder="Boards" className="input" />
            {errors.education?.classXII?.boards && <p className="text-red-500">{errors.education.classXII.boards.message}</p>}
            <input {...register('education.classXII.percentage')} placeholder="Percentage/CGPA" className="input" />
            {errors.education?.classXII?.percentage && <p className="text-red-500">{errors.education.classXII.percentage.message}</p>}
            <input {...register('education.classXII.total')} placeholder="Total" className="input" />
            {errors.education?.classXII?.total && <p className="text-red-500">{errors.education.classXII.total.message}</p>}

            <h3>Graduation</h3>
            <input {...register('education.graduation.college')} placeholder="College" className="input" />
            {errors.education?.graduation?.college && <p className="text-red-500">{errors.education.graduation.college.message}</p>}
            <input {...register('education.graduation.university')} placeholder="University" className="input" />
            {errors.education?.graduation?.university && <p className="text-red-500">{errors.education.graduation.university.message}</p>}
            <input {...register('education.graduation.percentage')} placeholder="Percentage/CGPA" className="input" />
            {errors.education?.graduation?.percentage && <p className="text-red-500">{errors.education.graduation.percentage.message}</p>}
            <input {...register('education.graduation.total')} placeholder="Total" className="input" />
            {errors.education?.graduation?.total && <p className="text-red-500">{errors.education.graduation.total.message}</p>}

            <h3>Extra Certifications (if any)</h3>
            <input {...register('education.extraCertifications')} placeholder="Extra Certifications" className="input" />
            {errors.education?.extraCertifications && <p className="text-red-500">{errors.education.extraCertifications.message}</p>}
          </>
        )}
        {stepIndex === 2 && (
          <>
            <input {...register('skills')} placeholder="Skills" className="input" />
            {errors.skills && <p className="text-red-500">{errors.skills.message}</p>}
          </>
        )}
      </div>

      <div className="w-full my-3 flex gap-2 mb-4">
     <Button disabled={isDisabledStep} className={`${isDisabledStep ? 'bg-gray-300' : 'text-blueSecondary bg-gray-50'}`} onClick={prevStep} size="sm" variant="default">
        Prev
      </Button>
        <Button type="submit" className={`${!isValid ? 'bg-gray-300' : 'bg-blueSecondary text-white'}`} size="sm" disabled={!isValid}>
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
        <h1 className="text-xl">Woohoo! All steps completed! 🎉</h1>
      </div>
      <div className="w-full flex justify-end gap-2">
        <Button size="sm" onClick={resetSteps}>
          Reset
        </Button>
      </div>
    </>
  );
};
