/*
import React from "react";
import classnames from "classnames";
import "../styles/Pagination.scss";

const range = (from, to) => {
  let length = to - from + 1;
  return Array.from({length: length}, (_, idx) => idx + from);
}

const DOTS = "...";

class Pagination extends React.Component {
  
  handleLeft = () => {
    this.props.onPageChange(this.props.currentPage - 1);
  }

  handleRight = () => {
    this.props.onPageChange(this.props.currentPage + 1);
  }

  fetchPageNumbers = () => {
    const totalPages = Math.ceil(this.props.total / this.props.pageSize);
    const {currentPage} = this.props;
    const siblings = 1;

    const totalNumbers = siblings + 5;

    if (totalNumbers >= totalPages) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblings, 1);
    const rightSiblingIndex = Math.min(currentPage + siblings, totalPages);

    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    // Currentpage + firstpage + lastpage + 2 * numSiblings
    const itemCount = 3 + 2 * siblings;

    if (!showLeftDots && showRightDots) {
      let leftRange = range(1, itemCount);
      return [...leftRange, DOTS, totalPages];
    }

    if (showLeftDots && !showRightDots) {
      let rightRange = range(totalPages - itemCount + 1, totalPages);
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (showLeftDots && showRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }

  render() {
    const paginationRange = this.fetchPageNumbers();
    const lastPage = paginationRange[paginationRange.length - 1];
    const {currentPage} = this.props;
    if (paginationRange.length < 2) {
      return null;
    }
    return (
      <div>
        <ul className={classnames("pagination-container")}>
          <li
            className={classnames("pagination-item", {
              disabled: currentPage == 1
            })}
            onClick={this.handleLeft}
          >
            <div className="arrow left"></div>
          </li>
          {// render page pills 
            paginationRange.map(pageNum => {
              if (pageNum == DOTS) {
                return <li className="pagination-item dots">&#8230;</li>;
              }

              return (
                <li
                  className={classnames("pagination-item", {
                    selected: pageNum == currentPage
                  })}
                  onClick={() => this.props.onPageChange(pageNum)}
                >
                  {pageNum}
                </li>
              );
            })
          }
          <li
            className={classnames("pagination-item", {
              disabled: currentPage == lastPage
            })}
            onClick={this.handleRight}
          >
            <div className="arrow right"></div>
          </li>
        </ul>
      </div>
    );
  }
}

export default Pagination;
*/
