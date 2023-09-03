import Title from "../../common/Partials/Title";
import "../../../globals.css";

const Hero = () => {
  return (
    <>
      <section
        className={`flex items-center justify-center h-[100vh] relative overflow-hidden gradient`}
      >
        <div className={`flex items-center justify-center flex-col`}>
          <Title />
        </div>
      </section>
    </>
  );
};

export default Hero;
