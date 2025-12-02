const UserCard = ({ user }) => {
    const { firstName, lastName, photoUrl, age, gender, about } = user ?? {};
    return (
        <div className="card bg-base-200 w-96 shadow-sm">
            <figure className="h-60 overflow-hidden">
                <img
                    src={photoUrl || "/placeholder.png"}
                    alt="photo"
                    className="w-full h-full object-cover"/>
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {age && gender && <p>{`${age}, ${gender}`}</p>}
                <p>{about}</p>
                <div className="card-actions justify-center my-4">
                    <button className="btn btn-primary">Ignore</button>                    
                    <button className="btn btn-secondary">Interested</button>                    
                </div>
            </div>
        </div>
    )
}

export default UserCard