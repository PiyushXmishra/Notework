import { useRouteError } from "react-router-dom";

interface CustomError{
  statusText?:string;
  message?: string
}

export default function Errorpage() {
  const error = useRouteError() as CustomError;
  console.error(error);
// console.log(error.message)
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.statusText || error?.message || "Unknown error"} </i>
      
      </p>
    </div>
  );
}
