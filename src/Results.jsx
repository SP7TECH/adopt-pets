import Pet from "./Pet";

const Results = ({ pets }) => {
  return (
    <div className="search">
      {!pets.length ? (
        <h1>No Pets Found</h1>
      ) : (
        pets.map((el) => (
          <Pet
            animal={el.animal}
            id={el.id}
            breed={el.breed}
            images={el.images}
            name={el.name}
            location={`${el.city}, ${el.state}}`}
            key={el.id}
          />
        ))
      )}
    </div>
  );
};

export default Results;
