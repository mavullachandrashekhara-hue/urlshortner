import { nanoid } from 'nanoid'
import { ShortURL } from '../models/shorturl.model.js';



export const generateShortUrl = async ( req, res )=>{
   try {




       console.log(req.body);


       if(!req.body.originalUrl){
           console.error("Original URL not provided in request body");
           return res.status(400).json({ status: "BAD_REQUEST", message: "Original URL is required" });
       }




       let shortcode = nanoid(7);


       let newRecord = await ShortURL.findOne({shortCode: shortcode})


       while(newRecord){
             shortcode = nanoid(7);
             newRecord = await ShortURL.findOne({shortCode: shortcode});
       }


       const newShortUrlRecord = await ShortURL.create(
           {originalUrl : req.body.originalUrl,
               shortCode: shortcode,
               userId: req.user.id});






       return res.status(200).json(newShortUrlRecord);






   }catch(error){
       console.error("Error in getting user profile", error.message);
       return res.status(500).json({ status: "INTERNAL_SERVER_ERROR", message: "Error in getting user profile" });
   }
}
export const redirectUrl = async ( req, res )=>{
   try {


       const { shorturl } = req.params;




       const exist = await ShortURL.findOne({shortCode:shorturl });


       if(!exist){
           console.error("Short URL not found");
           return res.status(404).json({ status: "NOT_FOUND", message: "Short URL not found" });
       }


       res.redirect(exist.originalUrl);




   }catch(error){
       console.error("Error in getting user profile", error.message);
       return res.status(500).json({ status: "INTERNAL_SERVER_ERROR", message: "Error in getting user profile" });
   }
}
