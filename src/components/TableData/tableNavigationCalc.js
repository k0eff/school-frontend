class tableNavigation {
  _initialData;
  _data;
  _linesPerPage = 50;
  _totalLength;
  _currPage = 1;
  _pagesBefore = 3;
  _pagesAfter = 3;
  _minRecordShown;
  _maxRecordShown;
  _theoreticalMinOfCurrentPage;
  _theoreticalMaxOfCurrentPage;
  _minPageShown = -1;
  _maxPageShown = -1;
  _prevPage;
  _nextPage;

  constructor(
    initialData,
    linesPerPage,
    currPage = 1,
    pagesBefore = 3,
    pagesAfter = 3
  ) {
    this._initialData = initialData;
    this._linesPerPage = linesPerPage;
    this._currPage = currPage;
    this._pagesBefore = pagesBefore;
    this._pagesAfter = pagesAfter;

    this._validateCurrentPage(); // has to be called first as the requested page may not be valid, i.e. if it is too low or too high. In such case the edge page will be served

    this._calculateMinMaxPage();
    this._calcPrevPage();
    this._calcNextPage();

    this._makeCalculations(
      this._linesPerPage,
      this._initialData.length, // TotalLength
      this._currPage,
      this._pagesBefore,
      this._pagesAfter
    );

    this._processRecordsForCurrentPage(
      this._initialData,
      this._currPage, //this is safe only after validating currPage
      this._linesPerPage
    );
  }

  get totalLength() {
    return this._initialData.length;
  }

  get data() {
    return this._data;
  }

  _processRecordsForCurrentPage = (data, currPage, linesPerPage) => {
    let newData = [];
    let minRecordShown = (currPage - 1) * linesPerPage; // 1 is the smallest page, i.e. we need records from i=0 to i=9
    let maxRecordShown = currPage * linesPerPage - 1; // i.e. records go to i=9
    for (let i = minRecordShown; i <= maxRecordShown; i++) {
      // data[i] may not exist in the last page, where the page is not full of records
      if (data[i]) newData = [...newData, data[i]];
    }
    this._data = newData;
    this._minRecordShown = minRecordShown;
    this._maxRecordShown = maxRecordShown;
    return { newData, minRecordShown, maxRecordShown };
  };

  _validateCurrentPage() {
    // Calculate currPage
    let theoreticalMinOfCurrentPage = 1;
    let theoreticalMaxOfCurrentPage = Math.ceil(
      this._totalLength / this._linesPerPage
    );
    if (
      this._currPage < theoreticalMinOfCurrentPage ||
      this._currPage > theoreticalMaxOfCurrentPage
    )
      this._currPage = 1;

    this._theoreticalMinOfCurrentPage = theoreticalMinOfCurrentPage;
    this._theoreticalMaxOfCurrentPage = theoreticalMaxOfCurrentPage;
  }

  _calculateMinMaxPage() {
    //Calculate min pages in the list for the page navigation
    let minPageShown = this._currPage - this._pagesBefore;
    if (minPageShown < this._theoreticalMinOfCurrentPage) {
      let delta = minPageShown - this._theoreticalMinOfCurrentPage;
      minPageShown = this._theoreticalMinOfCurrentPage;
      this._maxPageShown = this._currPage + this._pagesAfter + delta;
    }
    this._minPageShown = minPageShown;

    //Calculate max pages in the list for the page navigation
    let maxPageShown = this._maxPageShown;
    if (maxPageShown < this._currPage)
      maxPageShown = this._currPage + this._pagesAfter; //as minPage affects, this check serves to check whether it has impacted maxPage
    if (maxPageShown > this._theoreticalMaxOfCurrentPage) {
      let delta = maxPageShown - this._theoreticalMaxOfCurrentPage;
      maxPageShown = this._theoreticalMaxOfCurrentPage;
      // TODO: Check if this delta could affect the minPage somehow - check if delta can be added to minPageShown
    }
    this._maxPageShown = maxPageShown;
  }

  _calcPrevPage() {
    // Calculate prevPage
    let prevPage = this._currPage - 1;
    if (prevPage < this._theoreticalMinOfCurrentPage) prevPage = 0;

    this._prevPage = _prevPage;
  }

  _calcNextPage() {
    //Calculate nextPage
    let nextPage = this._currPage + 1;
    if (nextPage > this._theoreticalMaxOfCurrentPage) nextPage = 0;
    this._nextPage = _nextPage;
  }
}
