"use client";

const DashboardCards = ({ title, body }) => {
  return (
    <section className="w-[100%] h-[150px] bg-adminBgAlt rounded-md p-3 border border-zinc-800">
      <h2 className="text-zinc-100 font-medium text-[20px]">{title}</h2>
      <h3 className="text-zinc-400 text-[17px] mt-3">{body}</h3>
    </section>
  );
};

export default DashboardCards;
