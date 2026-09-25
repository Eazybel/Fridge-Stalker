import HeaderMeal from "@/app/components/Header/HeaderMeal"
import React from "react";
export default function RootLayout({ children }:{children:React.ReactNode}) {
  return (

       <>
        <HeaderMeal/>
        {children}
       </>
       
  );
}