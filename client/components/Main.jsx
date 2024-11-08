import { useRouter } from 'next/router';

const Main = () => {
  const router = useRouter();

  const handleExploreClick = () => {
    router.push('/receipts');
  };

  return (
    <div className="m-4 grid grid-cols-1 gap-4">
      <div className="c-center">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-800">
          Welcome to Our Website!
        </h1>
        <p className="text-lg text-gray-600">
          Explore the greatest recipes, rank them, and learn more about exotic meals.
        </p>
        <button
          className="explore"
          onClick={handleExploreClick}
        >
          Start the culinary adventure
        </button>
      </div>
    </div>
  );
};

export default Main;
