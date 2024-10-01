import { useEffect, useState } from 'react';


function KanjiInfo() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8080/random');
      const responseJson = await response.json();
      console.log(responseJson)
      setData(responseJson)
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>
      <strong>{data.kanji}</strong>
      </h2>
    </div>
  );
}

export default KanjiInfo;
