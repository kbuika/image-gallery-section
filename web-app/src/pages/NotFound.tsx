import { Link } from "react-router-dom";

export default function NotFound (){
    return <div className="not-found-div"><h2>Page Not Found</h2><Link to="/">go back home</Link></div>
}