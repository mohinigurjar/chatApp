const chatWindow = () => {
    const [userSelected, setUserSelected] = useState(Boolean);
    return(
        <div>
            {userSelected? <p>send message to selected user</p> : <p>select a user to send message</p>}
        </div>
    )
}