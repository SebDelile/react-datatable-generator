import './TableHeading.css';

export const TableHeading = ({ headings }) => {
  if (!headings) return null;

  return (
    <thead>
      <tr>
        {headings.map((item) => (
          <th key={item.key}>{item.label}</th>
        ))}
      </tr>
    </thead>
  );
};
