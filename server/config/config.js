const port= process.env.PORT || 3000;

process.env.NODE = process.env.NODE || 'dev';

let urlBD;

// mongodb+srv://bzkst:4lP3omozeQUKQ8cy@cluster0.5fsso.mongodb.net/cafe

//mongodb:localhost:27017/cafe

if(process.env.NODE === 'dev'){
    urlBD= 'mongodb://localhost:27017/cafe';
}else{
    urlBD= 'mongodb+srv://bzkst:4lP3omozeQUKQ8cy@cluster0.5fsso.mongodb.net/cafe'
}
process.env.urlBD= urlBD;


module.exports=port;
