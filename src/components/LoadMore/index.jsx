import "./styles.css";

const LoadMore = ({ hasNextPage, isLoading, onClick }) => {
  if (!hasNextPage) return null;

  return (
    <div className="load-more">
      <button
        className="button-secondary"
        onClick={onClick}
        disabled={isLoading}
      >
        Load More
      </button>
    </div>
  );
};

export default LoadMore;
