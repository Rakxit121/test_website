const Products = require("../model/productModel");
const cloudinary = require("cloudinary");
const createProduct = async (req,res) => {
    //step 1 : Check incoming data
    console.log(req.body);
    console.log(req.files);

    //step-2 destructuing
    const{
        productName,productPrice,
        productDescription,
        productCategory
    } = req.body;
    const {productImage} = req.files;

    //step3 validation
    if(!productName || !productPrice || !productCategory || !productDescription || !productImage){
        return res.json({
            success : false,
            message : "Pleaase fill al the fields"
        })
    }
    //step4 try block
    try {
        const uploadedImage =  await cloudinary.v2.uploader.upload(
            productImage.path,
        {
        folder : "products",
        crop : "scale"
    }
    )

    //save the products
    const newProduct = new Products({
        productName : productName,
        productPrice : productPrice,
        productImageUrl : uploadedImage.secure_url,
        productCategory : productCategory,
        productDescription : productDescription
    })

    await newProduct.save();
    res.status(200).json({
        success : true,
        message : "Product created successfully",
        data : newProduct
    })

    } catch (error) {
        console.log(error);
        res.status(500).json("Server error")
    }

}

//function for getting all products
const getAllProducts = async(req,res) => {
   try {
    const listOfProducts = await Products.find();
    res.json({
        success : true,
        message : "Products fetched successfully",
        products : listOfProducts,
    })
   } catch (error) {
    console.log(error);
    res.status(500).json("Server Error")
   }
}

//get products by id
const getSingleProduct = async (req,res) =>{
    const id = req.params.id;
    if(!id){
        return res.json({
            success : false,
            message : " Product Id is required!"
        })
    }
    try {
        const singleProduct = await Products.findById(id);
        res.json({
            success : true,
            message : "Product Fetched Successfully",
            product : singleProduct
        })
    } catch (error) {
        console.log(error);
        res.status(500).json("Server error")
    }
}


//update product
const updateProduct = async (req,res) => {
    console.log(req.body);
    console.log(req.files);

    //destructure the data
    const {productName, productPrice, productDescription, productCategory} = req.body;

    const {productImage} = req.files;

    //destructure id
    const id = req.params.id;

    //validate the data
    if(!productName || !productPrice || !productDescription || !productCategory){
        return res.json({
            success: false,
            message: "Please fill all the fields."
        })
    }
    try {
        if(productImage){
            const uploadedImage = await cloudinary.v2.uploader.upload(
                productImage.path,
                {
                    folder: 'products',
                    corp : "scale"
                }
                
            );
            const updatedProduct = {
                productName : productName,
                productPrice : productPrice,
                productDescription : productDescription,
                productCategory : productCategory,
                productImageUrl : uploadedImage.secure_url
            
            }
            await Products.findByIdAndUpdate(id, updatedProduct);
            res.json({
                success: true,
                message: "Product updated successfully",
                product: updatedProduct
            })
        } else {
            const updatedProduct = {
                productName : productName,
                productPrice : productPrice,
                productDescription : productDescription,
                productCategory : productCategory
            
            }
            await Products.findByIdAndUpdate(id, updatedProduct);
            res.json({
                success: true,
                message: "Product updated successfully without image",
                product: updatedProduct
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        
        })
    }
}

// delete product
const deleteProduct = async (req,res) => {
    try{
        const deletedProduct = await Products.findByIdAndDelete(req.params.id);
        if(!deletedProduct){{
            res.json({
                success: false,
                message: "Product not found"
            })
        }}
        res.json({
            success: true,
            message: "Product deleted successfully"
        })
    } catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        
        })
    }

}

module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
}