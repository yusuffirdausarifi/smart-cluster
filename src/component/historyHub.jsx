import { useState } from "react";

export const HistoryHub = ({ data, itemsPerPage }) => {
    const [currentPage, setCurrentPage] = useState(1);
  
    const getValue = (x) => {
        let result;

        x === "Life"? result = x : result = x.split('/')[1];

        if(result === "Off"){
            return 0;
        }

        else if(result === "On" || result === "Life"){
            return 1;
        }
    };
  
    const indexOfLastItem = currentPage * 5;
    const indexOfFirstItem = indexOfLastItem - 5;
    const currentItems = data
      .slice()
      .sort((a, b) => new Date(b[0]) - new Date(a[0]))
      .slice(indexOfFirstItem, indexOfLastItem);
  
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / 5); i++) {
      pageNumbers.push(i);
    }
  
    const handleNextPage = () => {
      if (currentPage < pageNumbers.length) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    const handlePreviousPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    return (
      <div className="tableHistory">
        <table>
            <thead>
                <tr>
                    <th className="timestamp">Timestamp</th>
                    <th className="devName">Hub Name</th>
                    <th className="msg">Message</th>
                </tr>
            </thead>

            <tbody>
                {currentItems.length === 0 ? (
                    <tr>
                    <td colSpan={3}>
                        <h1 className="kosong">Kosong</h1>
                    </td>
                    </tr>
                ) : (
                    currentItems.map((row, index) => (
                    <tr key={index}>
                        <td>
                        <h3>{row[0]}</h3>
                        </td>
                        <td>
                        <h3>{row[1]}</h3>
                        </td>
                        <td>
                        <h3
                            className={
                            getValue(row[2]) === 1 ? 'onCommand' : 'offCommand'
                            }
                        >
                            {row[2]}
                        </h3>
                        </td>
                    </tr>
                    ))
                )}
            </tbody>
        </table>
        <div className="pagination">
          <button 
            className={currentPage === 1? "prevDisabled" : "prevButton"}
            onClick={handlePreviousPage} 
            disabled={currentPage === 1}>
            Prev
          </button>

          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={currentPage === number ? 'activeNumber' : 'inactiveNumber'}
            >
              {number}
            </button>
          ))}

          <button
            className={currentPage === pageNumbers.length? "nextDisabled" : "nextButton"}
            onClick={handleNextPage}
            disabled={currentPage === pageNumbers.length}
          >
            Next
          </button>
        </div>
      </div>
    );
  };
  
  