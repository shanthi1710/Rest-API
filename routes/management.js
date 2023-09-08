const express =  require('express')
const management = require('../models/management')

const router = express.Router();

router.get('/',async(req,res)=>{
    try{
        const management = await management.find()
        res.json(management)
    }
    catch(err)
    {
        res.status(500).json({message:err.message})
    }
})
router.get('/:id',getManagement,(req,res)=>{
    res.send(req.management)
})
router.post('/',async(req,res)=>{
       const management= new management({
        name : req.body.name,
        managementto:req.body.managementto
       })
       try{
            const newManagement = await management.save()
            res.status(201).json(newManagement)
       }catch{
            res.status(400).json({message:err.message})
       }
})
router.patch('/',getManagement,async(req,res)=>{
    if(req.body.name !=null)
    {
        res.management.name =req.body.name
    }
    if(req.body.managementto !=null)
    {
         res.management.managementto=req.body.managementto
    }
    try{
        const updatedmanagement = await res.management.save()
        res.json(updatedmanagement)
    }
    catch(err)
    {
        res.status(400).json({message:err.messase})
    }

})
router.delete('/:id',getManagement,async(req,res)=>{
    try {
         await res.management.remove();
        res.json({ message: 'Deleted Management' });
    } catch (err) {
        res.status(500).json({ message: err.message });  
    }
})
async function getManagement(req,res,next){
    let management
    try{
        management = await management.findById(req.params.id)
        if(management==null)
        {
            return res.status(404).json({message:'Cannot find management'})
        }
    }
    catch(err)
    {
        return res.status(500).json({message:err.message})
    }
    res.management = management
    next()
}   
module.exports=router