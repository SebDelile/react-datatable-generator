export const SelectPage = ({ currentPage, numberOfPages, setCurrentPage }) => {
  if (!currentPage || !numberOfPages) return null;

  const buttonList = ['Previous'];
  if (numberOfPages <= 7)
    buttonList.push(...[...Array(numberOfPages)].map((_, i) => i + 1));
  else {
    //no more than 7 total page buttons, cut with '...' at one or two position depending on currentPage
    if (currentPage <= 4) buttonList.push(1, 2, 3, 4, 5, '...', numberOfPages);
    else if (currentPage >= numberOfPages - 3)
      buttonList.push(
        1,
        '...',
        ...[...Array(5)].map((_, i) => numberOfPages - 4 + i)
      );
    else
      buttonList.push(
        1,
        '...',
        ...[...Array(3)].map((_, i) => currentPage - 1 + i),
        '...',
        numberOfPages
      );
  }
  buttonList.push('Next');

  const handleClick = (event) => {
    if (event.target.value === 'Previous') setCurrentPage(currentPage - 1);
    else if (event.target.value === 'Next') setCurrentPage(currentPage + 1);
    else setCurrentPage(parseInt(event.target.value));
  };

  const isDisabled = (page) =>
    page === currentPage ||
    page === '...' ||
    (page === 'Previous' && currentPage === 1) ||
    (page === 'Next' && currentPage === numberOfPages);

  return (
    <div>
      {buttonList.map((page, i) => (
        <button
          key={i}
          type="button"
          disabled={isDisabled(page)}
          onClick={handleClick}
          value={page}
        >
          {page}
        </button>
      ))}
    </div>
  );
};
