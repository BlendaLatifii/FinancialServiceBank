  import RegisterTable from "./RegisterTable";
  import EditUser from "./EditUser";
  function UserDashboard(){
    return (
        <>
          <div>
            <RegisterTable/>
          </div>
          <div>
            <EditUser/>
          </div>
        </>
    );
  }
  export default UserDashboard;