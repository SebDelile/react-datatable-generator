import { formatDisplayedData } from '../../utils/processing/formatDisplayedData/formatDisplayedData.js';
import './TableBody.css';

export const TableBody = ({ headings, data }) => {
  if (!headings) return null;
  return (
    <tbody>
      {data && data.length ? (
        data.map((user) => (
          <tr key={user.firstName + user.lastName + user.dateOfBirth}>
            {headings.map((item) => (
              <td key={item.key}>
                {user[item.key]
                  ? formatDisplayedData(user[item.key], item.format)
                  : ''}
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
