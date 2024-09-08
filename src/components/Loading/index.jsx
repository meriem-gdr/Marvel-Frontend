import "./styles.css";

const Loading = ({ isLoading }) => {
  if (!isLoading) return null;

  return <div className="loading-text">Chargement en cours...</div>;
};

export default Loading;
