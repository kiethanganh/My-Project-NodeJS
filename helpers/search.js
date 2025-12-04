module.exports = (query) =>{
     // tìm từ khóa keyword

   let ojectSearch = {
    keyword: "",
    regex:""
   }

    if (query.keyword) {
      ojectSearch.keyword = query.keyword;

      // dùng Regex để tìm value
      const regex = new RegExp(ojectSearch.keyword, "i");

      ojectSearch.regex = regex;
      // End Regex
   }
   return ojectSearch
}