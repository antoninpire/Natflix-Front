import { Helmet } from "react-helmet";

export function NotFound() {
  return (
    <div className="notFound-container">
      <Helmet>
        <title>Page 404</title>
      </Helmet>
      <div className="notFound-titles">
        <h1>404</h1>
        <h4>Page non trouvée</h4>
      </div>
    </div>
  );
}
