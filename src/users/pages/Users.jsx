import UsersList from "../components/UsersList"

const Users = () => {
    const USERS = [
        // {
        //     id : "u1" , 
        //     name : "john" , 
        //     image : "https://housing.com/news/wp-content/uploads/2022/11/Famous-tourist-places-in-India-state-compressed.jpg" , 
        //     places : 3 ,
        // }
    ]
  return (
    <div>
        <UsersList 
            items={USERS}
        />
    </div>
  )
}

export default Users