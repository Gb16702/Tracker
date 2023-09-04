import Contact from "../../components/Pages/contact/Contact"

const contact = async () => {

    const response = await fetch(`${process.env.DEV_API_URL}/sujets`, {
        cache: "no-store",
    })

    const sujets = await response.json()

    return <Contact sujets={sujets} />
}

export default contact