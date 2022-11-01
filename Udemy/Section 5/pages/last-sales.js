import { useEffect, useState } from "react";
import useSWR from "swr";

const LastSalesPage = (props) => {
  const [sales, setSales] = useState(props.sales);
  //const [isLoading, setIsLoading] = useState(false);

  const fetcher = (url) => fetch(url).then((response) => response.json()); //useSWR has to have a second paramter, dummy function for that

  const { data, error } = useSWR(
    "https://onlyswim-434eb-default-rtdb.europe-west1.firebasedatabase.app/practices.json",
    fetcher
  );

  useEffect(() => {
    if (data) {
      const transformedSales = [];
      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].author,
          volume: data[key].title,
        });
      }
      setSales(transformedSales);
      console.log(data, error);
    }
  }, [data]);

  /* useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://onlyswim-434eb-default-rtdb.europe-west1.firebasedatabase.app/practices.json" //he created a new database, I am just using mine from before
    )
      .then((response) => response.json())
      .then((data) => {
        const transformedSales = [];

        for (const key in data) {
          transformedSales.push({
            id: key,
            username: data[key].author,
            volume: data[key].title,
          });
        }

        setSales(transformedSales);
        setIsLoading(false);
      });
  }, []); */

  if (error) {
    return <p>Failed to load</p>;
  }

  if (!sales && !data) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
};

export async function getStaticProps() {
  const response = await fetch(
    "https://onlyswim-434eb-default-rtdb.europe-west1.firebasedatabase.app/practices.json" //he created a new database, I am just using mine from before
  );
  const data = await response.json();

  const transformedSales = [];

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].author,
      volume: data[key].title,
    });
  }

  return { props: { sales: transformedSales } };
}

export default LastSalesPage;
