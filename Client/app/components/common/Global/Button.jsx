const Button = ({ text, variant, children, ...props }) => (
    <button className={variant === "error" ? "bg-red-400 text-white w-full h-[50px] gap-4 flex items-center justify-center text-base font-medium transition-color disabled:opacity-50 disabled:pointer-events-none px-3 mt-2 rounded-[5px]" : null}  {...props}>
        {text}
        {children}
    </button>
)

export default Button;