import { useState, useEffect } from "react"
import { assignOwner, fetchUsers } from "../../API";
import { useNavigate, useParams } from "react-router-dom";



export default function AssignOwner() {
  const { id } = useParams();
  const [users, setUsers] =useState([]);
  const [loading, setLoading] = useState()
  const [selectedUserId, setSelectedUserId] = useState('');
  const [error, setError] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      try{
        const token = localStorage.getItem('token');
        const data = await fetchUsers(token);
        setUsers(data);
      }catch(err) {
        setError("Failed to load users");
        console.error(err);
      }finally{
        setLoading(false);
      }
    };
    loadUsers();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const token = localStorage.getItem('token');
        await assignOwner(id, selectedUserId, token);
        alert('Owner assigned successfully!');
        nav('/dashboard/admin/restaurants');
    }catch(err){
      setError('Failed to assign new owner.');
      console.error(err);
    }
  };

  if(loading) return <p>Loading users...</p>;


  return(
    <form id="assign-owner-form" onSubmit={handleSubmit}>
      <h3>Assign Owner to Restaurant</h3>
      <label htmlFor="user-select" >Select User:</label>
      <select
        id="user-select"
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
        required
      >
        <option value="" disabled>
          --Select User--
        </option>
          {users.map((user) => (
            <option key={user.id} value={user.id} >
              {user.username}
          </option>
        ))}
      </select>
      {error && <p className="error-message" >{error}</p>}
      <button type="submit" >Assign Owner</button>
    </form>
  );
}