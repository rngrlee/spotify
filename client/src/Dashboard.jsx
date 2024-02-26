import useAuth from "./useAuth"

const Dashboard = ({ code }) => {
    const accessToken = useAuth(code)

    return (
        <>
            {code}
        </>
    )
}

export default Dashboard