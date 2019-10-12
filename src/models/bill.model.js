let mongoose = require('mongoose')

mongoose.connect('mongodb+srv://suryakumar:Cluster@989492@smartcluster-cxhpj.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

let billSchema = new mongoose.Schema({
    smart_user:{
        type:String,
        require:true
    },
    b_name:String,
    b_phone:Number,
    b_company:String,
    b_location:String,
    b_PAN:String,
    b_state:String,
    b_GSTIN:String,
    billNo:String,
    date:String,    
    ewaybill:String,
    d_note:String,
    mode_pay:String,
    sup_ref:String,
    other_ref:String,
    despatch_through:String,
    terms_delivery:String,
    del_note_date:String,
    destination:String,
    buyers_ord_no:Number,
    buyers_ord_date:String,
    despatch_no:Number,
    bill_rr_no:String,
    vehicle_no:String,
    items: [
        {
            name:String,
            hsn:String,
            qty:Number,
            per:String,
            price:Number,
            tax:Number
        }
    ],  
    paid_amt:Number,
    due:Number ,
    createdDate:String 
})
module.exports = mongoose.model('SmartBill', billSchema);