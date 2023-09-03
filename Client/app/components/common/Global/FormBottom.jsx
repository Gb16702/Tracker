import Link from "next/link";

const FormBottom = () => {
  return (
    <div className="absolute bottom-[30px] flex flex-row gap-3">
      <Link href="/" className="text-white">
        <h4>Notre politique</h4>
      </Link>
      <span className="text-[#c2c8d0]">|</span>
      <Link href="/" className="text-white">
        <h4>Nos conditions</h4>
      </Link>
    </div>
  );
};

export default FormBottom;
