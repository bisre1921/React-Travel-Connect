const UserItem = ({id , name , image , placeCount}) => {
  return (
    <div>
        <li>
            <div>
                <div>
                    <img src={image} alt={name} />
                </div>
                <div>
                    <h2>
                        {name}
                    </h2>
                    <h3>
                        {`${placeCount} ${placeCount === 1 ? "place" : "places"}`}
                    </h3>
                </div>
            </div>
        </li>
    </div>
  )
}

export default UserItem