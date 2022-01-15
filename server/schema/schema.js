const graphql = require('graphql');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const Sale = require('../models/sale');
const Purchase = require('../models/purchase');

const Person = require('../models/person')

const SaleCutEntry = require('../models/saleCutEntry')
const DiscretePurchase = require('../models/discretePurchase')
const DiscreteSale = require('../models/discreteSale')
const Expenses = require('../models/expenses')
const DiscreteProductEntry = require('../models/discreteProductEntry');
const {
    GraphQLUpload,
  } = require('graphql-upload');
const Lott = require('../models/lott')
const Product = require('../models/product')
const Refund = require('../models/refund')
const User = require('../models/user')
const Place = require('../models/place')
const Firm = require('../models/firm')
const Piece = require('../models/piece');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} = graphql;


const DiscretePurchaseType = new GraphQLObjectType({
    name: 'DiscretePurchase',
    fields: ( ) => ({
        id: { type: GraphQLID },
        quantity: {type: GraphQLInt},
        discreteProductEntryId: { type: GraphQLID },
        firm:{
            type: FirmType,
            resolve(parent, args){
                return Firm.findById(parent.firmId);
            }
        },
        place:{
            type: PlaceType,
            resolve(parent, args){
                return Place.findById(parent.placeId);
            }
        },
        purchase:{
            type: PurchaseType,
            resolve(parent, args){
                return Purchase.findById(parent.purchaseId);
            }
        }

    })
});

const DiscreteSaleType = new GraphQLObjectType({
    name: 'DiscreteSale',
    fields: ( ) => ({
        id: { type: GraphQLID },
        quantity: {type: GraphQLInt},
        discreteProductEntryId: { type: GraphQLID },
        sale:{
            type: SaleType,
            resolve(parent, args){
                return Sale.findById(parent.saleId);
            }
        }

    })
});

const DiscreteProductEntryType = new GraphQLObjectType({
    name: 'DiscreteProductEntry',
    fields: ( ) => ({
        id: { type: GraphQLID },
        length: {type: GraphQLInt},
        width: {type: GraphQLInt},
        height: {type: GraphQLInt},
        pricePer: {type: GraphQLInt},
        purchases:{
            type: new GraphQLList(PurchaseType),
            resolve(parent, args){
                return DiscretePurchase.find({discreteProductEntryId: parent._id});
            }
        },
        product:{
            type: ProductType,
            resolve(parent, args){
                return Product.findById(parent.productId);
            }
        }

    })
});


const SaleCutEntryType = new GraphQLObjectType({
    name: 'SaleCutEntry',
    fields: ( ) => ({
        
        quantity: {type: GraphQLInt},
        id: { type: GraphQLID },
        piece: {
            type: PieceType,
            resolve(parent, args){
                //return _.find(items, { id: parent.itemId });
                return Piece.findById(parent.pieceId);
            }
        }

    })
});


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: ( ) => ({
        name: { type: GraphQLString },
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        userAccesType: {type: GraphQLInt}

    })
});

const RefundType = new GraphQLObjectType({
    name: 'Refund',
    fields: ( ) => ({
        id: { type: GraphQLID },
        time: { type: GraphQLString },
        date: { type: GraphQLString },
        billNumber: {type: GraphQLInt}

    })
});

const ExpensesType = new GraphQLObjectType({
    name: 'Expenses',
    fields: ( ) => ({
        id: { type: GraphQLID },
        biltyNumber: {type: GraphQLInt},
        freight: {type: GraphQLInt},
        loading: {type: GraphQLInt},
        unloading: {type: GraphQLInt},
        weight: {type: GraphQLInt},
        purchases: {
            type: new GraphQLList(PurchaseType),
            resolve(parent, args){
                //return _.find(items, { id: parent.itemId });
                return Purchase.find({expensesId : parent._id});
            }
        },



    })
});

const FirmType = new GraphQLObjectType({
    name: 'Firm',
    fields: ( ) => ({
        name: { type: GraphQLString },
        id: { type: GraphQLID }
    })
});

const PieceType = new GraphQLObjectType({
    name: 'Piece',
    fields: ( ) => ({
        id: { type: GraphQLID },
        nameId: { type: GraphQLInt },
        placeId: { type: GraphQLID },
        length: { type: GraphQLInt },
        width: { type: GraphQLInt },
        sale:{
            type: SaleType,
            resolve(parent, args){
                return Sale.findById(parent.saleId);
            }
        },
        lott: {
            type: LottType,
            resolve(parent, args){
                //return _.find(items, { id: parent.itemId });
                return Lott.findById(parent.lottId);
            }
        },
        place: {
            type: PlaceType,
            resolve(parent, args){
                return Place.findById(parent.placeId );
                //return _.filter(places, { id: parent.placeId });
            }
        }

    })
});


const LottType = new GraphQLObjectType({
    name: 'Lott',
    fields: ( ) => ({
        id: { type: GraphQLID },
        pricePer: { type: GraphQLInt },
        nameId: { type: GraphQLInt },
        origin: { type: GraphQLString },
        pieces:{
            type: new GraphQLList(PieceType),
            resolve(parent, args){
                //return _.find(items, { id: parent.itemId });
                return Piece.find({ lottId : parent._id });
            }
        },
        product: {
            type: ProductType,
            resolve(parent, args){
                //return _.find(items, { id: parent.itemId });
                return Product.findById(parent.productId);
            }
        },
        place: {
            type: PlaceType,
            resolve(parent, args){
                return Place.findById(parent.placeId );
                //return _.filter(places, { id: parent.placeId });
            }
        },
        firm: {
            type: FirmType,
            resolve(parent, args){
                return Firm.findById(parent.firmId );
                //return _.filter(places, { id: parent.placeId });
            }
        },
        purchase:{
            type: PurchaseType,
            resolve(parent, args){
                return Purchase.findById(parent.purchaseId );
                //return _.filter(places, { id: parent.placeId });
            }
        }


    })
});


const SaleType = new GraphQLObjectType({
    name: 'Sale',
    fields: ( ) => ({
        quantity: {type: GraphQLInt},
        cutOrUncut: {type: GraphQLInt},
        billNumber: {type: GraphQLInt}, 
        pricePer : { type: GraphQLInt },
        id: { type: GraphQLID },
        date: { type: GraphQLString },
        time: { type:GraphQLString },
        CustomerName: { type:GraphQLString },
        saleCutEntry:{
            type: new GraphQLList(SaleCutEntryType),
            resolve(parent, args){
                return SaleCutEntry.find({ saleId: parent._id });
                //return _.find(items, { id: parent.itemId });
            }
        },
        firm:{
            type: FirmType,
            resolve(parent, args){
                return Firm.findById(parent.firmId);
                //return _.find(items, { id: parent.itemId });
            }
        },
        product: {
            type: ProductType,
            resolve(parent, args){
                //return _.find(items, { id: parent.itemId });
                return Product.findById(parent.productId);
            }
        },
        place: {
            type: PlaceType,
            resolve(parent, args){
                return Place.findById(parent.placeId);
                //return _.filter(places, { id: parent.placeId });
            }
        }

    })
});



const PurchaseType = new GraphQLObjectType({
    name: 'Purchase',
    fields: ( ) => ({
        weight: { type: GraphQLInt },
        royelty:  { type: GraphQLInt },
        id: { type: GraphQLID },
        billNumber : { type: GraphQLInt },
        date: { type: GraphQLString },
        time: { type:GraphQLString },
        firm:{
            type: FirmType,
            resolve(parent, args){
                return Firm.findById(parent.firmId);
                //return _.find(items, { id: parent.itemId });
            }
        },
        expenses:{
            type: ExpensesType,
            resolve(parent, args){
                return Expenses.findById(parent.expensesId);
                //return _.find(items, { id: parent.itemId });
            }
        }
    })
});


const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: ( ) => ({
        thickness: {type: GraphQLInt},
        unit: { type: GraphQLString },
        name: { type: GraphQLString },
        productType: { type: GraphQLString },
        placeOfOrigin:{ type: GraphQLString },
        id: { type: GraphQLID },
        PurchaseData:{
            type: new GraphQLList(PurchaseType),
            resolve(parent, args){
                return Purchase.find({ productId: parent._id });
                //return _.filter(purchases, { itemId : parent.id });
            }},
        SaleData:{
            type: new GraphQLList(SaleType),
            resolve(parent, args){
                return Sale.find({ productId : parent._id });
                //return _.filter(purchases, { itemId : parent.id });
            }}
    })
});

const PlaceType = new GraphQLObjectType({
    name: 'Place',
    fields: ( ) => ({
        name: { type: GraphQLString },
        id: { type: GraphQLID },
    
        thisPlaceSale:{
            type: new GraphQLList(SaleType),
            resolve(parent, args){
                return Sale.find({ placeId : parent._id});
                //return _.filter(purchases, { itemId : args.itemId });
            }
        }


    })
});



const PersonType = new GraphQLObjectType({
    name: 'Person',
    fields: ( ) => ({
        name: { type: GraphQLString },
        advance: {type: GraphQLInt},
        salry:  {type: GraphQLInt},
        expenseAllowance : {type: GraphQLInt},
        id: { type: GraphQLID },
        firm: {
            type: FirmType,
            resolve(parent, args){
                return Firm.findById({ id_ : parent.firmId});
                //return _.filter(purchases, { itemId : args.itemId });
            }
        }

    })
});

const TypeAuth = new  GraphQLObjectType({
    name: 'Auth',
    fields: ( ) => ({
        userId: { type: GraphQLID },
        token: {type: GraphQLString},
        tokenExpiration:  {type: GraphQLInt},
        

    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',

    fields: {
        discreteProductEntrys:{
            type: new GraphQLList(DiscreteProductEntryType),
            resolve(parent, args){
                return DiscreteProductEntry.find({});
            }
        },
        login: {
            type: TypeAuth,
            args: {
                email: {type: GraphQLString},
                password: {type: GraphQLString}
            },
            async resolve(parent, args){
                const user = await User.findOne({email: args.email});
                if(!user){
                    throw new Error('User does not exist!')
                }
                var isEqual = user.password == args.password
                
                if(!isEqual){
                    throw new Error('Password is incorrect')
                }
            
                const token = jwt.sign({userId: user.id, email: user.email}, 'somesupersecretkey', {
                    expiresIn: '1h'
                });
                return {userId: user.id, token: token, tokenExpiration: 1};
                // code to get data from db / other source
                //return _.find(entrys, { id: args.id });
            }
        },
        discreteProductEntry:{
            type: DiscreteProductEntryType,
            args: {id: { type: GraphQLID } },
            resolve(parent, args){
                return DiscreteProductEntry.findById(args.id);
            }
        },
        saleCutEntry:{
            type: SaleCutEntryType,
            args: {id: { type: GraphQLID } },
            resolve(parent, args){
                return SaleCutEntry.findById(args.id);
                // code to get data from db / other source
                //return _.find(entrys, { id: args.id });
            }
        },

        piece:{
            type: PieceType,
            args: {id: { type: GraphQLID } },
            resolve(parent, args, req){
                return Piece.findById(args.id);
                // code to get data from db / other source
                //return _.find(entrys, { id: args.id });
            }
        },
        lott:{
            type: LottType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Lott.findById(args.id);
                // code to get data from db / other source
                //return _.find(entrys, { id: args.id });
            }
        },
        lotts:{
            type: new GraphQLList(LottType),
            resolve(parent, args){
                return Lott.find({});

            }
        },
        refund:{
            type: RefundType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Refund.findById(args.id);
                // code to get data from db / other source
                //return _.find(entrys, { id: args.id });
            }
        },
        users:{
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return User.find({});
                // code to get data from db / other source
                //return _.find(entrys, { id: args.id });
            }
        },
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return User.findById(args.id);
                // code to get data from db / other source
                //return _.find(entrys, { id: args.id });
            }
        },
        firm: {
            type: FirmType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Firm.findById(args.id);
                // code to get data from db / other source
                //return _.find(entrys, { id: args.id });
            }
        },
        firms:{
            type: new GraphQLList(FirmType),
            resolve(parent, args){
                return Firm.find({});
                //return items;
            }
            
        }
        ,
        
        sale: {
            type: SaleType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Sale.findById(args.id);
                // code to get data from db / other source
                //return _.find(entrys, { id: args.id });
            }
        },
        sales: {
            type: new GraphQLList(SaleType),
            resolve(parent, args){
                return Sale.find({});
                // code to get data from db / other source
                //return _.find(entrys, { id: args.id });
            }
        },
        sales: {
            type: new GraphQLList(SaleType),
            resolve(parent, args){
                return Sale.find({});
                // code to get data from db / other source
                //return _.find(entrys, { id: args.id });
            }
        },
        purchase: {
            type: PurchaseType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Purchase.findById(args.id);
                //return _.find(purchases, { id: args.id });
            }
        },
        purchases: {
            type: new GraphQLList(PurchaseType),
            resolve(parent, args){
                return Purchase.find({});
                //return _.find(purchases, { id: args.id });
            }
        },
        
        product: {
            type: ProductType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Product.findById(args.id);
                //return _.find(items, { id: args.id });
            }
        },
        place: {
            type: PlaceType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Place.findById(args.id);
                //return _.find(places, { id: args.id });
            }
        },
        places:{
            type: new GraphQLList(PlaceType),
            resolve(parent,args){
                return Place.find({});
            }
        }
        
        ,
        products:{
            type: new GraphQLList(ProductType),
            resolve(parent, args){
                return Product.find({});
                //return items;
            }
        },

        person: {
            type: PersonType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Person.findById(args.id);
                //return _.find(persons, { id: args.id });
            }
        },
        places:{
            type: new GraphQLList(PlaceType),
            resolve(parent,args){
                return Place.find({});
            }
        },
        persons:{
            type: new GraphQLList(PersonType),
            resolve(parent,args){
                return Person.find({});
            }
        },
        expensess:{
            type: new GraphQLList(ExpensesType),
            resolve(parent,args){
                return Expenses.find({});
            }
        }
    
    }
});




const Mutation = new GraphQLObjectType({
    
    name: 'Mutation',
    fields: {
        addDiscretePurchase:{
            type: DiscretePurchaseType,
            args:{
                placeId: {type: new GraphQLNonNull(GraphQLID)},
                firmId: {type: new GraphQLNonNull(GraphQLID)},
                discreteProductEntryId: {type: new GraphQLNonNull(GraphQLID)},
                quantity:{type: new GraphQLNonNull(GraphQLInt)},
                purchaseId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                let discretePurchase= new DiscretePurchase({
                    placeId: args.placeId,
                    firmId: args.firmId,
                    discreteProductEntryId: args.discreteProductEntryId,
                    discreteProductEntryId: args.discreteProductEntryId,
                    quantity: args.quantity,
                });
                return discretePurchase.save();
            }
        },
        addDiscreteSale:{
            type: DiscreteSaleType,
            args:{
                discreteProductEntryId: {type: new GraphQLNonNull(GraphQLID)},
                quantity:{type: new GraphQLNonNull(GraphQLInt)},
                saleId:{type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                let discreteSale = new DiscreteSale({
                    discreteProductEntryId: args.discreteProductEntryId,
                    quantity: args.quantity,
                    saleId: args.saleId
                });
                return discreteSale.save();
            }
        }
        ,
        addDiscreteProductEntry:{
            type: DiscreteProductEntryType, 
            args:{
                length: {type: GraphQLInt},
                width: {type: GraphQLInt},
                height: {type: GraphQLInt}, 
                productId: { type: new GraphQLNonNull(GraphQLID) },
                pricePer: {type: new GraphQLNonNull(GraphQLInt)}
            },
        resolve(parent, args){
            let discreteProductEntry = new DiscreteProductEntry({
                length: args.length,
                width: args.width,
                height: args.height,
                productId: args.productId,
                pricePer: args.pricePer,
            });
            return discreteProductEntry.save();
        }
        },
        addSaleCutEntry:{
            type: SaleCutEntryType,
            args:{
                pieceId: { type: new GraphQLNonNull(GraphQLID) },
                quantity: { type: new GraphQLNonNull(GraphQLInt) },
                saleId: { type: new GraphQLNonNull(GraphQLID) }

            }
        ,
        resolve(parent, args){
            let saleCutEntry = new SaleCutEntry({
                pieceId: args.pieceId,
                quantity: args.quantity,
                saleId: args.saleId
            });
            return saleCutEntry.save();
        }
    },

        addUser:{
            type: UserType,
            args:{
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
                userAccesType: {type: new GraphQLNonNull(GraphQLInt)}
            }
        ,
        resolve(parent, args){
            let user = new User({
                name: args.name,
                email: args.email,
                password: args.password,
                userAccesType: args.userAccesType
            });
            return user.save();
        }
    },
        
        addRefund:{
            type: RefundType,
            args:{
                billNumber:{ type: new GraphQLNonNull(GraphQLInt) },
                date:  { type: new GraphQLNonNull(GraphQLString) },
                time:  { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args){
                let refund = new Refund({
                    billNumber: args.billNumber, 
                    date: args.date,
                    time: args.time
                });
                return refund.save();
            }
        },
    
        addExpenses:{
            type: ExpensesType,
            args:{
                weight:{ type: new GraphQLNonNull(GraphQLInt) },
                biltyNumber:{ type: new GraphQLNonNull(GraphQLInt) },
                freight: { type: new GraphQLNonNull(GraphQLInt) },
                loading: { type: new GraphQLNonNull(GraphQLInt) },
                unloading: { type: new GraphQLNonNull(GraphQLInt) }, 
                date: { type: new GraphQLNonNull(GraphQLString) }

            }, 
            resolve(parent, args){
                let expenses = new Expenses({
                    weight: args.weight,
                    biltyNumber: args.biltyNumber, 
                    freight: args.freight,
                    loading: args.loading,
                    unloading: args.unloading,
                    date: args.date
                });
                return expenses.save();
            }
        },
        
        addFirm:{
            type: FirmType,
            args:{
                name: { type: GraphQLString},
            },
            resolve(parent, args){
                let firm = new Firm({
                    name: args.name
                });
                return firm.save();
            }
        }
        ,
         
        addPiece:{
            type: PieceType,
            args:{
                lottId: { type: new GraphQLNonNull(GraphQLID) },
                nameId: { type: new GraphQLNonNull(GraphQLInt) },
                length: { type: new GraphQLNonNull(GraphQLInt) },
                width: { type: new GraphQLNonNull(GraphQLInt) },
                placeId: { type: new GraphQLNonNull(GraphQLID) },
                firmId: { type: new GraphQLNonNull(GraphQLID) },
                saleId: { type: GraphQLID }
            },
            resolve(parent, args){
                let piece = new Piece({
                    lottId: args.lottId, 
                    length: args.length,
                    width: args.width,
                    nameId: args.nameId,
                    placeId: args.placeId,
                    firmId: args.firmId,
                    saleId: args.saleId 
                });
                return piece.save();
            }

        }
       ,

        addLott:{
            type: LottType,
            args:{
                productId: { type: new GraphQLNonNull(GraphQLID) },
                pricePer: { type: new GraphQLNonNull(GraphQLInt) },
                nameId: { type: new GraphQLNonNull(GraphQLInt) },
                placeId: { type: new GraphQLNonNull(GraphQLID) },
                origin: { type: new GraphQLNonNull(GraphQLString) },
                firmId:{ type: new GraphQLNonNull(GraphQLID) },
                purchaseId:{ type: GraphQLID }
            }, 
            resolve(parent, args){
                let lott = new Lott({
                    productId: args.productId, 
                    pricePer: args.pricePer,
                    nameId: args.nameId,
                    placeId: args.place,
                    origin: args.origin,
                    firmId: args.firmId,
                    purchaseId: args.purchaseId
                });
                return lott.save();
            }

        },
        
        addSale: {
            type: SaleType,
            args: {
                
                firmId: { type: new GraphQLNonNull(GraphQLID) },
                pricePer: { type: new GraphQLNonNull(GraphQLInt) },
                placeId: { type: new GraphQLNonNull(GraphQLID) },
                cutOrUncut: { type: new GraphQLNonNull(GraphQLInt) },
                productId: { type: new GraphQLNonNull(GraphQLID) },
                date: { type: new GraphQLNonNull(GraphQLString) }, 
                time: { type: new GraphQLNonNull(GraphQLString) },
                billNumber: { type: new GraphQLNonNull(GraphQLInt) }, 
                CustomerName: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args){
                let sale = new Sale({
                    quantity: args.quantity,
                    discreteProductEntryId: args.discreteProductEntryId,
                    firmId: args.firmId,
                    pricePer: args.pricePer,
                    cutOrUncut: args.cutOrUncut,
                    placeId: args.placeId,
                    productId: args.productId,
                    quantity: args.quantity,
                    date: args.date,
                    time: args.time,
                    billNumber: args.billNumber, 
                    CustomerName: args.CustomerName,
                });
                return sale.save();
            }
        },
        addPurchase: {
            type: PurchaseType,
            args: {
                royelty:{ type: new GraphQLNonNull(GraphQLInt) },
                firmId: { type: new GraphQLNonNull(GraphQLID) },
                date: { type: new GraphQLNonNull(GraphQLString) }, 
                time: { type: new GraphQLNonNull(GraphQLString) },
                billNumber: { type: new GraphQLNonNull(GraphQLInt) },
                weight:{ type: new GraphQLNonNull(GraphQLInt) },
                expensesId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                let purchase = new Purchase({
                    royelty: args.royelty,
                    weight: args.weight,
                    firmId: args.firmId,
                    date: args.date,
                    time: args.time,
                    billNumber: args.billNumber,
                    expensesId: args.expensesId
                });
                return purchase.save();
            }
        }, 
        addProduct: {
            type: ProductType,
            args: {
                thickness: {type: GraphQLInt},
                name: { type: new GraphQLNonNull(GraphQLString) },
                unit: { type: new GraphQLNonNull(GraphQLString) },
                color: { type: new GraphQLNonNull(GraphQLString) },
                //image: { type: new GraphQLNonNull(GraphQLUpload) },
                productType:  { type: new GraphQLNonNull(GraphQLString) },
                placeOfOrigin: { type: new GraphQLNonNull(GraphQLString) },

            },
            resolve(parent, args){
                let product = new Product({
                    thickness: args.thickness,
                    name :args.name,
                    unit : args.unit,
                    color : args.color,
                    image : args.image,
                    productType : args.productType,
                    placeOfOrigin : args.placeOfOrigin 

                });
                return product.save();
            }
        },

        
        addPlace: {
            type: PlaceType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args){
                let place = new Place({
                    name :args.name,
                    firms: args.firms
                });
                return place.save();
            }
        },

        addPerson: {
            type: PersonType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                advance: {type: new GraphQLNonNull(GraphQLInt) },
                salry: {type: new GraphQLNonNull(GraphQLInt)},
                expenseAllowance: {type: new GraphQLNonNull(GraphQLInt)},
                firmId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                let person = new Person({
                    name :args.name,
                    advance: args.advance,
                    salry: args.salry,
                    expenseAllowance: args.expenseAllowance,
                    firmId: args.firmId
                });
                return person.save();
            }
        }
    }
});




module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});