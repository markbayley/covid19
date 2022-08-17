import React from 'react';
// import './styles.css';
import { getElementAtEvent, HorizontalBar } from "react-chartjs-2";

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const ProductTable = (props) => {
  const { items, requestSort, sortConfig } = useSortableData(props.products);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  return (
    <>
    <table>
      {/* <caption>Products</caption> */}
      <thead>
        <tr>
          <th>
            <button
              type="button"
              onClick={() => requestSort('country')}
              className={getClassNamesFor('country')}
            >
              Country
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('casesPerOneMillion')}
              className={getClassNamesFor('casesPerOneMillion')}
            >
              Cases/m
            </button>
          </th>
          {/* <th>
            <button
              type="button"
              onClick={() => requestSort('stock')}
              className={getClassNamesFor('stock')}
            >
              Qty
            </button>
          </th> */}
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.country}</td>
            <td>{item.casesPerOneMillion}</td>
            {/* <td>{item.stock}</td> */}
          </tr>
        ))}
        
      </tbody>
    </table>
     <HorizontalBar
     // options={options}
     // onClick={onClick}
     // ref={chartRef}
     data={items}
     height={440}
     options={{
       tooltips: {
         yPadding: 10,
         xPadding: 10,
         xAlign: "right",
         cornerRadius: 2,
         backgroundColor: "#212529",

         borderColor: "turquoise",
         borderWidth: 1,
         displayColors: true,
         bodyFontSize: 12,

         labels: {
           usePointStyle: true,
         },
       },
       responsive: true,
       maintainAspectRatio: true,
       hover: {
         mode: "index",
         intersect: false,
       },
       legend: {
         display: false,
         position: "bottom",
         labels: {
           usePointStyle: true,
           fontSize: 12,
           fontColor: "#fff",
         },
       },
       layout: {
         padding: {
           left: 0,
           right: 10,
           top: 0,
           bottom: 0,
         },
       },
       scales: {
         xAxes: [
           {
             display: false,
             type: "logarithmic",
           },
         ],
       },
     }}
   />
   </>
  );
};

export default function App({continentCountries}) {
  return (
    <div className="App">
      <ProductTable
        products={continentCountries}
      />
    </div>
  );
}
