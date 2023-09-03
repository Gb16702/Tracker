import Contact from "../../components/Pages/contact/Contact"

const contact = async () => {

    const response = await fetch("http://localhost:8000/api/sujets", {
        cache: "no-store",
    })

    const sujets = await response.json()

    return <Contact sujets={sujets} />
}

export default contact