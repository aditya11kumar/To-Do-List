import { useEffect, useState, useMemo } from "react";
const URL = "https://dummyjson.com/todos";

export default function Table() {
  const [data, setData] = useState([]);
  const [searched, setSearched] = useState("");
  //   const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    const fetchData = async function () {
      const fetchedData = await fetch(URL);
      const savedData = await fetchedData.json();
      setData(savedData.todos);
    };
    fetchData();
  }, []);
  //   useEffect(() => {}, [data, filteredData]);
  const filteredData = useMemo(() => {
    return data.filter((it) =>
      it.todo.toLowerCase().includes(searched.toLowerCase())
    );
  }, [data, searched]);
  const handleChange = function (e) {
    setSearched(() => e.target.value);
  };

  return (
    <div className="Table">
      <p>This is a table</p>
      {searched}
      <input type="text" value={searched} onChange={handleChange} />
      {filteredData.map((it) => (
        <tr>
          <td>{it.id}</td>
          <td>{it.todo}</td>
          <td>{it.completed ? "True" : "False"}</td>
        </tr>
      ))}
    </div>
  );
}
