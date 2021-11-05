import './TableBody.css';

export const TableBody = ({ headings, data }) => {
  if (!headings) return null;

  const formatInput = (input, type) => {
    switch (type) {
      case 'datestring':
        return new Date(input).toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
      default:
        return input;
    }
  };

  return (
    <tbody>
      {data && data.length ? (
        data.map((user) => (
          <tr key={user.firstName + user.lastName + user.dateOfBirth}>
            {headings.map((item) => (
              <td key={item.key}>
                {user[item.key] ? formatInput(user[item.key], item.type) : ''}
              </td>
            ))}
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={headings.length}>No matching records found</td>
        </tr>
      )}
    </tbody>
  );
};
