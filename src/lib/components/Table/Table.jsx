import './Table.css';

export const Table = ({ headings, data }) => {
  if (!headings) return null;
  return (
    <table>
      <thead>
        <tr>
          {headings.map((item) => (
            <th key={item.key}>{item.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data
          ? data.map((user) => (
              <tr key={user.firstName + user.lastName + user.dateOfBirth}>
                {headings.map((item) => (
                  <td key={item.key}>{user[item.key] ?? ''}</td>
                ))}
              </tr>
            ))
          : null}
      </tbody>
    </table>
  );
};
