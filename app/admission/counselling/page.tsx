import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="min-h-screen mx-auto flex justify-center items-center text-muted-foreground">
         Page is under development
      </div>
      <Footer />
    </div>
  );
};

export default page;
