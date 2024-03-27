import UserItem from "./UserItem"

const UsersList = ({items}) => {
  return (
    <div>
        {items.length === 0 ? (
            <div className="flex justify-center items-center text-center">
                No Users Found.
            </div>
        ) : (
            <div>
                <ul>
                    {items.map(user => (
                        <UserItem 
                            key={user.id} 
                            id={user.id}
                            image={user.image}
                            name={user.name}
                            placeCount={user.places}
                        />
                    ))}
                    </ul>
            </div>
        )}
    </div>
    
  )
}

export default UsersList