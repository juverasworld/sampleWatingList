"use client";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Transition } from "@headlessui/react";

interface Country {
  name: string;
  code: string;
}

interface FormData {
  name: string;
  email: string;
  country: string;
  whatsappNumber: string;
  contentType: string[]; // Correct typing: string[]
  createdBefore: boolean;
  biggestChallenge: string[]; // Assuming this is also an array of strings
  potentialStudents: string;
  // primaryGoal: string;
  primaryGoal: string[]; // Changed to an array
  usingOtherPlatforms: boolean;
  haveOwnPlatform: boolean;
  plannedLaunchPeriod: string;
  furtherComments: string;
  getUpdates: boolean;
}
interface FormDataForBusiness {
  name: string;
  email: string;
  country: string;
  whatsappNumber: string;
  companyName: string;
  companyIndustry: string;
  companyRole: string;
  typeOfTraining: string[]; // Array of strings
  employeesNeedingTraining: string; // Single string
  usingOtherPlatforms: boolean; // Boolean
  challengeWithEmployeeTraining: string; // Single string
  plannedLaunchPeriod: string; // Single string
  furtherComments: string; // Single string
  getUpdates: boolean; // Boolean
}

export default function Home() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [showOverlays, setShowOverlays] = useState(false);

  // Function to toggle the overlay
  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  // Function to toggle the overlay
  const toggleOverlays = () => {
    setShowOverlays(!showOverlays);
  };

  // const [showOverlay, setShowOverlay] = useState(false);

  // // Function to toggle overlay
  // const toggleOverlay = () => {
  //   setShowOverlay(!showOverlay);
  // };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleRegisterClick = () => {
    const registerSection = document.getElementById("register");
    if (registerSection) {
      registerSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  const [year, setYear] = useState<number>();
  const [countries, setCountries] = useState<{ name: string; code: string }[]>(
    []
  );
  const [phoneNumber, setPhoneNumber] = useState();

  const handlePhoneNumberChange = (value: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      whatsappNumber: value,
    }));
  };
 
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setYear(currentYear);

    const fetchCountries = async () => {
      try {
        const response = await fetch("/country.json");
        const data = await response.json();
        const countryList: Country[] = data.map((country: any) => ({
          name: country.name.common,
          code: country.cca2,
        }));

        // Sort the countryList alphabetically by name
        countryList.sort((a, b) => a.name.localeCompare(b.name));

        setCountries(countryList);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  // const [formData, setFormData] = useState({
  //   email: "",
  //   whatsappNumber: "",
  //   name: "",
  //   country: "",
  //   companyName: "",
  //   companyIndustry: "",
  //   companyRole: "",
  //   getUpdates: false,
  // });

  // for creator waitlist
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    country: "",
    whatsappNumber: "",
    contentType: [], // Initialize as an empty array of strings
    createdBefore: false,
    biggestChallenge: [], // Initialize as an empty array of strings
    potentialStudents: "",
    // primaryGoal: "",
    primaryGoal: [], // Changed to an array
    usingOtherPlatforms: false,
    haveOwnPlatform: false,
    plannedLaunchPeriod: "",
    furtherComments: "",
    getUpdates: false,
  });

  const [formDataForBusiness, setFormDataForBusiness] =
    useState<FormDataForBusiness>({
      name: "",
      email: "",
      country: "",
      whatsappNumber: "",
      companyName: "",
      companyIndustry: "",
      companyRole: "",
      typeOfTraining: [] as string[],
      employeesNeedingTraining: "", // Single string
      usingOtherPlatforms: false, // Boolean
      challengeWithEmployeeTraining: "", // Single string
      plannedLaunchPeriod: "", // Single string
      furtherComments: "", // Single string
      getUpdates: false, // Boolean
    });
    const handlePhoneNumberChanges = (value: string | undefined) => {
      setFormDataForBusiness((prevData) => ({
        ...prevData,
        whatsappNumber: value || '', // Ensure to handle undefined case
      }));
    };
  const [submittedEmails, setSubmittedEmails] = useState<Set<string>>(
    new Set()
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    const isCheckbox = (target: EventTarget): target is HTMLInputElement =>
      (target as HTMLInputElement).type === "checkbox";

    const newValue = isCheckbox(e.target) ? e.target.checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };
  const handleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormDataForBusiness((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleChangess = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setFormDataForBusiness((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreatedBeforeChange = (value: boolean) => {
    setFormData((prevState) => ({
      ...prevState,
      createdBefore: value, // Update the createdBefore field
    }));
  };

  const handleContentTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    setFormData((prevState) => {
      const contentType = prevState.contentType;

      if (checked) {
        // Add the checked value to the array
        return { ...prevState, contentType: [...contentType, value] };
      } else {
        // Remove the unchecked value from the array
        return {
          ...prevState,
          contentType: contentType.filter((item) => item !== value),
        };
      }
    });
  };

  const handleBiggestChallengeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = e.target;

    setFormData((prevState) => {
      // If checkbox is checked, add the value to the array
      if (checked) {
        return {
          ...prevState,
          biggestChallenge: [...prevState.biggestChallenge, value],
        };
      } else {
        // If unchecked, remove the value from the array
        return {
          ...prevState,
          biggestChallenge: prevState.biggestChallenge.filter(
            (challenge) => challenge !== value
          ),
        };
      }
    });
  };

  const handlePotentialStudentsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      potentialStudents: e.target.value,
    }));
  };

  const handlePrimaryGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    setFormData((prevState) => {
      if (checked) {
        // Add goal if checked
        return {
          ...prevState,
          primaryGoal: [...prevState.primaryGoal, value],
        };
      } else {
        // Remove goal if unchecked
        return {
          ...prevState,
          primaryGoal: prevState.primaryGoal.filter((goal) => goal !== value),
        };
      }
    });
  };

  // const handlePrimaryGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     primaryGoal: e.target.value,
  //   }));
  // };

  const handleUsingOtherPlatformsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      usingOtherPlatforms: e.target.value === "Yes", // Set to true for 'Yes', false for 'No'
    }));
  };

  const handleHaveOwnPlatformChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      haveOwnPlatform: e.target.value === "Yes", // true for "Yes", false for "No"
    }));
  };

  const handleChangessss = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormDataForBusiness((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePlannedLaunchPeriodChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      plannedLaunchPeriod: e.target.value, // Set the value directly
    }));
  };

  const handleFurtherCommentsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      furtherComments: e.target.value, // Set the value directly
    }));
  };

  const handleChangesss = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormDataForBusiness((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFurtherCommentsChanges = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      furtherComments: e.target.value, // Set the value directly
    }));
  };
  const handlechallengeWithEmployeeTrainingChanges = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      challengeWithEmployeeTraining: e.target.value, // Set the value directly
    }));
  };

  const trainingOptions = [
    "Employee Onboarding",
    "Continuous Education",
    "Customer Education",
    "Compliance Training",
    "Others",
  ];

  // Handle checkbox change
  const handleTrainingChange = (option: string) => {
    setFormDataForBusiness((prevState) => {
      const isSelected = prevState.typeOfTraining.includes(option);
      const updatedTraining = isSelected
        ? prevState.typeOfTraining.filter((item) => item !== option) // Remove if already selected
        : [...prevState.typeOfTraining, option]; // Add if not selected

      return {
        ...prevState,
        typeOfTraining: updatedTraining,
      };
    });
  };

  // const handleSubmit = async (event: { preventDefault: () => void }) => {
  //   event.preventDefault();
  //   if (formData.contentType.length === 0) {
  //     // Simple validation: check if at least one checkbox is selected
  //     alert("Please select at least one training type.");
  //     return;
  //   }

  //   if (formData.biggestChallenge.length === 0) {
  //     alert("Please select at least one training type.");

  //     return; // Don't submit the form if validation fails
  //   }

  //   // Here, you can process the formData as required (e.g., send it to an API)
  //   console.log("Selected Training Types:", formData.contentType);

  //   if (submittedEmails.has(formData.email)) {
  //     // Optionally handle already submitted case if needed
  //     return;
  //   }

  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_BASE_URL}waitlist/creator`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(formData),
  //       }
  //     );

  //     if (response.ok) {
  //       const responseData = await response.json();

  //       if (responseData.code === 200 && responseData.status === "success") {
  //         // Clear the form data
  //         setFormData({
  //           name: "",
  //           email: "",
  //           country: "",
  //           whatsappNumber: "",
  //           contentType: [], // Array of strings
  //           createdBefore: false, // Boolean
  //           biggestChallenge: [], // Array of strings
  //           potentialStudents: "", // Single string
  //           primaryGoal: [], // Single string
  //           // primaryGoal: "", // Single string
  //           usingOtherPlatforms: false, // Boolean
  //           haveOwnPlatform: false, // Boolean
  //           plannedLaunchPeriod: "", // Single string
  //           furtherComments: "", // Single string
  //           getUpdates: false, // Boolean
  //         });

  //         // Add the submitted email to the set
  //         setSubmittedEmails(new Set(submittedEmails).add(formData.email));

  //         // Update the button text and background color
  //         const button = document.querySelector(
  //           ".submitButton"
  //         ) as HTMLButtonElement | null;
  //         if (button) {
  //           button.textContent = "Congratulations, you’re in";
  //           button.style.backgroundColor = "#099137";
  //           setTimeout(() => {
  //             button.textContent = "Fill another details";
  //             button.style.backgroundColor = ""; // Reset to default
  //           }, 6000);
  //         }
  //       }

  //       // Optionally display a message if needed
  //       // alert(responseData.message);
  //     } else {
  //       // Optionally handle failure case if needed
  //       // alert("Failed to join waitlist. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //     // Optionally handle error case if needed
  //     // alert("Failed to join waitlist. Please try again.");
  //   }
  // };

  // const handleSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();

  //   if (submittedEmails.has(formData.email)) {
  //     alert("You have been added to the waitlist!");
  //     return;
  //   }

  //   const response = await fetch(
  //     `${process.env.NEXT_PUBLIC_BASE_URL}/waitlist`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     }
  //   );

  //   if (response.ok) {
  //     const responseData = await response.json();

  //     if (responseData.code === 200 && responseData.status === "success") {
  //       setSubmittedEmails(new Set(submittedEmails).add(formData.email));
  //     }

  //     alert(responseData.message); // Display the API response message
  //   } else {
  //     alert("Failed to join waitlist. Please try again.");
  //   }
  // };

  const [buttonText, setButtonText] = useState("Let me in on this waitlist");
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // Validation checks
    if (formData.contentType.length === 0) {
      alert("Please select at least one training type.");
      return;
    }

    if (formData.biggestChallenge.length === 0) {
      alert("Please select at least one biggest challenge.");
      return; // Don't submit the form if validation fails
    }

    // Log the selected training types for debugging purposes
    console.log("Selected Training Types:", formData.contentType);

    // Check if the email has already been submitted
    if (submittedEmails.has(formData.email)) {
      alert("This email has already been submitted.");
      return; // Optionally handle already submitted case
    }

    try {
      // Send the form data to the server
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/waitlist/creator`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      // Check if the response is successful
      if (response.ok) {
        const responseData = await response.json();

        // Check if the API response indicates success
        if (responseData.code === 200 && responseData.status === "success") {
          // Clear the form data
          setFormData({
            name: "",
            email: "",
            country: "",
            whatsappNumber: "",
            contentType: [], // Array of strings
            createdBefore: false, // Boolean
            biggestChallenge: [], // Array of strings
            potentialStudents: "", // Single string
            primaryGoal: [], // Single string
            usingOtherPlatforms: false, // Boolean
            haveOwnPlatform: false, // Boolean
            plannedLaunchPeriod: "", // Single string
            furtherComments: "", // Single string
            getUpdates: false, // Boolean
          });

          // Add the submitted email to the set to prevent duplicate submissions
          setSubmittedEmails(new Set(submittedEmails).add(formData.email));

          // Update the button text to indicate success
          setButtonText("Congratulations, you’re in");

          // Update the button text and background color to indicate success
          const button = document.querySelector(
            ".submitButton"
          ) as HTMLButtonElement | null;

          if (button) {
            button.style.backgroundColor = "#099137"; // Change to success color
          }

          // Reset the button text after a delay
          setTimeout(() => {
            setButtonText("Let me in on this waitlist");
            if (button) {
              button.style.backgroundColor = ""; // Reset to default
            }
          }, 6000); // Change back after 6 seconds

          // Show a success message to the user
          alert(
            "Your submission was successful! Thank you for joining our waitlist."
          );
        } else {
          // Handle unexpected response from the server
          alert(responseData.message || "Submission failed. Please try again.");
        }
      } else {
        // Handle HTTP response errors
        const errorData = await response.json();
        const errorMessage =
          errorData.message || "Failed to join waitlist. Please try again.";
        alert(`Error ${errorData.code}: ${errorMessage}`);
      }
    } catch (error) {
      // Handle any errors that occurred during the fetch operation
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form. Please try again.");
    }
  };
  const handleSubmitForBusiness = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validation checks
    if (formDataForBusiness.typeOfTraining.length === 0) {
      alert("Please select at least one type of training.");
      return; // Don't submit the form if validation fails
    }

    // Check if the email has already been submitted
    if (submittedEmails.has(formDataForBusiness.email)) {
      alert("This email has already been submitted.");
      return; // Optionally handle already submitted case
    }

    try {
      // Send the form data to th serve
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/waitlist/business`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDataForBusiness),
        }
      );

      // Check if the response is successful
      if (response.ok) {
        const responseData = await response.json();

        // Check if the API response indicates success
        if (responseData.code === 200 && responseData.status === "success") {
          // Clear the form data
          setFormDataForBusiness({
            name: "",
            email: "",
            country: "",
            whatsappNumber: "",
            companyName: "",
            companyIndustry: "",
            companyRole: "",
            typeOfTraining: [],
            employeesNeedingTraining: "",
            usingOtherPlatforms: false,
            challengeWithEmployeeTraining: "",
            plannedLaunchPeriod: "",
            furtherComments: "",
            getUpdates: false,
          });

          // Add the submitted email to the set to prevent duplicate submissions
          setSubmittedEmails((prev) =>
            new Set(prev).add(formDataForBusiness.email)
          );

          // Update the button text to indicate success
          setButtonText("Congratulations, you’re in");

          // Update the button text and background color to indicate success
          const button = document.querySelector(
            ".submitButton"
          ) as HTMLButtonElement | null;

          if (button) {
            button.style.backgroundColor = "#099137"; // Change to success color
          }

          // Reset the button text after a delay
          setTimeout(() => {
            setButtonText("Let me in on this waitlist");
            if (button) {
              button.style.backgroundColor = ""; // Reset to default
            }
          }, 6000); // Change back after 6 seconds

          // Show a success message to the user
          alert(
            "Your submission was successful! Thank you for joining our waitlist."
          );
        } else {
          // Handle unexpected response from the server
          alert(responseData.message || "Submission failed. Please try again.");
        }
      } else {
        // Handle HTTP response errors
        const errorData = await response.json();
        const errorMessage =
          errorData.message || "Failed to join waitlist. Please try again.";
        alert(`Error ${errorData.code}: ${errorMessage}`);
      }
    } catch (error) {
      // Handle any errors that occurred during the fetch operation
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form. Please try again.");
    }
  };

  // const handleSubmitForBusiness = async (event: { preventDefault: () => void }) => {
  //   event.preventDefault();

  //   // Validation checks
  //   // if (formDataForBusiness.contentType.length === 0) {
  //   //   alert("Please select at least one training type.");
  //   //   return;
  //   // }

  //   // if (formDataForBusiness.biggestChallenge.length === 0) {
  //   //   alert("Please select at least one biggest challenge.");
  //   //   return; // Don't submit the form if validation fails
  //   // }

  //   // Log the selected training types for debugging purposes
  //   // console.log("Selected Training Types:", formDataForBusiness.contentType);

  //   // Check if the email has already been submitted
  //   if (submittedEmails.has(formDataForBusiness.email)) {
  //     alert("This email has already been submitted.");
  //     return; // Optionally handle already submitted case
  //   }

  //   try {
  //     // Send the form data to the server
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_BASE_URL}waitlist/business`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(formDataForBusiness),
  //       }
  //     );

  //     // Check if the response is successful
  //     if (response.ok) {
  //       const responseData = await response.json();

  //       // Check if the API response indicates success
  //       if (responseData.code === 200 && responseData.status === "success") {
  //         // Clear the form data
  //         setFormDataForBusiness({
  //           name: "",
  //           email: "",
  //           country: "",
  //           whatsappNumber: "",
  //           companyName: "",
  //           companyIndustry: "",
  //           companyRole: "",
  //           typeOfTraining: [], // Array of strings
  //           employeesNeedingTraining: "", // Single string
  //           usingOtherPlatforms: false, // Boolean
  //           challengeWithEmployeeTraining: "", // Single string
  //           plannedLaunchPeriod: "", // Single string
  //           furtherComments: "", // Single string
  //           getUpdates: false, // Boolean
  //         });

  //         // Add the submitted email to the set to prevent duplicate submissions
  //         setSubmittedEmails(new Set(submittedEmails).add(formDataForBusiness.email));

  //         // Update the button text to indicate success
  //         setButtonText("Congratulations, you’re in");

  //         // Update the button text and background color to indicate success
  //         const button = document.querySelector(
  //           ".submitButton"
  //         ) as HTMLButtonElement | null;

  //         if (button) {
  //           button.style.backgroundColor = "#099137"; // Change to success color
  //         }

  //         // Reset the button text after a delay
  //         setTimeout(() => {
  //           setButtonText("Let me in on this waitlist");
  //           if (button) {
  //             button.style.backgroundColor = ""; // Reset to default
  //           }
  //         }, 6000); // Change back after 6 seconds

  //         // Show a success message to the user
  //         alert(
  //           "Your submission was successful! Thank you for joining our waitlist."
  //         );
  //       } else {
  //         // Handle unexpected response from the server
  //         alert(responseData.message || "Submission failed. Please try again.");
  //       }
  //     } else {
  //       // Handle HTTP response errors
  //       const errorData = await response.json();
  //       const errorMessage =
  //         errorData.message || "Failed to join waitlist. Please try again.";
  //       alert(`Error ${errorData.code}: ${errorMessage}`);
  //     }
  //   } catch (error) {
  //     // Handle any errors that occurred during the fetch operation
  //     console.error("Error submitting form:", error);
  //     alert("An error occurred while submitting the form. Please try again.");
  //   }
  // };
  // const handleSubmit = async (event: { preventDefault: () => void }) => {
  //   event.preventDefault();

  //   // Validation checks
  //   if (formData.contentType.length === 0) {
  //     alert("Please select at least one training type.");
  //     return;
  //   }

  //   if (formData.biggestChallenge.length === 0) {
  //     alert("Please select at least one biggest challenge.");
  //     return; // Don't submit the form if validation fails
  //   }

  //   // Log the selected training types for debugging purposes
  //   console.log("Selected Training Types:", formData.contentType);

  //   // Check if the email has already been submitted
  //   if (submittedEmails.has(formData.email)) {
  //     alert("This email has already been submitted.");
  //     return; // Optionally handle already submitted case
  //   }

  //   try {
  //     // Send the form data to the server/
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_BASE_URL}waitlist/creator`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(formData),
  //       }
  //     );

  //     // Check if the response is successful
  //     if (response.ok) {
  //       const responseData = await response.json();

  //       // Check if the API response indicates success
  //       if (responseData.code === 200 && responseData.status === "success") {
  //         // Clear the form data
  //         setFormData({
  //           name: "",
  //           email: "",
  //           country: "",
  //           whatsappNumber: "",
  //           contentType: [], // Array of strings
  //           createdBefore: false, // Boolean
  //           biggestChallenge: [], // Array of strings
  //           potentialStudents: "", // Single string
  //           primaryGoal: [], // Single string
  //           usingOtherPlatforms: false, // Boolean
  //           haveOwnPlatform: false, // Boolean
  //           plannedLaunchPeriod: "", // Single string
  //           furtherComments: "", // Single string
  //           getUpdates: false, // Boolean
  //         });

  //         // Add the submitted email to the set to prevent duplicate submissions
  //         setSubmittedEmails(new Set(submittedEmails).add(formData.email));

  //         // Update the button text and background color to indicate success
  //         const button = document.querySelector(
  //           ".submitButton"
  //         ) as HTMLButtonElement | null;

  //         if (button) {
  //           button.textContent = "Congratulations, you’re in";
  //           button.style.backgroundColor = "#099137";
  //           setTimeout(() => {
  //             button.textContent = "Fill another details";
  //             button.style.backgroundColor = ""; // Reset to default
  //           }, 6000);
  //         }

  //         // Show a success message to the user
  //         alert("Your submission was successful! Thank you for joining our waitlist.");
  //       } else {
  //         // Handle unexpected response from the server
  //         alert(responseData.message || "Submission failed. Please try again.");
  //       }
  //     } else {
  //       // Handle HTTP response errors
  //       const errorData = await response.json();
  //       const errorMessage = errorData.message || "Failed to join waitlist. Please try again.";
  //       alert(`Error ${errorData.code}: ${errorMessage}`);
  //     }
  //   } catch (error) {
  //     // Handle any errors that occurred during the fetch operation
  //     console.error("Error submitting form:", error);
  //     alert("An error occurred while submitting the form. Please try again.");
  //   }
  // };

  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <nav className=" lg:mb-24 mb-16 lg:p-4 p-2 flex items-center font-helvetica">
        <div className="container mx-auto flex  justify-between items-center">
          <div className="text-white text-2xl font-bold ">
            {" "}
            <Image
              src="/logo.svg"
              width={100}
              height={100}
              alt="brix-logo w-auto"
              className="w-auto lg:ml-0 ml-3"
            />
          </div>
          {/* <div className="md:hidden">
            <button
              onClick={toggleNavbar}
              className="text-[#101828] focus:outline-none mr-3"
            >
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 7.75H3C2.59 7.75 2.25 7.41 2.25 7C2.25 6.59 2.59 6.25 3 6.25H21C21.41 6.25 21.75 6.59 21.75 7C21.75 7.41 21.41 7.75 21 7.75Z"
                    fill="#101828"
                  />
                  <path
                    d="M21 12.75H3C2.59 12.75 2.25 12.41 2.25 12C2.25 11.59 2.59 11.25 3 11.25H21C21.41 11.25 21.75 11.59 21.75 12C21.75 12.41 21.41 12.75 21 12.75Z"
                    fill="#101828"
                  />
                  <path
                    d="M21 17.75H3C2.59 17.75 2.25 17.41 2.25 17C2.25 16.59 2.59 16.25 3 16.25H21C21.41 16.25 21.75 16.59 21.75 17C21.75 17.41 21.41 17.75 21 17.75Z"
                    fill="#101828"
                  />
                </svg>
              )}
            </button>
          </div> */}
          <div className="flex space-x-4 items-center justify-center ">
            <Link href="https://blog.daba.school/">
              <button className=" lg:w-[136px] p-2  text-[#101928]  text-[16px] font-700 rounded-[12px] font-[600] font-helvetica leading-[23px]">
                Blog
              </button>
            </Link>
            <button
              onClick={handleRegisterClick}
              className="bg-[#2B44BE] lg:flex items-center justify-center hidden text-[16px] lg:w-[136px] h-[55px] w-full p-2   text-[#fff]  rounded-[12px]  px-4  font-[600]  leading-[23px] font-helvetica"
            >
              Join waitlist
            </button>
          </div>
        </div>
        {/* {isOpen && (
          <div className="md:hidden bg-white shadow-xl  border-3 rounded-[8px] flex items-center flex-col px-5 pt-7">
            <Link href="https://blog.daba.school/">
              <button className=" lg:w-[136px] p-2  text-[#101928]  text-[16px] font-700 rounded-[12px] font-[600] font-helvetica leading-[23px]">
                Blog
              </button>{" "}
            </Link>
            <button
              onClick={handleRegisterClick}
              className="bg-[#2B44BE] text-[16px] lg:w-[136px] h-[55px] w-full p-2   text-[#fff]  rounded-[12px]  px-4  font-[600]  leading-[23px] font-helvetica"
            >
              Join waitlist
            </button>
          </div>
        )} */}
      </nav>

      <div className="flex lg:flex-row  lg:mx-3 mx-3 flex-col lg:my-10 my-5 justify-center ">
        <div className="lg:w-1/2 items-center flex justify-center w-full ">
          <div className="  py-4 lg:w-[100%] xl:w-[70%] flex justify-center flex-col  bg-white   ">
            <p className="text-[36px] leading-[42px] font-bold text-[#667185] mb-7 whitespace-nowrap -tracking-[4%]">
              TeachWithDABA
            </p>
            <p className="font-[700] lg:text-[56px]  text-[33px] text-[#101928] lg:leading-[56px]  lg:mb-5 mb-3 capitalize -tracking-[4%]">
              The all-in-one learning platform built to power online academies.
            </p>
            <p className="text-[#101928]  font-[400] text-[16px] lg:text-[24px] leading-[28px] -tracking-[2%] my-2 lg:w-5/6">
              Create, launch and manage a profitable learning platform,
              effortlessly.
            </p>
            <p className="text-[#6A6A6A]  font-[500] text-[16px] leading-[24px] my-5">
              <button
                onClick={handleRegisterClick}
                className="bg-[#2B44BE] text-[17px] w-[136px] h-[55px] p-2   text-[#fff]  rounded-[12px]  px-4  font-[500]  leading-[23px] font-helvetica"
              >
                Join waitlist
              </button>
            </p>
          </div>
        </div>

        <div className="lg:w-1/2   w-full ">
          <Image
            src="/img/hero.svg"
            width={100}
            height={100}
            className="w-auto h-auto  py-5  "
            alt="brix-logo"
          />
        </div>
      </div>

      <div className=" lg:my-5 my-0 " id="register">
        <div className="flex lg:flex-row bg-[#3655EE] lg:rounded-[48px] lg:mx-10 mx-0 flex-col  justify-center py-5 lg:h-[560px] px-5">
          <div className="lg:w-1/2  items-center flex justify-center w-full lg:border-r-[1px]  ">
            <div className="   py-8 lg:w-[100%] xl:w-[80%] flex justify-center flex-col     ">
              <p className="font-[700] text-[28px] leading-[33px] my-5 -tracking-[2%] text-white">
                For Enterprise & Business
              </p>
              <p className="font-[500] text-[32px] lg:text-[48px] lg:leading-[48px] leading-[38px] py-4 -tracking-[4%] text-[#E5EAFF]">
                HR Managers, Small and Big Business Owners, Frontline Managers,
                CEOs etc
              </p>

              <p className="text-[#6A6A6A]  font-[500] text-[16px] leading-[24px] mt-7">
                <button
                  // onClick={handleRegisterClick}
                  className="bg-[#fff] text-[17px] lg:w-[350px] h-[55px] w-full py-4   text-[#000]   px-4  font-[500] rounded-[12px]  leading-[23px] font-helvetica shadow-md hover:bg-blue-600 transition-transform duration-300 transform hover:scale-105"
                  onClick={toggleOverlay}
                >
                Click here to Join Enterprise Waitlist
                </button>
              </p>
            </div>

            <Transition
              show={showOverlay}
              enter="transition-opacity duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              as="div" // Add `as` prop to render a a div instead of Fragment
            >
              <div
                className={`border-2  border-b-4 border- bg-black bg-opacity-50 z-50 flex items-center justify-center transition-opacity duration-300 ease-out
      md:hidden`}
              >
                {/* Overlay for small screens */}
                <div className=" border-5 fixed containers  inset-0 bg-[#F9FAFB] flex  flex-col z-50 p-4">
                  <button
                    className="flex items-center space-x-2 text-gray-700 mb-4 w-fit rounded-[4px] my-3 bg-[#E4E7EC] px-2"
                    onClick={toggleOverlay}
                  >
                    <Image
                      src="/img/left-arrow.svg"
                      width={100}
                      height={100}
                      alt="left-arrow"
                      className="w-5"
                    />

                    <span>Back</span>
                  </button>

                  {/* Form for small screen */}
                  <h2 className="text-[28px] leading-[33px] -tracking-[2%]  font-semibold my-5">
                    Enterprise and Business Waitlist
                  </h2>
                  <form
                    onSubmit={handleSubmitForBusiness}
                    className="space-y-4"
                  >
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        id="name"
                        name="name" // Ensure this matches the state key
                        value={formDataForBusiness.name}
                        onChange={handleChanges}
                        className="mt-1 block w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="email" // Ensures the input expects an email format
                        placeholder="Enter a valid email address"
                        id="email" // ID for accessibility
                        name="email" // Must match the state key
                        value={formDataForBusiness.email} // Binds to state
                        onChange={handleChanges} // Updates state on change
                        className="mt-1 block w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Country
                      </label>
                      <div className="relative">
                        <select
                          name="country" // Matches the state key
                          id="country" // ID for accessibility
                          className="border-gray-200 border-[1px] p-2 lg:w-full h-[64px] w-[100%] rounded-[6px] relative focus:border-[#D0D5DD] bg-white appearance-none focus:outline-none pr-8"
                          value={formDataForBusiness.country} // Binds to state
                          onChange={handleChangess} // Updates state on change
                        >
                          <option value="" className="px-2">
                            Select your country
                          </option>
                          {countries.map((country) => (
                            <option key={country.code} value={country.name}>
                              {country.name}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-0 inset-y-0 flex items-center px-2 pointer-events-none">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2.34521 7.27342L8.8574 13.4025C9.49915 14.0065 10.5002 14.0065 11.142 13.4025L17.6541 7.27342C17.9893 6.95799 18.0053 6.4306 17.6898 6.09545C17.3744 5.76031 16.847 5.74433 16.5119 6.05976L9.99968 12.1889L3.48748 6.05975C3.15234 5.74432 2.62494 5.76031 2.30951 6.09545C1.99408 6.4306 2.01006 6.95799 2.34521 7.27342Z"
                              fill="#667185"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="">
      <label
        htmlFor="whatsappNumber"
        className="block text-sm font-medium text-gray-700"
      >
        WhatsApp number
      </label>
      <div style={{ display: "flex", width: "100%" }}>
        <PhoneInput
          international
          defaultCountry="NG"
          value={formDataForBusiness.whatsappNumber}
          onChange={handlePhoneNumberChanges} // Call the handler on change
          placeholder="Enter phone number"
          className=""
          name="whatsappNumber"
          id="whatsappNumber"
          inputStyle={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            backgroundColor: "pink", // Set background color
          }}
          style={{
            flex: 1,
            margin: "0.5rem 0",
            backgroundColor: "none", // Set background color to none for outer div
          }}
        />
      </div>
    </div>

                    <div className="">
                      <label
                        htmlFor="companyName"
                        className="text-[#411111] text-[14px]  font-[500] my-1"
                      >
                        Company name
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        id="companyName"
                        className="border-gray-200 border-[1px] p-2 lg:w-full h-[64px] w-[100%]  rounded-[6px] my-2 focus:border-[#D0D5DD] focus:outline-none"
                        placeholder="Enter your company name"
                        value={formDataForBusiness.companyName}
                        onChange={handleChanges}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="companyRole"
                        className="text-[#411111] text-[14px] font-[500] my-1"
                      >
                        Company Role
                      </label>
                      <div className="relative">
                        <select
                          name="companyRole"
                          id="companyRole"
                          className="border-gray-200 border-[1px] p-2 lg:w-full h-[64px] w-[100%] rounded-[6px] my-2 relative focus:border-[#D0D5DD] bg-white appearance-none focus:outline-none pr-8"
                          value={formDataForBusiness.companyRole}
                          onChange={handleChangess} // Ensure to update the state
                        >
                          <option value="" className="px-2">
                            Select your company role
                          </option>
                          <option value="CEO">CEO</option>
                          <option value="Teacher">Teacher</option>
                          <option value="HR">HR</option>
                          <option value="Sales Person">Sales Person</option>
                          <option value="Business Personnel">
                            Business Personnel
                          </option>
                          <option value="Others">Others</option>
                        </select>
                        <div className="absolute right-0 inset-y-0 flex items-center px-2 pointer-events-none">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2.34521 7.27342L8.8574 13.4025C9.49915 14.0065 10.5002 14.0065 11.142 13.4025L17.6541 7.27342C17.9893 6.95799 18.0053 6.4306 17.6898 6.09545C17.3744 5.76031 16.847 5.74433 16.5119 6.05976L9.99968 12.1889L3.48748 6.05975C3.15234 5.74432 2.62494 5.76031 2.30951 6.09545C1.99408 6.4306 2.01006 6.95799 2.34521 7.27342Z"
                              fill="#667185"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <label
                        htmlFor="companyIndustry"
                        className="text-[#411111] text-[14px]  font-[500] my-1"
                      >
                        Industry
                      </label>
                      <input
                        type="text"
                        name="companyIndustry"
                        id="companyIndustry"
                        required
                        className="border-gray-200 border-[1px] p-2 lg:w-full h-[64px] w-[100%] rounded-[6px] my-2 focus:border-[#D0D5DD] focus:outline-none"
                        placeholder="Enter your companyIndustry"
                        value={formDataForBusiness.companyIndustry}
                        onChange={handleChanges}
                      />
                    </div>

                 
                    <div className="rounded-[8px] border-[1px] p-6 w-full ">
                      <h2 className="block text-sm font-medium text-gray-700 mb-4">
                        What type of training are you most interested in
                      </h2>

                      <div className="space-y-4">
                        {trainingOptions.map((option) => (
                          <label
                            key={option}
                            className="flex items-center space-x-3"
                          >
                            <input
                              type="checkbox"
                              className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                              checked={formDataForBusiness.typeOfTraining.includes(
                                option
                              )} // Check if this option is selected
                              onChange={() => handleTrainingChange(option)} // Update on change
                            />
                            <span className="block text-sm font-medium text-gray-700">
                              {option}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 w-full rounded-[8px] border-[1px] ">
                      <h2 className="block text-sm font-medium text-gray-700 my-2">
                        How many employees need training
                      </h2>
                      <div className="space-y-4">
                        {["1-10", "11-50", "51-200", "201+"].map((option) => (
                          <label
                            key={option}
                            className="flex items-center space-x-3"
                          >
                            <input
                              type="radio"
                              name="employeesNeedingTraining"
                              value={option}
                              className="form-radio h-6 w-6 text-blue-600 focus:ring-blue-500"
                              checked={
                                formDataForBusiness.employeesNeedingTraining ===
                                option
                              }
                              onChange={handleChanges}
                            />
                            <span className="block text-sm font-medium text-gray-700">
                              {option}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 rounded-[8px] border-[1px] w-full">
                      <h2 className="block text-sm font-medium text-gray-700 my-2">
                        Do you currently use any learning platforms?
                      </h2>
                      <div className="flex items-center">
                        <label className="flex items-center space-x-3 mx-4">
                          <input
                            type="radio"
                            name="usingOtherPlatforms"
                            value="true" // Set as string representation of true
                            className="form-radio h-6 w-6 text-blue-600 focus:ring-blue-500"
                            checked={
                              formDataForBusiness.usingOtherPlatforms === true
                            }
                            onChange={() =>
                              setFormDataForBusiness((prev) => ({
                                ...prev,
                                usingOtherPlatforms: true,
                              }))
                            }
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            Yes
                          </span>
                        </label>

                        <label className="flex items-center space-x-3 mx-4">
                          <input
                            type="radio"
                            name="usingOtherPlatforms"
                            value="false" // Set as string representation of false
                            className="form-radio h-6 w-6 text-blue-600 focus:ring-blue-500"
                            checked={
                              formDataForBusiness.usingOtherPlatforms === false
                            }
                            onChange={() =>
                              setFormDataForBusiness((prev) => ({
                                ...prev,
                                usingOtherPlatforms: false,
                              }))
                            }
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            No
                          </span>
                        </label>
                      </div>
                    </div>

                     <div className="p-6 w-full rounded-[8px] border-[1px] ">
        <label
          htmlFor="challengeWithEmployeeTraining"
          className="block text-sm font-medium text-gray-700"
        >
          What&apos;s your biggest challenge with employee training and customer education?
        </label>
        <textarea
          id="challengeWithEmployeeTraining"
          name="challengeWithEmployeeTraining"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          rows={4}
          value={formDataForBusiness.challengeWithEmployeeTraining}
          onChange={handleChangesss} // Use handleChange for the textarea
        />
      </div>

      

      <div className="p-6 w-full rounded-[8px] border-[1px] ">
      <h2 className="block text-sm font-medium text-gray-700 my-2">
        How soon are you planning to launch your online academy
      </h2>
      <div className="space-y-4">
        {["ASAP", "1-3 months", "6+ months"].map((option) => (
          <label key={option} className="flex items-center space-x-3">
            <input
              type="radio"
              name="plannedLaunchPeriod" // Name to link to the state
              value={option} // Value for the radio option
              className="form-radio h-6 w-6 text-blue-600 focus:ring-blue-500"
              checked={formDataForBusiness.plannedLaunchPeriod === option} // Check if the current option is selected
              onChange={handleChangessss} // Handle change to update state
            />
            <span className="block text-sm font-medium text-gray-700">
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>

                    <div className="p-6 w-full rounded-[8px] border-[1px] ">
        <label
          htmlFor="furtherComments"
          className="block text-sm font-medium text-gray-700"
        >
          Kindly let us know your questions, suggestions, and further inquiries.
        </label>
        <textarea
          id="furtherComments"
          name="furtherComments"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          rows={4}
          value={formDataForBusiness.furtherComments}
          onChange={handleChangesss} // Use handleChange for the textarea
        />
      </div>

                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-transform duration-300 transform hover:scale-105"
                    >
                      {buttonText}
                    </button>
                  </form>
                </div>
              </div>

              {/* Overlay for large screens */}
              <div className="hidden md:flex fixed inset-0 bg-black bg-opacity-50  items-center justify-center z-50">
                <div className="bg-[#F9FAFB]  p-6  shadow-lg relative containers rounded-[24px] h-[770px]  w-[580px] transform transition-all duration-500 ease-in-out">
                  
                  <button
                   className="flex items-center space-x-2 text-gray-700 mb-4 w-fit rounded-[4px] my-3 bg-[#E4E7EC] px-2"
                    onClick={toggleOverlay}
                  >
                    ✖
                  </button>

                  {/* Form */}
                  <h2 className="text-[28px] leading-[33px] -tracking-[2%]  font-semibold my-5">
                    Enterprise and Business Waitlist
                  </h2>
                  <form
                    onSubmit={handleSubmitForBusiness}
                    className="space-y-4"
                  >
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        id="name"
                        name="name" // Ensure this matches the state key
                        value={formDataForBusiness.name}
                        onChange={handleChanges}
                        className="mt-1 block w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="email" // Ensures the input expects an email format
                        placeholder="Enter a valid email address"
                        id="email" // ID for accessibility
                        name="email" // Must match the state key
                        value={formDataForBusiness.email} // Binds to state
                        onChange={handleChanges} // Updates state on change
                        className="mt-1 block w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Country
                      </label>
                      <div className="relative">
                        <select
                          name="country" // Matches the state key
                          id="country" // ID for accessibility
                          className="border-gray-200 border-[1px] p-2 lg:w-full h-[64px] w-[100%] rounded-[6px] relative focus:border-[#D0D5DD] bg-white appearance-none focus:outline-none pr-8"
                          value={formDataForBusiness.country} // Binds to state
                          onChange={handleChangess} // Updates state on change
                        >
                          <option value="" className="px-2">
                            Select your country
                          </option>
                          {countries.map((country) => (
                            <option key={country.code} value={country.name}>
                              {country.name}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-0 inset-y-0 flex items-center px-2 pointer-events-none">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2.34521 7.27342L8.8574 13.4025C9.49915 14.0065 10.5002 14.0065 11.142 13.4025L17.6541 7.27342C17.9893 6.95799 18.0053 6.4306 17.6898 6.09545C17.3744 5.76031 16.847 5.74433 16.5119 6.05976L9.99968 12.1889L3.48748 6.05975C3.15234 5.74432 2.62494 5.76031 2.30951 6.09545C1.99408 6.4306 2.01006 6.95799 2.34521 7.27342Z"
                              fill="#667185"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="">
      <label
        htmlFor="whatsappNumber"
        className="block text-sm font-medium text-gray-700"
      >
        WhatsApp number
      </label>
      <div style={{ display: "flex", width: "100%" }}>
        <PhoneInput
          international
          defaultCountry="NG"
          value={formDataForBusiness.whatsappNumber}
          onChange={handlePhoneNumberChanges} // Call the handler on change
          placeholder="Enter phone number"
          className=""
          name="whatsappNumber"
          id="whatsappNumber"
          inputStyle={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            backgroundColor: "pink", // Set background color
          }}
          style={{
            flex: 1,
            margin: "0.5rem 0",
            backgroundColor: "none", // Set background color to none for outer div
          }}
        />
      </div>
    </div>

                    <div className="">
                      <label
                        htmlFor="companyName"
                        className="text-[#411111] text-[14px]  font-[500] my-1"
                      >
                        Company name
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        id="companyName"
                        className="border-gray-200 border-[1px] p-2 lg:w-full h-[64px] w-[100%]  rounded-[6px] my-2 focus:border-[#D0D5DD] focus:outline-none"
                        placeholder="Enter your company name"
                        value={formDataForBusiness.companyName}
                        onChange={handleChanges}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="companyRole"
                        className="text-[#411111] text-[14px] font-[500] my-1"
                      >
                        Company Role
                      </label>
                      <div className="relative">
                        <select
                          name="companyRole"
                          id="companyRole"
                          className="border-gray-200 border-[1px] p-2 lg:w-full h-[64px] w-[100%] rounded-[6px] my-2 relative focus:border-[#D0D5DD] bg-white appearance-none focus:outline-none pr-8"
                          value={formDataForBusiness.companyRole}
                          onChange={handleChangess} // Ensure to update the state
                        >
                          <option value="" className="px-2">
                            Select your company role
                          </option>
                          <option value="CEO">CEO</option>
                          <option value="Teacher">Teacher</option>
                          <option value="HR">HR</option>
                          <option value="Sales Person">Sales Person</option>
                          <option value="Business Personnel">
                            Business Personnel
                          </option>
                          <option value="Others">Others</option>
                        </select>
                        <div className="absolute right-0 inset-y-0 flex items-center px-2 pointer-events-none">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2.34521 7.27342L8.8574 13.4025C9.49915 14.0065 10.5002 14.0065 11.142 13.4025L17.6541 7.27342C17.9893 6.95799 18.0053 6.4306 17.6898 6.09545C17.3744 5.76031 16.847 5.74433 16.5119 6.05976L9.99968 12.1889L3.48748 6.05975C3.15234 5.74432 2.62494 5.76031 2.30951 6.09545C1.99408 6.4306 2.01006 6.95799 2.34521 7.27342Z"
                              fill="#667185"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <label
                        htmlFor="companyIndustry"
                        className="text-[#411111] text-[14px]  font-[500] my-1"
                      >
                        Industry
                      </label>
                      <input
                        type="text"
                        name="companyIndustry"
                        id="companyIndustry"
                        required
                        className="border-gray-200 border-[1px] p-2 lg:w-full h-[64px] w-[100%] rounded-[6px] my-2 focus:border-[#D0D5DD] focus:outline-none"
                        placeholder="Enter your companyIndustry"
                        value={formDataForBusiness.companyIndustry}
                        onChange={handleChanges}
                      />
                    </div>

                 
                    <div className="rounded-[8px] border-[1px] p-6 w-full ">
                      <h2 className="block text-sm font-medium text-gray-700 mb-4">
                        What type of training are you most interested in
                      </h2>

                      <div className="space-y-4">
                        {trainingOptions.map((option) => (
                          <label
                            key={option}
                            className="flex items-center space-x-3"
                          >
                            <input
                              type="checkbox"
                              className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                              checked={formDataForBusiness.typeOfTraining.includes(
                                option
                              )} // Check if this option is selected
                              onChange={() => handleTrainingChange(option)} // Update on change
                            />
                            <span className="block text-sm font-medium text-gray-700">
                              {option}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 w-full rounded-[8px] border-[1px] ">
                      <h2 className="block text-sm font-medium text-gray-700 my-2">
                        How many employees need training
                      </h2>
                      <div className="space-y-4">
                        {["1-10", "11-50", "51-200", "201+"].map((option) => (
                          <label
                            key={option}
                            className="flex items-center space-x-3"
                          >
                            <input
                              type="radio"
                              name="employeesNeedingTraining"
                              value={option}
                              className="form-radio h-6 w-6 text-blue-600 focus:ring-blue-500"
                              checked={
                                formDataForBusiness.employeesNeedingTraining ===
                                option
                              }
                              onChange={handleChanges}
                            />
                            <span className="block text-sm font-medium text-gray-700">
                              {option}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 rounded-[8px] border-[1px] w-full">
                      <h2 className="block text-sm font-medium text-gray-700 my-2">
                        Do you currently use any learning platforms?
                      </h2>
                      <div className="flex items-center">
                        <label className="flex items-center space-x-3 mx-4">
                          <input
                            type="radio"
                            name="usingOtherPlatforms"
                            value="true" // Set as string representation of true
                            className="form-radio h-6 w-6 text-blue-600 focus:ring-blue-500"
                            checked={
                              formDataForBusiness.usingOtherPlatforms === true
                            }
                            onChange={() =>
                              setFormDataForBusiness((prev) => ({
                                ...prev,
                                usingOtherPlatforms: true,
                              }))
                            }
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            Yes
                          </span>
                        </label>

                        <label className="flex items-center space-x-3 mx-4">
                          <input
                            type="radio"
                            name="usingOtherPlatforms"
                            value="false" // Set as string representation of false
                            className="form-radio h-6 w-6 text-blue-600 focus:ring-blue-500"
                            checked={
                              formDataForBusiness.usingOtherPlatforms === false
                            }
                            onChange={() =>
                              setFormDataForBusiness((prev) => ({
                                ...prev,
                                usingOtherPlatforms: false,
                              }))
                            }
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            No
                          </span>
                        </label>
                      </div>
                    </div>

                     <div className="p-6 w-full rounded-[8px] border-[1px] ">
        <label
          htmlFor="challengeWithEmployeeTraining"
          className="block text-sm font-medium text-gray-700"
        >
          What&apos;s your biggest challenge with employee training and customer education?
        </label>
        <textarea
          id="challengeWithEmployeeTraining"
          name="challengeWithEmployeeTraining"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          rows={4}
          value={formDataForBusiness.challengeWithEmployeeTraining}
          onChange={handleChangesss} // Use handleChange for the textarea
        />
      </div>

      

      <div className="p-6 w-full rounded-[8px] border-[1px] ">
      <h2 className="block text-sm font-medium text-gray-700 my-2">
        How soon are you planning to launch your online academy
      </h2>
      <div className="space-y-4">
        {["ASAP", "1-3 months", "6+ months"].map((option) => (
          <label key={option} className="flex items-center space-x-3">
            <input
              type="radio"
              name="plannedLaunchPeriod" // Name to link to the state
              value={option} // Value for the radio option
              className="form-radio h-6 w-6 text-blue-600 focus:ring-blue-500"
              checked={formDataForBusiness.plannedLaunchPeriod === option} // Check if the current option is selected
              onChange={handleChangessss} // Handle change to update state
            />
            <span className="block text-sm font-medium text-gray-700">
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>

                    <div className="p-6 w-full rounded-[8px] border-[1px] ">
        <label
          htmlFor="furtherComments"
          className="block text-sm font-medium text-gray-700"
        >
          Kindly let us know your questions, suggestions, and further inquiries.
        </label>
        <textarea
          id="furtherComments"
          name="furtherComments"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          rows={4}
          value={formDataForBusiness.furtherComments}
          onChange={handleChangesss} // Use handleChange for the textarea
        />
      </div>

                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-transform duration-300 transform hover:scale-105"
                    >
                      {buttonText}
                    </button>
                  </form>
                </div>
              </div>
            </Transition>
          </div>

          <div className="lg:w-1/2 lg:border-t-0  border-t-[0.5px]  lg:mt-0 mt-3 items-center flex justify-center w-full ">
            <div className="  py-8 lg:w-[100%] xl:w-[80%] flex justify-center flex-col     ">
              <p className="font-[700] text-[28px] leading-[33px] my-5 -tracking-[2%] text-white">
                For Course Creators
              </p>
              <p className="font-[500] text-[32px] lg:text-[48px] lg:leading-[48px] leading-[38px] py-4 -tracking-[4%] text-[#E5EAFF]">
                Teachers,Online Educators, Coaches, Training Expert
              </p>
              <p className="text-[#fff]  font-[400] text-[18px] lg:text-[18px] leading-[26.1px] -tracking-[2%] my-2 lg:w-5/6">
                ...and any One Looking to Launch and Manage an Online Academy in
                any Field
              </p>
              <p className="text-[#6A6A6A]  font-[500] text-[16px] leading-[24px] mt-7">
                <button
                  className="bg-[#fff] text-[17px] lg:w-[350px] h-[55px] w-full py-4   text-[#000]   px-4  font-[500] rounded-[12px]  leading-[23px] font-helvetica shadow-md hover:bg-blue-600 transition-transform duration-300 transform hover:scale-105"
                  onClick={toggleOverlays}
                >
                  Click Here To Join Creators Waitlist
                </button>
              </p>
            </div>
            <Transition
              show={showOverlays}
              enter="transition-opacity duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              as="div" // Add `as` prop to render a div instead of Fragment
            >
              <div
                className={`border-2  border-b-4 border- bg-black bg-opacity-50 z-50 flex items-center justify-center transition-opacity duration-300 ease-out
      md:hidden`}
              >
                {/* Overlay for small screens */}
                <div className=" border-5 fixed containers  inset-0 bg-[#F9FAFB] flex flex-col z-50 p-4">
                  {/* Back arrow to return */}
                  <button
                    className="flex items-center space-x-2 text-gray-700 mb-4 w-fit bg-[#E4E7EC] px-2"
                    onClick={toggleOverlays}
                  >
                    <Image
                      src="/img/left-arrow.svg"
                      width={100}
                      height={100}
                      alt="left-arrow"
                      className="w-5"
                    />
                    <span>Back</span>
                  </button>

                  {/* Form for small screens */}
                  <h2 className="text-[28px] leading-[33px] -tracking-[2%]  font-semibold my-5">
                    Creators Waitlist
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="Enter a valid email address"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Country
                      </label>
                      <div className="relative">
                        <select
                          name="country"
                          id="country"
                          className="border-gray-200 border-[1px] p-2 lg:w-full h-[64px] w-[100%] rounded-[6px]  relative focus:border-[#D0D5DD] bg-white appearance-none focus:outline-none  pr-8"
                          value={formData.country}
                          onChange={handleChange}
                        >
                          <option value="" className="px-2">
                            Select your country
                          </option>
                          {countries.map((country) => (
                            <option key={country.code} value={country.name}>
                              {country.name}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-0 inset-y-0  flex items-center px-2 pointer-events-none">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2.34521 7.27342L8.8574 13.4025C9.49915 14.0065 10.5002 14.0065 11.142 13.4025L17.6541 7.27342C17.9893 6.95799 18.0053 6.4306 17.6898 6.09545C17.3744 5.76031 16.847 5.74433 16.5119 6.05976L9.99968 12.1889L3.48748 6.05975C3.15234 5.74432 2.62494 5.76031 2.30951 6.09545C1.99408 6.4306 2.01006 6.95799 2.34521 7.27342Z"
                              fill="#667185"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <label
                        htmlFor="whatsappNumber"
                        className="block text-sm font-medium text-gray-700"
                      >
                        WhatsApp number
                      </label>
                      <div style={{ display: "flex", width: "100%" }}>
                        <PhoneInput
                          international
                          defaultCountry="NG"
                          value={formData.whatsappNumber}
                          onChange={handlePhoneNumberChange}
                          placeholder="Enter phone number"
                          className=""
                          name="whatsappNumber"
                          id="whatsappNumber"
                          inputStyle={{
                            width: "100%",
                            padding: "10px",
                            fontSize: "16px",
                            backgroundColor: "pink",
                          }}
                          style={{
                            flex: 1,
                            margin: "0.5rem 0",

                            backgroundColor: "none",
                          }}
                        />
                      </div>
                    </div>

                    <div className="p-6 w-full rounded-[8px] border-[1px] ">
                      <h2 className="block text-sm font-medium text-gray-700 mb-4">
                        What type of training are you most interested in
                      </h2>

                      <div className="space-y-4">
                        {[
                          "Educational",
                          "Coaching",
                          "Fitness",
                          "Professional skills",
                          "Hobbies/Creatives",
                          "Others",
                        ].map((type) => (
                          <label
                            key={type}
                            className="flex items-center space-x-3"
                          >
                            <input
                              type="checkbox"
                              className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                              value={type}
                              checked={formData.contentType.includes(type)}
                              onChange={handleContentTypeChange}
                            />
                            <span className="block text-sm font-medium text-gray-700">
                              {type}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 w-full rounded-[8px] border-[1px] ">
                      <h2 className="block text-sm font-medium text-gray-700 my-2">
                        Have you ever created an online course before
                      </h2>

                      <div className="flex items-center">
                        {/* Yes Option */}
                        <label className="flex items-center space-x-3 mx-4">
                          <input
                            type="radio"
                            name="createdBefore" // Set a common name for the radio group
                            value="yes" // Value when the user selects "Yes"
                            className="form-radio h-6 w-6 text-blue-600 focus:ring-blue-500"
                            checked={formData.createdBefore === true} // Check if state is true
                            onChange={() => handleCreatedBeforeChange(true)} // Update state to true
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            Yes
                          </span>
                        </label>

                        {/* No Option */}
                        <label className="flex items-center space-x-3 mx-4">
                          <input
                            type="radio"
                            name="createdBefore" // Same name for the group
                            value="no" // Value when the user selects "No"
                            className="form-radio h-6 w-6 text-blue-600 focus:ring-blue-500"
                            checked={formData.createdBefore === false} // Check if state is false
                            onChange={() => handleCreatedBeforeChange(false)} // Update state to false
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            No
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="p-6 w-full rounded-[8px] border-[1px] ">
                      <h2 className="block text-sm font-medium text-gray-700 mb-4">
                        What&apos;s your biggest challenge in launching a course
                      </h2>

                      <div className="space-y-4">
                        {/* Tech Skills */}
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                            value="Tech skills" // Add value for this option
                            checked={formData.biggestChallenge.includes(
                              "Tech skills"
                            )} // Check if it's already selected
                            onChange={handleBiggestChallengeChange} // Handle change
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            Tech skills
                          </span>
                        </label>

                        {/* Marketing */}
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                            value="Marketing"
                            checked={formData.biggestChallenge.includes(
                              "Marketing"
                            )}
                            onChange={handleBiggestChallengeChange}
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            Marketing
                          </span>
                        </label>

                        {/* Building the Course */}
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                            value="Building the course"
                            checked={formData.biggestChallenge.includes(
                              "Building the course"
                            )}
                            onChange={handleBiggestChallengeChange}
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            Building the course
                          </span>
                        </label>

                        {/* Monetizing */}
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                            value="Monetizing"
                            checked={formData.biggestChallenge.includes(
                              "Monetizing"
                            )}
                            onChange={handleBiggestChallengeChange}
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            Monetizing
                          </span>
                        </label>

                        {/* Platform to Host */}
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                            value="Platform to host"
                            checked={formData.biggestChallenge.includes(
                              "Platform to host"
                            )}
                            onChange={handleBiggestChallengeChange}
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            Platform to host
                          </span>
                        </label>

                        {/* Others */}
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                            value="Others"
                            checked={formData.biggestChallenge.includes(
                              "Others"
                            )}
                            onChange={handleBiggestChallengeChange}
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            Others
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="p-6 w-full rounded-[8px] border-[1px] ">
                      <h2 className="block text-sm font-medium text-gray-700 my-2">
                        How many students/clients are you hoping to teach or do
                        you currently teach?
                      </h2>

                      <div className="space-y-4">
                        <label className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="potentialStudents"
                            value="1-10"
                            checked={formData.potentialStudents === "1-10"}
                            onChange={handlePotentialStudentsChange}
                            className="form-radio h-6 w-6 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            1-10
                          </span>
                        </label>

                        <label className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="potentialStudents"
                            value="11-50"
                            checked={formData.potentialStudents === "11-50"}
                            onChange={handlePotentialStudentsChange}
                            className="form-radio h-6 w-6 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            11-50
                          </span>
                        </label>

                        <label className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="potentialStudents"
                            value="51-100"
                            checked={formData.potentialStudents === "51-100"}
                            onChange={handlePotentialStudentsChange}
                            className="form-radio h-6 w-6 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            51-100
                          </span>
                        </label>

                        <label className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="potentialStudents"
                            value="101+"
                            checked={formData.potentialStudents === "101+"}
                            onChange={handlePotentialStudentsChange}
                            className="form-radio h-6 w-6 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            101+
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* <div className="p-6 w-full ">
  <h2 className="block text-sm font-medium text-gray-700 my-2">
    What is your primary goal for launching an online academy?
  </h2>

  <div className="space-y-4">
    <label className="flex items-center space-x-3">
      <input
        type="radio"
        name="primaryGoal"
        value="Build a community"
        checked={formData.primaryGoal === 'Build a community'}
        onChange={handlePrimaryGoalChange}
        className="form-radio h-6 w-6 text-blue-600 focus:ring-blue-500"
      />
      <span className="block text-sm font-medium text-gray-700">
        Build a community
      </span>
    </label>

    <label className="flex items-center space-x-3">
      <input
        type="radio"
        name="primaryGoal"
        value="Monetize knowledge"
        checked={formData.primaryGoal === 'Monetize knowledge'}
        onChange={handlePrimaryGoalChange}
        className="form-radio h-6 w-6 text-blue-600 focus:ring-blue-500"
      />
      <span className="block text-sm font-medium text-gray-700">
        Monetize knowledge
      </span>
    </label>

    <label className="flex items-center space-x-3">
      <input
        type="radio"
        name="primaryGoal"
        value="Grow a personal brand"
        checked={formData.primaryGoal === 'Grow a personal brand'}
        onChange={handlePrimaryGoalChange}
        className="form-radio h-6 w-6 text-blue-600 focus:ring-blue-500"
      />
      <span className="block text-sm font-medium text-gray-700">
        Grow a personal brand
      </span>
    </label>

    <label className="flex items-center space-x-3">
      <input
        type="radio"
        name="primaryGoal"
        value="Others"
        checked={formData.primaryGoal === 'Others'}
        onChange={handlePrimaryGoalChange}
        className="form-radio h-6 w-6 text-blue-600 focus:ring-blue-500"
      />
      <span className="block text-sm font-medium text-gray-700">
        Others
      </span>
    </label>
  </div>

  
</div> */}

<div className="p-6 w-full rounded-[8px] border-[1px] ">
                      <h2 className="block text-sm font-medium text-gray-700 my-2">
                        What is your primary goal for launching an online
                        academy?
                      </h2>

                      <div className="space-y-4">
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            name="primaryGoal"
                            value="Build a community"
                            checked={formData.primaryGoal.includes(
                              "Build a community"
                            )}
                            onChange={handlePrimaryGoalChange}
                            className="form-checkbox h-6 w-6 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            Build a community
                          </span>
                        </label>

                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            name="primaryGoal"
                            value="Monetize knowledge"
                            checked={formData.primaryGoal.includes(
                              "Monetize knowledge"
                            )}
                            onChange={handlePrimaryGoalChange}
                            className="form-checkbox h-6 w-6 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            Monetize knowledge
                          </span>
                        </label>

                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            name="primaryGoal"
                            value="Grow a personal brand"
                            checked={formData.primaryGoal.includes(
                              "Grow a personal brand"
                            )}
                            onChange={handlePrimaryGoalChange}
                            className="form-checkbox h-6 w-6 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            Grow a personal brand
                          </span>
                        </label>

                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            name="primaryGoal"
                            value="Others"
                            checked={formData.primaryGoal.includes("Others")}
                            onChange={handlePrimaryGoalChange}
                            className="form-checkbox h-6 w-6 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            Others
                          </span>
                        </label>
                      </div>

                      {/* {errors.primaryGoal && (
    <p className="text-red-600 text-sm mt-2">{errors.primaryGoal}</p>
  )} */}
                    </div>

                    <div className="p-6 w-full rounded-[8px] border-[1px] ">
                      <h2 className="block text-sm font-medium text-gray-700 my-2">
                        Do you currently use any course creation platforms?
                      </h2>

                      <div className="flex items-center">
                        <label className="flex items-center space-x-3 mx-4">
                          <input
                            type="radio"
                            name="usingOtherPlatforms"
                            value="Yes"
                            checked={formData.usingOtherPlatforms === true} // Checked if true
                            onChange={handleUsingOtherPlatformsChange}
                            className="form-radio h-6 w-6 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            Yes
                          </span>
                        </label>

                        <label className="flex items-center space-x-3 mx-4">
                          <input
                            type="radio"
                            name="usingOtherPlatforms"
                            value="No"
                            checked={formData.usingOtherPlatforms === false} // Checked if false
                            onChange={handleUsingOtherPlatformsChange}
                            className="form-radio h-6 w-6 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            No
                          </span>
                        </label>
                      </div>

                      {/* {errors.usingOtherPlatforms && (
    <p className="text-red-600 text-sm mt-2">{errors.usingOtherPlatforms}</p>
  )} */}
                    </div>

                    <div className="p-6 w-full rounded-[8px] border-[1px] ">
                      <h2 className="block text-sm font-medium text-gray-700 my-2">
                        Do you have your own learning management platform?
                      </h2>

                      <div className="flex items-center">
                        <label className="flex items-center space-x-3 mx-4">
                          <input
                            type="radio"
                            name="haveOwnPlatform"
                            value="Yes"
                            checked={formData.haveOwnPlatform === true} // Checked if true
                            onChange={handleHaveOwnPlatformChange}
                            className="form-radio h-6 w-6 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            Yes
                          </span>
                        </label>

                        <label className="flex items-center space-x-3 mx-4">
                          <input
                            type="radio"
                            name="haveOwnPlatform"
                            value="No"
                            checked={formData.haveOwnPlatform === false} // Checked if false
                            onChange={handleHaveOwnPlatformChange}
                            className="form-radio h-6 w-6 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            No
                          </span>
                        </label>
                      </div>

                      {/* {errors.haveOwnPlatform && (
    <p className="text-red-600 text-sm mt-2">{errors.haveOwnPlatform}</p>
  )} */}
                    </div>

                    <div className="p-6 w-full rounded-[8px] border-[1px] ">
                      <h2 className="block text-sm font-medium text-gray-700 my-2">
                        How soon are you planning to launch your online academy?
                      </h2>

                      <div className="space-y-4">
                        <label className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="plannedLaunchPeriod"
                            value="ASAP"
                            checked={formData.plannedLaunchPeriod === "ASAP"}
                            onChange={handlePlannedLaunchPeriodChange}
                            className="form-radio h-6 w-6 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            ASAP
                          </span>
                        </label>

                        <label className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="plannedLaunchPeriod"
                            value="1-3 months"
                            checked={
                              formData.plannedLaunchPeriod === "1-3 months"
                            }
                            onChange={handlePlannedLaunchPeriodChange}
                            className="form-radio h-6 w-6 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            1-3 months
                          </span>
                        </label>

                        <label className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="plannedLaunchPeriod"
                            value="6+ months"
                            checked={
                              formData.plannedLaunchPeriod === "6+ months"
                            }
                            onChange={handlePlannedLaunchPeriodChange}
                            className="form-radio h-6 w-6 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            6+ months
                          </span>
                        </label>
                      </div>

                      {/* {errors.plannedLaunchPeriod && (
    <p className="text-red-600 text-sm mt-2">{errors.plannedLaunchPeriod}</p>
  )} */}
                    </div>
                    <div className="p-6 w-full rounded-[8px] border-[1px] ">
                      <label
                        htmlFor="furtherComments"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Kindly let us know your questions, suggestions, and
                        further inquiries.
                      </label>
                      <textarea
                        id="furtherComments"
                        placeholder="Write here"
                        value={formData.furtherComments}
                        onChange={handleFurtherCommentsChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white sm:text-sm"
                        rows={4}
                      />
                      {/* {errors.furtherComments && (
    <p className="text-red-600 text-sm mt-2">{errors.furtherComments}</p>
  )} */}
                    </div>

                    <button
                      type="submit"
                      className="bg-[#2B44BE] w-full submitButton p-2 mt-5 h-[46px] text-white rounded-[12px] my-5 shadow-md hover:bg-blue-600 transition-transform duration-300 transform hover:scale-105"
                    >
                      {buttonText}
                    </button>
                  </form>
                </div>
              </div>

              {/* Overlay for large screens */}
              <div className="hidden md:flex fixed inset-0 bg-black bg-opacity-50  items-center justify-center z-50">
                <div className="bg-[#F9FAFB]  p-6  shadow-lg relative containers rounded-[24px] h-[770px]  w-[580px] transform transition-all duration-500 ease-in-out">
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={toggleOverlays}
                  >
                    ✖
                  </button>

                  {/* Form */}
                  <h2 className="text-[28px] leading-[33px] -tracking-[2%]  font-semibold my-5">
                    Creators Waitlist
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="Enter a valid email address"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Country
                      </label>
                      <div className="relative">
                        <select
                          name="country"
                          id="country"
                          className="border-gray-200 border-[1px] p-2 lg:w-full h-[64px] w-[100%] rounded-[6px]  relative focus:border-[#D0D5DD] bg-white appearance-none focus:outline-none  pr-8"
                          value={formData.country}
                          onChange={handleChange}
                        >
                          <option value="" className="px-2">
                            Select your country
                          </option>
                          {countries.map((country) => (
                            <option key={country.code} value={country.name}>
                              {country.name}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-0 inset-y-0  flex items-center px-2 pointer-events-none">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2.34521 7.27342L8.8574 13.4025C9.49915 14.0065 10.5002 14.0065 11.142 13.4025L17.6541 7.27342C17.9893 6.95799 18.0053 6.4306 17.6898 6.09545C17.3744 5.76031 16.847 5.74433 16.5119 6.05976L9.99968 12.1889L3.48748 6.05975C3.15234 5.74432 2.62494 5.76031 2.30951 6.09545C1.99408 6.4306 2.01006 6.95799 2.34521 7.27342Z"
                              fill="#667185"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <label
                        htmlFor="whatsappNumber"
                        className="block text-sm font-medium text-gray-700"
                      >
                        WhatsApp number
                      </label>
                      <div style={{ display: "flex", width: "100%" }}>
                        <PhoneInput
                          international
                          defaultCountry="NG"
                          value={formData.whatsappNumber}
                          onChange={handlePhoneNumberChange}
                          placeholder="Enter phone number"
                          className=""
                          name="whatsappNumber"
                          id="whatsappNumber"
                          inputStyle={{
                            width: "100%",
                            padding: "10px",
                            fontSize: "16px",
                            backgroundColor: "pink",
                          }}
                          style={{
                            flex: 1,
                            margin: "0.5rem 0",

                            backgroundColor: "none",
                          }}
                        />
                      </div>
                    </div>

                    <div className="p-6 w-full rounded-[8px] border-[1px] ">
                      <h2 className="block text-sm font-medium text-gray-700 mb-4">
                        What type of training are you most interested in
                      </h2>

                      <div className="space-y-4">
                        {[
                          "Educational",
                          "Coaching",
                          "Fitness",
                          "Professional skills",
                          "Hobbies/Creatives",
                          "Others",
                        ].map((type) => (
                          <label
                            key={type}
                            className="flex items-center space-x-3"
                          >
                            <input
                              type="checkbox"
                              className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                              value={type}
                              checked={formData.contentType.includes(type)}
                              onChange={handleContentTypeChange}
                            />
                            <span className="block text-sm font-medium text-gray-700">
                              {type}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 w-full rounded-[8px] border-[1px] ">
                      <h2 className="block text-sm font-medium text-gray-700 my-2">
                        Have you ever created an online course before
                      </h2>

                      <div className="flex items-center">
                        {/* Yes Option */}
                        <label className="flex items-center space-x-3 mx-4">
                          <input
                            type="radio"
                            name="createdBefore" // Set a common name for the radio group
                            value="yes" // Value when the user selects "Yes"
                            className="form-radio h-6 w-6 text-blue-600 focus:ring-blue-500"
                            checked={formData.createdBefore === true} // Check if state is true
                            onChange={() => handleCreatedBeforeChange(true)} // Update state to true
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            Yes
                          </span>
                        </label>

                        {/* No Option */}
                        <label className="flex items-center space-x-3 mx-4">
                          <input
                            type="radio"
                            name="createdBefore" // Same name for the group
                            value="no" // Value when the user selects "No"
                            className="form-radio h-6 w-6 text-blue-600 focus:ring-blue-500"
                            checked={formData.createdBefore === false} // Check if state is false
                            onChange={() => handleCreatedBeforeChange(false)} // Update state to false
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            No
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="p-6 w-full rounded-[8px] border-[1px] ">
                      <h2 className="block text-sm font-medium text-gray-700 mb-4">
                        What&apos;s your biggest challenge in launching a course
                      </h2>

                      <div className="space-y-4">
                        {/* Tech Skills */}
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                            value="Tech skills" // Add value for this option
                            checked={formData.biggestChallenge.includes(
                              "Tech skills"
                            )} // Check if it's already selected
                            onChange={handleBiggestChallengeChange} // Handle change
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            Tech skills
                          </span>
                        </label>

                        {/* Marketing */}
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                            value="Marketing"
                            checked={formData.biggestChallenge.includes(
                              "Marketing"
                            )}
                            onChange={handleBiggestChallengeChange}
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            Marketing
                          </span>
                        </label>

                        {/* Building the Course */}
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                            value="Building the course"
                            checked={formData.biggestChallenge.includes(
                              "Building the course"
                            )}
                            onChange={handleBiggestChallengeChange}
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            Building the course
                          </span>
                        </label>

                        {/* Monetizing */}
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                            value="Monetizing"
                            checked={formData.biggestChallenge.includes(
                              "Monetizing"
                            )}
                            onChange={handleBiggestChallengeChange}
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            Monetizing
                          </span>
                        </label>

                        {/* Platform to Host */}
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                            value="Platform to host"
                            checked={formData.biggestChallenge.includes(
                              "Platform to host"
                            )}
                            onChange={handleBiggestChallengeChange}
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            Platform to host
                          </span>
                        </label>

                        {/* Others */}
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                            value="Others"
                            checked={formData.biggestChallenge.includes(
                              "Others"
                            )}
                            onChange={handleBiggestChallengeChange}
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            Others
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="p-6 w-full rounded-[8px] border-[1px] ">
                      <h2 className="block text-sm font-medium text-gray-700 my-2">
                        How many students/clients are you hoping to teach or do
                        you currently teach?
                      </h2>

                      <div className="space-y-4">
                        <label className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="potentialStudents"
                            value="1-10"
                            checked={formData.potentialStudents === "1-10"}
                            onChange={handlePotentialStudentsChange}
                            className="form-radio h-6 w-6 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            1-10
                          </span>
                        </label>

                        <label className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="potentialStudents"
                            value="11-50"
                            checked={formData.potentialStudents === "11-50"}
                            onChange={handlePotentialStudentsChange}
                            className="form-radio h-6 w-6 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            11-50
                          </span>
                        </label>

                        <label className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="potentialStudents"
                            value="51-100"
                            checked={formData.potentialStudents === "51-100"}
                            onChange={handlePotentialStudentsChange}
                            className="form-radio h-6 w-6 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            51-100
                          </span>
                        </label>

                        <label className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="potentialStudents"
                            value="101+"
                            checked={formData.potentialStudents === "101+"}
                            onChange={handlePotentialStudentsChange}
                            className="form-radio h-6 w-6 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            101+
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* <div className="p-6 w-full ">
  <h2 className="block text-sm font-medium text-gray-700 my-2">
    What is your primary goal for launching an online academy?
  </h2>

  <div className="space-y-4">
    <label className="flex items-center space-x-3">
      <input
        type="radio"
        name="primaryGoal"
        value="Build a community"
        checked={formData.primaryGoal === 'Build a community'}
        onChange={handlePrimaryGoalChange}
        className="form-radio h-6 w-6 text-blue-600 focus:ring-blue-500"
      />
      <span className="block text-sm font-medium text-gray-700">
        Build a community
      </span>
    </label>

    <label className="flex items-center space-x-3">
      <input
        type="radio"
        name="primaryGoal"
        value="Monetize knowledge"
        checked={formData.primaryGoal === 'Monetize knowledge'}
        onChange={handlePrimaryGoalChange}
        className="form-radio h-6 w-6 text-blue-600 focus:ring-blue-500"
      />
      <span className="block text-sm font-medium text-gray-700">
        Monetize knowledge
      </span>
    </label>

    <label className="flex items-center space-x-3">
      <input
        type="radio"
        name="primaryGoal"
        value="Grow a personal brand"
        checked={formData.primaryGoal === 'Grow a personal brand'}
        onChange={handlePrimaryGoalChange}
        className="form-radio h-6 w-6 text-blue-600 focus:ring-blue-500"
      />
      <span className="block text-sm font-medium text-gray-700">
        Grow a personal brand
      </span>
    </label>

    <label className="flex items-center space-x-3">
      <input
        type="radio"
        name="primaryGoal"
        value="Others"
        checked={formData.primaryGoal === 'Others'}
        onChange={handlePrimaryGoalChange}
        className="form-radio h-6 w-6 text-blue-600 focus:ring-blue-500"
      />
      <span className="block text-sm font-medium text-gray-700">
        Others
      </span>
    </label>
  </div>

  
</div> */}

<div className="p-6 w-full rounded-[8px] border-[1px] ">
                      <h2 className="block text-sm font-medium text-gray-700 my-2">
                        What is your primary goal for launching an online
                        academy?
                      </h2>

                      <div className="space-y-4">
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            name="primaryGoal"
                            value="Build a community"
                            checked={formData.primaryGoal.includes(
                              "Build a community"
                            )}
                            onChange={handlePrimaryGoalChange}
                            className="form-checkbox h-6 w-6 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            Build a community
                          </span>
                        </label>

                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            name="primaryGoal"
                            value="Monetize knowledge"
                            checked={formData.primaryGoal.includes(
                              "Monetize knowledge"
                            )}
                            onChange={handlePrimaryGoalChange}
                            className="form-checkbox h-6 w-6 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            Monetize knowledge
                          </span>
                        </label>

                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            name="primaryGoal"
                            value="Grow a personal brand"
                            checked={formData.primaryGoal.includes(
                              "Grow a personal brand"
                            )}
                            onChange={handlePrimaryGoalChange}
                            className="form-checkbox h-6 w-6 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            Grow a personal brand
                          </span>
                        </label>

                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            name="primaryGoal"
                            value="Others"
                            checked={formData.primaryGoal.includes("Others")}
                            onChange={handlePrimaryGoalChange}
                            className="form-checkbox h-6 w-6 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            Others
                          </span>
                        </label>
                      </div>

                      {/* {errors.primaryGoal && (
    <p className="text-red-600 text-sm mt-2">{errors.primaryGoal}</p>
  )} */}
                    </div>

                    <div className="p-6 w-full rounded-[8px] border-[1px] ">
                      <h2 className="block text-sm font-medium text-gray-700 my-2">
                        Do you currently use any course creation platforms?
                      </h2>

                      <div className="flex items-center">
                        <label className="flex items-center space-x-3 mx-4">
                          <input
                            type="radio"
                            name="usingOtherPlatforms"
                            value="Yes"
                            checked={formData.usingOtherPlatforms === true} // Checked if true
                            onChange={handleUsingOtherPlatformsChange}
                            className="form-radio h-6 w-6 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            Yes
                          </span>
                        </label>

                        <label className="flex items-center space-x-3 mx-4">
                          <input
                            type="radio"
                            name="usingOtherPlatforms"
                            value="No"
                            checked={formData.usingOtherPlatforms === false} // Checked if false
                            onChange={handleUsingOtherPlatformsChange}
                            className="form-radio h-6 w-6 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            No
                          </span>
                        </label>
                      </div>

                      {/* {errors.usingOtherPlatforms && (
    <p className="text-red-600 text-sm mt-2">{errors.usingOtherPlatforms}</p>
  )} */}
                    </div>

                    <div className="p-6 w-full rounded-[8px] border-[1px] ">
                      <h2 className="block text-sm font-medium text-gray-700 my-2">
                        Do you have your own learning management platform?
                      </h2>

                      <div className="flex items-center">
                        <label className="flex items-center space-x-3 mx-4">
                          <input
                            type="radio"
                            name="haveOwnPlatform"
                            value="Yes"
                            checked={formData.haveOwnPlatform === true} // Checked if true
                            onChange={handleHaveOwnPlatformChange}
                            className="form-radio h-6 w-6 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            Yes
                          </span>
                        </label>

                        <label className="flex items-center space-x-3 mx-4">
                          <input
                            type="radio"
                            name="haveOwnPlatform"
                            value="No"
                            checked={formData.haveOwnPlatform === false} // Checked if false
                            onChange={handleHaveOwnPlatformChange}
                            className="form-radio h-6 w-6 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            No
                          </span>
                        </label>
                      </div>

                      {/* {errors.haveOwnPlatform && (
    <p className="text-red-600 text-sm mt-2">{errors.haveOwnPlatform}</p>
  )} */}
                    </div>

                    <div className="p-6 w-full rounded-[8px] border-[1px] ">
                      <h2 className="block text-sm font-medium text-gray-700 my-2">
                        How soon are you planning to launch your online academy?
                      </h2>

                      <div className="space-y-4">
                        <label className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="plannedLaunchPeriod"
                            value="ASAP"
                            checked={formData.plannedLaunchPeriod === "ASAP"}
                            onChange={handlePlannedLaunchPeriodChange}
                            className="form-radio h-6 w-6 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            ASAP
                          </span>
                        </label>

                        <label className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="plannedLaunchPeriod"
                            value="1-3 months"
                            checked={
                              formData.plannedLaunchPeriod === "1-3 months"
                            }
                            onChange={handlePlannedLaunchPeriodChange}
                            className="form-radio h-6 w-6 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            1-3 months
                          </span>
                        </label>

                        <label className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="plannedLaunchPeriod"
                            value="6+ months"
                            checked={
                              formData.plannedLaunchPeriod === "6+ months"
                            }
                            onChange={handlePlannedLaunchPeriodChange}
                            className="form-radio h-6 w-6 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="block text-sm font-medium text-gray-700">
                            6+ months
                          </span>
                        </label>
                      </div>

                      {/* {errors.plannedLaunchPeriod && (
    <p className="text-red-600 text-sm mt-2">{errors.plannedLaunchPeriod}</p>
  )} */}
                    </div>
                    <div className="p-6 w-full rounded-[8px] border-[1px] ">
                      <label
                        htmlFor="furtherComments"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Kindly let us know your questions, suggestions, and
                        further inquiries.
                      </label>
                      <textarea
                        id="furtherComments"
                        placeholder="Write here"
                        value={formData.furtherComments}
                        onChange={handleFurtherCommentsChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white sm:text-sm"
                        rows={4}
                      />
                      {/* {errors.furtherComments && (
    <p className="text-red-600 text-sm mt-2">{errors.furtherComments}</p>
  )} */}
                    </div>

                    <button
                      type="submit"
                      className="bg-[#2B44BE] w-full submitButton p-2 mt-5 h-[46px] text-white rounded-[12px] my-5 shadow-md hover:bg-blue-600 transition-transform duration-300 transform hover:scale-105"
                    >
                      {buttonText}
                    </button>
                  </form>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>

      <div className="bg-[#191052] lg:py-16 py-0 lg:pt-0 pt-5">
        <div className="flex lg:flex-row lg:my-12 lg:pb-5 pb-0 lg:pt-10 pt-0   lg:mx-10 mx-5  flex-col  lg:justify-center  justify-start ">
          <div className="lg:w-1/2 items-center flex justify-center w-full ">
            <div className="  py-4 lg:w-[100%]  flex justify-center flex-col     ">
              <p className=" capitalize text-[40px] leading-[48px] lg:text-[56px] lg:leading-[56px] font-[700]  mb-7  -tracking-[4%] text-white">
                <span className="">Scale your</span>
                &nbsp; business operations with our learning platform.
              </p>

              <p className="  font-[400] text-[18px] lg:text-[24px] leading-[28px] -tracking-[2%] my-2 text-white">
                Companies of all sizes, big or small, can use TeachWithDABA to
                train employees, onboard employees, and educate their customers.
              </p>
              <p className="  font-[400] text-[18px] lg:text-[24px] leading-[28px] -tracking-[2%] my-2 text-white">
                Online educators and teachers can create, sell and manage their
                online academies using TeachWithDABA
              </p>
            </div>
          </div>

          <div className="lg:w-1/2   flex-end flex items-end justify-end ">
            <Image
              src="/img/star.svg"
              width={100}
              height={100}
              className=" w-auto h-auto  lg:py-5 flex items-end justify-end "
              alt="brix-logo"
            />
          </div>
        </div>
      </div>

      <div className="bg-[#F7F9FC] lg:py-12 py-5 ">
        <div className=" py-5 lg:py-16 lg:px-10 px-3 flex items-center  flex-col lg:justify-center">
          <div className=" flex items-center lg:w-4/6 lg:text-center  flex-col justify-center text-[#101928] py-4 w-full">
            <p className="font-bold text-center lg:text-[48px]  text-[36px] lg:leading-[48px]  leading-[43px]    mb-3 px-3 -tracking-[-4%]">
              We are building the SaaS platform to power online academies
              globally.
            </p>

            <div className="   lg:mx-10 mx-3  text-center">
              <p className="text-[#101928]  font-[500] text-[18px] leading-[26px] my-5">
                Want to be the first to know when we launch? Join the waitlist
              </p>
            </div>
            <div className="lg:w-auto w-full">
              <div className=" flex lg:flex-row lg:w-auto w-full  flex-col items-center my-2">
                <p className="text-[#6A6A6A] w-full  font-[500] text-[16px] leading-[24px] lg:my-5 my-2 mx-2">
                  <button
                    onClick={toggleOverlay}
                    className="text-[#fff] text-[17px] lg:w-[211px] h-[55px] w-full py-4   bg-[#2B44BE]   px-4  font-[500] rounded-[12px]  leading-[23px] font-helvetica shadow-md hover:bg-blue-600 transition-transform duration-300 transform hover:scale-105"
                  >
                    Enterprise & Business
                  </button>
                </p>
                <p className="text-[#6A6A6A] w-full  font-[500] text-[16px] leading-[24px] lg:my-5 my-2 mx-2">
                  <button
                    onClick={toggleOverlays}
                    className="text-[#fff] text-[17px] lg:w-[211px] h-[55px] w-full py-4   bg-[#2B44BE]   px-4  font-[500] rounded-[12px]  leading-[23px] font-helvetica shadow-md hover:bg-blue-600 transition-transform duration-300 transform hover:scale-105"
                  >
                    Course Creators
                  </button>
                </p>
              </div>
              <div className="flex items-start justify-start text-left"></div>
            </div>
            <div className="flex lg:flex-row flex-col my-10 items-center justify-center">
              <p className="text-[16px] leading-[25px]">
                Reach out us on our social handles:
              </p>
              <div className=" flex lg:my-0 my-3">
                <a
                  href="https://www.linkedin.com/company/daba-for-business/"
                  className="mx-2"
                >
                  <Image
                    src="/img/linkedinBlack.svg"
                    width={100}
                    height={100}
                    alt="brix-logo w-auto"
                    className="w-auto"
                  />
                </a>
                <a
                  href="https://facebook.com/profile.php?id=61562442178077"
                  className="mx-2"
                >
                  <Image
                    src="/img/facebookBlack.svg"
                    width={100}
                    height={100}
                    alt="brix-logo w-auto"
                    className="w-auto"
                  />
                </a>
                {/* <a href="" className="mx-2">
                  {" "}
                  <Image
                    src="/img/ig.svg"
                    width={100}
                    height={100}
                    alt="brix-logo w-auto"
                    className="w-auto"
                  />
                </a> */}
                <a href="https://x.com/Dabaforbusiness" className="mx-2">
                  {" "}
                  <Image
                    src="/img/twitterBlack.svg"
                    width={100}
                    height={100}
                    alt="brix-logo w-auto"
                    className="w-auto"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className=" lg:mb-8 mb-0 lg:pb-0 pb-5 lg:h-[271px] lg:pt-16">
          {/* <hr className=" pt-7" /> */}
          <div className=" flex border-t-[1.5px] border-[#E4E7EC] pt-10 justify-between lg:flex-row flex-col lg:mx-10 mx-5 my-2">
            <div className="text-white text-2xl font-bold">
              {" "}
              <Image
                src="/img/logo.svg"
                width={100}
                height={100}
                alt="brix-logo w-auto"
                className="w-auto lg:ml-0 ml-3 lg:my-0 my-5"
              />
            </div>
            <div className="flex lg:flex-row flex-col lg:mx-8 ">
              <div className="flex space-x-4 py-3">
                <a
                  href="#home"
                  className="text-[#344054] font-[700] text-[17px]"
                >
                  Contact us
                </a>

                <a
                  href="mailto:contactus@teachwithdaba.com"
                  className="text-[#3655EE] font-[700] text-[17px]"
                >
                  contactus@teachwithdaba.com
                </a>
              </div>
              <div className="flex space-x-4 lg:mx-8 py-3">
                <a
                  href="#home"
                  className="text-[#344054] font-[700] text-[17px]"
                >
                  Follow us
                </a>
                <Link href="https://facebook.com/profile.php?id=61562442178077">
                  <Image
                    src="/img/facebook.svg"
                    alt="daba's studio"
                    width={100}
                    height={100}
                    className="w-auto"
                  />
                </Link>
                <Link href="https://x.com/Dabaforbusiness">
                  <Image
                    src="/img/twitter.svg"
                    alt="daba's studio"
                    width={100}
                    height={100}
                    className="w-auto"
                  />
                </Link>
                <a href="">
                  <Image
                    src="/img/instagram.svg"
                    alt="daba's studio"
                    width={100}
                    height={100}
                    className="w-auto"
                  />
                </a>
                <Link href="https://www.linkedin.com/company/daba-for-business/">
                  <Image
                    src="/img/linkedin.svg"
                    alt="daba's studio"
                    width={100}
                    height={100}
                    className="w-auto"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className=" flex  border-[#E4E7EC] pt-10 justify-between lg:flex-row flex-col lg:mx-10 mx-5 my-2 py-6">
            <div className="flex space-x-4 py-3">
              <p className="text-[#344054] font-[700] text-[17px]">
                Privacy Policy
              </p>
              <p className="text-[#344054] font-[700] text-[17px] ">
                Terms of Use
              </p>
            </div>

            <div className="flex space-x-4 lg:mx-5 text-[#344054] font-[400] text-[14px] py-3">
              © Copyright {year}, All Rights Reserved
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
