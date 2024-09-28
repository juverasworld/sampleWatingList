// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// export default function Home() {
//   const [year, setYear] = useState<number>();
//   const [countries, setCountries] = useState<{ name: string; code: string }[]>(
//     []
//   );

//   useEffect(() => {
//     const currentYear = new Date().getFullYear();
//     setYear(currentYear);
//   }, []);

//     // Fetch countries from the API
//      // Fetch countries from the API
//      const fetchCountries = async () => {
//       try {
//         const response = await fetch("https://restcountries.com/v3.1/all");
//         const data = await response.json();
//         const countryList = data.map((country: any) => ({
//           name: country.name.common,
//           code: country.cca2,
//         }));
//         setCountries(countryList);
//       } catch (error) {
//         console.error("Error fetching countries:", error);
//       }
//     };

//     fetchCountries();
//   }, []);

//   // const [email, setEmail] = useState('');

//   // const handleSubmit = async (event: React.FormEvent) => {
//   //   event.preventDefault();

//   //   const response = await fetch('https://api.v2.daba.school/staging/api/v1/waitlist', {
//   //     method: 'POST',
//   //     headers: {
//   //       'Content-Type': 'application/json',
//   //     },
//   //     body: JSON.stringify({ email }),
//   //   });

//   //   if (response.ok) {
//   //     alert('You have been added to the waitlist!');
//   //   } else {
//   //     alert('Failed to join the waitlist. Please try again.');
//   //   }
//   // };

//   // const [email, setEmail] = useState("");
//   // const [submittedEmails, setSubmittedEmails] = useState<Set<string>>(
//   //   new Set()
//   // );

//   // const handleSubmit = async (event: React.FormEvent) => {
//   //   event.preventDefault();

//   //   if (submittedEmails.has(email)) {
//   //     alert("This email has already been added to the waitlist.");
//   //     return;
//   //   }

//   //   const response = await fetch(
//   //     `${process.env.NEXT_PUBLIC_BASE_URL}/waitlist`,
//   //     {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify({ email }),
//   //     }
//   //   );

//   //   if (response.ok) {
//   //     setSubmittedEmails(new Set(submittedEmails).add(email));
//   //     alert("You have been added to the waitlist!");
//   //   } else {
//   //     alert("The email has already been registered. Please try again.");
//   //   }
//   // };
//   const [formData, setFormData] = useState({
//     email: "",
//     whatsapp: "",
//     name: "",
//     country: "",
//     companyName: "",
//     companyIndustry: ""
//   });

//   const [submittedEmails, setSubmittedEmails] = useState<Set<string>>(
//     new Set()
//   );

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     if (submittedEmails.has(formData.email)) {
//       alert("This email has already been added to the waitlist.");
//       return;
//     }

//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/waitlist`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       }
//     );

//     if (response.ok) {
//       setSubmittedEmails(new Set(submittedEmails).add(formData.email));
//       alert("You have been added to the waitlist!");
//     } else {
//       alert("The email has already been registered. Please try again.");
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className="">
//       <div className="flex items-center justify-center py-10 lg:mx-10 mx-5 bg-white ">
//         <Image src="/img/logo.svg" width={100} height={100} alt="brix-logo" />
//       </div>
//       <div className="w-full flex items-center flex-col justify-center">
//         <div className=" w-1/3 py-4 lg:mx-10 mx-5 bg-white text-center">
//           <p className="font-[600] lg:text-[75px] md:text-[45px] text-[39px] lg:leading-[85px] md:leading-[50px] leading-[40px]  lg:mb-10 mb-3 capitalize">
//             Launch your online Academy
//           </p>
//           <p className="text-[#6A6A6A]  font-[500] text-[16px] leading-[24px] my-5">
//             Teach.Daba provides an all-in-one platform for creators,
//             organizations, businesses and tutors to create, launch and, manage
//             their inline academies
//           </p>
//         </div>
//       </div>
//       <div className="flex lg:flex-row flex-col my-5">
//         <div className="lg:w-1/2 ">
//           <Image
//             src="/img/hero.svg"
//             width={100}
//             height={100}
//             className="w-[100%]  py-5  "
//             alt="brix-logo"
//           />
//         </div>

//         <div className="lg:w-1/3   flex lg:ml-16  lg:mx-10 mx-5">
//           <div className="  w-full flex justify-center flex-col">
//             <div className="mt-10  ">
//               <p className="text-[#344054] text-[14px] leading-[20px] text-left flex items-start justify-start ">
//                 Join 200+ people on the waiting list
//               </p>

//               <form onSubmit={handleSubmit} className="flex   flex-col">
//                 <input
//                   type="email"
//                   name="email"
//                   id="email"
//                   className="border-gray-200 border-[1px] p-2 w-full lg:w-[60%] rounded-[6px] my-2"
//                   placeholder="Enter your email"
//                   value={formData.email}
//                  
//                 />
//                 <input
//                   type="text"
//                   name="whatsapp"
//                   id="whatsapp"
//                   className="border-gray-200 border-[1px] p-2 w-full lg:w-[60%] rounded-[6px] my-2"
//                   placeholder="Enter your WhatsApp number"
//                   value={formData.whatsapp}
//                  
//                 />
//                 <input
//                   type="text"
//                   name="name"
//                   id="name"
//                   className="border-gray-200 border-[1px] p-2 w-full lg:w-[60%] rounded-[6px] my-2"
//                   placeholder="Enter your name"
//                   value={formData.name}
//                  
//                 />
//                 <input
//                   type="text"
//                   name="country"
//                   id="country"
//                   className="border-gray-200 border-[1px] p-2 w-full lg:w-[60%] rounded-[6px] my-2"
//                   placeholder="Enter your country"
//                   value={formData.country}
//                  
//                 />
//                  <select
//                   name="country"
//                   id="country"
//                   className="border-gray-200 border-[1px] p-2 w-full lg:w-[60%] rounded-[6px] my-2"
//                   value={formData.country}
//                  
//                 >
//                   <option value="">Select your country</option>
//                   {countries.map((country) => (
//                     <option key={country.code} value={country.name}>
//                       {country.name}
//                     </option>
//                   ))}
//                 </select>
//                 <input
//                   type="text"
//                   name="companyName"
//                   id="companyName"
//                   className="border-gray-200 border-[1px] p-2 w-full lg:w-[60%] rounded-[6px] my-2"
//                   placeholder="Enter your company name"
//                   value={formData.companyName}
//                  
//                 />
//                 <input
//                   type="text"
//                   name="companyIndustry"
//                   id="companyIndustry"
//                   className="border-gray-200 border-[1px] p-2 w-full lg:w-[60%] rounded-[6px] my-2"
//                   placeholder="Enter your companyIndustry"
//                   value={formData.companyIndustry}
//                  
//                 />
//                 <button
//                   type="submit"
//                   className="bg-[#000001] w-full lg:w-[192px] h-[45px] text-white lg:mx-5 rounded-[6px] my-2"
//                 >
//                   Join List
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="bg-black">
//         <div className=" flex flex-col  justify-end lg:h-[300px] ">
//           <p className="text-[#F3F3F3] text-[14px]  flex flex-row items-center justify-center my-5">
//             About us
//           </p>
//           <div className="flex flex-row items-center justify-center border-b-[1px] pb-5 border-[#B2B2B2] my-5">
//             <Link href={" "} className="mx-3">
//               <p className="">
//                 <svg
//                   width="28"
//                   height="28"
//                   viewBox="0 0 28 28"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M5 24.5L12.548 15.694M12.548 15.694L5 3.5L10 3.5L15.452 12.306M12.548 15.694L18 24.5L23 24.5L15.452 12.306M23 3.5L15.452 12.306"
//                     stroke="#E5E5E5"
//                     stroke-width="1.5"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                   />
//                 </svg>
//               </p>
//             </Link>
//             <Link href={" "} className="mx-3">
//               <p className="">
//                 <svg
//                   width="28"
//                   height="28"
//                   viewBox="0 0 28 28"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M14 2.52255C17.738 2.52255 18.1807 2.53655 19.6573 2.60388C20.5452 2.61474 21.4246 2.77776 22.2573 3.08585C22.8612 3.31874 23.4097 3.67549 23.8673 4.13314C24.325 4.59079 24.6818 5.13919 24.9147 5.74306C25.2228 6.57576 25.3858 7.45513 25.3967 8.34294C25.4633 9.81953 25.478 10.2622 25.478 14C25.478 17.7378 25.464 18.1805 25.3967 19.6571C25.3858 20.5449 25.2228 21.4242 24.9147 22.2569C24.6818 22.8608 24.325 23.4092 23.8673 23.8669C23.4097 24.3245 22.8612 24.6813 22.2573 24.9141C21.4246 25.2222 20.5452 25.3853 19.6573 25.3961C18.1813 25.4628 17.7387 25.4775 14 25.4775C10.2613 25.4775 9.81867 25.4635 8.34267 25.3961C7.45482 25.3853 6.57541 25.2222 5.74267 24.9141C5.13877 24.6813 4.59034 24.3245 4.13267 23.8669C3.675 23.4092 3.31823 22.8608 3.08533 22.2569C2.77723 21.4242 2.6142 20.5449 2.60333 19.6571C2.53667 18.1805 2.522 17.7378 2.522 14C2.522 10.2622 2.536 9.81953 2.60333 8.34294C2.6142 7.45513 2.77723 6.57576 3.08533 5.74306C3.31823 5.13919 3.675 4.59079 4.13267 4.13314C4.59034 3.67549 5.13877 3.31874 5.74267 3.08585C6.57541 2.77776 7.45482 2.61474 8.34267 2.60388C9.81933 2.53721 10.262 2.52255 14 2.52255ZM14 0C10.2 0 9.72133 0.0159992 8.228 0.083996C7.06603 0.107107 5.9164 0.327105 4.828 0.734632C3.89433 1.08639 3.04866 1.63763 2.35 2.34989C1.63707 3.04877 1.08533 3.89488 0.733333 4.8291C0.325787 5.91745 0.105779 7.06703 0.0826667 8.22894C0.016 9.72087 0 10.1995 0 13.9993C0 17.7992 0.016 18.2778 0.084 19.7711C0.107112 20.933 0.32712 22.0826 0.734667 23.1709C1.08627 24.105 1.63755 24.9511 2.35 25.6501C3.04905 26.3625 3.89519 26.9138 4.82933 27.2654C5.91773 27.6729 7.06737 27.8929 8.22933 27.916C9.72267 27.9827 10.1993 28 14.0013 28C17.8033 28 18.28 27.984 19.7733 27.916C20.9353 27.8929 22.0849 27.6729 23.1733 27.2654C24.103 26.905 24.9473 26.3546 25.6522 25.6493C26.357 24.9441 26.9069 24.0995 27.2667 23.1696C27.6742 22.0812 27.8942 20.9316 27.9173 19.7697C27.984 18.2778 28 17.7992 28 13.9993C28 10.1995 27.984 9.72087 27.916 8.22761C27.8929 7.0657 27.6729 5.91612 27.2653 4.82777C26.9137 3.89367 26.3625 3.04757 25.65 2.34855C24.951 1.63614 24.1048 1.08489 23.1707 0.733298C22.0823 0.325771 20.9326 0.105774 19.7707 0.0826628C18.2787 0.0159993 17.8 0 14 0Z"
//                     fill="#E5E5E5"
//                   />
//                   <path
//                     d="M14.0029 6.81323C12.581 6.81323 11.191 7.23486 10.0087 8.0248C8.82642 8.81473 7.90494 9.9375 7.3608 11.2511C6.81666 12.5647 6.67428 14.0102 6.95169 15.4047C7.22909 16.7993 7.91381 18.0802 8.91925 19.0856C9.9247 20.091 11.2057 20.7757 12.6003 21.0531C13.9949 21.3305 15.4404 21.1881 16.7541 20.644C18.0678 20.0999 19.1906 19.1784 19.9806 17.9962C20.7706 16.814 21.1922 15.4241 21.1922 14.0022C21.1922 12.0956 20.4348 10.267 19.0865 8.91884C17.7382 7.57064 15.9096 6.81323 14.0029 6.81323ZM14.0029 18.6687C13.0799 18.6687 12.1776 18.395 11.4102 17.8822C10.6428 17.3695 10.0446 16.6407 9.69144 15.788C9.33823 14.9353 9.24582 13.997 9.42588 13.0918C9.60594 12.1866 10.0504 11.3552 10.703 10.7025C11.3557 10.0499 12.1872 9.6055 13.0925 9.42544C13.9977 9.24539 14.936 9.3378 15.7887 9.69099C16.6415 10.0442 17.3703 10.6423 17.8831 11.4097C18.3958 12.1771 18.6695 13.0793 18.6695 14.0022C18.6695 15.2398 18.1779 16.4268 17.3027 17.3019C16.4275 18.177 15.2406 18.6687 14.0029 18.6687Z"
//                     fill="#E5E5E5"
//                   />
//                   <path
//                     d="M21.4748 8.2075C22.4026 8.2075 23.1548 7.45537 23.1548 6.52758C23.1548 5.59978 22.4026 4.84766 21.4748 4.84766C20.547 4.84766 19.7948 5.59978 19.7948 6.52758C19.7948 7.45537 20.547 8.2075 21.4748 8.2075Z"
//                     fill="#E5E5E5"
//                   />
//                 </svg>
//               </p>
//             </Link>

//             <Link href={" "} className="mx-3">
//               <p className="">
//                 <svg
//                   width="28"
//                   height="28"
//                   viewBox="0 0 28 28"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <g clip-path="url(#clip0_6767_1772)">
//                     <path
//                       d="M26.4444 0L1.55556 0C0.696446 0 0 0.696446 0 1.55556L0 26.4444C0 27.3036 0.696446 28 1.55556 28H26.4444C27.3036 28 28 27.3036 28 26.4444V1.55556C28 0.696446 27.3036 0 26.4444 0Z"
//                       fill="#117EB8"
//                     />
//                     <path
//                       fill-rule="evenodd"
//                       clip-rule="evenodd"
//                       d="M5.10961 10.8298H8.85189V22.8705H5.10961V10.8298ZM6.98133 4.84438C8.17794 4.84438 9.15017 5.81661 9.15017 7.01322C9.15017 8.21099 8.17794 9.18361 6.98133 9.18361C6.69296 9.18907 6.40639 9.13698 6.13838 9.0304C5.87037 8.92382 5.62629 8.76488 5.42042 8.56287C5.21455 8.36086 5.05102 8.11984 4.93939 7.8539C4.82775 7.58795 4.77025 7.30242 4.77025 7.01399C4.77025 6.72557 4.82775 6.44004 4.93939 6.17409C5.05102 5.90815 5.21455 5.66712 5.42042 5.46512C5.62629 5.26311 5.87037 5.10417 6.13838 4.99759C6.40639 4.89101 6.69296 4.83892 6.98133 4.84438ZM11.1992 10.8294H14.7887V12.4748H14.8384C15.3382 11.5282 16.5589 10.5303 18.3793 10.5303C22.1686 10.5303 22.8686 13.0243 22.8686 16.2664V22.8705H19.1287V17.015C19.1287 15.6189 19.103 13.8227 17.1842 13.8227C15.2371 13.8227 14.938 15.3436 14.938 16.9143V22.8705H11.1988V10.8298L11.1992 10.8294Z"
//                       fill="white"
//                     />
//                   </g>
//                   <defs>
//                     <clipPath id="clip0_6767_1772">
//                       <rect width="28" height="28" fill="white" />
//                     </clipPath>
//                   </defs>
//                 </svg>
//               </p>
//             </Link>
//           </div>

//           <div className="text-[#B2B2B2] text-[14px] py-3 text-center">
//             {" "}
//             <p>© Copyright {year}, All Rights Reserved by Brix</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const [year, setYear] = useState<number>();
  const [countries, setCountries] = useState<{ name: string; code: string }[]>(
    []
  );

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setYear(currentYear);

    // Fetch countries from the API
    const fetchCountries = async () => {
      try {
        const response = await fetch("/country.json");
        const data = await response.json();
        const countryList = data.map((country: any) => ({
          name: country.name.common,
          code: country.cca2,
        }));
        setCountries(countryList);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    whatsapp: "",
    name: "",
    country: "",
    companyName: "",
    companyIndustry: "",
    companyRole: "",
    subscribe: false, // Default value for the checkbox
  });

  const [submittedEmails, setSubmittedEmails] = useState<Set<string>>(
    new Set()
  );


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (submittedEmails.has(formData.email)) {
      alert("This email has already been added to the waitlist.");
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/waitlist`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      setSubmittedEmails(new Set(submittedEmails).add(formData.email));
      alert("You have been added to the waitlist!");
    } else {
      alert("The email has already been registered. Please try again.");
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="">
      <nav className=" mb-24 lg:p-4 p-2">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold">
            {" "}
            <Image
              src="/img/logo.svg"
              width={100}
              height={100}
              alt="brix-logo w-auto"
              className="w-auto lg:ml-0 ml-3"
            />
          </div>
          <div className="md:hidden">
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
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="hidden md:flex space-x-4 ">
            <button className=" lg:w-[136px] p-2 text-[#101928]  text-[17px] font-700 rounded-[12px] font-[700]">
              Blog
            </button>
            <button className="border-[#2B44BE] border-[1px] lg:w-[136px] w-full p-2   text-[#2B44BE]  rounded-[8px] font-[700] px-4 ">
              Join Waitlist
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden bg-white shadow-xl  border-3 rounded-[8px] flex items-center flex-col px-5 pt-7">
            <button className=" lg:w-[136px] block p-2 text-[#101928]  text-[17px] font-[700] rounded-[12px] ">
              Blog
            </button>{" "}
            <button className="border-[#2B44BE] border-[1px] lg:w-[136px] p-2  h-[55px] text-[#2B44BE]  rounded-[12px] font-[700] my-5 px-4 w-full">
              Join Waitlist
            </button>
          </div>
        )}
      </nav>

      {/* <div className="flex items-center justify-center py-10 lg:mx-10 mx-5 bg-white ">
        <Image src="/img/logo.svg" width={100} height={100} alt="brix-logo" />
      </div> */}

      <div className="flex lg:flex-row lg:mx-10 mx-5 flex-col my-5 justify-center">
        <div className=" w-[100%]  flex justify-center items-center  lg:w-1/2   ">
          <div className="  py-4  bg-white   lg:w-[70%]">
            <p className="uppercase text-[14px] leading-[18px] font-[700] text-[#667185] mb-7">
              Create and Manage your Online Academy
            </p>
            <p className="font-[600] lg:text-[56px] md:text-[45px] text-[39px] text-[#101928] lg:leading-[56px]  md:leading-[50px] leading-[40px]  lg:mb-10 mb-3 capitalize">
              DABA for business is an all in one learning management platform.
            </p>
            <p className="text-[#101928]  font-[400] text-[20px] leading-[24px] my-5">
              The simplest way for anyone to launch an online school/course.
              Access growth tools and manage everything your business needs —
              all online, from anywhere.
            </p>
            <p className="text-[#6A6A6A]  font-[500] text-[16px] leading-[24px] my-5">
              <button className="bg-[#2B44BE] lg:w-[136px] p-2  h-[55px] text-white  rounded-[12px] my-5">
                Join Waitlist
              </button>
            </p>
          </div>
        </div>
        <div className="lg:w-1/2  mx-2">
          <Image
            src="/img/hero.svg"
            width={100}
            height={100}
            className="w-auto  py-5  "
            alt="brix-logo"
          />
        </div>
      </div>

      <div className="bg-[#F9FAFB] py-16">
        <div className="w-full flex items-center flex-col justify-center text-[#101928]">
          <div className=" lg:w-1/3 py-4 lg:mx-10 mx-5  text-center">
            <p className="font-[500] lg:text-[40px] md:text-[45px] text-[39px] lg:leading-[40px] md:leading-[50px] leading-[48px]   mb-3 capitalize">
              Get more done with DABA
            </p>
            <p className="text-[#6A6A6A]  font-[500] text-[14px] leading-[20px] my-2">
              Creating an online school/course should be a celebration, not a
              nightmare.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap xl:mx-44 lg:mx-10 mx-2 my-2">
          <div className="w-full  md:w-1/2  relative lg:w-1/3 p-4 my-2 ">
            <div className=" rounded-[24px] p-4 h-[156px] shadow-xl items-center pt-4 text-center justify-center flex bg-white">
              <p className="mb-3  absolute top-10">
                <svg
                  width="41"
                  height="40"
                  viewBox="0 0 41 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9 4.16669C6.23858 4.16669 4 6.40526 4 9.16669V12.5C4 13.7338 4.67033 14.8111 5.66667 15.3874V29.1667C5.66667 32.8486 8.65144 35.8334 12.3333 35.8334H29C32.6819 35.8334 35.6667 32.8486 35.6667 29.1667V15.3874C36.663 14.8111 37.3333 13.7338 37.3333 12.5V9.16669C37.3333 6.40526 35.0948 4.16669 32.3333 4.16669H9ZM12.3333 32.5C10.4924 32.5 9 31.0076 9 29.1667V15.8334H32.3333V29.1667C32.3333 31.0076 30.8409 32.5 29 32.5H12.3333ZM32.3333 7.50002C33.2538 7.50002 34 8.24621 34 9.16669V12.5H7.33333V9.16669C7.33333 8.24621 8.07953 7.50002 9 7.50002H32.3333Z"
                    fill="#1671D9"
                  />
                </svg>
              </p>

              <p className="mt-8 text-[#101A47] text-[18px]  font-[500] leading-[26px]    font-sans">
                Create and sell your online school/ courses.
              </p>
            </div>
          </div>
          <div className="w-full  md:w-1/2  relative lg:w-1/3 p-4 my-2 ">
            <div className=" rounded-[24px] p-4 h-[156px] shadow-xl items-center pt-4 text-center justify-center flex bg-white">
              <p className="mb-3  absolute top-10">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15.0003 3.33331C14.8906 3.33331 14.7811 3.34415 14.6735 3.36568L8.11074 4.67823C6.45388 5.0096 5.07647 6.15536 4.44894 7.72418L1.78621 14.381C1.57019 14.921 1.65135 15.5347 2.00034 16L16.0003 34.6666C16.9446 35.9257 18.4266 36.6666 20.0003 36.6666C21.5741 36.6666 23.0561 35.9257 24.0003 34.6666L38.0003 16C38.3493 15.5347 38.4305 14.921 38.2145 14.381L35.5517 7.72418C34.9242 6.15536 33.5468 5.0096 31.8899 4.67823L25.3272 3.36568C25.2196 3.34415 25.1101 3.33331 25.0003 3.33331H15.0003ZM32.7163 17.4898L25.2887 27.3933L29.4977 18.1335L32.7163 17.4898ZM34.3754 13.7586L29.514 14.7309L27.3538 7.17035L31.2362 7.94683C31.7885 8.05729 32.2476 8.43921 32.4568 8.96214L34.3754 13.7586ZM13.8766 15L16.2575 6.66665H23.7432L26.1241 15H13.8766ZM20.0003 30.9723L14.2553 18.3333H25.7453L20.0003 30.9723ZM14.712 27.3933L10.503 18.1335L7.28436 17.4898L14.712 27.3933ZM7.54386 8.96215L5.62527 13.7586L10.4867 14.7309L12.6469 7.17035L8.76446 7.94683C8.21218 8.05729 7.75304 8.43921 7.54386 8.96215Z"
                    fill="#3655EE"
                  />
                </svg>
              </p>

              <p className="mt-8 text-[#101A47] text-[18px]  font-[500] leading-[26px]    font-sans">
                Onboard & train employees
              </p>
            </div>
          </div>
          <div className="w-full  md:w-1/2  relative lg:w-1/3 p-4 my-2 ">
            <div className=" rounded-[24px] p-4 h-[156px] shadow-xl items-center pt-4 text-center justify-center flex bg-white">
              <p className="mb-3  absolute top-10">
                <svg
                  width="41"
                  height="40"
                  viewBox="0 0 41 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.5883 18.1574C8.76501 17.7457 8.4313 16.7446 8.84295 15.9213C9.2546 15.098 10.2557 14.7643 11.079 15.176L16.079 17.676C16.9023 18.0876 17.236 19.0887 16.8244 19.912C16.4127 20.7353 15.4116 21.069 14.5883 20.6574L9.5883 18.1574Z"
                    fill="#3655EE"
                  />
                  <path
                    d="M9.5883 23.1574C8.76501 22.7457 8.4313 21.7446 8.84295 20.9213C9.2546 20.098 10.2557 19.7643 11.079 20.176L16.079 22.676C16.9023 23.0876 17.236 24.0887 16.8244 24.912C16.4127 25.7353 15.4116 26.069 14.5883 25.6574L9.5883 23.1574Z"
                    fill="#3655EE"
                  />
                  <path
                    d="M31.8244 15.9213C32.236 16.7446 31.9023 17.7457 31.079 18.1574L26.079 20.6574C25.2557 21.069 24.2546 20.7353 23.8429 19.912C23.4313 19.0887 23.765 18.0876 24.5883 17.676L29.5883 15.176C30.4116 14.7643 31.4127 15.098 31.8244 15.9213Z"
                    fill="#3655EE"
                  />
                  <path
                    d="M31.8244 20.9213C32.236 21.7446 31.9023 22.7457 31.079 23.1574L26.079 25.6574C25.2557 26.069 24.2546 25.7353 23.8429 24.912C23.4313 24.0887 23.765 23.0876 24.5883 22.676L29.5883 20.176C30.4116 19.7643 31.4127 20.098 31.8244 20.9213Z"
                    fill="#3655EE"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M20.3337 33.3333C20.9173 34.8945 20.9174 34.8945 20.9175 34.8944L20.9326 34.8887L20.9729 34.8736L21.1239 34.8162C21.2545 34.7663 21.4433 34.6936 21.6789 34.6013C22.1498 34.4168 22.8095 34.1533 23.5678 33.8361C25.0736 33.2062 27.0106 32.347 28.6314 31.4633C30.4315 30.482 33.0914 29.3612 34.6828 28.7175C36.0693 28.1566 37.0003 26.8108 37.0003 25.2922V9.28201C37.0003 6.87997 34.7009 5.07894 32.3347 5.80615C30.7742 6.28573 28.7307 6.95836 27.1684 7.63856C25.5362 8.34918 23.59 9.43328 22.0885 10.3139C21.4 10.7177 20.7924 11.0862 20.3337 11.3686C19.8749 11.0862 19.2673 10.7177 18.5789 10.3139C17.0774 9.43328 15.1312 8.34918 13.499 7.63856C11.9366 6.95836 9.89312 6.28573 8.33264 5.80615C5.96639 5.07894 3.66699 6.87997 3.66699 9.28201V25.2922C3.66699 26.8108 4.598 28.1566 5.98451 28.7175C7.57597 29.3612 10.2358 30.482 12.0359 31.4633C13.6567 32.347 15.5937 33.2062 17.0995 33.8361C17.8578 34.1533 18.5176 34.4168 18.9885 34.6013C19.2241 34.6936 19.4128 34.7663 19.5434 34.8162L19.6944 34.8736L19.7347 34.8887L19.7486 34.8939C19.7487 34.894 19.75 34.8945 20.3337 33.3333ZM7.35341 8.9924C7.20039 8.94538 7.00033 9.0485 7.00033 9.28201V25.2922C7.00033 25.4296 7.08586 25.5673 7.23446 25.6274C8.82465 26.2706 11.6452 27.4539 13.6314 28.5367C15.1013 29.338 16.9143 30.1454 18.3858 30.761C18.4812 30.8009 18.575 30.8399 18.667 30.878V14.2569C18.2159 13.9787 17.5977 13.6028 16.8925 13.1892C15.412 12.3209 13.6082 11.3217 12.1684 10.6948C10.7878 10.0938 8.89484 9.46613 7.35341 8.9924ZM22.0003 14.2569V30.878C22.0923 30.8399 22.1861 30.8009 22.2815 30.761C23.7531 30.1454 25.566 29.338 27.0359 28.5367C29.0221 27.4539 31.8427 26.2706 33.4329 25.6274C33.5815 25.5673 33.667 25.4296 33.667 25.2922V9.28201C33.667 9.0485 33.4669 8.94538 33.3139 8.9924C31.7725 9.46613 29.8795 10.0938 28.499 10.6948C27.0591 11.3217 25.2553 12.3209 23.7748 13.1892C23.0696 13.6028 22.4514 13.9787 22.0003 14.2569Z"
                    fill="#3655EE"
                  />
                  <path
                    d="M20.3337 33.3333L20.9175 34.8944C20.5411 35.0351 20.125 35.0346 19.7486 34.8939L20.3337 33.3333Z"
                    fill="#3655EE"
                  />
                </svg>
              </p>

              <p className="mt-8 text-[#101A47] text-[18px]  font-[500] leading-[26px]    font-sans">
                Educate your customers
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex lg:flex-row lg:mx-10 mx-0 flex-col my-5 justify-center">
        <div className="lg:w-1/2 lg:mx-2 mx-5   my-3 flex items-center justify-center">
          <Image
            src="/img/icona.svg"
            width={100}
            height={100}
            className="lg:w-[80%]   w-full "
            alt="brix-logo"
          />
        </div>

        <div className=" w-[100%]  flex  my-3  lg:w-1/3 border-[#F0F2F5] border-[1px] lg:rounded-[24px] bg-[#F0F2F5]  lg:px-8 px-5 ">
          <div className="  lg:w-full flex justify-center flex-col ">
            <div className="  ">
              <form onSubmit={handleSubmit} className="flex flex-col w-[100%] ">
                <label
                  htmlFor="name"
                  className="text-[#411111] text-[14px]  font-[500] my-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="border-gray-200 border-[1px] p-2 lg:w-full h-[64px] w-[100%]  rounded-[6px] my-2 focus:border-[#D0D5DD] focus:outline-none"
                  placeholder="Enter your name"
                  value={formData.name}
                 
                  required
                />
                <label
                  htmlFor="email"
                  className="text-[#411111] text-[14px]  font-[500] my-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="border-gray-200 border-[1px] p-2 lg:w-full h-[64px] w-[100%]  rounded-[6px] my-2 focus:border-[#D0D5DD] focus:outline-none"
                  placeholder="Enter your email"
                  value={formData.email}
                 
                />
                <label
                  htmlFor="whatsapp"
                  className="text-[#411111] text-[14px]  font-[500] my-1"
                >
                  Whatsapp Number
                </label>
                <input
                  type="text"
                  required
                  name="whatsapp"
                  id="whatsapp"
                  className="border-gray-200 border-[1px] p-2 lg:w-full h-[64px] w-[100%]  rounded-[6px] my-2 focus:border-[#D0D5DD] focus:outline-none"
                  placeholder="Enter your WhatsApp number"
                  value={formData.whatsapp}
                 
                />

                <label
                  htmlFor="country"
                  className="text-[#411111] text-[14px]  font-[500] my-1 capitialize"
                >
                  COUNTRY
                </label>
                <div className="relative">
                  <select
                    name="country"
                    id="country"
                    className="border-gray-200 border-[1px] p-2 lg:w-full h-[64px] w-[100%] rounded-[6px] my-2 relative focus:border-[#D0D5DD] bg-white appearance-none focus:outline-none  pr-8"
                    value={formData.country}
                  
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
                <label
                  htmlFor="companyRole"
                  className="text-[#411111] text-[14px]  font-[500] my-1"
                >
                  Company Role
                </label>
                <div className="relative">
                  <select
                    name="companyRole"
                    id="companyRole"
                    className="border-gray-200 border-[1px] p-2 lg:w-full h-[64px] w-[100%] rounded-[6px] my-2 relative focus:border-[#D0D5DD] bg-white appearance-none focus:outline-none  pr-8"
                    value={formData.companyRole}
                   
                  >
                    <option value="" className="px-2">
                      Select your company role
                    </option>
                    <option value="CEO">CEO</option>
                    <option value="Teacher">Teacher</option>
                    <option value="HR">HR</option>
                    <option value="Sales Person">Sales Person</option>
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
                <label
                  htmlFor="companyName"
                  className="text-[#411111] text-[14px]  font-[500] my-1"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  id="companyName"
                  className="border-gray-200 border-[1px] p-2 lg:w-full h-[64px] w-[100%]  rounded-[6px] my-2 focus:border-[#D0D5DD] focus:outline-none"
                  placeholder="Enter your company name"
                  value={formData.companyName}
                 
                  required
                />
                <label
                  htmlFor="whatsapp"
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
                  value={formData.companyIndustry}
                 
                />
                <div className="flex items-center my-2">
                  <input
                    type="checkbox"
                    name="subscribe"
                    id="subscribe"
                    className="mr-2"
                    checked={formData.subscribe}
                   
                  />
                  <label
                    htmlFor="subscribe"
                    className="text-[#411111] text-[14px] font-[500]"
                  >
                    I agree to receive notifications via email
                  </label>
                </div>
                <button
                  type="submit"
                  className="bg-[#2B44BE] w-full p-2  h-[46px] text-white  rounded-[12px] my-5"
                >
                  Let me in on this waitlist
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#F7F9FC] mb-8 lg:h-[271px] pt-16">
        {/* <hr className=" pt-7" /> */}
        <div className=" flex border-t-[1.5px] border-[#E4E7EC] pt-10 justify-between lg:flex-row flex-col lg:mx-10 mx-5">
          <div className="text-white text-2xl font-bold">
            {" "}
            <Image
              src="/img/logo.svg"
              width={100}
              height={100}
              alt="brix-logo w-auto"
              className="w-auto lg:ml-0 ml-3"
            />
          </div>
          <div className="flex lg:flex-row flex-col lg:mx-5 ">
            <div className="flex space-x-4">
              <a href="#home" className="text-[#344054] font-[700] text-[17px]">
                Contact us
              </a>
              <a
                href="mailto:mail@daba.school"
                className="text-[#3655EE] font-[700] text-[17px]"
              >
                mail@daba.school
              </a>
            </div>
            <div className="flex space-x-4 lg:mx-5">
              <a href="#home" className="text-[#344054] font-[700] text-[17px]">
                Follow us
              </a>
              <a href="">
                <Image
                  src="/img/facebook.svg"
                  alt="daba's studio"
                  width={100}
                  height={100}
                  className="w-auto"
                />
              </a>
              <a href="">
                <Image
                  src="/img/twitter.svg"
                  alt="daba's studio"
                  width={100}
                  height={100}
                  className="w-auto"
                />
              </a>
              <a href="">
                <Image
                  src="/img/instagram.svg"
                  alt="daba's studio"
                  width={100}
                  height={100}
                  className="w-auto"
                />
              </a>
              <a href="">
                <Image
                  src="/img/linkedin.svg"
                  alt="daba's studio"
                  width={100}
                  height={100}
                  className="w-auto"
                />
              </a>
            </div>
          </div>
        </div>
        <div className=" flex  border-[#E4E7EC] pt-10 justify-between lg:flex-row flex-col lg:mx-10 mx-5">
          <div className="flex space-x-4">
            <p className="text-[#344054] font-[700] text-[17px]">
              Privacy Policy
            </p>
            <p className="text-[#344054] font-[700] text-[17px]">
              Terms of Use
            </p>
          </div>

          <div className="flex space-x-4 lg:mx-5 text-[#344054] font-[400] text-[14px]">
           © Copyright {year}, All Rights Reserved 
          </div>
        </div>
      </div>

      {/* <div className="bg-black">
        <div className=" flex flex-col  justify-end lg:h-[300px] ">
          <p className="text-[#F3F3F3] text-[14px]  flex flex-row items-center justify-center my-5">
            About us
          </p>
          <div className="flex flex-row items-center justify-center border-b-[1px] pb-5 border-[#B2B2B2] my-5">
            <Link href={" "} className="mx-3">
              <p className="">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 24.5L12.548 15.694M12.548 15.694L5 3.5L10 3.5L15.452 12.306M12.548 15.694L18 24.5L23 24.5L15.452 12.306M23 3.5L15.452 12.306"
                    stroke="#E5E5E5"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </p>
            </Link>
            <Link href={" "} className="mx-3">
              <p className="">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 2.52255C17.738 2.52255 18.1807 2.53655 19.6573 2.60388C20.5452 2.61474 21.4246 2.77776 22.2573 3.08585C22.8612 3.31874 23.4097 3.67549 23.8673 4.13314C24.325 4.59079 24.6818 5.13919 24.9147 5.74306C25.2228 6.57576 25.3858 7.45513 25.3967 8.34294C25.4633 9.81953 25.478 10.2622 25.478 14C25.478 17.7378 25.464 18.1805 25.3967 19.6571C25.3858 20.5449 25.2228 21.4242 24.9147 22.2569C24.6818 22.8608 24.325 23.4092 23.8673 23.8669C23.4097 24.3245 22.8612 24.6813 22.2573 24.9141C21.4246 25.2222 20.5452 25.3853 19.6573 25.3961C18.1813 25.4628 17.7387 25.4775 14 25.4775C10.2613 25.4775 9.81867 25.4635 8.34267 25.3961C7.45482 25.3853 6.57541 25.2222 5.74267 24.9141C5.13877 24.6813 4.59034 24.3245 4.13267 23.8669C3.675 23.4092 3.31823 22.8608 3.08533 22.2569C2.77723 21.4242 2.6142 20.5449 2.60333 19.6571C2.53667 18.1805 2.522 17.7378 2.522 14C2.522 10.2622 2.536 9.81953 2.60333 8.34294C2.6142 7.45513 2.77723 6.57576 3.08533 5.74306C3.31823 5.13919 3.675 4.59079 4.13267 4.13314C4.59034 3.67549 5.13877 3.31874 5.74267 3.08585C6.57541 2.77776 7.45482 2.61474 8.34267 2.60388C9.81933 2.53721 10.262 2.52255 14 2.52255ZM14 0C10.2 0 9.72133 0.0159992 8.228 0.083996C7.06603 0.107107 5.9164 0.327105 4.828 0.734632C3.89433 1.08639 3.04866 1.63763 2.35 2.34989C1.63707 3.04877 1.08533 3.89488 0.733333 4.8291C0.325787 5.91745 0.105779 7.06703 0.0826667 8.22894C0.016 9.72087 0 10.1995 0 13.9993C0 17.7992 0.016 18.2778 0.084 19.7711C0.107112 20.933 0.32712 22.0826 0.734667 23.1709C1.08627 24.105 1.63755 24.9511 2.35 25.6501C3.04905 26.3625 3.89519 26.9138 4.82933 27.2654C5.91773 27.6729 7.06737 27.8929 8.22933 27.916C9.72267 27.9827 10.1993 28 14.0013 28C17.8033 28 18.28 27.984 19.7733 27.916C20.9353 27.8929 22.0849 27.6729 23.1733 27.2654C24.103 26.905 24.9473 26.3546 25.6522 25.6493C26.357 24.9441 26.9069 24.0995 27.2667 23.1696C27.6742 22.0812 27.8942 20.9316 27.9173 19.7697C27.984 18.2778 28 17.7992 28 13.9993C28 10.1995 27.984 9.72087 27.916 8.22761C27.8929 7.0657 27.6729 5.91612 27.2653 4.82777C26.9137 3.89367 26.3625 3.04757 25.65 2.34855C24.951 1.63614 24.1048 1.08489 23.1707 0.733298C22.0823 0.325771 20.9326 0.105774 19.7707 0.0826628C18.2787 0.0159993 17.8 0 14 0Z"
                    fill="#E5E5E5"
                  />
                  <path
                    d="M14.0029 6.81323C12.581 6.81323 11.191 7.23486 10.0087 8.0248C8.82642 8.81473 7.90494 9.9375 7.3608 11.2511C6.81666 12.5647 6.67428 14.0102 6.95169 15.4047C7.22909 16.7993 7.91381 18.0802 8.91925 19.0856C9.9247 20.091 11.2057 20.7757 12.6003 21.0531C13.9949 21.3305 15.4404 21.1881 16.7541 20.644C18.0678 20.0999 19.1906 19.1784 19.9806 17.9962C20.7706 16.814 21.1922 15.4241 21.1922 14.0022C21.1922 12.0956 20.4348 10.267 19.0865 8.91884C17.7382 7.57064 15.9096 6.81323 14.0029 6.81323ZM14.0029 18.6687C13.0799 18.6687 12.1776 18.395 11.4102 17.8822C10.6428 17.3695 10.0446 16.6407 9.69144 15.788C9.33823 14.9353 9.24582 13.997 9.42588 13.0918C9.60594 12.1866 10.0504 11.3552 10.703 10.7025C11.3557 10.0499 12.1872 9.6055 13.0925 9.42544C13.9977 9.24539 14.936 9.3378 15.7887 9.69099C16.6415 10.0442 17.3703 10.6423 17.8831 11.4097C18.3958 12.1771 18.6695 13.0793 18.6695 14.0022C18.6695 15.2398 18.1779 16.4268 17.3027 17.3019C16.4275 18.177 15.2406 18.6687 14.0029 18.6687Z"
                    fill="#E5E5E5"
                  />
                  <path
                    d="M21.4748 8.2075C22.4026 8.2075 23.1548 7.45537 23.1548 6.52758C23.1548 5.59978 22.4026 4.84766 21.4748 4.84766C20.547 4.84766 19.7948 5.59978 19.7948 6.52758C19.7948 7.45537 20.547 8.2075 21.4748 8.2075Z"
                    fill="#E5E5E5"
                  />
                </svg>
              </p>
            </Link>

            <Link href={" "} className="mx-3">
              <p className="">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_6767_1772)">
                    <path
                      d="M26.4444 0L1.55556 0C0.696446 0 0 0.696446 0 1.55556L0 26.4444C0 27.3036 0.696446 28 1.55556 28H26.4444C27.3036 28 28 27.3036 28 26.4444V1.55556C28 0.696446 27.3036 0 26.4444 0Z"
                      fill="#117EB8"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.10961 10.8298H8.85189V22.8705H5.10961V10.8298ZM6.98133 4.84438C8.17794 4.84438 9.15017 5.81661 9.15017 7.01322C9.15017 8.21099 8.17794 9.18361 6.98133 9.18361C6.69296 9.18907 6.40639 9.13698 6.13838 9.0304C5.87037 8.92382 5.62629 8.76488 5.42042 8.56287C5.21455 8.36086 5.05102 8.11984 4.93939 7.8539C4.82775 7.58795 4.77025 7.30242 4.77025 7.01399C4.77025 6.72557 4.82775 6.44004 4.93939 6.17409C5.05102 5.90815 5.21455 5.66712 5.42042 5.46512C5.62629 5.26311 5.87037 5.10417 6.13838 4.99759C6.40639 4.89101 6.69296 4.83892 6.98133 4.84438ZM11.1992 10.8294H14.7887V12.4748H14.8384C15.3382 11.5282 16.5589 10.5303 18.3793 10.5303C22.1686 10.5303 22.8686 13.0243 22.8686 16.2664V22.8705H19.1287V17.015C19.1287 15.6189 19.103 13.8227 17.1842 13.8227C15.2371 13.8227 14.938 15.3436 14.938 16.9143V22.8705H11.1988V10.8298L11.1992 10.8294Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_6767_1772">
                      <rect width="28" height="28" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </p>
            </Link>
          </div>

          <div className="text-[#B2B2B2] text-[14px] py-3 text-center">
            {" "}
            <p>© Copyright {year}, All Rights Reserved by Brix</p>
          </div>
        </div>
      </div> */}
    </div>
  );
}
