const { Router } = require("express");
const controller = require("./controller");
const router = Router();


router.post("/", controller.addData);
router.get("/", controller.getordertable);
router.get("/companydetail", controller.getcomanydetail);
router.get("/items", controller.getorderitems);
router.get("/orderitems", controller.getworkorder);
router.get("/itemlist/:id", controller.itemlist);
router.delete("/:id", controller.deleteorder);
router.get("/getoderbyid/:id", controller.getorderbyid);
router.get("/getoderbydates/:start/:end", controller.getorderbydates);
router.put("/updateorder/:id", controller.updateOrder);





// router.post("/api/v1/billdetails", controller.addData2);


module.exports = router;