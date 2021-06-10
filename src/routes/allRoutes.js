const express = require('express');
const router = express.Router();
const {nanoid} = require('nanoid')
const DNS = require('../models/urls')



//redirect url
router.get("/:inptxt",async(req,res)=>{

    try{
        const { inputURL } = await DNS.findOne({
            "inputText": req.params.inptxt
        }, 'inputURL');

        
        await res.redirect(302,inputURL);
    }catch(e){
        res.status(400).send(e).end();
    }
});



router.get("/",async(req,res)=>{
    try{
        const getUrl = await DNS.find({
            
        });
        res.status(201).send(getUrl);
    }catch(e){
        res.status(400).send(e);
    }
});



// Create a new URL
router.post("/url", async (req,res)=>{
    const inputURL = req.body.inputURL;
if(!inputURL){
    res.status(400).send("Input Url is required").end()
}
else{
    const randomstring = nanoid(5);
    const inputText = req.body.inputText;
    const outputText = inputText !== "" ? `${req.get('host')}/${inputText}` : `${req.get('host')}/${randomstring}`;
    

    const body = {
        "inputURL" : inputURL,
        "inputText" : inputText,
        "outputText" : outputText
    }


    try{
        const newDNS = new DNS(body);

   await newDNS.save();
   await res.status(201).send(newDNS);    
}

catch(e){
        res.status(400).send(e);
    
}}}
)

module.exports = router