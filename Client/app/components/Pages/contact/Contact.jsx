"use client";

import { useState } from "react";
import FormToggler from "../../../components/common/Partials/Contact/FormToggler";
import ContactForm from "../../common/Global/Forms/ContactForm";
import TestimonialsForm from "../../common/Global/Forms/TestimonialsForm";

const Contact = ({ sujets }) => {
  const [activeForm, setActiveForm] = useState("assistance");

  const toggleForm = (formType) => setActiveForm(formType);

  return (
    <section className="h-[100vh] flex items-center justify-center flex-col">
      <div className="w-[1000px] max-sm:w-full flex items-center flex-col gap-8">
        <div className="w-[55%] max-sm:w-full bg-adminBgAlt border border-zinc-800 max-sm:border-none py-4 rounded px-12 max-sm:px-2 text-sm relative">
          {activeForm === "assistance" ? (
            <>
              <div className="flex items-center justify-between flex-row pb-[20px] max-sm:pb-[10px] mt-5 border-b border-zinc-800 max-sm:border-none">
                <h1 className="text-left text-zinc-200 text-[22px] font-medium tracking-tight">
                  Contact
                </h1>
                <FormToggler activeForm={activeForm} toggleForm={toggleForm} />
              </div>
              <ContactForm sujets={sujets} />
            </>
          ) : (
            <>
              <div className="flex items-center justify-between flex-row pb-[20px] mt-5 border-b max-sm:border-none max-sm:pb-[10px]  border-zinc-800">
                <h1 className="text-left text-zinc-200 text-[22px] font-medium tracking-tight">
                  Retours
                </h1>
                <FormToggler activeForm={activeForm} toggleForm={toggleForm} />
              </div>
              <TestimonialsForm />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
