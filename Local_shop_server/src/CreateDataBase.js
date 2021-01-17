const {ItemArray} = require('./Products');
 const {ProductModel} = require('./conector');
 const {Cereals_Pulses} = require('./Cereals_Pulses');
 const {Spices_Dry_Fruits} = require('./Spices _Dry Fruits');


const RefreshAll = async ()=>{
      // await ProductModel.deleteMany({});

      await ProductModel.insertMany(Spices_Dry_Fruits);
}

RefreshAll();