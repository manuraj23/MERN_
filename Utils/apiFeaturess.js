class apiFeatures{
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }
    filter(){
        let queryString = JSON.stringify(this.queryStr); // Convert queryObj to a string
        queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`); // Add MongoDB operators ($)
        const filteredQueryObj = JSON.parse(queryString); // Parse back to object

        this.query = this.query.find(filteredQueryObj); // Create initial query
        return this;
    }
    sort(){
        if (this.queryStr.sort) {
            const sortBy = this.queryStr.sort.split(',').join(' '); // Convert to space-separated format for MongoDB
            this.query = this.query.sort(sortBy);
        }
        else{
            this.query = this.query.sort('-releaseYear');
        }
        return this;
    }
    limitFields(){
        if (this.queryStr.fields) {
            const fields = this.queryStr.fields.split(',').join(' '); // Convert to space-separated format for MongoDB
            this.query = this.query.select(fields);
        }
        else{
            this.query = this.query.select('-__v');
        }
        return this;
    }
    paginate(){
        const page = this.queryStr.page * 1 || 1; // Convert to number, default to 1
        const limit = this.queryStr.limit * 1 || 10; // Convert to number, default to 100
        const skip = (page - 1) * limit; // Calculate number of documents to skip
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
       
}

module.exports = apiFeatures;