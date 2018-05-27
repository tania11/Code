const express=require('express');
const router=express.Router();

const Contact=require('../models/contact');

//retrieving all contacts
router.get('/contactsList',(req,res,next)=>{
    Contact.find(function(err,contacts){
        res.json(contacts);
    });
   
    console.log('Retrieving contactList');
});


//add contact
router.post('/contact',(req,res,next)=>{

    let newContact=new Contact({
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        phone : req.body.phone,
        created_date:new Date(),
        updated_date:new Date()
    });

    newContact.save((error,contact)=>{
        if(error){
            res.json({message:'Failed to add contact'+error});
        }
        else{
            res.json({message:'contact added successfully'});
        }
    });
});

router.put('/contactedit/:id',(req,res,next)=>{
    var obj = req.body;
    obj.updated_date=new Date();
    Contact.findByIdAndUpdate(req.params.id,{
        $set:obj
    },
    {
        new: true
    },
    function(error,resultEdit){
        if(error){
            res.json(error);
        }
        else{
            res.json(200,resultEdit);
        }
    });
    
});

router.delete('/contact/:id',(req,res,next)=>{
    Contact.remove({_id:req.params.id},function(error,result){
        if(error){
            res.json(error);
        }
        else{
            res.json(result);
        }
    });
});

module.exports=router;