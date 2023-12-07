import {Link,useNavigate} from "react-router-dom"

const Navbar = () => {

let navigate = useNavigate()

const handleDelete=()=>{
localStorage.removeItem("token")
navigate("/")
}

    return (
        <>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-end mb-2 mb-lg-0">
        <li class="nav-item">
          <Link class="nav-link" to="/myEvent">myEvent</Link>
        </li>
      
        <li class="nav-item">
          <li class="nav-link" onClick={handleDelete}>logOut</li>
        </li>
      </ul>
      
    </div>
  </div>
</nav>  

        </>
    )
}

export default Navbar