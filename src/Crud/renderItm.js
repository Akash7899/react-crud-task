export const randerItem = (item, index, del, edit, view) => {
  return (
    <tr key={index}>
      <td>{item.name ? item.name : "--"}</td>
      <td>
        {item.department
          ? item.department === "frontEnd"
            ? "Front End"
            : "Back End"
          : "--"}
      </td>
      <td>{item.salary ? item.salary : "--"}</td>
      <td className="d-flex justify-content-around">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => edit({ item, index })}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => view({ item, index })}
        >
          view
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => del(index)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};
