export const SelectItemsPerPage = ({
  itemsPerPage,
  setItemsPerPage,
  options = [10, 25, 50, 100],
}) => {
  const handleChange = (event) => {
    event.preventDefault();
    setItemsPerPage(parseInt(event.target.value));
  };

  return (
    <label>
      {'Show '}
      <select onChange={handleChange} value={itemsPerPage}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {' Entries'}
    </label>
  );
};
