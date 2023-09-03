import Help from "../../Global/Icons/HeroIcons/Help";
import Star from "../../Global/Icons/HeroIcons/Star";

const FormToggler = ({ activeForm, toggleForm }) => {
  return (
    <>
      {activeForm === "assistance" ? (
        <button
          onClick={() => toggleForm("feedback")}
          className="w-[30px] h-[30px] border-zinc-800 border flex items-center justify-center bg-vprimary rounded-md"
        >
          <Star className="w-6 h-6 fill-white stroke-none" />
        </button>
      ) : (
        <button
          onClick={() => toggleForm("assistance")}
          className="w-[30px] h-[30px] border-zinc-800 border flex items-center justify-center bg-vprimary rounded-md"
        >
          <Help className="w-6 h-6 stroke-white" />
        </button>
      )}
    </>
  );
};

export default FormToggler;
