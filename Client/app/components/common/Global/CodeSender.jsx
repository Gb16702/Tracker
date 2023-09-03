"use client";

import { useState } from "react";
import { Close } from "./Icons/HeroIcons/Close";
import Input from "./Input";
import Button from "./Button";
import { useSession } from "next-auth/react";
import ModalBox from "./ModalBox";
import Toast from "./Toast";
import { toast } from "react-hot-toast";

const CodeSender = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [token, setToken] = useState(null)
  const [inputValue, setInputValue] = useState("")
  const [isCopied, setIsCopied] = useState(false)

  const { data: session } = useSession();

  const email = session?.user?.email;

  const handleClick = async () => {
    setIsOpen(true);

    const data = await fetch(`http://localhost:8000/api/getCode?email=${email}`)
    if(data.ok) {
      const dataToJson = await data.json()
      setResponse(dataToJson)
    }
  };


  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    const input = e.target[0].value
    if(input === response.value) {
      const response = await fetch("http://localhost:8000/api/verifyCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email, input})
      })
      if(response.ok) {
        const data = await response.json()
        setToken(data.token.token)
        setLoading(false)
      }
    }else {
      setLoading(false)
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 1000)
    }
  }

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(token)
      setIsCopied(true)
      setIsOpen(false)
      toast.custom(<Toast message="Jeton copié !" variant = "success" type="Succès" />)
    }
    catch(e) {
      toast.custom(<Toast message="Une erreur est survenue" variant = "error" type="Erreur" />)
    }
  }

  const isInputEmpty = inputValue.trim() === ""

  return (
    <>
      {isOpen && (
        <ModalBox>
            <div className="justify-between items-center flex">
              <h3 className="text-zinc-950 font-medium text-[20px] tracking-tight">
              {token ? "Code vérifié !" : "Code envoyé !"}
              </h3>
              <Close className="text-xl cursor-pointer" onClick={() => setIsOpen(false)} />
            </div>
            <h4 className="mt-1 text-sm text-zinc-500/[.8]">
            {token ? "Le code a été vérifié avec succès." : "Un code a été envoyé à ton adresse mail"}<br />
            </h4>

            {!token && (
              <form onSubmit={handleSubmit} className="mt-4">
              <Input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-300 placeholder-zinc-400/[.8] transition duration-200" placeholder="Entrer le code" value={inputValue} onChange={e => setInputValue(e.target.value)}
              />
              <Button className={`${error ? "bg-red-400" : isInputEmpty ? "bg-emerald-400/[.3] text-emerald-400" : "bg-emerald-500 text-white"}  w-full h-[50px] gap-4 flex items-center justify-center text-base font-medium transition-color disabled:opacity-50 disabled:pointer-events-none px-3 mt-2 rounded-[5px] transition-all dureation-300`}
              disabled={isInputEmpty || loading}>
              {loading ? "Vérification..." : "Continuer"}
              </Button>
            </form>
              )}
              {token && (
                <>
                <Input className="mt-3 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-300 placeholder-zinc-400/[.8] transition duration-200" value={token}
                />
                <button className="mt-2 bg-emerald-400 border border-emerald-400 rounded-md w-full h-[46px] text-white" onClick={handleCopy}>{isCopied ? "Copié" : "Copier"}</button>
                </>
              )}
        </ModalBox>
      )}

      <div className="mt-10 border-t border-zinc-200">
        <h3 className="mt-4 text-lg text-zinc-300 font-semibold">
          Jeton d'administration
        </h3>
        <h4 className="mt-1 text-md text-zinc-500">
          Obtenir un jeton te permettra d'accéder à l'interface d'administration
          de l'application
        </h4>
      <div className="mt-6 w-[40%]">
        <h4
          className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 leading-tight px-2 hover:cursor-pointer"
          onClick={handleClick}
          >
          Générer un jeton
        </h4>
      </div>
      </div>
    </>
  );
};

export default CodeSender;
