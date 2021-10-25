export const Filter = ({ setFilterKeyword }) => {
  const handleInputChange = (event) => {
    setFilterKeyword(event.target.value);
  };
  return (
    <div>
      <label>Search :</label>
      <input type="text" onChange={handleInputChange} />
    </div>
  );
};
