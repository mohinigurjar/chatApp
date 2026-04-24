const UserRow = ({user, onClick}) => {
    return(
        <>
        <div onClick={onClick}>{user.username}</div>
        <hr></hr>
        </>
        
        
    )
}

export default UserRow;