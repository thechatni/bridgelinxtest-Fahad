import { Link } from "react-router-dom"

const NotFound = () => {
    return ( 
        <div id="not-found">
            <h2>Page not found</h2>
            <p>Sorry, that page cannot be found.</p>
            <Link to='/'>
                Back to the homepage...
            </Link>
        </div>
     );
}
 
export default NotFound
