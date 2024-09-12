import LineGraph from "../components/LineGraph";
import MapComponent from "../components/Map";

const ChartsAndMapsPage = () => {
  return (
    <div className="flex flex-col items-center justify-around pt-6 gap-y-2">
      <LineGraph />
      <MapComponent />
    </div>
  );
};

export default ChartsAndMapsPage;
