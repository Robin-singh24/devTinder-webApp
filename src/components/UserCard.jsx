const UserCard = ({ user }) => {
    const { firstName, lastName, photoUrl, age, gender, about } = user ?? {};
    return (
        <div className="card flex bg-base-200 w-96 shadow-sm h-[550px]">
            <figure className="flex overflow-hidden">
                <img
                    src={photoUrl || "/placeholder.png"}
                    alt="photo"
                    className="w-full h-full object-cover"/>
            </figure>
            <div className="card-body flex flex-col justify-between">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
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