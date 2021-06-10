import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './SearchResultStyle.scss';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Col } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import StarRatings from 'react-star-ratings';

const SearchResult = ({ loading, result, pageSize, onClickPage, selectedPage }) => {
  const [page, setPage] = useState(selectedPage - 1);

  useEffect(() => {
    console.log(selectedPage);
    setPage(selectedPage - 1);
  }, [selectedPage]);



  return (
    <div className='result'>
      {loading ? <div>Loading...</div> :
        <div className='result__container'>
          {result && result.length > 0 ?
            result.map((result, index) => (
              <div className='card-body'>
                <Link className='card-link' to={`/searchProduct/food/${result.foodId}`}>
                  <img className='foodImg' src={result.foodImageAddress} />
                  <h5 className='card-title'>{result.foodName}</h5>
                  <p className='card-text'>{(result.manufacturerName).split('_')[0]}</p>
                  <StarRatings
                  className="starScore"
                    rating={parseFloat(result.reviewRate)}
                    starDimension='20px'
                    starSpacing='0'
                    starRatedColor={'#facd89'}
                  />
                </Link>
              </div>

            )) : <div>No result</div>
          }
        </div>
      }

      <Col md={'12'} className={'pageDiv'}>
        {pageSize > 1 ?
          <ReactPaginate pageCount={pageSize} pageRangeDisplayed={10}
                         marginPagesDisplayed={1}
                         previousLabel={'이전'} nextLabel={'다음'}
                         containerClassName={'foodPaginate'}
                         pageClassName={'foodPage'}
                         activeClassName={'foodSelectedPage'}
                         onPageChange={onClickPage}
                         forcePage={selectedPage - 1}
          /> :
          null}

      </Col>
    </div>
  );
};
export default SearchResult;